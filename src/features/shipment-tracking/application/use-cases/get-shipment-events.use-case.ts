import { ShipmentRepository } from '@/features/shipment-tracking/domain/repositories/shipment-repository';
import { GetShipmentEventsUseCase } from '@/interfaces';

export function createGetShipmentEventsUseCase(
  repository: ShipmentRepository,
): GetShipmentEventsUseCase {
  return {
    execute: (trackingNumber) => repository.findEvents(trackingNumber),
  };
}

let getShipmentEventsUseCaseInstance: GetShipmentEventsUseCase | null = null;

export function getShipmentEventsUseCase(): GetShipmentEventsUseCase {
  if (!getShipmentEventsUseCaseInstance) {
    throw new Error(
      'GetShipmentEventsUseCase not initialized. Call initializeUseCases() first.',
    );
  }
  return getShipmentEventsUseCaseInstance;
}

export function setGetShipmentEventsUseCase(
  useCase: GetShipmentEventsUseCase,
): void {
  getShipmentEventsUseCaseInstance = useCase;
}
