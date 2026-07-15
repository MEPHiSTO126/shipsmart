export interface Courier {
  readonly id: string;
  readonly name: string;
}

export function createCourier(id: string, name: string): Courier {
  if (!id.trim()) throw new Error('Courier ID required');
  if (!name.trim()) throw new Error('Courier name required');
  return Object.freeze({ id: id.trim(), name: name.trim() });
}

export function courierEquals(a: Courier, b: Courier): boolean {
  return a.id === b.id;
}
