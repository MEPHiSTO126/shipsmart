import { TimelineEvent } from '@/features/shipment-tracking/domain/entities/timeline-event';
import { motion } from 'framer-motion';
import { STATUS_ICONS } from '@/features/shipment-tracking/presentation/components/RouteProgressVisual';

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  if (!events.length) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h2>
        <div className="text-center py-8 text-gray-500">
          No timeline events available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Activity Timeline</h2>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
        <div className="space-y-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="relative flex gap-4">
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                  <div className={`w-5 h-5 flex items-center justify-center ${
                    event.status === 'delivered' ? 'text-green-600' :
                    event.status === 'delayed' ? 'text-red-600' :
                    event.status === 'delivery_failed' ? 'text-red-600' :
                    event.status === 'out_for_delivery' ? 'text-amber-600' :
                    event.status === 'in_transit' ? 'text-blue-600' :
                    'text-gray-500'
                  }`}>
                    {STATUS_ICONS[event.status] || (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 13l4-4-4-4m0 8l4-4-4-4" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-gray-900 capitalize">
                        {event.status.replace('_', ' ')}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(event.timestamp).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.timestamp).toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}