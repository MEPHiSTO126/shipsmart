import { ShipmentRepository } from '@/features/shipment-tracking/domain/repositories/shipment-repository';
import { GetShipmentsUseCase } from '@/interfaces';

export function createGetShipmentsUseCase(
  repository: ShipmentRepository,
): GetShipmentsUseCase {
  return {
    execute: (filters, sort) => repository.findAll(filters, sort),
  };
}

let getShipmentsUseCaseInstance: GetShipmentsUseCase | null = null;

export function getShipmentsUseCase(): GetShipmentsUseCase {
  if (!getShipmentsUseCaseInstance) {
    throw new Error(
      'GetShipmentsUseCase not initialized. Call initializeUseCases() first.',
    );
  }
  return getShipmentsUseCaseInstance;
}

export function setGetShipmentsUseCase(useCase: GetShipmentsUseCase): void {
  getShipmentsUseCaseInstance = useCase;
}
