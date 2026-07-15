'use client';

import {
  useShipments,
  useShipmentSummary,
} from '@/features/shipment-tracking/presentation/hooks/useShipments';
import { useURLFilters } from '@/features/shipment-tracking/presentation/hooks/useURLFilters';
import { DashboardStats } from '@/features/shipment-tracking/presentation/components/DashboardStats';
import { ShipmentList } from '@/features/shipment-tracking/presentation/components/ShipmentList';
import { FilterBar } from '@/features/shipment-tracking/presentation/components/FilterBar';
import { ErrorState } from '@/components/ui';
import { PageHeader } from '@/components/layout/PageHeader';
import { Container } from '@/components/layout/Container';
import { getUniqueDestinations } from '@/features/shipment-tracking/application/use-cases/filter-shipments.use-case';
import Image from 'next/image';
import { DecryptedText } from '@/components/ui/DecryptedText';

export function ShipmentsContent() {
  const { filters, sort, hasActiveFilters } = useURLFilters();

  // Convert URLFilters (empty strings) to ShipmentFilters (undefined)
  const shipmentFilters = {
    search: filters.search || undefined,
    status: filters.status || undefined,
    priority: filters.priority || undefined,
    destination: filters.destination || undefined,
  };

  const {
    data: summary,
    isLoading: summaryLoading,
    error: summaryError,
  } = useShipmentSummary();
  const {
    data: shipments = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useShipments(shipmentFilters, sort);

  const destinations = getUniqueDestinations(shipments);

  const handleSelect = (trackingNumber: string) => {
    window.location.href = `/shipments/${trackingNumber}`;
  };

  if (summaryError) {
    return (
      <Container>
        <ErrorState
          message="Failed to load dashboard summary"
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <ErrorState
          message={
            error instanceof Error ? error.message : 'Failed to load shipments'
          }
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader
        title={
          <Image
            src="/app-logo.png"
            alt="ShipSmart Logo"
            width={180}
            height={40}
            className="cursor-target"
            style={{ objectFit: 'contain' }}
          />
        }
        description={
          <DecryptedText
            text="Monitor and manage all shipments across the network"
            animateOn="view"
            revealDirection="center"
            speed={40}
            maxIterations={15}
            sequential={true}
            className="text-gray-600"
            parentClassName="inline-block"
          />
        }
        actions={
          <span className="flex items-center gap-2">
            {isFetching && (
              <svg
                className="h-5 w-5 animate-spin text-blue-600"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
            {hasActiveFilters && (
              <span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
                Filters active
              </span>
            )}
          </span>
        }
      />

      {!summaryLoading && summary && <DashboardStats summary={summary} />}

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] shadow-xl shadow-black/30 backdrop-blur-md">
        <div className="border-b border-white/10 p-4">
          <FilterBar destinations={destinations} />
        </div>
        <div className="p-4">
          <ShipmentList
            shipments={shipments}
            onSelect={handleSelect}
            isLoading={isLoading}
            isEmpty={shipments.length === 0 && !isLoading}
            emptyMessage={
              hasActiveFilters
                ? 'No shipments match your filters. Try adjusting your search criteria.'
                : 'No shipments found. Check back later for new shipments.'
            }
          />
        </div>
      </div>
    </Container>
  );
}