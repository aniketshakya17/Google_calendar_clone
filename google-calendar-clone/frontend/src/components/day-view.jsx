import { useDateStore, useEventStore } from '../lib/store';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { getHours, isCurrentDay } from '../lib/getTime';
import { EventRenderer } from './event-renderer';

export default function DayView() {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const { openPopover, events } = useEventStore();
  const { userSelectedDate, setDate } = useDateStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const isToday =
    userSelectedDate.format('DD-MM-YY') === dayjs().format('DD-MM-YY');

  const getCurrentTimePosition = () => {
    if (!isToday) return null;
    const hours = currentTime.hour();
    const minutes = currentTime.minute();
    return (hours * 60 + minutes) * (64 / 60); // 64px per hour
  };

  const currentTimePos = getCurrentTimePosition();

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: 'calc(100vh - 64px)' }}>
      {/* Day header */}
      <div 
        className="row g-0"
        style={{
          borderBottom: '1px solid var(--google-border)',
          backgroundColor: '#ffffff',
          padding: '16px'
        }}
      >
        <div 
          className="col-auto d-flex flex-column align-items-center"
          style={{ 
            minWidth: '120px',
            paddingRight: '24px'
          }}
        >
          <div 
            style={{
              fontSize: '11px',
              fontWeight: 500,
              color: isToday ? 'var(--google-blue)' : 'var(--google-gray)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '8px'
            }}
          >
            {userSelectedDate.format('ddd')}
          </div>
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: isToday ? '56px' : '56px',
              height: isToday ? '56px' : '56px',
              backgroundColor: isToday ? 'var(--google-blue)' : 'transparent',
              color: isToday ? '#ffffff' : '#202124',
              fontSize: '24px',
              fontWeight: isToday ? 500 : 400
            }}
          >
            {userSelectedDate.format('D')}
          </div>
          <div 
            style={{
              fontSize: '14px',
              color: 'var(--google-gray)',
              marginTop: '8px',
              fontWeight: 400
            }}
          >
            {userSelectedDate.format('MMMM YYYY')}
          </div>
        </div>
        <div className="col"></div>
      </div>

      {/* Day grid */}
      <div style={{ maxHeight: 'calc(100vh - 280px)', overflowY: 'auto' }}>
        <div className="row g-0">
          {/* Time column */}
          <div 
            className="col-auto"
            style={{ 
              width: '80px',
              borderRight: '1px solid var(--google-border)',
              paddingRight: '8px'
            }}
          >
            {getHours.map((hour, index) => (
              <div 
                key={index} 
                className="position-relative"
                style={{ 
                  height: '64px',
                  paddingRight: '8px',
                  textAlign: 'right'
                }}
              >
                <div 
                  style={{ 
                    fontSize: '12px',
                    color: 'var(--google-gray)',
                    marginTop: '-6px',
                    fontWeight: 400
                  }}
                >
                  {hour.format('h A').toLowerCase()}
                </div>
              </div>
            ))}
          </div>

          {/* Day column */}
          <div className="col position-relative">
            {getHours.map((hour, i) => (
              <div
                key={i}
                className="position-relative"
                style={{
                  height: '64px',
                  borderBottom: '1px solid var(--google-border)',
                  cursor: 'pointer',
                  backgroundColor: '#ffffff',
                  transition: 'background-color 0.15s',
                  padding: '2px 8px'
                }}
                onClick={() => {
                  setDate(userSelectedDate.hour(hour.hour()).minute(0));
                  openPopover();
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--google-light-gray)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
              >
                <EventRenderer
                  events={events}
                  date={userSelectedDate.hour(hour.hour())}
                  view="day"
                />
              </div>
            ))}

            {/* Current time indicator */}
            {currentTimePos !== null && (
              <>
                <div
                  className="position-absolute start-0 end-0"
                  style={{
                    height: '2px',
                    top: `${currentTimePos}px`,
                    backgroundColor: 'var(--google-red)',
                    zIndex: 10
                  }}
                >
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--google-red)',
                      border: '2px solid #ffffff',
                      position: 'absolute',
                      left: '-6px',
                      top: '-5px'
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

