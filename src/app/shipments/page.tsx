import { Suspense } from 'react';
import { ShipmentsContent } from './ShipmentsContent';

export default function ShipmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<DashboardSkeleton />}>
        <ShipmentsContent />
      </Suspense>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse space-y-2 rounded-lg border bg-white p-4"
          >
            <div className="h-4 w-1/3 rounded bg-gray-200" />
            <div className="h-8 w-1/2 rounded bg-gray-200" />
          </div>
        ))}
      </div>
      <div className="animate-pulse rounded-lg border bg-white p-4">
        <div className="mb-4 h-4 w-1/4 rounded bg-gray-200" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 rounded bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
