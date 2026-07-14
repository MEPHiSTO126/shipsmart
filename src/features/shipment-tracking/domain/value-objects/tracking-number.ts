export type TrackingNumber = string & { readonly _brand: unique symbol };

export function createTrackingNumber(value: string): TrackingNumber {
  if (!value || !value.trim()) {
    throw new Error('Tracking number cannot be empty');
  }
  return value.trim() as TrackingNumber;
}

export function isTrackingNumber(value: string): value is TrackingNumber {
  return value.startsWith('SLT-');
}
