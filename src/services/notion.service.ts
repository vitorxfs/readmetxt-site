import { buildUrl } from '../helpers/url';

export class NotionService {
	private token: string;
	private host: string;

	constructor(deps: { token: string, host: string}) {
		this.token = deps.token;
		this.host = deps.host;
	}

	async getDatabase(id: string, body?: Record<string, any>): Promise<unknown> {
		const path = `v1/databases/${id}/query`;
		const url = buildUrl(this.host, path);
		const headers = this.buildHeaders(this.token);

		const res = await fetch(url, {
      method: 'POST',
			headers,
      body: JSON.stringify(body),
		});

    return res.json();
	}

	private buildHeaders(token: string) {
		return {
			'Authorization': `Bearer ${token}`,
			'Notion-Version': '2022-06-28',
			'Content-Type': 'application/json',
		}
	}
}

export default NotionService;
