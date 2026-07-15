import { httpClient, HttpError } from '@/lib/api/http-client';
import {
  mapShipment,
  mapShipments,
  mapTimelineEvent,
} from '../api/mappers/shipment-mapper';
import {
  validateShipment,
  validateShipments,
  validateShipmentSummary,
  validateTimelineEvents,
  validateStatusUpdateRequest,
  validateStatusUpdateResponse,
} from '../api/schemas/shipment-schema';
import { buildShipmentsUrl } from '../api/endpoints';
import { ShipmentRepository } from '@/features/shipment-tracking/domain/repositories/shipment-repository';
import { ShipmentSummaryRepository } from '@/features/shipment-tracking/domain/repositories/shipment-summary-repository';
import {
  Shipment,
  TrackingNumber,
  ShipmentStatus,
  ShipmentSummary,
} from '@/features/shipment-tracking/domain';
import {
  ShipmentFilters,
  ShipmentSort,
} from '@/features/shipment-tracking/domain/repositories/shipment-repository';
import { RepositoryError } from '@/features/shipment-tracking/domain/errors/domain-errors';

export class ShipmentRepositoryImpl
  implements ShipmentRepository, ShipmentSummaryRepository
{
  async findAll(
    filters?: ShipmentFilters,
    sort?: ShipmentSort,
  ): Promise<Shipment[]> {
    try {
      const url = buildShipmentsUrl(filters, sort);
      const rawData = await httpClient<unknown>(url);
      const validated = validateShipments(rawData);
      return mapShipments(validated);
    } catch (error) {
      if (error instanceof HttpError && error.status === 404) {
        return [];
      }
      throw new RepositoryError('Failed to fetch shipments', error as Error);
    }
  }

  async findByTrackingNumber(
    trackingNumber: TrackingNumber,
  ): Promise<Shipment | null> {
    try {
      const rawData = await httpClient<unknown>(
        `/api/shipments/${trackingNumber}`,
      );
      const validated = validateShipment(rawData);
      return mapShipment(validated);
    } catch (error) {
      if (error instanceof HttpError && error.status === 404) {
        return null;
      }
      throw new RepositoryError('Failed to fetch shipment', error as Error);
    }
  }

  async findEvents(
    trackingNumber: TrackingNumber,
  ): Promise<Shipment['events']> {
    try {
      const rawData = await httpClient<unknown>(
        `/api/shipments/${trackingNumber}/events`,
      );
      const validated = validateTimelineEvents(rawData);
      return validated.map(mapTimelineEvent);
    } catch (error) {
      if (error instanceof HttpError && error.status === 404) {
        return [];
      }
      throw new RepositoryError(
        'Failed to fetch shipment events',
        error as Error,
      );
    }
  }

  async advanceStatus(
    trackingNumber: TrackingNumber,
    newStatus: ShipmentStatus,
  ): Promise<Shipment> {
    try {
      validateStatusUpdateRequest({ status: newStatus });
      const rawData = await httpClient<unknown>(
        `/api/shipments/${trackingNumber}/status`,
        {
          method: 'PATCH',
          body: JSON.stringify({ status: newStatus }),
        },
      );
      const validated = validateStatusUpdateResponse(rawData);
      return mapShipment(validated);
    } catch (error) {
      throw new RepositoryError(
        'Failed to update shipment status',
        error as Error,
      );
    }
  }

  async getSummary(): Promise<ShipmentSummary> {
    try {
      const rawData = await httpClient<unknown>(`/api/shipments/summary`);
      const validated = validateShipmentSummary(rawData);
      return {
        total: validated.totalShipments,
        inTransit: validated.inTransitCount,
        delayed: validated.delayedCount,
        outForDelivery: validated.outForDeliveryCount,
        delivered: validated.deliveredCount,
        byStatus: {} as Record<ShipmentStatus, number>,
      };
    } catch (error) {
      throw new RepositoryError(
        'Failed to fetch shipment summary',
        error as Error,
      );
    }
  }
}
