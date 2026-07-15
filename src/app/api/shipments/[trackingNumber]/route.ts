import { NextRequest, NextResponse } from 'next/server';
import { mockShipments } from '@/mocks/handlers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> },
) {
  const { trackingNumber } = await params;
  const shipment = mockShipments.find(
    (s) => s.trackingNumber === trackingNumber,
  );

  if (!shipment) {
    return new NextResponse('Shipment Not Found', { status: 404 });
  }

  return NextResponse.json(shipment);
}
