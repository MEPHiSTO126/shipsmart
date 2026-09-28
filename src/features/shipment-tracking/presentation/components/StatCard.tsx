import { Card, CardContent } from '@/components/ui';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  variant: 'default' | 'success' | 'warning' | 'danger' | 'info';
  trend?: { value: number; label: string };
  animate?: boolean;
}

const VARIANT_ICON_COLOR = {
  default: 'text-slate-400',
  success: 'text-emerald-400',
  warning: 'text-amber-400',
  danger: 'text-red-400',
  info: 'text-blue-400',
};

export function StatCard({
  title,
  value,
  icon,
  variant,
  trend,
  animate = true,
}: StatCardProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card variant="default" className="h-full">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {title}
              </p>
              <p className="mt-2 text-3xl font-bold text-white tabular-nums">
                {value}
              </p>
              {trend && (
                <div className="mt-1.5 flex items-center gap-1 text-xs">
                  <span
                    className={
                      trend.value >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }
                  >
                    {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
                  </span>
                  <span className="text-slate-500">{trend.label}</span>
                </div>
              )}
            </div>
            <div className="rounded-lg bg-slate-800 p-2.5">
              <span className={VARIANT_ICON_COLOR[variant]}>{icon}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
