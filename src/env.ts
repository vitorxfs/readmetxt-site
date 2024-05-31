// Environment
export const ENVIRONMENT = import.meta.env.ENVIRONMENT || 'development';

// Notion
export const NOTION_TOKEN = import.meta.env.NOTION_TOKEN;
export const NOTION_API_HOST = import.meta.env.NOTION_API_HOST || 'https://api.notion.com';
export const NOTION_READINGS_DATABASE_ID = import.meta.env.NOTION_READINGS_DATABASE_ID;

// Telegram
export const TELEGRAM_BASE_URL = import.meta.env.TELEGRAM_BASE_URL || 'https://api.telegram.org';
export const TELEGRAM_BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
export const TELEGRAM_CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

// Cloudflare
export const CLOUDFLARE_READING_STORAGE_KEY = import.meta.env.CLOUDFLARE_READING_STORAGE_KEY || 'readmetxt_readings_fallback';
export const CLOUDFLARE_ACCOUNT_ID = import.meta.env.CLOUDFLARE_ACCOUNT_ID;
export const CLOUDFLARE_NAMESPACE_ID = import.meta.env.CLOUDFLARE_NAMESPACE_ID;
export const CLOUDFLARE_TOKEN = import.meta.env.CLOUDFLARE_TOKEN;

// Public
export const PUBLIC_JOIN_GROUP_URL= import.meta.env.PUBLIC_JOIN_GROUP_URL || 'https://www.linkedin.com/groups/9585480/';
export const PUBLIC_READING_BOARD_URL= import.meta.env.PUBLIC_READING_BOARD_URL || 'https://app.readmetxt.com.br';


export const PUBLIC_CANONICAL_URL = import.meta.env.PUBLIC_CANONICAL_URL || 'https://readmetxt.com.br/';
