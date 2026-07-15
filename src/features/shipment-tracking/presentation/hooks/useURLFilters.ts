import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { ShipmentStatus } from '@/features/shipment-tracking/domain/value-objects/status-transition';
import { ShipmentPriority } from '@/constants/shipment-priority';

interface URLFilters {
  search: string;
  status: ShipmentStatus | '';
  priority: ShipmentPriority | '';
  destination: string;
  sort: { field: 'estimatedDelivery' | 'lastUpdated'; order: 'asc' | 'desc' };
}

interface UseURLFiltersReturn {
  filters: URLFilters;
  sort: URLFilters['sort'];
  hasActiveFilters: boolean;
  setSearch: (value: string) => void;
  setStatus: (value: ShipmentStatus | '') => void;
  setPriority: (value: ShipmentPriority | '') => void;
  setDestination: (value: string) => void;
  setSort: (
    field: 'estimatedDelivery' | 'lastUpdated',
    order: 'asc' | 'desc',
  ) => void;
  clearFilters: () => void;
}

export function useURLFilters(): UseURLFiltersReturn {
  const searchParams = useSearchParams();

  const filters = useMemo<URLFilters>(() => {
    return {
      search: searchParams.get('search') || '',
      status: (searchParams.get('status') as ShipmentStatus) || '',
      priority: (searchParams.get('priority') as ShipmentPriority) || '',
      destination: searchParams.get('destination') || '',
      sort: {
        field:
          (searchParams.get('sortField') as
            'estimatedDelivery' | 'lastUpdated') || 'estimatedDelivery',
        order: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
      },
    };
  }, [searchParams]);

  const hasActiveFilters = useMemo(() => {
    return !!(
      filters.search ||
      filters.status ||
      filters.priority ||
      filters.destination
    );
  }, [filters]);

  const updateParams = useCallback(
    (updates: Partial<URLFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (key === 'sort') return; // Handle sort separately below

        if (value === '' || value === undefined) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      // Handle nested sort object
      if (updates.sort) {
        params.set('sortField', updates.sort.field);
        params.set('sortOrder', updates.sort.order);
      }

      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${params.toString()}`,
      );
    },
    [searchParams],
  );

  const setSearch = useCallback(
    (value: string) => {
      updateParams({ search: value });
    },
    [updateParams],
  );

  const setStatus = useCallback(
    (value: ShipmentStatus | '') => {
      updateParams({ status: value });
    },
    [updateParams],
  );

  const setPriority = useCallback(
    (value: ShipmentPriority | '') => {
      updateParams({ priority: value });
    },
    [updateParams],
  );

  const setDestination = useCallback(
    (value: string) => {
      updateParams({ destination: value });
    },
    [updateParams],
  );

  const setSort = useCallback(
    (field: 'estimatedDelivery' | 'lastUpdated', order: 'asc' | 'desc') => {
      updateParams({ sort: { field, order } });
    },
    [updateParams],
  );

  const clearFilters = useCallback(() => {
    updateParams({
      search: '',
      status: '',
      priority: '',
      destination: '',
    });
  }, [updateParams]);

  return {
    filters,
    sort: filters.sort,
    hasActiveFilters,
    setSearch,
    setStatus,
    setPriority,
    setDestination,
    setSort,
    clearFilters,
  };
}
