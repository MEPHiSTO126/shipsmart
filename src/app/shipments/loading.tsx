import { Container } from '@/components/layout/Container';

export default function ShipmentsLoading() {
  return (
    <div className="min-h-screen">
      <Container className="py-8">
        {/* Page header skeleton */}
        <div className="mb-8 animate-pulse space-y-2">
          <div className="h-8 w-64 rounded bg-slate-800" />
          <div className="h-4 w-96 rounded bg-slate-800" />
        </div>

        {/* Stats cards skeleton */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse space-y-3 rounded-xl border border-slate-800 bg-[#111527] p-4"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-1/3 rounded bg-slate-800" />
                <div className="h-8 w-8 rounded-full bg-slate-800" />
              </div>
              <div className="h-8 w-1/2 rounded bg-slate-800" />
            </div>
          ))}
        </div>

        {/* Filter bar skeleton */}
        <div className="mb-0 animate-pulse rounded-t-xl border border-b-0 border-slate-800 bg-[#111527] p-4">
          <div className="flex flex-wrap gap-3">
            <div className="h-10 w-64 rounded bg-slate-800" />
            <div className="h-10 w-40 rounded bg-slate-800" />
            <div className="h-10 w-40 rounded bg-slate-800" />
            <div className="h-10 w-40 rounded bg-slate-800" />
          </div>
        </div>

        {/* Table skeleton */}
        <div className="animate-pulse rounded-b-xl border border-slate-800 bg-[#111527]">
          {/* Table header */}
          <div className="border-b border-slate-800 p-4">
            <div className="flex gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 flex-1 rounded bg-slate-800" />
              ))}
            </div>
          </div>
          {/* Table rows */}
          <div className="divide-y divide-slate-800">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="h-4 flex-1 rounded bg-slate-800" />
                <div className="h-4 flex-1 rounded bg-slate-800" />
                <div className="h-6 w-20 rounded-full bg-slate-800" />
                <div className="h-6 w-16 rounded-full bg-slate-800" />
                <div className="h-4 flex-1 rounded bg-slate-800" />
                <div className="h-4 w-24 rounded bg-slate-800" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
