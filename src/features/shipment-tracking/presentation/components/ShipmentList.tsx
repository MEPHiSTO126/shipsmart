'use client';

import { motion } from 'framer-motion';
import { Shipment } from '@/features/shipment-tracking/domain';
import { ShipmentTable } from './ShipmentTable';
import { ShipmentCard } from './ShipmentCard';
import { Skeleton, TableRowSkeleton } from '@/components/ui';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ShipmentListProps {
  shipments: Shipment[];
  onSelect: (trackingNumber: string) => void;
  selectedId?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
}

export function ShipmentList({
  shipments,
  onSelect,
  selectedId,
  isLoading,
  isEmpty,
  emptyMessage = 'No shipments found',
}: ShipmentListProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  if (isLoading) {
    return (
      <div className="space-y-4">
        {isDesktop ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Tracking #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Origin
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Destination
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Est. Delivery
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Courier
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Last Update
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRowSkeleton key={i} columns={9} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="card" />
          ))
        )}
      </div>
    );
  }

  if (isEmpty || shipments.length === 0) {
    return (
      <div className="py-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No shipments</h3>
        <p className="mt-1 text-sm text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  return isDesktop ? (
    <ShipmentTable
      shipments={shipments}
      onSelect={onSelect}
      selectedId={selectedId}
    />
  ) : (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="space-y-3"
    >
      {shipments.map((shipment) => (
        <motion.div
          key={shipment.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
        >
          <ShipmentCard
            shipment={shipment}
            onSelect={onSelect}
            isSelected={selectedId === shipment.trackingNumber}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
