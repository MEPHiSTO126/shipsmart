import { ShipmentPriority } from '@/constants/shipment-priority';
import { ShipmentStatus } from '@/constants/shipment-status';

export interface Courier {
  id: string;
  name: string;
}

export interface TimelineEvent {
  id: string;
  status: ShipmentStatus;
  description: string;
  timestamp: Date;
  location: string;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  customerName: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  priority: ShipmentPriority;
  estimatedDelivery: Date;
  courier: Courier;
  lastUpdated: Date;
}

export interface ShipmentSummary {
  totalShipments: number;
  inTransitCount: number;
  delayedCount: number;
  outForDeliveryCount: number;
  deliveredCount: number;
}
