import { ShipmentStatus } from '@/features/shipment-tracking/domain/value-objects/status-transition';
import { SHIPMENT_STATUS_LABELS } from '@/constants/shipment-status';
import { SpecularButton } from '@/components/ui';

interface StatusActionBarProps {
  currentStatus: ShipmentStatus;
  nextStatuses: ShipmentStatus[];
  canAdvance: boolean;
  isMutating: boolean;
  onAdvance: (status: ShipmentStatus) => void;
}

export function StatusActionBar({ currentStatus, nextStatuses, canAdvance, isMutating, onAdvance }: StatusActionBarProps) {
  if (!canAdvance || nextStatuses.length === 0) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Actions</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No further status transitions available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Advance Status</h3>
      <p className="text-sm text-gray-500">
        Current: <span className="font-medium capitalize">{SHIPMENT_STATUS_LABELS[currentStatus].replace('_', ' ')}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {nextStatuses.map((status) => (
          <SpecularButton
            key={status}
            size="md"
            onClick={() => onAdvance(status)}
            disabled={isMutating}
            loading={isMutating}
            className="w-full sm:w-auto"
          >
            → {SHIPMENT_STATUS_LABELS[status].replace('_', ' ')}
          </SpecularButton>
        ))}
      </div>
    </div>
  );
}