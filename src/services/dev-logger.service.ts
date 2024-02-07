import type { ILogger } from './logger.service';
import TelegramService from './telegram.service';

export class DevLogger implements ILogger {
  private serviceName: string;

	constructor(config: { serviceName: string }, _deps: { telegramService: TelegramService }) {
    this.serviceName = config.serviceName;
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
    console.info(builtMessage);

    return {
      sendTelegram: () => {},
    };
  }

  success(message: string) {
    const builtMessage = this.buildMessage('✅', message);
    console.log(builtMessage);

    return {
      sendTelegram: () => {},
    };
  }

  private buildMessage(emoji: string, message: string): string {
    return `[${this.serviceName}] ${emoji} ${message}`;
  }

  async sendTelegram(_message: string): Promise<void> {
    // Nothing should be done here.
  }
}

export default DevLogger;
