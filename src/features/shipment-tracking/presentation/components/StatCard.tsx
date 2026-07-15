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
  default: 'bg-blue-50 text-blue-600',
  success: 'bg-green-50 text-green-600',
  warning: 'bg-amber-50 text-amber-600',
  danger: 'bg-red-50 text-red-600',
  info: 'bg-purple-50 text-purple-600',
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
      <Card variant="bordered">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <motion.p
                initial={animate ? { scale: 0.5, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.2,
                }}
                className="mt-2 text-3xl font-bold text-gray-900"
              >
                {value}
              </motion.p>
              {trend && (
                <motion.div
                  initial={animate ? { opacity: 0, x: -10 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 flex items-center gap-1 text-sm"
                >
                  <span
                    className={
                      trend.value >= 0 ? 'text-green-600' : 'text-red-600'
                    }
                  >
                    {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
                  </span>
                  <span className="text-gray-500">{trend.label}</span>
                </motion.div>
              )}
            </div>
            <div className={`rounded-xl p-3 ${styles}`}>{icon}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
