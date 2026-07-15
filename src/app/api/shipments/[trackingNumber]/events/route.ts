import { NextRequest, NextResponse } from 'next/server';
import { mockEvents } from '@/mocks/handlers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> },
) {
  const { trackingNumber } = await params;
  const events = mockEvents[trackingNumber] || [];

  return NextResponse.json(events);
}
