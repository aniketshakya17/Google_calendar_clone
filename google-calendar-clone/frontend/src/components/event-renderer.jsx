import { useEventStore } from '../lib/store';
import dayjs from 'dayjs';
import React from 'react';

export function EventRenderer({ date, view, events }) {
  const { openEventSummary } = useEventStore();

  const filteredEvents = events.filter((event) => {
    if (view === 'month') {
      return event.date.format('DD-MM-YY') === date.format('DD-MM-YY');
    } else if (view === 'week' || view === 'day') {
      return event.date.format('DD-MM-YY HH') === date.format('DD-MM-YY HH');
    }
    return false;
  });

  // Google Calendar event colors
  const eventColors = [
    'var(--event-blue)',
    'var(--event-green)',
    'var(--event-orange)',
    'var(--event-purple)',
    'var(--event-pink)',
  ];

  const getEventColor = (eventId) => {
    // Simple hash to get consistent color per event
    const hash = eventId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return eventColors[hash % eventColors.length];
  };

  return (
    <>
      {filteredEvents.slice(0, view === 'month' ? 3 : 10).map((event, index) => {
        const eventColor = getEventColor(event.id);
        const isFullDay = !event.date.format('HH:mm') || event.date.format('HH:mm') === '00:00';
        
        return (
          <div
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              openEventSummary(event);
            }}
            style={{
              cursor: 'pointer',
              marginBottom: '2px',
              padding: view === 'month' ? '2px 6px' : '4px 8px',
              backgroundColor: eventColor,
              color: '#ffffff',
              borderRadius: '4px',
              fontSize: view === 'month' ? '12px' : '13px',
              fontWeight: 400,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '100%',
              transition: 'opacity 0.15s, box-shadow 0.15s',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.85';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
            }}
            title={event.title}
          >
            {view === 'month' && !isFullDay && (
              <span style={{ marginRight: '4px', fontSize: '11px' }}>
                {event.date.format('HH:mm')}
              </span>
            )}
            {view === 'month' && filteredEvents.length > 3 && index === 2 && (
              <span>+{filteredEvents.length - 3} more</span>
            )}
            {!(view === 'month' && filteredEvents.length > 3 && index === 2) && event.title}
          </div>
        );
      })}
      {view === 'month' && filteredEvents.length > 3 && (
        <div
          style={{
            fontSize: '12px',
            color: 'var(--google-gray)',
            padding: '2px 6px',
            cursor: 'pointer',
            marginTop: '2px'
          }}
          onClick={(e) => {
            e.stopPropagation();
            // Could open a modal showing all events for this day
          }}
        >
          +{filteredEvents.length - 3} more
        </div>
      )}
    </>
  );
}

