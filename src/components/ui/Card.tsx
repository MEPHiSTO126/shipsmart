import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'bordered' | 'elevated' | 'glass';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-[#111527] border border-slate-800',
      hover:
        'bg-[#111527] border border-slate-800 transition-colors hover:border-slate-700 cursor-pointer',
      bordered: 'bg-transparent border border-slate-800',
      elevated: 'bg-[#171c33] border border-slate-800',
      glass: 'bg-[#111527] border border-slate-800',
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
    className={twMerge('border-b border-slate-800 px-6 py-4', className)}
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
      'border-t border-slate-800 bg-white/[0.02] px-6 py-4',
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';
