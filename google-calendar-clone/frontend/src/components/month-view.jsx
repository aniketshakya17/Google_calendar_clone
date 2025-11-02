import React, { Fragment } from 'react';
import MonthViewBox from './month-view-box';
import { useDateStore } from '../lib/store';

export default function MonthView() {
  const { twoDMonthArray } = useDateStore();
  
  return (
    <section style={{ 
      backgroundColor: '#ffffff',
      minHeight: 'calc(100vh - 64px)'
    }}>
      {/* Calendar grid */}
      <div>
        {twoDMonthArray.map((row, i) => (
          <div key={i} className="row g-0">
            {row.map((day, index) => (
              <div 
                key={`${i}-${index}`} 
                style={{ 
                  minWidth: 'calc(100% / 7)',
                  width: 'calc(100% / 7)'
                }}
              >
                <MonthViewBox day={day} rowIndex={i} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

