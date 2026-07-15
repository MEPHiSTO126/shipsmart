import { HTMLAttributes, forwardRef } from 'react';

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, title, description, actions, children, ...props }, ref) => (
    <div
      ref={ref}
      className={`mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between ${className}`}
      {...props}
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {description && <p className="mt-1 text-gray-500">{description}</p>}
        {children && <div className="mt-4">{children}</div>}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-3">{actions}</div>
      )}
    </div>
  ),
);
PageHeader.displayName = 'PageHeader';
