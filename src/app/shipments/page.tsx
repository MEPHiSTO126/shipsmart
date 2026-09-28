'use client';

import { Suspense } from 'react';
import { ShipmentsContent } from './ShipmentsContent';
import { StatCardSkeleton, TableRowSkeleton } from '@/components/ui/Skeleton';

export default function ShipmentsPage() {
  return (
    <div className="min-h-screen">
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
          <StatCardSkeleton key={i} />
        ))}
      </div>
      <div className="rounded-xl border border-stone-800 bg-[#1c1917] p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-800">
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-stone-400 uppercase">
                  Tracking #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-stone-400 uppercase">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-stone-400 uppercase">
                  Origin
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-stone-400 uppercase">
                  Destination
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-stone-400 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-stone-400 uppercase">
                  Est. Delivery
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-stone-400 uppercase">
                  Courier
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-stone-400 uppercase">
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-stone-400 uppercase">
                  Last Update
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <TableRowSkeleton key={i} columns={9} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}