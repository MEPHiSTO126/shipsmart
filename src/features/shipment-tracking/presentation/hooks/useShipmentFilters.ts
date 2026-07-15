import { useState, useCallback } from 'react';
import {
  ShipmentFilters,
  ShipmentSort,
} from '@/features/shipment-tracking/domain/repositories/shipment-repository';

export function useShipmentFilters() {
  const [filters, setFilters] = useState<ShipmentFilters>({});
  const [sort, setSort] = useState<ShipmentSort>({
    field: 'estimatedDelivery',
    order: 'desc',
  });

  const updateFilter = useCallback(
    <K extends keyof ShipmentFilters>(key: K, value: ShipmentFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const updateSort = useCallback(
    (field: ShipmentSort['field'], order?: ShipmentSort['order']) => {
      setSort((prev) => ({
        field,
        order:
          order ??
          (prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'),
      }));
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const clearSort = useCallback(() => {
    setSort({ field: 'estimatedDelivery', order: 'desc' });
  }, []);

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== undefined && v !== '',
  );

  return {
    filters,
    sort,
    updateFilter,
    updateSort,
    clearFilters,
    clearSort,
    hasActiveFilters,
    setFilters,
    setSort,
  };
}
