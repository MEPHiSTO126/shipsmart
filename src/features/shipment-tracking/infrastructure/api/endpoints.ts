const API_BASE = '/api';

export const ENDPOINTS = {
  shipments: {
    list: `${API_BASE}/shipments`,
    detail: (trackingNumber: string) =>
      `${API_BASE}/shipments/${trackingNumber}`,
    events: (trackingNumber: string) =>
      `${API_BASE}/shipments/${trackingNumber}/events`,
    status: (trackingNumber: string) =>
      `${API_BASE}/shipments/${trackingNumber}/status`,
    summary: `${API_BASE}/shipments/summary`,
  },
} as const;

export function buildQueryString(
  params: Record<string, string | number | boolean | undefined>,
): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

export function buildShipmentsUrl(
  filters?: {
    search?: string;
    status?: string;
    priority?: string;
    destination?: string;
  },
  sort?: { field: string; order: string },
): string {
  const params: Record<string, string | number | boolean | undefined> = {
    search: filters?.search,
    status: filters?.status,
    priority: filters?.priority,
    destination: filters?.destination,
    sort: sort?.field,
    order: sort?.order,
  };
  return `${ENDPOINTS.shipments.list}${buildQueryString(params)}`;
}
