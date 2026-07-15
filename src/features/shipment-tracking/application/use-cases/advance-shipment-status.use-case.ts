import { ShipmentRepository } from '@/features/shipment-tracking/domain/repositories/shipment-repository';
import { Shipment } from '@/features/shipment-tracking/domain/entities/shipment';
import { TrackingNumber } from '@/features/shipment-tracking/domain/value-objects/tracking-number';
import { ShipmentStatus } from '@/features/shipment-tracking/domain/value-objects/status-transition';

export interface AdvanceShipmentStatusUseCase {
  execute(
    trackingNumber: TrackingNumber,
    newStatus: ShipmentStatus,
  ): Promise<Shipment>;
}

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
