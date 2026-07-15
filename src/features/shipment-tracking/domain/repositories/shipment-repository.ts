import { Shipment } from '../entities/shipment';
import { TrackingNumber } from '../value-objects/tracking-number';
import { ShipmentStatus } from '../value-objects/status-transition';
import { ShipmentSummary } from '../repositories/shipment-summary-repository';
import { ShipmentPriority } from '@/constants/shipment-priority';

export interface ShipmentFilters {
  search?: string;
  status?: ShipmentStatus;
  priority?: ShipmentPriority;
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

  /** Get timeline events for a shipment */
  findEvents(trackingNumber: TrackingNumber): Promise<Shipment['events']>;

  /** Advance shipment status — returns updated shipment */
  advanceStatus(
    trackingNumber: TrackingNumber,
    newStatus: ShipmentStatus,
  ): Promise<Shipment>;

  /** Get summary statistics */
  getSummary(): Promise<ShipmentSummary>;
}
