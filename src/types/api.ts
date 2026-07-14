export interface CourierApiPayload {
  id: string;
  name: string;
}

export interface TimelineEventApiPayload {
  id: string;
  status: string;
  description: string;
  timestamp: string;
  location: string;
}

export interface ShipmentApiPayload {
  id: string;
  trackingNumber: string;
  customerName: string;
  origin: string;
  destination: string;
  status: string;
  priority: string;
  estimatedDelivery: string;
  courier: CourierApiPayload;
  lastUpdated: string;
}

export interface ShipmentSummaryApiPayload {
  totalShipments: number;
  inTransitCount: number;
  delayedCount: number;
  outForDeliveryCount: number;
  deliveredCount: number;
}
