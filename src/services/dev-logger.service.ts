import type { Logger } from './logger.service';
import TelegramService from './telegram.service';

export class DevLogger implements Logger {
  private serviceName: string;

	constructor(config: { serviceName: string }, _deps: { telegramService: TelegramService }) {
    this.serviceName = config.serviceName;
	}

  error(message: string, details?: Record<string, any>) {
    const builtMessage = this.buildMessage('🚨', message);
    console.error({ message: builtMessage, details: JSON.stringify(details) });

    return {
      sendTelegram: () => {},
    };
  }

  info(message: string, details?: Record<string, any>) {
    const builtMessage = this.buildMessage('💡', message);
    console.info({ message: builtMessage, details: JSON.stringify(details) });

    return {
      sendTelegram: () => {},
    };
  }

  success(message: string, details?: Record<string, any>) {
    const builtMessage = this.buildMessage('✅', message);
    console.log({ message: builtMessage, details: JSON.stringify(details) });

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
