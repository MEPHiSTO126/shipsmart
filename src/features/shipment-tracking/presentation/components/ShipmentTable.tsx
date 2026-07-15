import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
} from '@/components/ui';
import { Shipment, ShipmentStatus } from '@/features/shipment-tracking/domain';
import { ShipmentPriority } from '@/constants/shipment-priority';
import { formatDistanceToNow, format } from 'date-fns';

interface ShipmentTableProps {
  shipments: Shipment[];
  onSelect: (trackingNumber: string) => void;
  selectedId?: string;
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

export function ShipmentTable({
  shipments,
  onSelect,
  selectedId,
}: ShipmentTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table stickyHeader>
        <TableHeader>
          <TableRow>
            <TableHead sortable onSort={() => {}}>
              Tracking
            </TableHead>
            <TableHead sortable onSort={() => {}}>
              Customer
            </TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead sortable onSort={() => {}}>
              Status
            </TableHead>
            <TableHead sortable onSort={() => {}}>
              Est. Delivery
            </TableHead>
            <TableHead>Courier</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead sortable onSort={() => {}}>
              Last Update
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipments.map((shipment) => {
            const statusConfig = STATUS_BADGE[shipment.status];
            const priorityConfig = PRIORITY_BADGE[shipment.priority];
            const isSelected = selectedId === shipment.trackingNumber;

            return (
              <TableRow
                key={shipment.id}
                onClick={() => onSelect(shipment.trackingNumber)}
                className={`cursor-pointer transition-colors ${isSelected ? 'bg-blue-50' : ''}`}
              >
                <TableCell className="font-mono font-medium">
                  {shipment.trackingNumber}
                </TableCell>
                <TableCell>{shipment.customerName}</TableCell>
                <TableCell>{shipment.origin}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>
                  <Badge variant={statusConfig.variant} dot>
                    {statusConfig.label}
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {format(shipment.estimatedDelivery, 'MMM d, HH:mm')}
                </TableCell>
                <TableCell>{shipment.courier.name}</TableCell>
                <TableCell>
                  <Badge variant={priorityConfig.variant} dot>
                    {priorityConfig.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-500">
                  {formatDistanceToNow(shipment.lastUpdated, {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
