import { Shipment } from '@/features/shipment-tracking/domain';
import { ShipmentStatus } from '@/features/shipment-tracking/domain/value-objects/status-transition';
import { ShipmentPriority } from '@/constants/shipment-priority';

export interface ShipmentFilters {
  search?: string;
  status?: ShipmentStatus;
  priority?: ShipmentPriority;
  destination?: string;
}

export interface ShipmentSort {
  field: 'estimatedDelivery' | 'lastUpdated';
  order: 'asc' | 'desc';
}

export function filterShipments(
  shipments: Shipment[],
  filters: ShipmentFilters,
): Shipment[] {
  return shipments.filter((shipment) => {
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const matchesTracking = shipment.trackingNumber
        .toLowerCase()
        .includes(search);
      const matchesCustomer = shipment.customerName
        .toLowerCase()
        .includes(search);
      if (!matchesTracking && !matchesCustomer) return false;
    }

    if (filters.status && shipment.status !== filters.status) return false;

    if (filters.priority && shipment.priority !== filters.priority)
      return false;

    if (
      filters.destination &&
      !shipment.destination
        .toLowerCase()
        .includes(filters.destination.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
}

export function sortShipments(
  shipments: Shipment[],
  sort: ShipmentSort,
): Shipment[] {
  return [...shipments].sort((a, b) => {
    if (sort.field === 'estimatedDelivery') {
      const diff =
        a.estimatedDelivery.getTime() - b.estimatedDelivery.getTime();
      return sort.order === 'asc' ? diff : -diff;
    }
    if (sort.field === 'lastUpdated') {
      const diff = a.lastUpdated.getTime() - b.lastUpdated.getTime();
      return sort.order === 'asc' ? diff : -diff;
    }
    return 0;
  });
}

export function applyFiltersAndSort(
  shipments: Shipment[],
  filters: ShipmentFilters,
  sort: ShipmentSort,
): Shipment[] {
  const filtered = filterShipments(shipments, filters);
  return sortShipments(filtered, sort);
}

export function getUniqueDestinations(shipments: Shipment[]): string[] {
  const destinations = new Set(shipments.map((s) => s.destination));
  return Array.from(destinations).sort();
}

export function getStatusCounts(
  shipments: Shipment[],
): Record<ShipmentStatus, number> {
  const counts: Record<string, number> = {};
  for (const shipment of shipments) {
    counts[shipment.status] = (counts[shipment.status] ?? 0) + 1;
  }
  return counts as Record<ShipmentStatus, number>;
}
