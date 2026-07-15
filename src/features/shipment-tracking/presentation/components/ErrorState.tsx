import { Button } from '@/components/ui';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try again',
}: ErrorStateProps) {
  return (
    <div className="py-12 text-center" role="alert">
      <svg
        className="mx-auto mb-4 h-16 w-16 text-red-400"
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
      <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mx-auto mb-6 max-w-md text-gray-500">{message}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
