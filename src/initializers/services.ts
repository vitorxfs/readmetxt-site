import { ENVIRONMENT, NOTION_API_HOST, NOTION_READINGS_DATABASE_ID, NOTION_TOKEN, TELEGRAM_BASE_URL, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '../env'
import DevLogger from '../services/dev-logger.service';
import ProdLogger from '../services/logger.service';
import NotionService from '../services/notion.service';
import ReadingsService from '../services/readings.service';
import TelegramService from '../services/telegram.service';
import type { Logger } from '../services/logger.service';

export const getNotionService = (): NotionService => {
  if (!NOTION_API_HOST || !NOTION_TOKEN) {
    throw new Error('Missing environment vaiable - Notion Service scope');
  }

  return new NotionService({
    token: NOTION_TOKEN,
    host: NOTION_API_HOST,
  });
}

export const getTelegramService = (): TelegramService => {
  if (!TELEGRAM_BASE_URL || !TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID ) {
    throw new Error('Missing environment vaiable - Notion Service scope');
  }

  return new TelegramService({
    baseUrl: TELEGRAM_BASE_URL,
    botToken: TELEGRAM_BOT_TOKEN,
    chatId: TELEGRAM_CHAT_ID,
  })
}

export const getLogger = (): Logger => {
  if (ENVIRONMENT === 'production') {
    return new ProdLogger({
      serviceName: 'readmetxt-site',
    }, {
      telegramService: getTelegramService(),
    });
  } else {
    return new DevLogger({
      serviceName: 'readmetxt-site',
    }, {
      telegramService: getTelegramService(),
    });
  }
}


export const getReadingsService = (): ReadingsService => {
  if (!NOTION_READINGS_DATABASE_ID) {
    throw new Error('Missing environment vaiable - Readings Service scope');
  }

  return new ReadingsService({
    logger: getLogger(),
    notionService: getNotionService(),
  })
}
