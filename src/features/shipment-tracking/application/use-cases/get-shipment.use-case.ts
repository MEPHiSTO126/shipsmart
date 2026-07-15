import { ShipmentRepository } from '@/features/shipment-tracking/domain/repositories/shipment-repository';
import { GetShipmentUseCase } from '@/interfaces';

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
