import { Shipment } from '@/features/shipment-tracking/domain/entities/shipment';
import { TrackingNumber } from '@/features/shipment-tracking/domain/value-objects/tracking-number';
import { ShipmentRepository } from '@/features/shipment-tracking/domain/repositories/shipment-repository';

export interface GetShipmentUseCase {
  execute(trackingNumber: TrackingNumber): Promise<Shipment | null>;
}

export function createGetShipmentUseCase(
  repository: ShipmentRepository,
): GetShipmentUseCase {
  return {
    execute: (trackingNumber) =>
      repository.findByTrackingNumber(trackingNumber),
  };
}

let getShipmentUseCaseInstance: GetShipmentUseCase | null = null;

export function getShipmentUseCase(): GetShipmentUseCase {
  if (!getShipmentUseCaseInstance) {
    throw new Error(
      'GetShipmentUseCase not initialized. Call initializeUseCases() first.',
    );
  }
  return getShipmentUseCaseInstance;
}

export function setGetShipmentUseCase(useCase: GetShipmentUseCase): void {
  getShipmentUseCaseInstance = useCase;
}
