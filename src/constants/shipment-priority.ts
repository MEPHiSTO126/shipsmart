export enum ShipmentPriority {
  STANDARD = 'standard',
  PRIORITY = 'priority',
  EXPRESS = 'express',
}

export const SHIPMENT_PRIORITY_LABELS: Record<ShipmentPriority, string> = {
  [ShipmentPriority.STANDARD]: 'Standard',
  [ShipmentPriority.PRIORITY]: 'Priority',
  [ShipmentPriority.EXPRESS]: 'Express',
};

export const SHIPMENT_PRIORITY_WEIGHTS: Record<ShipmentPriority, number> = {
  [ShipmentPriority.STANDARD]: 1,
  [ShipmentPriority.PRIORITY]: 2,
  [ShipmentPriority.EXPRESS]: 3,
};
