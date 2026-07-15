export type ShipmentStatus =
  | 'order_received'
  | 'processing'
  | 'dispatched'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'delayed'
  | 'delivery_failed'
  | 'cancelled';

// Valid forward transitions (key = current, value = allowed next statuses)
export const VALID_TRANSITIONS: Record<ShipmentStatus, ShipmentStatus[]> = {
  order_received: ['processing', 'cancelled'],
  processing: ['dispatched', 'cancelled'],
  dispatched: ['in_transit', 'cancelled'],
  in_transit: ['out_for_delivery', 'delayed', 'cancelled'],
  out_for_delivery: ['delivered', 'delivery_failed', 'delayed'],
  delivered: [], // terminal
  delayed: ['in_transit', 'out_for_delivery', 'cancelled'],
  delivery_failed: ['out_for_delivery', 'cancelled'],
  cancelled: [], // terminal
};

export function canTransition(
  from: ShipmentStatus,
  to: ShipmentStatus,
): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}

export function getNextValidStatuses(
  current: ShipmentStatus,
): ShipmentStatus[] {
  return VALID_TRANSITIONS[current] ?? [];
}

export function isTerminalStatus(status: ShipmentStatus): boolean {
  return VALID_TRANSITIONS[status].length === 0;
}

export function isExceptionalStatus(status: ShipmentStatus): boolean {
  return ['delayed', 'delivery_failed', 'cancelled'].includes(status);
}
