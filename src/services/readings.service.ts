import { CLOUDFLARE_READING_STORAGE_KEY, NOTION_READINGS_DATABASE_ID } from '../env';
import { readingsSchema } from '../validators/readings-service';
import { Status, type Reading } from '../domain/readings';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import NotionService from './notion.service';
import type { Logger } from './logger.service';
import type { StorageService } from './storage.service';

dayjs.extend(customParseFormat);

export class ReadingsService {
  private notionService: NotionService;
  private storageService: StorageService;
  private logger: Logger;

	constructor(deps: {
    notionService: NotionService,
    storageService: StorageService,
    logger: Logger
  }) {
    this.notionService = deps.notionService;
    this.logger = deps.logger;
    this.storageService = deps.storageService;
	}

	async getReadings(): Promise<Reading[]> {
    try {
      const res = await this.notionService.getDatabase(NOTION_READINGS_DATABASE_ID) as Record<string, any>;

      // TODO: mitigatedRes should be temporary and removed as soon as possible
      const mitigatedRes = {
        ...res,
        results: res?.results?.filter((r: {properties: Record<string, any>}) => r.properties['Autor']['rich_text'].length > 0),
      };

      const parsedData = this.parseData(res);

      if (parsedData) {
        await this.saveToStorage(res);
      }

      return parsedData;
    } catch(err: unknown) {
      if (err instanceof Error) {
        this.logger.error('Could not parse Notion data', err).sendTelegram();
      }

      return this.getFromStorage();
    }
	}

  parseData(data: unknown): Reading[] {
    const validatedData = readingsSchema.parse(data);

    if (validatedData == null) {
      throw new Error()
    }

    const notionToStatus = {
      'Lendo': Status.Reading,
      'Lido': Status.Read,
      'Lista de desejos': Status.Wish,
      'Na fila': Status.Queue,
    }

    const parsedData = validatedData.results.map<Reading>((d) => ({
      amazonLink: d.properties['Link da Amazon para Compra'].url,
      authors: d.properties.Autor.rich_text.map((a) => a.plain_text),
      cover: d.properties.Capa.files[0].file.url,
      daysToRead: d.properties['Quantidade de dias para leitura'].formula.number,
      finishDate: dayjs(d.properties['Data de Término'].date.start, 'YYYY-MM-DD').toDate(),
      startDate: dayjs(d.properties['Data de Início'].date.start, 'YYYY-MM-DD').toDate(),
      meetingDate: dayjs(d.properties['Reunião do Grupo'].rich_text[0].plain_text, 'DD/MM/YYYY').toDate(),
      pagesPerDay: d.properties['Páginas por dia'].formula.number,
      pagesRead: d.properties['Páginas Lidas'].number,
      pricing: d.properties['Preço*'].number,
      progress: d.properties.Progresso.formula.number,
      rating: d.properties.Avaliação.select.name?.length,
      title: d.properties['Título do Livro'].title[0].plain_text,
      totalPages: d.properties['Páginas Totais'].number,
      status: notionToStatus[d.properties.Status.select.name],
    }));

    return parsedData;
  }

  private async getFromStorage(): Promise<Reading[]> {
    try {
      const fromStorage = await this.storageService.fetch(CLOUDFLARE_READING_STORAGE_KEY);

      return this.parseData(fromStorage);
    } catch(err: unknown) {
      if (err instanceof Error) {
        this.logger.error('Could not parse Notion data', err).sendTelegram();
      }

      return [];
    }
  }

  private async saveToStorage(data: Record<string, any>): Promise<void> {
    return this.storageService.write(CLOUDFLARE_READING_STORAGE_KEY, data);
  }
}

export default ReadingsService;
