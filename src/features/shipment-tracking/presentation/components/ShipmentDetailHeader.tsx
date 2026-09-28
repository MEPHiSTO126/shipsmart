import { Shipment } from '@/features/shipment-tracking/domain';
import { ShipmentStatus } from '@/features/shipment-tracking/domain/value-objects/status-transition';
import { ShipmentPriority } from '@/constants/shipment-priority';
import { Badge } from '@/components/ui';

interface ShipmentDetailHeaderProps {
  shipment: Shipment;
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

export function ShipmentDetailHeader({ shipment }: ShipmentDetailHeaderProps) {
  const statusConfig = STATUS_BADGE[shipment.status];
  const priorityConfig = PRIORITY_BADGE[shipment.priority];

  return (
    <div className="rounded-xl border border-slate-800 bg-[#111527] p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xl font-bold text-white">
              {shipment.trackingNumber}
            </span>
            <Badge variant={statusConfig.variant} dot size="lg">
              {statusConfig.label}
            </Badge>
            <Badge variant={priorityConfig.variant} dot size="lg">
              {priorityConfig.label}
            </Badge>
          </div>
          <p className="mb-2 text-2xl font-semibold text-white">
            {shipment.customerName}
          </p>
          <p className="text-slate-400">
            Courier: {shipment.courier.name} <span className="text-slate-500">(ID: {shipment.courier.id})</span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 text-right sm:items-end">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Last updated</p>
          <p className="font-medium text-white">
            {new Date(shipment.lastUpdated).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          <p className="text-sm text-slate-400">
            {new Date(shipment.lastUpdated).toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
