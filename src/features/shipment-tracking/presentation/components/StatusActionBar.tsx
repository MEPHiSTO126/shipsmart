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
      <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-6 shadow-xl shadow-black/30 backdrop-blur-md">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Status Actions
        </h3>
        <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
          <p className="text-slate-400">
            No further status transitions available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.055] p-6 shadow-xl shadow-black/30 backdrop-blur-md">
      <h3 className="text-lg font-semibold text-white">Advance Status</h3>
      <p className="text-sm text-slate-400">
        Current:{' '}
        <span className="font-medium capitalize text-white">
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
