import { TrackingNumber } from '../value-objects/tracking-number';
import { Courier } from './courier';
import {
  ShipmentStatus,
  canTransition,
  getNextValidStatuses,
  isTerminalStatus,
} from '../value-objects/status-transition';
import { TimelineEvent } from './timeline-event';

export interface Shipment {
  readonly id: string;
  readonly trackingNumber: TrackingNumber;
  readonly customerName: string;
  readonly origin: string;
  readonly destination: string;
  readonly status: ShipmentStatus;
  readonly priority: 'standard' | 'express' | 'priority';
  readonly estimatedDelivery: Date;
  readonly courier: Courier;
  readonly lastUpdated: Date;
  readonly events: readonly TimelineEvent[]; // Full timeline
}

export function createShipment(data: {
  id: string;
  trackingNumber: string;
  customerName: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  priority: 'standard' | 'express' | 'priority';
  estimatedDelivery: string | Date;
  courier: Courier;
  lastUpdated: string | Date;
  events?: TimelineEvent[];
}): Shipment {
  const tn = data.trackingNumber as TrackingNumber; // Assume validated upstream
  return Object.freeze({
    id: data.id,
    trackingNumber: tn,
    customerName: data.customerName.trim(),
    origin: data.origin.trim(),
    destination: data.destination.trim(),
    status: data.status,
    priority: data.priority,
    estimatedDelivery:
      data.estimatedDelivery instanceof Date
        ? data.estimatedDelivery
        : new Date(data.estimatedDelivery),
    courier: data.courier,
    lastUpdated:
      data.lastUpdated instanceof Date
        ? data.lastUpdated
        : new Date(data.lastUpdated),
    events: data.events ? Object.freeze([...data.events]) : Object.freeze([]),
  });
}

// --- Business Behavior Methods ---

export function canAdvance(shipment: Shipment): boolean {
  return !isTerminalStatus(shipment.status);
}

export function getNextStatus(shipment: Shipment): ShipmentStatus[] {
  return getNextValidStatuses(shipment.status);
}

export function isDelayed(shipment: Shipment): boolean {
  return shipment.status === 'delayed';
}

export function isHighPriority(shipment: Shipment): boolean {
  return shipment.priority === 'express' || shipment.priority === 'priority';
}

export function isOverdue(shipment: Shipment, now: Date = new Date()): boolean {
  if (['delivered', 'cancelled'].includes(shipment.status)) return false;
  return shipment.estimatedDelivery < now;
}

export function advanceStatus(
  shipment: Shipment,
  newStatus: ShipmentStatus,
): Shipment {
  if (!canTransition(shipment.status, newStatus)) {
    throw new Error(`Invalid transition: ${shipment.status} → ${newStatus}`);
  }
  const now = new Date();
  return Object.freeze({
    ...shipment,
    status: newStatus,
    lastUpdated: now,
    events: Object.freeze([
      ...shipment.events,
      {
        id: `event-${now.getTime()}`,
        status: newStatus,
        description: `Status advanced to ${newStatus.replace('_', ' ')}`,
        timestamp: now,
        location: shipment.destination,
      },
    ]),
  });
}

// --- Query Helpers ---

export function getShipmentSummary(shipment: Shipment): {
  trackingNumber: string;
  customer: string;
  route: string;
  status: ShipmentStatus;
  priority: Shipment['priority'];
  estimatedDelivery: Date;
  courier: string;
  lastUpdate: Date;
} {
  return {
    trackingNumber: shipment.trackingNumber,
    customer: shipment.customerName,
    route: `${shipment.origin} → ${shipment.destination}`,
    status: shipment.status,
    priority: shipment.priority,
    estimatedDelivery: shipment.estimatedDelivery,
    courier: shipment.courier.name,
    lastUpdate: shipment.lastUpdated,
  };
}
