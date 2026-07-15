import { z } from 'zod';

export const CourierApiSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

export type CourierApi = z.infer<typeof CourierApiSchema>;

export const TimelineEventApiSchema = z.object({
  id: z.string().min(1),
  status: z.string().min(1),
  description: z.string().min(1),
  timestamp: z.string().datetime({ offset: true }),
  location: z.string().min(1),
});

export type TimelineEventApi = z.infer<typeof TimelineEventApiSchema>;

export const ShipmentApiSchema = z.object({
  id: z.string().min(1),
  trackingNumber: z.string().regex(/^SLT-\d{6}$/i),
  customerName: z.string().min(1),
  origin: z.string().min(1),
  destination: z.string().min(1),
  status: z.string().min(1),
  priority: z.enum(['standard', 'express', 'priority']),
  estimatedDelivery: z.string().datetime({ offset: true }),
  courier: CourierApiSchema,
  lastUpdated: z.string().datetime({ offset: true }),
});

export type ShipmentApi = z.infer<typeof ShipmentApiSchema>;

export const ShipmentSummaryApiSchema = z.object({
  totalShipments: z.number().int().nonnegative(),
  inTransitCount: z.number().int().nonnegative(),
  delayedCount: z.number().int().nonnegative(),
  outForDeliveryCount: z.number().int().nonnegative(),
  deliveredCount: z.number().int().nonnegative(),
});

export type ShipmentSummaryApi = z.infer<typeof ShipmentSummaryApiSchema>;

export const StatusUpdateRequestSchema = z.object({
  status: z.string().min(1),
});

export type StatusUpdateRequest = z.infer<typeof StatusUpdateRequestSchema>;

export const StatusUpdateResponseSchema = ShipmentApiSchema;

export type StatusUpdateResponse = z.infer<typeof StatusUpdateResponseSchema>;

export function validateShipment(data: unknown): ShipmentApi {
  return ShipmentApiSchema.parse(data);
}

export function validateShipments(data: unknown): ShipmentApi[] {
  return z.array(ShipmentApiSchema).parse(data);
}

export function validateTimelineEvents(data: unknown): TimelineEventApi[] {
  return z.array(TimelineEventApiSchema).parse(data);
}

export function validateShipmentSummary(data: unknown): ShipmentSummaryApi {
  return ShipmentSummaryApiSchema.parse(data);
}

export function validateStatusUpdateRequest(
  data: unknown,
): StatusUpdateRequest {
  return StatusUpdateRequestSchema.parse(data);
}

export function validateStatusUpdateResponse(data: unknown): ShipmentApi {
  return ShipmentApiSchema.parse(data);
}
