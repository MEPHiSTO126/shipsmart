import { HTMLAttributes, forwardRef } from 'react';

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title, description, action, icon, ...props }, ref) => (
    <div ref={ref} className={`px-4 py-16 text-center ${className}`} {...props}>
      <div className="mx-auto mb-4 h-16 w-16 text-gray-300">
        {icon || (
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="h-full w-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )}
      </div>
      <h3 className="mb-1 text-lg font-medium text-gray-900">{title}</h3>
      {description && <p className="mb-6 text-gray-500">{description}</p>}
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  ),
);
EmptyState.displayName = 'EmptyState';
