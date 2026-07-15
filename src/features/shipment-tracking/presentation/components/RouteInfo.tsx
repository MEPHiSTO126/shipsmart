import { Shipment } from '@/features/shipment-tracking/domain';
import { format } from 'date-fns';

interface RouteInfoProps {
  shipment: Shipment;
}

export function RouteInfo({ shipment }: RouteInfoProps) {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Route Information</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Origin</p>
          <p className="font-medium text-gray-900">{shipment.origin}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Destination</p>
          <p className="font-medium text-gray-900">{shipment.destination}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Estimated Delivery</p>
          <p className="font-medium text-gray-900">
            {format(shipment.estimatedDelivery, 'MMMM d, yyyy \'at\' h:mm a')}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Priority</p>
          <p className="font-medium text-gray-900 capitalize">{shipment.priority}</p>
        </div>
      </div>
    </div>
  );
}