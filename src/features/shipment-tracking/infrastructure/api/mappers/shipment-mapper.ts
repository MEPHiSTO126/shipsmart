import { ShipmentApi, TimelineEventApi } from '../schemas/shipment-schema';
import { Shipment } from '@/features/shipment-tracking/domain/entities/shipment';
import { TimelineEvent } from '@/features/shipment-tracking/domain/entities/timeline-event';
import { Courier } from '@/features/shipment-tracking/domain/entities/courier';
import { ShipmentStatus } from '@/features/shipment-tracking/domain/value-objects/status-transition';
import { TrackingNumber } from '@/features/shipment-tracking/domain/value-objects/tracking-number';

export function mapCourier(api: ShipmentApi['courier']): Courier {
  return { id: api.id, name: api.name };
}

export function mapTimelineEvent(api: TimelineEventApi): TimelineEvent {
  return {
    id: api.id,
    status: api.status as ShipmentStatus,
    description: api.description,
    timestamp: new Date(api.timestamp),
    location: api.location,
  };
}

export function mapShipment(api: ShipmentApi): Shipment {
  return {
    id: api.id,
    trackingNumber: api.trackingNumber as TrackingNumber,
    customerName: api.customerName,
    origin: api.origin,
    destination: api.destination,
    status: api.status as ShipmentStatus,
    priority: api.priority,
    estimatedDelivery: new Date(api.estimatedDelivery),
    courier: mapCourier(api.courier),
    lastUpdated: new Date(api.lastUpdated),
    events: [],
  };
}

export function mapShipments(api: ShipmentApi[]): Shipment[] {
  return api.map(mapShipment);
}

export function mapTimelineEvents(api: TimelineEventApi[]): TimelineEvent[] {
  return api
    .map(mapTimelineEvent)
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

export function enrichShipmentWithEvents(
  shipment: Shipment,
  events: TimelineEvent[],
): Shipment {
  return {
    ...shipment,
    events: Object.freeze([...events]),
  };
}
