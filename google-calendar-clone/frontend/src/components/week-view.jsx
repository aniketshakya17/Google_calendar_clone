import { getHours, getWeekDays } from '../lib/getTime';
import { useDateStore, useEventStore } from '../lib/store';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { EventRenderer } from './event-renderer';

export default function WeekView() {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const { openPopover, events } = useEventStore();
  const { userSelectedDate, setDate } = useDateStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getCurrentTimePosition = (dayDate) => {
    if (!currentTime.isSame(dayDate, 'day')) {
      return null;
    }
    const hours = currentTime.hour();
    const minutes = currentTime.minute();
    return (hours * 60 + minutes) * (64 / 60); // 64px per hour
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: 'calc(100vh - 64px)' }}>
      {/* Week header */}
      <div 
        className="row g-0"
        style={{
          borderBottom: '1px solid var(--google-border)',
          backgroundColor: '#ffffff'
        }}
      >
        <div 
          className="col-auto"
          style={{ 
            width: '80px',
            borderRight: '1px solid var(--google-border)',
            padding: '8px'
          }}
        >
          <div style={{ fontSize: '10px', color: 'var(--google-gray)', fontWeight: 500 }}>
            GMT +2
          </div>
        </div>

        {getWeekDays(userSelectedDate).map(({ currentDate, today }, index) => (
          <div 
            key={index} 
            className="col d-flex flex-column align-items-center"
            style={{
              borderRight: index < 6 ? '1px solid var(--google-border)' : 'none',
              padding: '8px 4px'
            }}
          >
            <div 
              style={{
                fontSize: '11px',
                fontWeight: 500,
                color: today ? 'var(--google-blue)' : 'var(--google-gray)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '4px'
              }}
            >
              {currentDate.format('ddd')}
            </div>
            <div
              className={`rounded-circle d-flex align-items-center justify-content-center ${
                today ? '' : ''
              }`}
              style={{
                width: today ? '48px' : 'auto',
                height: today ? '48px' : 'auto',
                backgroundColor: today ? 'var(--google-blue)' : 'transparent',
                color: today ? '#ffffff' : '#202124',
                fontSize: today ? '18px' : '18px',
                fontWeight: today ? 500 : 400
              }}
            >
              {currentDate.format('D')}
            </div>
          </div>
        ))}
      </div>

      {/* Week grid */}
      <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
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

          {/* Days columns */}
          {getWeekDays(userSelectedDate).map(
            ({ isCurrentDay, today }, index) => {
              const dayDate = userSelectedDate.startOf('week').add(index, 'day');
              const currentTimePos = today && isCurrentDay(dayDate) ? getCurrentTimePosition(dayDate) : null;

              return (
                <div 
                  key={index} 
                  className="col position-relative"
                  style={{
                    borderRight: index < 6 ? '1px solid var(--google-border)' : 'none'
                  }}
                >
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
                        padding: '2px 4px'
                      }}
                      onClick={() => {
                        setDate(dayDate.hour(hour.hour()).minute(0));
                        openPopover();
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--google-light-gray)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                    >
                      <EventRenderer
                        events={events}
                        date={dayDate.hour(hour.hour())}
                        view="week"
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
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

