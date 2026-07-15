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
  {
    id: 'shipment-004',
    trackingNumber: 'SLT-508234',
    customerName: 'Chinedu Eze',
    origin: 'Enugu',
    destination: 'Onitsha',
    status: 'delivered',
    priority: 'express',
    estimatedDelivery: '2026-07-13T18:00:00Z',
    courier: { id: 'courier-22', name: 'Ngozi Okonkwo' },
    lastUpdated: '2026-07-13T17:30:00Z',
  },
  {
    id: 'shipment-005',
    trackingNumber: 'SLT-601789',
    customerName: 'Aisha Bello',
    origin: 'Sokoto',
    destination: 'Kebbi',
    status: 'in_transit',
    priority: 'priority',
    estimatedDelivery: '2026-07-15T10:00:00Z',
    courier: { id: 'courier-25', name: 'Yusuf Danladi' },
    lastUpdated: '2026-07-14T06:20:00Z',
  },
  {
    id: 'shipment-006',
    trackingNumber: 'SLT-709456',
    customerName: 'Tunde Adebayo',
    origin: 'Ibadan',
    destination: 'Oyo',
    status: 'processing',
    priority: 'standard',
    estimatedDelivery: '2026-07-16T14:00:00Z',
    courier: { id: 'courier-28', name: 'Funke Olatunji' },
    lastUpdated: '2026-07-14T08:00:00Z',
  },
  {
    id: 'shipment-007',
    trackingNumber: 'SLT-803112',
    customerName: 'Zainab Garba',
    origin: 'Maiduguri',
    destination: 'Yola',
    status: 'dispatched',
    priority: 'express',
    estimatedDelivery: '2026-07-15T12:00:00Z',
    courier: { id: 'courier-31', name: 'Musa Abubakar' },
    lastUpdated: '2026-07-13T17:00:00Z',
  },
  {
    id: 'shipment-008',
    trackingNumber: 'SLT-906778',
    customerName: 'Obinna Nwosu',
    origin: 'Owerri',
    destination: 'Aba',
    status: 'out_for_delivery',
    priority: 'standard',
    estimatedDelivery: '2026-07-14T12:00:00Z',
    courier: { id: 'courier-34', name: 'Chioma Nwankwo' },
    lastUpdated: '2026-07-14T11:00:00Z',
  },
  {
    id: 'shipment-009',
    trackingNumber: 'SLT-102934',
    customerName: 'Kemi Adeyemi',
    origin: 'Abeokuta',
    destination: 'Ijebu Ode',
    status: 'delayed',
    priority: 'priority',
    estimatedDelivery: '2026-07-15T16:00:00Z',
    courier: { id: 'courier-37', name: 'Seun Ogunleye' },
    lastUpdated: '2026-07-14T07:30:00Z',
  },
  {
    id: 'shipment-010',
    trackingNumber: 'SLT-205667',
    customerName: 'Bashir Mohammed',
    origin: 'Gombe',
    destination: 'Bauchi',
    status: 'delivered',
    priority: 'express',
    estimatedDelivery: '2026-07-12T15:00:00Z',
    courier: { id: 'courier-40', name: 'Hauwa Ibrahim' },
    lastUpdated: '2026-07-12T14:20:00Z',
  },
  {
    id: 'shipment-011',
    trackingNumber: 'SLT-308445',
    customerName: 'Nneka Umeh',
    origin: 'Awka',
    destination: 'Nnewi',
    status: 'in_transit',
    priority: 'standard',
    estimatedDelivery: '2026-07-15T18:00:00Z',
    courier: { id: 'courier-43', name: 'Emeka Onwuka' },
    lastUpdated: '2026-07-14T09:00:00Z',
  },
  {
    id: 'shipment-012',
    trackingNumber: 'SLT-401889',
    customerName: 'Sunday Aku',
    origin: 'Jos',
    destination: 'Pankshin',
    status: 'processing',
    priority: 'priority',
    estimatedDelivery: '2026-07-16T10:00:00Z',
    courier: { id: 'courier-46', name: 'Ruth Pam' },
    lastUpdated: '2026-07-14T04:15:00Z',
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
  'SLT-508234': [
    {
      id: 'event-401',
      status: 'order_received',
      description: 'Shipment order received at Enugu Hub',
      timestamp: '2026-07-12T09:00:00Z',
      location: 'Enugu',
    },
    {
      id: 'event-402',
      status: 'processing',
      description: 'Shipment processed and packaged',
      timestamp: '2026-07-12T11:00:00Z',
      location: 'Enugu',
    },
    {
      id: 'event-403',
      status: 'dispatched',
      description: 'Shipment dispatched from Enugu Hub',
      timestamp: '2026-07-12T15:00:00Z',
      location: 'Enugu',
    },
    {
      id: 'event-404',
      status: 'in_transit',
      description: 'Shipment in transit to Onitsha',
      timestamp: '2026-07-13T08:00:00Z',
      location: 'Route 3',
    },
    {
      id: 'event-405',
      status: 'delivered',
      description: 'Delivered to customer',
      timestamp: '2026-07-13T17:30:00Z',
      location: 'Onitsha',
    },
  ],
  'SLT-601789': [
    {
      id: 'event-501',
      status: 'order_received',
      description: 'Shipment order received at Sokoto Hub',
      timestamp: '2026-07-13T10:00:00Z',
      location: 'Sokoto',
    },
    {
      id: 'event-502',
      status: 'processing',
      description: 'Shipment processed',
      timestamp: '2026-07-13T12:00:00Z',
      location: 'Sokoto',
    },
    {
      id: 'event-503',
      status: 'dispatched',
      description: 'Shipment dispatched from Hub',
      timestamp: '2026-07-13T16:00:00Z',
      location: 'Sokoto',
    },
    {
      id: 'event-504',
      status: 'in_transit',
      description: 'Shipment in transit to Kebbi',
      timestamp: '2026-07-14T06:20:00Z',
      location: 'Route 4',
    },
  ],
  'SLT-709456': [
    {
      id: 'event-601',
      status: 'order_received',
      description: 'Shipment order received at Ibadan Hub',
      timestamp: '2026-07-13T11:00:00Z',
      location: 'Ibadan',
    },
    {
      id: 'event-602',
      status: 'processing',
      description: 'Shipment processed',
      timestamp: '2026-07-13T13:00:00Z',
      location: 'Ibadan',
    },
    {
      id: 'event-603',
      status: 'dispatched',
      description: 'Shipment dispatched from Hub',
      timestamp: '2026-07-13T17:00:00Z',
      location: 'Ibadan',
    },
    {
      id: 'event-604',
      status: 'processing',
      description: 'Awaiting courier pickup',
      timestamp: '2026-07-14T08:00:00Z',
      location: 'Ibadan',
    },
  ],
  'SLT-803112': [
    {
      id: 'event-701',
      status: 'order_received',
      description: 'Shipment order received at Maiduguri Hub',
      timestamp: '2026-07-12T10:00:00Z',
      location: 'Maiduguri',
    },
    {
      id: 'event-702',
      status: 'processing',
      description: 'Shipment processed and packaged',
      timestamp: '2026-07-12T12:00:00Z',
      location: 'Maiduguri',
    },
    {
      id: 'event-703',
      status: 'dispatched',
      description: 'Shipment dispatched from Maiduguri Hub',
      timestamp: '2026-07-13T17:00:00Z',
      location: 'Maiduguri',
    },
  ],
  'SLT-906778': [
    {
      id: 'event-801',
      status: 'order_received',
      description: 'Shipment order received at Owerri Hub',
      timestamp: '2026-07-13T09:00:00Z',
      location: 'Owerri',
    },
    {
      id: 'event-802',
      status: 'processing',
      description: 'Shipment processed',
      timestamp: '2026-07-13T11:00:00Z',
      location: 'Owerri',
    },
    {
      id: 'event-803',
      status: 'dispatched',
      description: 'Shipment dispatched from Hub',
      timestamp: '2026-07-13T15:00:00Z',
      location: 'Owerri',
    },
    {
      id: 'event-804',
      status: 'in_transit',
      description: 'Shipment in transit to Aba',
      timestamp: '2026-07-14T02:00:00Z',
      location: 'Route 5',
    },
    {
      id: 'event-805',
      status: 'out_for_delivery',
      description: 'Out for delivery with Chioma Nwankwo',
      timestamp: '2026-07-14T11:00:00Z',
      location: 'Aba',
    },
  ],
  'SLT-102934': [
    {
      id: 'event-901',
      status: 'order_received',
      description: 'Shipment order received at Abeokuta Hub',
      timestamp: '2026-07-13T09:00:00Z',
      location: 'Abeokuta',
    },
    {
      id: 'event-902',
      status: 'processing',
      description: 'Shipment processed',
      timestamp: '2026-07-13T11:00:00Z',
      location: 'Abeokuta',
    },
    {
      id: 'event-903',
      status: 'dispatched',
      description: 'Shipment dispatched from Hub',
      timestamp: '2026-07-13T15:00:00Z',
      location: 'Abeokuta',
    },
    {
      id: 'event-904',
      status: 'in_transit',
      description: 'Shipment in transit to Ijebu Ode',
      timestamp: '2026-07-14T07:00:00Z',
      location: 'Route 7',
    },
    {
      id: 'event-905',
      status: 'delayed',
      description: 'Shipment delayed due to road construction',
      timestamp: '2026-07-14T07:30:00Z',
      location: 'Route 7',
    },
  ],
  'SLT-205667': [
    {
      id: 'event-1001',
      status: 'order_received',
      description: 'Shipment order received at Gombe Hub',
      timestamp: '2026-07-11T10:00:00Z',
      location: 'Gombe',
    },
    {
      id: 'event-1002',
      status: 'processing',
      description: 'Shipment processed',
      timestamp: '2026-07-11T12:00:00Z',
      location: 'Gombe',
    },
    {
      id: 'event-1003',
      status: 'dispatched',
      description: 'Shipment dispatched from Hub',
      timestamp: '2026-07-11T16:00:00Z',
      location: 'Gombe',
    },
    {
      id: 'event-1004',
      status: 'in_transit',
      description: 'Shipment in transit to Bauchi',
      timestamp: '2026-07-12T08:00:00Z',
      location: 'Route 8',
    },
    {
      id: 'event-1005',
      status: 'delivered',
      description: 'Delivered to customer',
      timestamp: '2026-07-12T14:20:00Z',
      location: 'Bauchi',
    },
  ],
  'SLT-308445': [
    {
      id: 'event-1101',
      status: 'order_received',
      description: 'Shipment order received at Awka Hub',
      timestamp: '2026-07-13T10:00:00Z',
      location: 'Awka',
    },
    {
      id: 'event-1102',
      status: 'processing',
      description: 'Shipment processed and packaged',
      timestamp: '2026-07-13T12:00:00Z',
      location: 'Awka',
    },
    {
      id: 'event-1103',
      status: 'dispatched',
      description: 'Shipment dispatched from Awka Hub',
      timestamp: '2026-07-13T16:00:00Z',
      location: 'Awka',
    },
    {
      id: 'event-1104',
      status: 'in_transit',
      description: 'Shipment in transit to Nnewi',
      timestamp: '2026-07-14T09:00:00Z',
      location: 'Route 9',
    },
  ],
  'SLT-401889': [
    {
      id: 'event-1201',
      status: 'order_received',
      description: 'Shipment order received at Jos Hub',
      timestamp: '2026-07-13T11:00:00Z',
      location: 'Jos',
    },
    {
      id: 'event-1202',
      status: 'processing',
      description: 'Shipment processed',
      timestamp: '2026-07-13T13:00:00Z',
      location: 'Jos',
    },
    {
      id: 'event-1203',
      status: 'dispatched',
      description: 'Shipment dispatched from Hub',
      timestamp: '2026-07-13T17:00:00Z',
      location: 'Jos',
    },
    {
      id: 'event-1204',
      status: 'processing',
      description: 'Awaiting courier pickup',
      timestamp: '2026-07-14T04:15:00Z',
      location: 'Jos',
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

  // 1b. GET /shipments/summary
  http.get('*/api/shipments/summary', () => {
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

    return HttpResponse.json({
      totalShipments,
      inTransitCount,
      delayedCount,
      outForDeliveryCount,
      deliveredCount,
    });
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