import { ShipmentStatus } from '@/features/shipment-tracking/domain/value-objects/status-transition';
import { TimelineEvent } from '@/features/shipment-tracking/domain/entities/timeline-event';
import { motion } from 'framer-motion';
import { SHIPMENT_STATUS_LABELS } from '@/constants/shipment-status';

interface RouteProgressVisualProps {
  currentStatus: ShipmentStatus;
  events: TimelineEvent[];
}

const STATUS_ORDER: ShipmentStatus[] = [
  'order_received',
  'processing',
  'dispatched',
  'in_transit',
  'out_for_delivery',
  'delivered',
];

export function RouteProgressVisual({
  currentStatus,
  events,
}: RouteProgressVisualProps) {
  const statusOrder = STATUS_ORDER;
  const currentIndex = statusOrder.indexOf(currentStatus);

  // Check if there's a delayed event
  const isDelayed = events.some((e) => e.status === 'delayed');
  const isDeliveryFailed = events.some((e) => e.status === 'delivery_failed');

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold text-gray-900">
        Route Progress
      </h3>
      <div className="space-y-4">
        {statusOrder.map((status, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isFuture = index > currentIndex;
          const hasEvent = events.some((e) => e.status === status);

          const isActive =
            isCurrent ||
            (isDelayed && status === 'delayed') ||
            (isDeliveryFailed && status === 'delivery_failed');

          return (
            <motion.div
              key={status}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="flex items-center gap-4"
            >
              <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                <div
                  className={`h-4 w-4 rounded-full transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500'
                      : isActive
                        ? 'animate-pulse bg-blue-500'
                        : 'bg-gray-200'
                  }`}
                />
                {isCompleted && (
                  <svg
                    className="absolute h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-medium capitalize ${isActive ? 'text-blue-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}
                  >
                    {SHIPMENT_STATUS_LABELS[status]}
                  </span>
                  {isActive && (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                      {isDelayed && status === 'delayed'
                        ? 'Delayed'
                        : isDeliveryFailed && status === 'delivery_failed'
                          ? 'Failed'
                          : 'Current'}
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm ${isCompleted ? 'text-green-600' : isActive ? 'text-blue-600' : 'text-gray-400'}`}
                >
                  {hasEvent && (
                    <>
                      {events
                        .filter((e) => e.status === status)
                        .map((e) => (
                          <span key={e.id} className="block">
                            {new Date(e.timestamp).toLocaleString()}
                          </span>
                        ))}
                    </>
                  )}
                  {!hasEvent && isFuture && <span>Pending</span>}
                  {!hasEvent && !isFuture && !isCurrent && (
                    <span>No update</span>
                  )}
                </p>
              </div>
            </motion.div>
          );
        })}

        {/* Exceptional statuses */}
        {isDelayed && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 rounded-lg border border-red-100 bg-red-50 p-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-5 w-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-red-800">Delayed</p>
              <p className="text-sm text-red-600">
                {events
                  .filter((e) => e.status === 'delayed')
                  .map((e) => (
                    <span key={e.id} className="block">
                      {e.description} - {new Date(e.timestamp).toLocaleString()}
                    </span>
                  ))}
              </p>
            </div>
          </motion.div>
        )}

        {isDeliveryFailed && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 rounded-lg border border-red-100 bg-red-50 p-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-5 w-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-red-800">Delivery Failed</p>
              <p className="text-sm text-red-600">
                {events
                  .filter((e) => e.status === 'delivery_failed')
                  .map((e) => (
                    <span key={e.id} className="block">
                      {e.description} - {new Date(e.timestamp).toLocaleString()}
                    </span>
                  ))}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
