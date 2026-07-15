import { ShipmentRepositoryImpl } from '@/features/shipment-tracking/infrastructure/repositories/shipment-repository-impl';
import {
  getShipmentsUseCase,
  setGetShipmentsUseCase,
  createGetShipmentsUseCase,
} from './get-shipments.use-case';
import {
  getShipmentUseCase,
  setGetShipmentUseCase,
  createGetShipmentUseCase,
} from './get-shipment.use-case';
import {
  getShipmentEventsUseCase,
  setGetShipmentEventsUseCase,
  createGetShipmentEventsUseCase,
} from './get-shipment-events.use-case';
import {
  getShipmentSummaryUseCase,
  setGetShipmentSummaryUseCase,
  createGetShipmentSummaryUseCase,
} from './get-shipment-summary.use-case';
import {
  advanceShipmentStatusUseCase,
  setAdvanceShipmentStatusUseCase,
  createAdvanceShipmentStatusUseCase,
} from './advance-shipment-status.use-case';

let initialized = false;

export function initializeUseCases(): void {
  if (initialized) return;

  const repository = new ShipmentRepositoryImpl();

  setGetShipmentsUseCase(createGetShipmentsUseCase(repository));
  setGetShipmentUseCase(createGetShipmentUseCase(repository));
  setGetShipmentEventsUseCase(createGetShipmentEventsUseCase(repository));
  setGetShipmentSummaryUseCase(createGetShipmentSummaryUseCase(repository));
  setAdvanceShipmentStatusUseCase(
    createAdvanceShipmentStatusUseCase(repository),
  );

  initialized = true;
}

export function getUseCases() {
  if (!initialized) {
    initializeUseCases();
  }
  return {
    getShipments: getShipmentsUseCase(),
    getShipment: getShipmentUseCase(),
    getShipmentEvents: getShipmentEventsUseCase(),
    getShipmentSummary: getShipmentSummaryUseCase(),
    advanceShipmentStatus: advanceShipmentStatusUseCase(),
  };
}
