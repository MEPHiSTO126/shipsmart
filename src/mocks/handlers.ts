import { http, HttpResponse } from 'msw';

// In-memory mock database of shipments
export const mockShipments = [
  {
    id: 'shipment-001',
    trackingNumber: 'SLT-204891',
    customerName: 'Ada Okafor',
    origin: 'Lagos',
    destination: 'Abuja',
    status: 'in_transit',
    priority: 'express',
    estimatedDelivery: '2026-07-15T16:00:00Z',
    courier: { id: 'courier-12', name: 'David Musa' },
    lastUpdated: '2026-07-13T08:45:00Z',
  },
  {
    id: 'shipment-002',
    trackingNumber: 'SLT-309124',
    customerName: 'Emeka Obi',
    origin: 'Port Harcourt',
    destination: 'Lagos',
    status: 'out_for_delivery',
    priority: 'standard',
    estimatedDelivery: '2026-07-14T14:00:00Z',
    courier: { id: 'courier-15', name: 'Grace Philip' },
    lastUpdated: '2026-07-14T09:15:00Z',
  },
  {
    id: 'shipment-003',
    trackingNumber: 'SLT-402910',
    customerName: 'Fatima Yusuf',
    origin: 'Kano',
    destination: 'Kaduna',
    status: 'delayed',
    priority: 'priority',
    estimatedDelivery: '2026-07-16T12:00:00Z',
    courier: { id: 'courier-18', name: 'Ibrahim Bala' },
    lastUpdated: '2026-07-14T10:00:00Z',
  },
];

interface MockTimelineEvent {
  id: string;
  status: string;
  description: string;
  timestamp: string;
  location: string;
}

// Mock database of timeline events
export const mockEvents: Record<string, MockTimelineEvent[]> = {
  'SLT-204891': [
    {
      id: 'event-101',
      status: 'order_received',
      description: 'Shipment order received at Lagos Hub',
      timestamp: '2026-07-13T08:00:00Z',
      location: 'Lagos',
    },
    {
      id: 'event-102',
      status: 'processing',
      description: 'Shipment processed and packaged',
      timestamp: '2026-07-13T10:30:00Z',
      location: 'Lagos',
    },
    {
      id: 'event-103',
      status: 'dispatched',
      description: 'Shipment dispatched from Lagos Hub',
      timestamp: '2026-07-13T14:00:00Z',
      location: 'Lagos',
    },
    {
      id: 'event-104',
      status: 'in_transit',
      description: 'Shipment in transit to Abuja',
      timestamp: '2026-07-14T08:45:00Z',
      location: 'Route 1',
    },
  ],
  'SLT-309124': [
    {
      id: 'event-201',
      status: 'order_received',
      description: 'Shipment order received at Port Harcourt Hub',
      timestamp: '2026-07-13T09:00:00Z',
      location: 'Port Harcourt',
    },
    {
      id: 'event-202',
      status: 'processing',
      description: 'Shipment processed',
      timestamp: '2026-07-13T11:00:00Z',
      location: 'Port Harcourt',
    },
    {
      id: 'event-203',
      status: 'dispatched',
      description: 'Shipment dispatched from Hub',
      timestamp: '2026-07-13T15:30:00Z',
      location: 'Port Harcourt',
    },
    {
      id: 'event-204',
      status: 'in_transit',
      description: 'Shipment in transit to Lagos',
      timestamp: '2026-07-14T02:00:00Z',
      location: 'Route 2',
    },
    {
      id: 'event-205',
      status: 'out_for_delivery',
      description: 'Out for delivery with Grace Philip',
      timestamp: '2026-07-14T09:15:00Z',
      location: 'Lagos',
    },
  ],
  'SLT-402910': [
    {
      id: 'event-301',
      status: 'order_received',
      description: 'Shipment order received at Kano Hub',
      timestamp: '2026-07-13T10:00:00Z',
      location: 'Kano',
    },
    {
      id: 'event-302',
      status: 'processing',
      description: 'Shipment processed',
      timestamp: '2026-07-13T12:00:00Z',
      location: 'Kano',
    },
    {
      id: 'event-303',
      status: 'dispatched',
      description: 'Shipment dispatched',
      timestamp: '2026-07-13T16:00:00Z',
      location: 'Kano',
    },
    {
      id: 'event-304',
      status: 'delayed',
      description: 'Shipment delayed due to heavy rain',
      timestamp: '2026-07-14T10:00:00Z',
      location: 'Kano',
    },
  ],
};

export const handlers = [
  // 1. GET /shipments
  http.get('*/api/shipments', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const status = url.searchParams.get('status');
    const priority = url.searchParams.get('priority');

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

    return HttpResponse.json(filtered);
  }),

  // 2. GET /shipments/:trackingNumber
  http.get('*/api/shipments/:trackingNumber', ({ params }) => {
    const { trackingNumber } = params;
    const shipment = mockShipments.find(
      (s) => s.trackingNumber === trackingNumber,
    );

    if (!shipment) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Shipment Not Found',
      });
    }

    return HttpResponse.json(shipment);
  }),

  // 3. GET /shipments/:trackingNumber/events
  http.get('*/api/shipments/:trackingNumber/events', ({ params }) => {
    const { trackingNumber } = params;
    const events = mockEvents[trackingNumber as string] || [];

    return HttpResponse.json(events);
  }),

  // 4. PATCH /shipments/:trackingNumber/status
  http.patch(
    '*/api/shipments/:trackingNumber/status',
    async ({ params, request }) => {
      const { trackingNumber } = params;
      const body = (await request.json()) as { status: string };

      const shipmentIndex = mockShipments.findIndex(
        (s) => s.trackingNumber === trackingNumber,
      );
      if (shipmentIndex === -1) {
        return new HttpResponse(null, {
          status: 404,
          statusText: 'Shipment Not Found',
        });
      }

      // Update status in mock memory database
      mockShipments[shipmentIndex] = {
        ...mockShipments[shipmentIndex],
        status: body.status,
        lastUpdated: new Date().toISOString(),
      };

      // Append a new event to the timeline
      if (!mockEvents[trackingNumber as string]) {
        mockEvents[trackingNumber as string] = [];
      }
      mockEvents[trackingNumber as string].push({
        id: `event-${Date.now()}`,
        status: body.status,
        description: `Status advanced to ${body.status.replace('_', ' ')}`,
        timestamp: new Date().toISOString(),
        location: mockShipments[shipmentIndex].destination,
      });

      return HttpResponse.json(mockShipments[shipmentIndex]);
    },
  ),
];
