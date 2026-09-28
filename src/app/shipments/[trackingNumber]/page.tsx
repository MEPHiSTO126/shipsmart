import { Metadata } from 'next';
import { Suspense } from 'react';
import { ShipmentDetailContent } from './ShipmentDetailContent';

interface Props {
  params: Promise<{ trackingNumber: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { trackingNumber } = await params;
  return {
    title: `Shipment ${trackingNumber} | Smart Logistics`,
    description: `Track shipment ${trackingNumber} - view timeline, route progress, and status updates`,
  };
}

export default async function ShipmentDetailPage({ params }: Props) {
  const { trackingNumber } = await params;

  return (
    <div className="min-h-screen">
      <Suspense fallback={<DetailSkeleton />}>
        <ShipmentDetailContent trackingNumber={trackingNumber} />
      </Suspense>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-1/4 rounded bg-slate-800" />
        <div className="h-4 w-1/2 rounded bg-slate-800" />
      </div>
      <div className="animate-pulse space-y-4 rounded-xl border border-slate-800 bg-[#111527] p-6">
        <div className="h-4 w-1/3 rounded bg-slate-800" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 rounded bg-slate-800" />
          ))}
        </div>
      </div>
      <div className="animate-pulse space-y-4 rounded-xl border border-slate-800 bg-[#111527] p-6">
        <div className="h-4 w-1/4 rounded bg-slate-800" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 rounded bg-slate-800" />
          ))}
        </div>
      </div>
    </div>
  );
}
