import { Shipment } from '@/features/shipment-tracking/domain/entities/shipment';
import { TimelineEvent } from '@/features/shipment-tracking/domain/entities/timeline-event';
import { TrackingNumber } from '@/features/shipment-tracking/domain/value-objects/tracking-number';
import { ShipmentStatus } from '@/features/shipment-tracking/domain/value-objects/status-transition';
import { ShipmentSummary } from '@/features/shipment-tracking/domain/repositories/shipment-summary-repository';
import {
  ShipmentFilters,
  ShipmentSort,
} from '@/features/shipment-tracking/domain/repositories/shipment-repository';

export interface GetShipmentsUseCase {
  execute(filters?: ShipmentFilters, sort?: ShipmentSort): Promise<Shipment[]>;
}

export interface GetShipmentUseCase {
  execute(trackingNumber: TrackingNumber): Promise<Shipment | null>;
}

export interface GetShipmentEventsUseCase {
  execute(trackingNumber: TrackingNumber): Promise<readonly TimelineEvent[]>;
}

export interface GetShipmentSummaryUseCase {
  execute(): Promise<ShipmentSummary>;
}

export interface AdvanceShipmentStatusUseCase {
  execute(
    trackingNumber: TrackingNumber,
    newStatus: ShipmentStatus,
  ): Promise<Shipment>;
}
