export enum ShipmentStatus {
  ORDER_RECEIVED = 'order_received',
  PROCESSING = 'processing',
  DISPATCHED = 'dispatched',
  IN_TRANSIT = 'in_transit',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  DELAYED = 'delayed',
  DELIVERY_FAILED = 'delivery_failed',
  CANCELLED = 'cancelled',
}

export const SHIPMENT_STATUS_LABELS: Record<ShipmentStatus, string> = {
  [ShipmentStatus.ORDER_RECEIVED]: 'Order Received',
  [ShipmentStatus.PROCESSING]: 'Processing',
  [ShipmentStatus.DISPATCHED]: 'Dispatched',
  [ShipmentStatus.IN_TRANSIT]: 'In Transit',
  [ShipmentStatus.OUT_FOR_DELIVERY]: 'Out for Delivery',
  [ShipmentStatus.DELIVERED]: 'Delivered',
  [ShipmentStatus.DELAYED]: 'Delayed',
  [ShipmentStatus.DELIVERY_FAILED]: 'Delivery Failed',
  [ShipmentStatus.CANCELLED]: 'Cancelled',
};

export const VALID_STATUS_TRANSITIONS: Record<
  ShipmentStatus,
  ShipmentStatus[]
> = {
  [ShipmentStatus.ORDER_RECEIVED]: [
    ShipmentStatus.PROCESSING,
    ShipmentStatus.CANCELLED,
  ],
  [ShipmentStatus.PROCESSING]: [
    ShipmentStatus.DISPATCHED,
    ShipmentStatus.DELAYED,
    ShipmentStatus.CANCELLED,
  ],
  [ShipmentStatus.DISPATCHED]: [
    ShipmentStatus.IN_TRANSIT,
    ShipmentStatus.DELAYED,
    ShipmentStatus.CANCELLED,
  ],
  [ShipmentStatus.IN_TRANSIT]: [
    ShipmentStatus.OUT_FOR_DELIVERY,
    ShipmentStatus.DELAYED,
    ShipmentStatus.CANCELLED,
  ],
  [ShipmentStatus.OUT_FOR_DELIVERY]: [
    ShipmentStatus.DELIVERED,
    ShipmentStatus.DELIVERY_FAILED,
    ShipmentStatus.DELAYED,
    ShipmentStatus.CANCELLED,
  ],
  [ShipmentStatus.DELIVERED]: [],
  [ShipmentStatus.DELAYED]: [
    ShipmentStatus.PROCESSING,
    ShipmentStatus.DISPATCHED,
    ShipmentStatus.IN_TRANSIT,
    ShipmentStatus.OUT_FOR_DELIVERY,
    ShipmentStatus.DELIVERED,
    ShipmentStatus.DELIVERY_FAILED,
    ShipmentStatus.CANCELLED,
  ],
  [ShipmentStatus.DELIVERY_FAILED]: [
    ShipmentStatus.OUT_FOR_DELIVERY,
    ShipmentStatus.DELIVERED,
    ShipmentStatus.CANCELLED,
  ],
  [ShipmentStatus.CANCELLED]: [],
};
