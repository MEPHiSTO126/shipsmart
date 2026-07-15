import { Container } from '@/components/layout/Container';

export default function ShipmentDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        {/* Page header skeleton */}
        <div className="mb-8 flex items-start justify-between animate-pulse">
          <div className="space-y-2">
            <div className="h-8 w-56 rounded bg-gray-200" />
            <div className="h-4 w-40 rounded bg-gray-200" />
          </div>
          <div className="h-4 w-32 rounded bg-gray-200" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main content column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Detail header card skeleton */}
            <div className="animate-pulse rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="h-6 w-48 rounded bg-gray-200" />
                <div className="h-6 w-20 rounded-full bg-gray-200" />
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="h-3 w-16 rounded bg-gray-200" />
                    <div className="h-5 w-24 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>

            {/* Route info skeleton */}
            <div className="animate-pulse rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 h-5 w-32 rounded bg-gray-200" />
              <div className="flex items-center gap-4">
                <div className="space-y-1">
                  <div className="h-3 w-12 rounded bg-gray-200" />
                  <div className="h-5 w-24 rounded bg-gray-200" />
                </div>
                <div className="h-px flex-1 rounded bg-gray-200" />
                <div className="space-y-1 text-right">
                  <div className="h-3 w-12 rounded bg-gray-200" />
                  <div className="h-5 w-24 rounded bg-gray-200" />
                </div>
              </div>
            </div>

            {/* Timeline skeleton */}
            <div className="animate-pulse rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-6 h-5 w-24 rounded bg-gray-200" />
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200" />
                      {i < 4 && <div className="mt-1 h-12 w-0.5 bg-gray-200" />}
                    </div>
                    <div className="flex-1 space-y-2 pb-6">
                      <div className="h-4 w-32 rounded bg-gray-200" />
                      <div className="h-3 w-48 rounded bg-gray-200" />
                      <div className="h-3 w-24 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar column */}
          <div className="space-y-6 lg:col-span-1">
            {/* Route progress skeleton */}
            <div className="animate-pulse rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-6 h-5 w-32 rounded bg-gray-200" />
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200" />
                    <div className="flex-1 space-y-1">
                      <div className="h-4 w-28 rounded bg-gray-200" />
                      <div className="h-3 w-20 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status action skeleton */}
            <div className="animate-pulse rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 h-5 w-32 rounded bg-gray-200" />
              <div className="h-10 w-full rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
