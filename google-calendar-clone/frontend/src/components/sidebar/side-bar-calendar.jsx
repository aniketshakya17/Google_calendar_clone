import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { getWeeks } from '../../lib/getTime';
import { useDateStore } from '../../lib/store';

export default function SideBarCalendar() {
  const { setMonth, selectedMonthIndex, twoDMonthArray } = useDateStore();

  // Ensure month index stays within [0, 11]
  const handleMonthChange = (newMonth) => {
    if (newMonth < 0) {
      setMonth(11); // December
    } else if (newMonth > 11) {
      setMonth(0); // January
    } else {
      setMonth(newMonth);
    }
  };

  const currentMonth = dayjs(new Date(dayjs().year(), selectedMonthIndex));

  return (
    <div className="my-4 p-2">
      {/* Header with month and navigation */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h6 className="mb-0 small">
          {currentMonth.format('MMMM YYYY')}
        </h6>
        <div className="d-flex align-items-center gap-2">
          <MdKeyboardArrowLeft
            size={20}
            style={{ cursor: 'pointer' }}
            onClick={() => handleMonthChange(selectedMonthIndex - 1)}
          />
          <MdKeyboardArrowRight
            size={20}
            style={{ cursor: 'pointer' }}
            onClick={() => handleMonthChange(selectedMonthIndex + 1)}
          />
        </div>
      </div>

      {/* Days of week header */}
      <div className="row g-1 mb-2">
        <div className="col-12 d-flex justify-content-between">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <span key={i} className="text-center small flex-fill">
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div className="d-flex flex-column gap-1">
        {twoDMonthArray.map((row, i) => (
          <div key={i} className="d-flex justify-content-between">
            {row.map((day, index) => {
              const isToday = day.format('DD-MM-YY') === dayjs().format('DD-MM-YY');
              return (
                <button
                  key={index}
                  className={`btn btn-sm p-0 rounded-circle ${
                    isToday ? 'bg-primary text-white' : 'btn-light'
                  }`}
                  style={{
                    width: '28px',
                    height: '28px',
                    fontSize: '10px',
                  }}
                >
                  {day.format('D')}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
