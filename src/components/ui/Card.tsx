import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'bordered' | 'elevated' | 'glass';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default:
        'bg-white/[0.055] border border-white/10 backdrop-blur-md',
      hover:
        'bg-white/[0.055] border border-white/10 backdrop-blur-md transition-all duration-200 hover:bg-white/[0.085] hover:border-white/20 hover:shadow-lg hover:shadow-purple-900/20 cursor-pointer',
      bordered:
        'bg-white/[0.04] border border-white/[0.12]',
      elevated:
        'bg-white/[0.06] border border-white/[0.12] shadow-xl shadow-black/30 backdrop-blur-md',
      glass:
        'bg-white/[0.07] border border-white/[0.15] backdrop-blur-xl shadow-lg shadow-black/20',
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          'overflow-hidden rounded-xl',
          variants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Card.displayName = 'Card';


export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge('border-b border-white/10 px-6 py-4', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={twMerge('text-lg font-semibold text-slate-100', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={twMerge('mt-1 text-sm text-slate-400', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={twMerge('px-6 py-4', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      'border-t border-white/10 bg-white/[0.03] px-6 py-4',
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';
