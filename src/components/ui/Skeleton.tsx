import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'table-row';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'text', width, height, ...props }, ref) => {
    const variants = {
      text: 'h-4 w-full rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-lg',
      card: 'rounded-lg',
      'table-row': 'h-16',
    };

    const sizes = {
      text: { width: '100%', height: '1rem' },
      circular: { width: '1rem', height: '1rem' },
      rectangular: { width: '100%', height: '1rem' },
      card: { width: '100%', height: '100%' },
      'table-row': { width: '100%', height: '4rem' },
    };

    const style = {
      width: width ?? sizes[variant].width,
      height: height ?? sizes[variant].height,
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          'skeleton',
          variants[variant],
          className,
        )}
        style={style as React.CSSProperties}
        {...props}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';

export function TableRowSkeleton({ columns = 8 }: { columns?: number }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="p-4">
          <Skeleton variant="text" width={i === 0 ? '80%' : '60%'} />
        </td>
      ))}
    </tr>
  );
}

export function CardSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="40%" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="space-y-2 p-6">
      <Skeleton variant="text" width="30%" />
      <Skeleton variant="rectangular" width="60%" height="2rem" />
      <Skeleton variant="text" width="40%" />
    </div>
  );
}
