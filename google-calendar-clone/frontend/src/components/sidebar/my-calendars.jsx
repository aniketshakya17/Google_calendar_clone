import React, { useState } from 'react';

const myCalendars = [
  { id: 'cal1', title: 'Work', color: '#dc3545' },
  { id: 'cal2', title: 'Personal', color: '#0d6efd' },
  { id: 'cal3', title: 'Fitness', color: '#198754' },
];

export default function MyCalendars() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ marginTop: '16px' }}>
      <button
        className="btn btn-link w-100 d-flex justify-content-between align-items-center p-2"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          textDecoration: 'none',
          color: '#202124',
          fontSize: '13px',
          fontWeight: 500,
          padding: '8px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: 'transparent'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--google-light-gray)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <span>My calendars</span>
        <span style={{ fontSize: '12px', color: 'var(--google-gray)' }}>
          {isOpen ? '▼' : '▶'}
        </span>
      </button>
      {isOpen && (
        <div style={{ paddingLeft: '8px', marginTop: '4px' }}>
          {myCalendars.map((cal) => (
            <div 
              className="d-flex align-items-center gap-2"
              key={cal.id}
              style={{
                padding: '6px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '2px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--google-light-gray)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <input
                type="checkbox"
                id={cal.id}
                defaultChecked
                style={{ 
                  accentColor: cal.color,
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer',
                  margin: 0
                }}
              />
              <label 
                htmlFor={cal.id} 
                style={{
                  fontSize: '13px',
                  color: '#202124',
                  cursor: 'pointer',
                  margin: 0,
                  flex: 1
                }}
              >
                {cal.title}
              </label>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '2px',
                  backgroundColor: cal.color,
                  border: '1px solid rgba(0,0,0,0.1)'
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

