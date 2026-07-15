import { ShipmentStatus } from '@/features/shipment-tracking/domain/value-objects/status-transition';
import { SHIPMENT_STATUS_LABELS } from '@/constants/shipment-status';
import { Button } from '@/components/ui';

interface StatusActionBarProps {
  currentStatus: ShipmentStatus;
  nextStatuses: ShipmentStatus[];
  canAdvance: boolean;
  isMutating: boolean;
  onAdvance: (status: ShipmentStatus) => void;
}

export function StatusActionBar({
  currentStatus,
  nextStatuses,
  canAdvance,
  isMutating,
  onAdvance,
}: StatusActionBarProps) {
  if (!canAdvance || nextStatuses.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Status Actions
        </h3>
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-gray-600">
            No further status transitions available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Advance Status</h3>
      <p className="text-sm text-gray-500">
        Current:{' '}
        <span className="font-medium capitalize">
          {SHIPMENT_STATUS_LABELS[currentStatus].replace('_', ' ')}
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        {nextStatuses.map((status) => (
          <Button
            key={status}
            variant="primary"
            size="md"
            onClick={() => onAdvance(status)}
            disabled={isMutating}
            loading={isMutating}
            className="w-full sm:w-auto"
          >
            → {SHIPMENT_STATUS_LABELS[status].replace('_', ' ')}
          </Button>
        ))}
      </div>
    </div>
  );
}
