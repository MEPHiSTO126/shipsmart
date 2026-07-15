import { Shipment } from '@/features/shipment-tracking/domain/entities/shipment';
import {
  ShipmentFilters,
  ShipmentSort,
} from '@/features/shipment-tracking/domain/repositories/shipment-repository';
import { ShipmentRepository } from '@/features/shipment-tracking/domain/repositories/shipment-repository';

export interface GetShipmentsUseCase {
  execute(filters?: ShipmentFilters, sort?: ShipmentSort): Promise<Shipment[]>;
}

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
