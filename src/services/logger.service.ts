import TelegramService from './telegram.service';

interface MessageTypeReturn {
  sendTelegram: () => void;
}

export interface ILogger {
  error: (message: string) => MessageTypeReturn;
  info: (message: string) => MessageTypeReturn;
  success: (message: string) => MessageTypeReturn;
  sendTelegram: (message: string) => void;
}

export class Logger implements ILogger {
  private serviceName: string;
  private telegramService: TelegramService;

	constructor(config: { serviceName: string }, deps: { telegramService: TelegramService }) {
    this.serviceName = config.serviceName;
    this.telegramService = deps.telegramService;
	}

  error(message: string) {
    const builtMessage = this.buildMessage('🚨', message);
    console.error(builtMessage);

    return {
      sendTelegram: () => this.sendTelegram(builtMessage),
    };
  }

  info(message: string) {
    const builtMessage = this.buildMessage('💡', message);

    return {
      sendTelegram: () => this.sendTelegram(builtMessage),
    };
  }

  success(message: string) {
    const builtMessage = this.buildMessage('✅', message);

    return {
      sendTelegram: () => this.sendTelegram(builtMessage),
    };
  }

  private buildMessage(emoji: string, message: string): string {
    return `[${this.serviceName}] ${emoji} ${message}`;
  }

  async sendTelegram(message: string): Promise<void> {
    await this.telegramService.sendMessage(message);
  }
}

export default Logger;
