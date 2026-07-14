export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export class TimeoutError extends Error {
  constructor(message = 'Request timeout') {
    super(message);
    this.name = 'TimeoutError';
  }
}

export async function httpClient<T>(
  endpoint: string,
  options: RequestInit & { timeout?: number } = {},
): Promise<T> {
  const { timeout = 10000, ...customConfig } = options;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url =
    endpoint.startsWith('http://') || endpoint.startsWith('https://')
      ? endpoint
      : `${cleanBase}${cleanEndpoint}`;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const headers = {
    'Content-Type': 'application/json',
    ...customConfig.headers,
  };

  const config: RequestInit = {
    ...customConfig,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(id);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = null;
      }
      throw new HttpError(
        response.status,
        response.statusText || 'Request failed',
        errorData,
      );
    }

    if (response.status === 204) {
      return {} as T;
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    clearTimeout(id);
    const err = error as Error;
    if (err.name === 'AbortError') {
      throw new TimeoutError();
    }
    if (error instanceof HttpError) {
      throw error;
    }
    throw new Error(err.message || 'Network error');
  }
}
