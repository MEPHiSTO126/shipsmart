import { NextRequest, NextResponse } from 'next/server';
import { mockShipments } from '@/mocks/handlers';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const status = searchParams.get('status');
  const priority = searchParams.get('priority');

  let filtered = [...mockShipments];

  if (search) {
    const lower = search.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.trackingNumber.toLowerCase().includes(lower) ||
        s.customerName.toLowerCase().includes(lower),
    );
  }

  if (status) {
    filtered = filtered.filter((s) => s.status === status);
  }

  if (priority) {
    filtered = filtered.filter((s) => s.priority === priority);
  }

  return NextResponse.json(filtered);
}
