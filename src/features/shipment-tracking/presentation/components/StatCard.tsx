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

const VARIANT_STYLES = {
  default: {
    gradient: 'from-blue-500 to-blue-600',
    glow: 'shadow-blue-500/40',
    ring: 'ring-blue-400/20',
  },
  success: {
    gradient: 'from-emerald-400 to-green-500',
    glow: 'shadow-emerald-500/40',
    ring: 'ring-emerald-400/20',
  },
  warning: {
    gradient: 'from-amber-400 to-orange-500',
    glow: 'shadow-amber-500/40',
    ring: 'ring-amber-400/20',
  },
  danger: {
    gradient: 'from-red-500 to-rose-600',
    glow: 'shadow-red-500/40',
    ring: 'ring-red-400/20',
  },
  info: {
    gradient: 'from-violet-500 to-purple-600',
    glow: 'shadow-violet-500/40',
    ring: 'ring-violet-400/20',
  },
};

export function StatCard({
  title,
  value,
  icon,
  variant,
  trend,
  animate = true,
}: StatCardProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="h-full"
    >
      <Card variant="elevated" className="h-full cursor-target">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {title}
              </p>
              <motion.p
                initial={animate ? { scale: 0.5, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.2,
                }}
                className="mt-2 text-3xl font-bold text-white tabular-nums"
              >
                {value}
              </motion.p>
              {trend && (
                <motion.div
                  initial={animate ? { opacity: 0, x: -10 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-1.5 flex items-center gap-1 text-xs"
                >
                  <span
                    className={
                      trend.value >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }
                  >
                    {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
                  </span>
                  <span className="text-slate-500">{trend.label}</span>
                </motion.div>
              )}
            </div>

            {/* Icon with glow ring */}
            <div className={`relative rounded-2xl p-0.5 ring-4 ${styles.ring}`}>
              <div
                className={`rounded-xl bg-gradient-to-br p-3 shadow-lg ${styles.gradient} ${styles.glow}`}
              >
                <span className="text-white">{icon}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

