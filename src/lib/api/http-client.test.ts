import { httpClient, HttpError } from './http-client';

describe('httpClient', () => {
  it('should successfully make a request and return parsed JSON data', async () => {
    const data = await httpClient<unknown[]>('/api/shipments');
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty('trackingNumber', 'SLT-204891');
  });

  it('should throw an HttpError on non-ok status codes', async () => {
    try {
      await httpClient('/api/shipments/SLT-INVALID');
      fail('Should have thrown an HttpError');
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(HttpError);
      expect((error as HttpError).status).toBe(404);
    }
  });
});
