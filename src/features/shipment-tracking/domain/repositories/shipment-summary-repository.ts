import { ShipmentStatus } from '../value-objects/status-transition';

export interface ShipmentSummary {
  total: number;
  byStatus: Record<ShipmentStatus, number>;
  inTransit: number;
  delayed: number;
  outForDelivery: number;
  delivered: number;
}

export interface ShipmentSummaryRepository {
  getSummary(): Promise<ShipmentSummary>;
}
