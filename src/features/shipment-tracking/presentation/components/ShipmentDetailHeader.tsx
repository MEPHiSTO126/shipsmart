import { Shipment } from '@/features/shipment-tracking/domain';
import { ShipmentStatus } from '@/features/shipment-tracking/domain/value-objects/status-transition';
import { ShipmentPriority } from '@/constants/shipment-priority';
import { Badge } from '@/components/ui';
import { motion } from 'framer-motion';

interface ShipmentDetailHeaderProps {
  shipment: Shipment;
}

const STATUS_BADGE: Record<ShipmentStatus, { variant: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'; label: string }> = {
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

const PRIORITY_BADGE: Record<ShipmentPriority, { variant: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'; label: string }> = {
  standard: { variant: 'neutral', label: 'Standard' },
  express: { variant: 'info', label: 'Express' },
  priority: { variant: 'warning', label: 'Priority' },
};

export function ShipmentDetailHeader({ shipment }: ShipmentDetailHeaderProps) {
  const statusConfig = STATUS_BADGE[shipment.status];
  const priorityConfig = PRIORITY_BADGE[shipment.priority];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg border shadow-sm p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-3">
            <span className="font-mono text-xl font-bold text-gray-900">{shipment.trackingNumber}</span>
            <Badge variant={statusConfig.variant} dot size="lg">
              {statusConfig.label}
            </Badge>
            <Badge variant={priorityConfig.variant} dot size="lg">
              {priorityConfig.label}
            </Badge>
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-2">{shipment.customerName}</p>
          <p className="text-gray-500">Courier: {shipment.courier.name} (ID: {shipment.courier.id})</p>
        </div>
        <div className="flex flex-col items-end sm:items-end gap-2 text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="font-medium text-gray-900">
            {new Date(shipment.lastUpdated).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(shipment.lastUpdated).toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
}