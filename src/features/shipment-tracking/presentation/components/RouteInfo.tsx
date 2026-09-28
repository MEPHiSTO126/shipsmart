import { Shipment } from '@/features/shipment-tracking/domain';
import { format } from 'date-fns';

interface RouteInfoProps {
  shipment: Shipment;
}

export function RouteInfo({ shipment }: RouteInfoProps) {
  return (
    <div className="space-y-4 rounded-xl border border-stone-800 bg-[#1c1917] p-6">
      <h3 className="text-lg font-semibold text-white">Route Information</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-stone-400">Origin</p>
          <p className="font-medium text-white">{shipment.origin}</p>
        </div>
        <div>
          <p className="text-sm text-stone-400">Destination</p>
          <p className="font-medium text-white">{shipment.destination}</p>
        </div>
        <div>
          <p className="text-sm text-stone-400">Estimated Delivery</p>
          <p className="font-medium text-white">
            {format(shipment.estimatedDelivery, "MMMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
        <div>
          <p className="text-sm text-stone-400">Priority</p>
          <p className="font-medium text-white capitalize">
            {shipment.priority}
          </p>
        </div>
      </div>
    </div>
  );
}
