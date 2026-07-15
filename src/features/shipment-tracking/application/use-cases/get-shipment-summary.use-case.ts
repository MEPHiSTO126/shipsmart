import { ShipmentSummaryRepository } from '@/features/shipment-tracking/domain/repositories/shipment-summary-repository';
import { GetShipmentSummaryUseCase } from '@/interfaces';

export function createGetShipmentSummaryUseCase(
  repository: ShipmentSummaryRepository,
): GetShipmentSummaryUseCase {
  return {
    execute: () => repository.getSummary(),
  };
}

let getShipmentSummaryUseCaseInstance: GetShipmentSummaryUseCase | null = null;

export function getShipmentSummaryUseCase(): GetShipmentSummaryUseCase {
  if (!getShipmentSummaryUseCaseInstance) {
    throw new Error(
      'GetShipmentSummaryUseCase not initialized. Call initializeUseCases() first.',
    );
  }
  return getShipmentSummaryUseCaseInstance;
}

export function setGetShipmentSummaryUseCase(
  useCase: GetShipmentSummaryUseCase,
): void {
  getShipmentSummaryUseCaseInstance = useCase;
}
