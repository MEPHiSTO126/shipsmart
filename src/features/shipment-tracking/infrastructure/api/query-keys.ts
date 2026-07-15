import { ShipmentStatus } from '../../domain/value-objects/status-transition';
import { ShipmentPriority } from '@/constants/shipment-priority';

export const QUERY_KEYS = {
  shipments: {
    all: ['shipments'] as const,
    list: (
      filters?: {
        search?: string;
        status?: ShipmentStatus;
        priority?: ShipmentPriority;
        destination?: string;
      },
      sort?: {
        field: 'estimatedDelivery' | 'lastUpdated';
        order: 'asc' | 'desc';
      },
    ) => ['shipments', 'list', filters, sort] as const,
    detail: (trackingNumber: string) =>
      ['shipments', 'detail', trackingNumber] as const,
    events: (trackingNumber: string) =>
      ['shipments', 'events', trackingNumber] as const,
    summary: () => ['shipments', 'summary'] as const,
  },
  mutation: {
    advanceStatus: (trackingNumber: string) =>
      ['shipments', 'advance', trackingNumber] as const,
  },
} as const;

export type QueryKeys = typeof QUERY_KEYS;
