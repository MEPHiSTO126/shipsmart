import { ShipmentRepository } from '@/features/shipment-tracking/domain/repositories/shipment-repository';
import { AdvanceShipmentStatusUseCase } from '@/interfaces';

export function createAdvanceShipmentStatusUseCase(
  repository: ShipmentRepository,
): AdvanceShipmentStatusUseCase {
  return {
    execute: async (trackingNumber, newStatus) => {
      const result = await repository.advanceStatus(trackingNumber, newStatus);
      return result;
    },
  };
}

let advanceShipmentStatusUseCaseInstance: AdvanceShipmentStatusUseCase | null =
  null;

export function advanceShipmentStatusUseCase(): AdvanceShipmentStatusUseCase {
  if (!advanceShipmentStatusUseCaseInstance) {
    throw new Error(
      'AdvanceShipmentStatusUseCase not initialized. Call initializeUseCases() first.',
    );
  }
  return advanceShipmentStatusUseCaseInstance;
}

export function setAdvanceShipmentStatusUseCase(
  useCase: AdvanceShipmentStatusUseCase,
): void {
  advanceShipmentStatusUseCaseInstance = useCase;
}
