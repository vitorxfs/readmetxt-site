import TelegramService from './telegram.service';

interface MessageTypeReturn {
  sendTelegram: () => void;
}

export interface Logger {
  error: (message: string, details?: Record<string, any>) => MessageTypeReturn;
  info: (message: string, details?: Record<string, any>) => MessageTypeReturn;
  success: (message: string, details?: Record<string, any>) => MessageTypeReturn;
  sendTelegram: (message: string) => void;
}

export class ProdLogger implements Logger {
  private serviceName: string;
  private telegramService: TelegramService;

	constructor(config: { serviceName: string }, deps: { telegramService: TelegramService }) {
    this.serviceName = config.serviceName;
    this.telegramService = deps.telegramService;
	}

  error(message: string, details?: Record<string, any>): MessageTypeReturn {
    const builtMessage = this.buildMessage('🚨', message);
    console.error({ message: builtMessage, details: JSON.stringify(details) });

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

  info(message: string, details?: Record<string, any>): MessageTypeReturn {
    const builtMessage = this.buildMessage('💡', message);
    console.log({ message: builtMessage, details: JSON.stringify(details) });

    return {
      sendTelegram: () => this.sendTelegram(builtMessage),
    };
  }

  success(message: string, details?: Record<string, any>): MessageTypeReturn {
    const builtMessage = this.buildMessage('✅', message);
    console.info({ message: builtMessage, details: JSON.stringify(details) });

    return {
      sendTelegram: () => this.sendTelegram(builtMessage),
    };
  }
}

export default ProdLogger;
