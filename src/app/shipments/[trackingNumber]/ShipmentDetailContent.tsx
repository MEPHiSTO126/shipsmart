'use client';

import Link from 'next/link';

import { useShipment, useShipmentEvents, useAdvanceShipmentStatus } from '@/features/shipment-tracking/presentation/hooks/useShipments';
import { ShipmentStatus } from '@/features/shipment-tracking/domain/value-objects/status-transition';
import { getNextValidStatuses, isTerminalStatus } from '@/features/shipment-tracking/domain/value-objects/status-transition';
import { ShipmentDetailHeader } from '@/features/shipment-tracking/presentation/components/ShipmentDetailHeader';
import { RouteInfo } from '@/features/shipment-tracking/presentation/components/RouteInfo';
import { Timeline } from '@/features/shipment-tracking/presentation/components/Timeline';
import { RouteProgressVisual } from '@/features/shipment-tracking/presentation/components/RouteProgressVisual';
import { StatusActionBar } from '@/features/shipment-tracking/presentation/components/StatusActionBar';
import { EmptyState, ErrorState } from '@/components/ui';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { TrackingNumber } from '@/features/shipment-tracking/domain/value-objects/tracking-number';
import { motion } from 'framer-motion';

interface ShipmentDetailContentProps {
  trackingNumber: string;
}

export function ShipmentDetailContent({ trackingNumber }: ShipmentDetailContentProps) {
  const tn = trackingNumber as TrackingNumber;
  
  const { data: shipment, isLoading: shipmentLoading, isError: shipmentError, error: shipmentErr } = useShipment(tn);
  const { data: events = [], isLoading: eventsLoading } = useShipmentEvents(tn);
  const advanceMutation = useAdvanceShipmentStatus();

  const nextStatuses = shipment ? getNextValidStatuses(shipment.status) : [];
  const canAdvance = !!(
    shipment &&
    !isTerminalStatus(shipment.status) &&
    nextStatuses.length > 0
  );
  const isMutating = advanceMutation.isPending;

  if (shipmentLoading || eventsLoading) {
    return <DetailSkeleton />;
  }

  if (shipmentError) {
    return (
      <Container>
        <ErrorState
          message={shipmentErr instanceof Error ? shipmentErr.message : 'Failed to load shipment'}
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }

  if (!shipment) {
    return (
      <Container>
        <EmptyState
          title="Shipment not found"
          description={`No shipment found with tracking number ${trackingNumber}`}
          action={<Link href="/shipments" className="text-blue-600 hover:underline">Back to dashboard</Link>}
        />
      </Container>
    );
  }

  const handleAdvanceStatus = async (newStatus: ShipmentStatus) => {
    try {
      await advanceMutation.mutateAsync({ trackingNumber: tn, newStatus });
    } catch (err) {
      console.error('Failed to advance status:', err);
    }
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <PageHeader
          title={`Shipment ${shipment.trackingNumber}`}
          description={shipment.customerName}
          actions={
            <Link
              href="/shipments"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              ← Back to dashboard
            </Link>
          }
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <ShipmentDetailHeader shipment={shipment} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <RouteInfo shipment={shipment} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Timeline events={events} />
            </motion.div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <RouteProgressVisual
                currentStatus={shipment.status}
                events={events}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <StatusActionBar
                currentStatus={shipment.status}
                nextStatuses={nextStatuses}
                canAdvance={canAdvance}
                isMutating={isMutating}
                onAdvance={handleAdvanceStatus}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}

function DetailSkeleton() {
  return (
    <Container>
      <div className="animate-pulse space-y-6 max-w-4xl mx-auto p-6">
        <div className="h-8 w-1/3 bg-gray-200 rounded" />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <div className="h-6 w-1/4 bg-gray-200 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
              <div className="grid grid-cols-3 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <div className="h-4 w-1/4 bg-gray-200 rounded" />
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <div className="h-4 w-1/3 bg-gray-200 rounded" />
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <div className="h-4 w-1/3 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}