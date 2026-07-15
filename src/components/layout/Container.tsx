import { HTMLAttributes, forwardRef } from 'react';

export const Container = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
    {...props}
  >
    {children}
  </div>
));
Container.displayName = 'Container';
