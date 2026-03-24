const MAX_RESPONSE_BYTES = 5 * 1024 * 1024; // 5 MB

export interface PlaneClientConfig {
  baseUrl: string;
  workspaceSlug: string;
  apiKey: string;
}

export class PlaneClient {
  private baseUrl: string;
  private workspaceSlug: string;
  private apiKey: string;

  constructor(config: PlaneClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/+$/, '');
    this.workspaceSlug = config.workspaceSlug;
    this.apiKey = config.apiKey;
  }

  workspacePath(subpath: string): string {
    return `/api/v1/workspaces/${this.workspaceSlug}/${subpath.replace(/^\//, '')}`;
  }

  private stripNulls(obj: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== null && value !== undefined) {
        result[key] = value;
      }
    }
    return result;
  }

  async request(
    method: string,
    path: string,
    body?: Record<string, unknown>,
    queryParams?: Record<string, string>,
  ): Promise<unknown> {
    let url = `${this.baseUrl}${path}`;
    if (queryParams) {
      const filtered = Object.entries(queryParams).filter(
        ([, v]) => v !== undefined && v !== null && v !== '',
      );
      if (filtered.length > 0) {
        url += '?' + new URLSearchParams(filtered).toString();
      }
    }

    const headers: Record<string, string> = {
      'x-api-key': this.apiKey,
      Accept: 'application/json',
    };

    const options: RequestInit = { method, headers };

    if (
      body &&
      (method === 'POST' || method === 'PATCH' || method === 'PUT' || method === 'DELETE')
    ) {
      const cleaned = this.stripNulls(body);
      headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(cleaned);
    }

    const response = await fetch(url, options);

    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_RESPONSE_BYTES) {
      throw new Error(`Response too large (${contentLength} bytes)`);
    }

    const text = await response.text();

    if (text.length > MAX_RESPONSE_BYTES) {
      throw new Error(`Response too large (${text.length} bytes)`);
    }

    if (!response.ok) {
      process.stderr.write(`Plane API error ${response.status}: ${text.slice(0, 500)}\n`);
      throw new Error(`Plane API error ${response.status}`);
    }

    if (!text || text.trim() === '') {
      return { success: true };
    }

    try {
      return JSON.parse(text);
    } catch {
      return { text };
    }
  }

  async get(path: string, queryParams?: Record<string, string>): Promise<unknown> {
    return this.request('GET', path, undefined, queryParams);
  }

  async post(path: string, body: Record<string, unknown>): Promise<unknown> {
    return this.request('POST', path, body);
  }

  async patch(path: string, body: Record<string, unknown>): Promise<unknown> {
    return this.request('PATCH', path, body);
  }

  async delete(path: string): Promise<unknown> {
    return this.request('DELETE', path);
  }

  getWorkspaceSlug(): string {
    return this.workspaceSlug;
  }
}
