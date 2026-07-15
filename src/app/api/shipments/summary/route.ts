import { NextResponse } from 'next/server';
import { mockShipments } from '@/mocks/handlers';

export async function GET() {
  const totalShipments = mockShipments.length;
  const inTransitCount = mockShipments.filter(
    (s) => s.status === 'in_transit',
  ).length;
  const delayedCount = mockShipments.filter(
    (s) => s.status === 'delayed',
  ).length;
  const outForDeliveryCount = mockShipments.filter(
    (s) => s.status === 'out_for_delivery',
  ).length;
  const deliveredCount = mockShipments.filter(
    (s) => s.status === 'delivered',
  ).length;

  return NextResponse.json({
    totalShipments,
    inTransitCount,
    delayedCount,
    outForDeliveryCount,
    deliveredCount,
  });
}
