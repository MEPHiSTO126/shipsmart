'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ShipmentDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[ShipmentDetailPage] Error:', error);
  }, [error]);

  const isNotFound =
    error?.message?.toLowerCase().includes('not found') ||
    error?.message?.toLowerCase().includes('404');

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-16">
        <div className="mx-auto max-w-md text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            {isNotFound ? (
              <svg
                className="h-10 w-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="h-10 w-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            )}
          </div>

          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            {isNotFound ? 'Shipment not found' : 'Something went wrong'}
          </h1>
          <p className="mb-6 text-gray-600">
            {isNotFound
              ? "We couldn't find a shipment with that tracking number. It may not exist or the link may be incorrect."
              : "We couldn't load this shipment. This might be a temporary network issue."}
          </p>

          {process.env.NODE_ENV === 'development' && error?.message && (
            <p className="mb-6 rounded-md bg-red-50 px-3 py-2 font-mono text-xs text-red-700">
              {error.message}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            {!isNotFound && (
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Try again
              </button>
            )}
            <Link
              href="/shipments"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to dashboard
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
