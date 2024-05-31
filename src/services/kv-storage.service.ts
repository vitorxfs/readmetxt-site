import type { StorageService } from './storage.service';

class KVStorage implements StorageService {
  private token: string;
  private accountId: string;
  private namespaceId: string;

  constructor(options: {
    token: string;
    accountId: string;
    namespaceId: string;
  }) {
    this.token = options.token;
    this.accountId = options.accountId;
    this.namespaceId = options.namespaceId;
  }

  async fetch(key: string): Promise<unknown> {
    const a = await this.makeRequest('GET', key);

    if (a && typeof a === 'object' && 'value' in a) {
      return a.value;
    }

    return [];
  }

  async write(key: string, data: Record<string, any>): Promise<void> {
    await this.makeRequest('PUT', key, data);
  }

  async delete(key: string): Promise<void> {
    await this.makeRequest('DELETE', key);

    return;
  }

  private async makeRequest(method: 'GET' | 'PUT' | 'DELETE', key: string, data?: Record<string, any>): Promise<unknown> {
    const options = {
      method,
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer '+this.token},
      body: !!data ? JSON.stringify({
        metadata: {},
        value: data,
      }) : undefined,
    };

    const res = await fetch(
      this.buildUrl(key),
      options,
    );

    return (await res.json());
  }

  private buildUrl(key: string): string {
    return `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/storage/kv/namespaces/${this.namespaceId}/values/${key}`
  }
}

export default KVStorage;
