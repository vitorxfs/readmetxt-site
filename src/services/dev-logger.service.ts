import { ILogger } from './logger.service';
import TelegramService from './telegram.service';

export class DevLogger implements ILogger {
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
      sendTelegram: () => {},
    };
  }

  info(message: string) {
    const builtMessage = this.buildMessage('💡', message);

    return {
      sendTelegram: () => {},
    };
  }

  success(message: string) {
    const builtMessage = this.buildMessage('✅', message);

    return {
      sendTelegram: () => {},
    };
  }

  private buildMessage(emoji: string, message: string): string {
    return `[${this.serviceName}] ${emoji} ${message}`;
  }

  async sendTelegram(message: string): Promise<void> {
    // Nothing should be done here.
  }
}

export default DevLogger;
