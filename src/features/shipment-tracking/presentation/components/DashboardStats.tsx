import { StatCard } from './StatCard';
import { ShipmentSummary } from '@/features/shipment-tracking/domain/repositories/shipment-summary-repository';
import { useReducedMotion, useCountUp } from '@/hooks/useAnimation';

interface DashboardStatsProps {
  summary: ShipmentSummary;
}

const ICONS = {
  total: (
    <svg
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  ),
  inTransit: (
    <svg
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  delayed: (
    <svg
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  outForDelivery: (
    <svg
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  delivered: (
    <svg
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

export function DashboardStats({ summary }: DashboardStatsProps) {
  const prefersReducedMotion = useReducedMotion();

  const totalCount = useCountUp(summary.total, 0.8, prefersReducedMotion);
  const inTransitCount = useCountUp(
    summary.inTransit,
    0.8,
    prefersReducedMotion,
  );
  const delayedCount = useCountUp(summary.delayed, 0.8, prefersReducedMotion);
  const outForDeliveryCount = useCountUp(
    summary.outForDelivery,
    0.8,
    prefersReducedMotion,
  );
  const deliveredCount = useCountUp(
    summary.delivered,
    0.8,
    prefersReducedMotion,
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <StatCard
        title="Total Shipments"
        value={totalCount}
        icon={ICONS.total}
        variant="default"
        animate={!prefersReducedMotion}
      />
      <StatCard
        title="In Transit"
        value={inTransitCount}
        icon={ICONS.inTransit}
        variant="info"
        animate={!prefersReducedMotion}
      />
      <StatCard
        title="Delayed"
        value={delayedCount}
        icon={ICONS.delayed}
        variant="danger"
        animate={!prefersReducedMotion}
      />
      <StatCard
        title="Out for Delivery"
        value={outForDeliveryCount}
        icon={ICONS.outForDelivery}
        variant="warning"
        animate={!prefersReducedMotion}
      />
      <StatCard
        title="Delivered"
        value={deliveredCount}
        icon={ICONS.delivered}
        variant="success"
        animate={!prefersReducedMotion}
      />
    </div>
  );
}
