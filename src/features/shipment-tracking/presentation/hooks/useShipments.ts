import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getShipmentsUseCase,
  getShipmentSummaryUseCase,
  getShipmentUseCase,
  getShipmentEventsUseCase,
  advanceShipmentStatusUseCase,
} from '@/features/shipment-tracking/application/use-cases';
import { initializeUseCases } from '@/features/shipment-tracking/application/use-cases/initialize';
import {
  ShipmentFilters,
  ShipmentSort,
} from '@/features/shipment-tracking/domain/repositories/shipment-repository';
import { Shipment } from '@/features/shipment-tracking/domain';
import { ShipmentSummary } from '@/features/shipment-tracking/domain/repositories/shipment-summary-repository';
import { TrackingNumber } from '@/features/shipment-tracking/domain/value-objects/tracking-number';
import { ShipmentStatus } from '@/features/shipment-tracking/domain/value-objects/status-transition';
import { TimelineEvent } from '@/features/shipment-tracking/domain/entities/timeline-event';
import { QUERY_KEYS } from '@/features/shipment-tracking/infrastructure/api/query-keys';

type MutableTimelineEvent = Omit<TimelineEvent, 'timestamp'> & { timestamp: Date };

function toMutableEvents(events: readonly TimelineEvent[]): MutableTimelineEvent[] {
  return events.map(e => ({ ...e, timestamp: e.timestamp }));
}

// Initialize use cases on first import
initializeUseCases();

export function useShipments(filters?: ShipmentFilters, sort?: ShipmentSort) {
  return useQuery<Shipment[], Error>({
    queryKey: QUERY_KEYS.shipments.list(filters, sort),
    queryFn: () => getShipmentsUseCase().execute(filters, sort),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useShipment(trackingNumber: TrackingNumber | string) {
  return useQuery<Shipment | null, Error>({
    queryKey: QUERY_KEYS.shipments.detail(trackingNumber),
    queryFn: () => getShipmentUseCase().execute(trackingNumber as TrackingNumber),
    enabled: !!trackingNumber,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useShipmentEvents(trackingNumber: TrackingNumber | string) {
  return useQuery<MutableTimelineEvent[], Error>({
    queryKey: QUERY_KEYS.shipments.events(trackingNumber),
    queryFn: async () => toMutableEvents(await getShipmentEventsUseCase().execute(trackingNumber as TrackingNumber)),
    enabled: !!trackingNumber,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useShipmentSummary() {
  return useQuery<ShipmentSummary, Error>({
    queryKey: QUERY_KEYS.shipments.summary(),
    queryFn: () => getShipmentSummaryUseCase().execute(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useAdvanceShipmentStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: QUERY_KEYS.mutation.advanceStatus(''),
    mutationFn: ({ trackingNumber, newStatus }: { trackingNumber: TrackingNumber; newStatus: ShipmentStatus }) => 
      advanceShipmentStatusUseCase().execute(trackingNumber, newStatus),
    onMutate: async ({ trackingNumber, newStatus }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.shipments.detail(trackingNumber) });
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.shipments.list() });
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.shipments.summary() });

      const previousShipment = queryClient.getQueryData<Shipment>(QUERY_KEYS.shipments.detail(trackingNumber));
      const previousList = queryClient.getQueryData<Shipment[]>(QUERY_KEYS.shipments.list());
      const previousSummary = queryClient.getQueryData<ShipmentSummary>(QUERY_KEYS.shipments.summary());

      if (previousShipment) {
        queryClient.setQueryData<Shipment>(QUERY_KEYS.shipments.detail(trackingNumber), {
          ...previousShipment,
          status: newStatus,
          lastUpdated: new Date(),
        });
      }

      if (previousList) {
        queryClient.setQueryData<Shipment[]>(QUERY_KEYS.shipments.list(), 
          previousList.map(s => s.trackingNumber === trackingNumber ? { ...s, status: newStatus, lastUpdated: new Date() } : s)
        );
      }

      return { previousShipment, previousList, previousSummary };
    },
    onError: (err, { trackingNumber }, context) => {
      if (context?.previousShipment) {
        queryClient.setQueryData(QUERY_KEYS.shipments.detail(trackingNumber), context.previousShipment);
      }
      if (context?.previousList) {
        queryClient.setQueryData(QUERY_KEYS.shipments.list(), context.previousList);
      }
      if (context?.previousSummary) {
        queryClient.setQueryData(QUERY_KEYS.shipments.summary(), context.previousSummary);
      }
    },
    onSettled: (_data, _err, { trackingNumber }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.shipments.detail(trackingNumber) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.shipments.list() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.shipments.summary() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.shipments.events(trackingNumber) });
    },
  });
}