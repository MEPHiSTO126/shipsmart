import { useQuery } from '@tanstack/react-query';
import {
  getShipmentsUseCase,
  getShipmentSummaryUseCase,
} from '@/features/shipment-tracking/application/use-cases';
import { initializeUseCases } from '@/features/shipment-tracking/application/use-cases/initialize';
import {
  ShipmentFilters,
  ShipmentSort,
} from '@/features/shipment-tracking/domain/repositories/shipment-repository';
import { Shipment } from '@/features/shipment-tracking/domain';
import { ShipmentSummary } from '@/features/shipment-tracking/domain/repositories/shipment-summary-repository';

// Initialize use cases on first import
initializeUseCases();

const SHIPMENTS_QUERY_KEY = ['shipments'];
const SUMMARY_QUERY_KEY = ['shipments', 'summary'];

export function useShipments(filters?: ShipmentFilters, sort?: ShipmentSort) {
  return useQuery<Shipment[], Error>({
    queryKey: [...SHIPMENTS_QUERY_KEY, { filters, sort }],
    queryFn: () => getShipmentsUseCase().execute(filters, sort),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

export function useShipmentSummary() {
  return useQuery<ShipmentSummary, Error>({
    queryKey: SUMMARY_QUERY_KEY,
    queryFn: () => getShipmentSummaryUseCase().execute(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
