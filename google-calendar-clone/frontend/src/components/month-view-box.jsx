import { useDateStore, useEventStore } from '../lib/store';
import dayjs from 'dayjs';
import React from 'react';
import { EventRenderer } from './event-renderer';

export default function MonthViewBox({ day, rowIndex }) {
  const { openPopover, events } = useEventStore();
  const { setDate } = useDateStore();

  if (!day) {
    return (
      <div className="border" style={{ minHeight: '100px' }}></div>
    );
  }

  const isFirstDayOfMonth = day.date() === 1;
  const isToday = day.format('DD-MM-YY') === dayjs().format('DD-MM-YY');

  const handleClick = (e) => {
    e.preventDefault();
    setDate(day);
    openPopover();
  };

  const isOtherMonth = day.month() !== dayjs().month() || day.year() !== dayjs().year();
  
  return (
    <div
      className="position-relative d-flex flex-column"
      style={{
        minHeight: '120px',
        borderRight: '1px solid var(--google-border)',
        borderBottom: '1px solid var(--google-border)',
        padding: '8px',
        cursor: 'pointer',
        backgroundColor: '#ffffff',
        transition: 'background-color 0.15s',
      }}
      onClick={handleClick}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--google-light-gray)')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
    >
      <div 
        className="d-flex align-items-start justify-content-between mb-1"
        style={{ minHeight: '28px' }}
      >
        {rowIndex === 0 && (
          <div 
            className="text-muted small"
            style={{ 
              fontSize: '11px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: 'var(--google-gray)'
            }}
          >
            {day.format('ddd')}
          </div>
        )}
        <div 
          className={`d-flex align-items-center justify-content-center ${
            isToday ? 'rounded-circle' : ''
          }`}
          style={{
            width: isToday ? '28px' : 'auto',
            height: isToday ? '28px' : 'auto',
            backgroundColor: isToday ? 'var(--google-blue)' : 'transparent',
            color: isToday ? '#ffffff' : isOtherMonth ? '#9aa0a6' : '#202124',
            fontSize: isToday ? '13px' : '13px',
            fontWeight: isToday ? 500 : 400,
            marginLeft: 'auto'
          }}
        >
          {isFirstDayOfMonth ? day.format('MMM D') : day.format('D')}
        </div>
      </div>
      <div style={{ flex: 1, width: '100%', overflow: 'hidden' }}>
        <EventRenderer date={day} view="month" events={events} />
      </div>
    </div>
  );
}

