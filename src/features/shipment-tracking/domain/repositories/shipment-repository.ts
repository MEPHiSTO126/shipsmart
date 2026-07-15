import { Shipment } from '../entities/shipment';
import { TrackingNumber } from '../value-objects/tracking-number';
import { ShipmentStatus } from '../value-objects/status-transition';

export interface ShipmentFilters {
  search?: string;
  status?: ShipmentStatus;
  priority?: 'standard' | 'express' | 'priority';
  destination?: string;
}

export interface ShipmentSort {
  field: 'estimatedDelivery' | 'lastUpdated';
  order: 'asc' | 'desc';
}

export interface ShipmentRepository {
  /** Get all shipments with optional filtering/sorting */
  findAll(filters?: ShipmentFilters, sort?: ShipmentSort): Promise<Shipment[]>;

  /** Get single shipment by tracking number */
  findByTrackingNumber(
    trackingNumber: TrackingNumber,
  ): Promise<Shipment | null>;

  /** Advance shipment status — returns updated shipment */
  advanceStatus(
    trackingNumber: TrackingNumber,
    newStatus: ShipmentStatus,
  ): Promise<Shipment>;
}
