import { Input, Select, Button } from '@/components/ui';
import { useShipmentFilters } from '@/features/shipment-tracking/presentation/hooks/useShipmentFilters';
import { ShipmentStatus } from '@/features/shipment-tracking/domain/value-objects/status-transition';
import { ShipmentPriority } from '@/constants/shipment-priority';
import { SHIPMENT_STATUS_LABELS } from '@/constants/shipment-status';
import { SHIPMENT_PRIORITY_LABELS } from '@/constants/shipment-priority';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useState } from 'react';

const toShipmentStatus = (value: string): ShipmentStatus | undefined =>
  value ? (value as ShipmentStatus) : undefined;

const toShipmentPriority = (value: string): ShipmentPriority | undefined =>
  value ? (value as ShipmentPriority) : undefined;

export function FilterBar({ destinations }: { destinations: string[] }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isOpen, setIsOpen] = useState(false);
  const {
    filters,
    sort,
    updateFilter,
    updateSort,
    clearFilters,
    hasActiveFilters,
  } = useShipmentFilters();

  const statusOptions = Object.entries(SHIPMENT_STATUS_LABELS).map(
    ([value, label]) => ({
      value,
      label,
    }),
  );

  const priorityOptions = Object.entries(SHIPMENT_PRIORITY_LABELS).map(
    ([value, label]) => ({
      value,
      label,
    }),
  );

  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full justify-start"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                Active
              </span>
            )}
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          )}
        </div>

        {isOpen && (
          <div className="space-y-4 rounded-lg border bg-gray-50 p-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Search
              </label>
              <Input
                placeholder="Tracking number or customer..."
                value={filters.search || ''}
                onChange={(e) => updateFilter('search', e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Status
              </label>
              <Select
                options={[
                  { value: '', label: 'All statuses' },
                  ...statusOptions,
                ]}
                value={filters.status || ''}
                onChange={(e) =>
                  updateFilter('status', toShipmentStatus(e.target.value))
                }
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Priority
              </label>
              <Select
                options={[
                  { value: '', label: 'All priorities' },
                  ...priorityOptions,
                ]}
                value={filters.priority || ''}
                onChange={(e) =>
                  updateFilter('priority', toShipmentPriority(e.target.value))
                }
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Destination
              </label>
              <Select
                options={[
                  { value: '', label: 'All destinations' },
                  ...destinations.map((d) => ({ value: d, label: d })),
                ]}
                value={filters.destination || ''}
                onChange={(e) =>
                  updateFilter('destination', e.target.value || undefined)
                }
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Sort by
              </label>
              <Select
                options={[
                  {
                    value: 'estimatedDelivery-asc',
                    label: 'Delivery date (earliest first)',
                  },
                  {
                    value: 'estimatedDelivery-desc',
                    label: 'Delivery date (latest first)',
                  },
                  {
                    value: 'lastUpdated-asc',
                    label: 'Last updated (oldest first)',
                  },
                  {
                    value: 'lastUpdated-desc',
                    label: 'Last updated (newest first)',
                  },
                ]}
                value={`${sort.field}-${sort.order}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  updateSort(
                    field as 'estimatedDelivery' | 'lastUpdated',
                    order as 'asc' | 'desc',
                  );
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="min-w-[250px] flex-1">
        <Input
          placeholder="Search tracking # or customer..."
          value={filters.search || ''}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Select
          options={[{ value: '', label: 'Status' }, ...statusOptions]}
          value={filters.status || ''}
          onChange={(e) =>
            updateFilter('status', toShipmentStatus(e.target.value))
          }
          className="w-40"
        />

        <Select
          options={[{ value: '', label: 'Priority' }, ...priorityOptions]}
          value={filters.priority || ''}
          onChange={(e) =>
            updateFilter('priority', toShipmentPriority(e.target.value))
          }
          className="w-40"
        />

        <Select
          options={[
            { value: '', label: 'Destination' },
            ...destinations.map((d) => ({ value: d, label: d })),
          ]}
          value={filters.destination || ''}
          onChange={(e) =>
            updateFilter('destination', e.target.value || undefined)
          }
          className="w-40"
        />

        <Select
          options={[
            { value: 'estimatedDelivery-desc', label: 'Sort: Delivery ↓' },
            { value: 'estimatedDelivery-asc', label: 'Sort: Delivery ↑' },
            { value: 'lastUpdated-desc', label: 'Sort: Updated ↓' },
            { value: 'lastUpdated-asc', label: 'Sort: Updated ↑' },
          ]}
          value={`${sort.field}-${sort.order}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split('-');
            updateSort(
              field as 'estimatedDelivery' | 'lastUpdated',
              order as 'asc' | 'desc',
            );
          }}
          className="w-48"
        />

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
