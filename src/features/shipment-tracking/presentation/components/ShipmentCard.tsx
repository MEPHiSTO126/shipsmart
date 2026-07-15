import { Shipment } from '@/features/shipment-tracking/domain';
import { ShipmentStatus } from '@/features/shipment-tracking/domain/value-objects/status-transition';
import { ShipmentPriority } from '@/constants/shipment-priority';
import { Card, CardContent, Badge } from '@/components/ui';
import { format, formatDistanceToNow } from 'date-fns';

interface ShipmentCardProps {
  shipment: Shipment;
  onSelect: (trackingNumber: string) => void;
  isSelected: boolean;
}

const STATUS_BADGE: Record<
  ShipmentStatus,
  {
    variant: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
    label: string;
  }
> = {
  order_received: { variant: 'neutral', label: 'Order Received' },
  processing: { variant: 'info', label: 'Processing' },
  dispatched: { variant: 'default', label: 'Dispatched' },
  in_transit: { variant: 'info', label: 'In Transit' },
  out_for_delivery: { variant: 'warning', label: 'Out for Delivery' },
  delivered: { variant: 'success', label: 'Delivered' },
  delayed: { variant: 'danger', label: 'Delayed' },
  delivery_failed: { variant: 'danger', label: 'Delivery Failed' },
  cancelled: { variant: 'neutral', label: 'Cancelled' },
};

const PRIORITY_BADGE: Record<
  ShipmentPriority,
  {
    variant: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
    label: string;
  }
> = {
  standard: { variant: 'neutral', label: 'Standard' },
  express: { variant: 'info', label: 'Express' },
  priority: { variant: 'warning', label: 'Priority' },
};

export function ShipmentCard({
  shipment,
  onSelect,
  isSelected,
}: ShipmentCardProps) {
  const statusConfig = STATUS_BADGE[shipment.status];
  const priorityConfig = PRIORITY_BADGE[shipment.priority];

  return (
    <Card
      variant={isSelected ? 'bordered' : 'hover'}
      onClick={() => onSelect(shipment.trackingNumber)}
      className={`transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono font-medium text-gray-900">
                {shipment.trackingNumber}
              </span>
              <Badge variant={statusConfig.variant} dot>
                {statusConfig.label}
              </Badge>
              <Badge variant={priorityConfig.variant} dot>
                {priorityConfig.label}
              </Badge>
            </div>
            <p className="mt-2 truncate text-sm font-medium text-gray-900">
              {shipment.customerName}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {shipment.origin} → {shipment.destination}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {format(shipment.estimatedDelivery, 'MMM d, HH:mm')}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {shipment.courier.name}
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-600">
              Updated{' '}
              {formatDistanceToNow(shipment.lastUpdated, { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
