export interface TimelineEvent {
  readonly id: string;
  readonly status: ShipmentStatus;
  readonly description: string;
  readonly timestamp: Date; // Domain uses Date, not string
  readonly location: string;
}

import { ShipmentStatus } from '../value-objects/status-transition';

export function createTimelineEvent(data: {
  id: string;
  status: ShipmentStatus;
  description: string;
  timestamp: string | Date; // Accept ISO string or Date
  location: string;
}): TimelineEvent {
  return Object.freeze({
    id: data.id,
    status: data.status,
    description: data.description,
    timestamp:
      data.timestamp instanceof Date
        ? data.timestamp
        : new Date(data.timestamp),
    location: data.location,
  });
}

// Sort: oldest first (chronological)
export function sortTimelineEventsAsc(
  events: TimelineEvent[],
): TimelineEvent[] {
  return [...events].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
  );
}

// Sort: newest first (for UI display)
export function sortTimelineEventsDesc(
  events: TimelineEvent[],
): TimelineEvent[] {
  return [...events].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
  );
}

export function getLatestEvent(
  events: TimelineEvent[],
): TimelineEvent | undefined {
  return sortTimelineEventsDesc(events)[0];
}
