import { NOTION_READINGS_DATABASE_ID } from '../env';
import { readingsSchema } from '../validators/readings-service';
import { Status, type Reading } from '../domain/readings';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import NotionService from './notion.service';
import type { ILogger } from './logger.service';

dayjs.extend(customParseFormat);

export class ReadingsService {
  private notionService: NotionService;
  private logger: ILogger;

	constructor(deps: { notionService: NotionService, logger: ILogger }) {
    this.notionService = deps.notionService;
    this.logger = deps.logger;
	}

	async getReadings(): Promise<Reading[]> {
    try {
      const res = await this.notionService.getDatabase(NOTION_READINGS_DATABASE_ID);
      return this.parseData(res);
    } catch(err: unknown) {
      if (err instanceof Error) {
        this.logger.error('Could not parse Notion data').sendTelegram();
      }
      return [];
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
      rating: d.properties.Avaliação.select.name.length,
      title: d.properties['Título do Livro'].title[0].plain_text,
      totalPages: d.properties['Páginas Totais'].number,
      status: notionToStatus[d.properties.Status.select.name],
    }));

    return parsedData;
  }
}

export default ReadingsService;
