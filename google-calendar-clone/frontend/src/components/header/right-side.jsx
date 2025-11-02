import React from 'react';
import { useViewStore } from '../../lib/store';

export default function HeaderRight() {
  const { selectedView, setView } = useViewStore();

  const views = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' }
  ];

  return (
    <div className="d-flex align-items-center" style={{ gap: '16px' }}>
      <div 
        className="d-flex"
        style={{
          border: '1px solid var(--google-border)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}
      >
        {views.map((view) => (
          <button
            key={view.value}
            onClick={() => setView(view.value)}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 500,
              border: 'none',
              backgroundColor: selectedView === view.value ? 'var(--google-blue)' : '#ffffff',
              color: selectedView === view.value ? '#ffffff' : 'var(--google-gray)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderRight: view.value !== 'month' ? '1px solid var(--google-border)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (selectedView !== view.value) {
                e.currentTarget.style.backgroundColor = 'var(--google-light-gray)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedView !== view.value) {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }
            }}
          >
            {view.label}
          </button>
        ))}
      </div>
    </div>
  );
}

