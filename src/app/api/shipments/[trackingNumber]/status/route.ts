import { NextRequest, NextResponse } from 'next/server';
import { mockShipments, mockEvents } from '@/mocks/handlers';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> },
) {
  const { trackingNumber } = await params;
  const { status } = await request.json();

  const shipmentIndex = mockShipments.findIndex(
    (s) => s.trackingNumber === trackingNumber,
  );
  if (shipmentIndex === -1) {
    return new NextResponse('Shipment Not Found', { status: 404 });
  }

  mockShipments[shipmentIndex] = {
    ...mockShipments[shipmentIndex],
    status,
    lastUpdated: new Date().toISOString(),
  };

  if (!mockEvents[trackingNumber]) {
    mockEvents[trackingNumber] = [];
  }
  mockEvents[trackingNumber].push({
    id: `event-${Date.now()}`,
    status,
    description: `Status advanced to ${status.replace('_', ' ')}`,
    timestamp: new Date().toISOString(),
    location: mockShipments[shipmentIndex].destination,
  });

  return NextResponse.json(mockShipments[shipmentIndex]);
}
