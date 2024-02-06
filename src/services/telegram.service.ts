import { buildUrl } from '../helpers/url';

export class TelegramService {
	private baseUrl: string;
  private botToken: string;
  private chatId: string

	constructor(deps: { botToken: string; baseUrl: string; chatId: string }) {
		this.botToken = deps.botToken;
		this.baseUrl = deps.baseUrl;
		this.chatId = deps.chatId;
	}

	async sendMessage(message: string): Promise<Response> {
    return fetch(this.buildMessageUrl(message));
	}

  private buildMessageUrl(message: string): string {
    return buildUrl(
      this.baseUrl,
      `bot${this.botToken}/sendMessage?chat_id=${this.chatId}&text=${message}`,
    );
  }
}

export default TelegramService;
