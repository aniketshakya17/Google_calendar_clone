import React from 'react';
import { Menu } from 'lucide-react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useDateStore, useToggleSideBarStore, useViewStore } from '../../lib/store';
import dayjs from 'dayjs';

export default function HeaderLeft() {
  const todaysDate = dayjs();
  const { userSelectedDate, setDate, setMonth, selectedMonthIndex } =
    useDateStore();

  const { setSideBarOpen } = useToggleSideBarStore();
  const { selectedView } = useViewStore();

  const handleTodayClick = () => {
    switch (selectedView) {
      case 'month':
        setMonth(dayjs().month());
        break;
      case 'week':
        setDate(todaysDate);
        break;
      case 'day':
        setDate(todaysDate);
        setMonth(dayjs().month());
        break;
      default:
        break;
    }
  };

  const handlePrevClick = () => {
    switch (selectedView) {
      case 'month':
        setMonth(selectedMonthIndex - 1);
        break;
      case 'week':
        setDate(userSelectedDate.subtract(1, 'week'));
        break;
      case 'day':
        setDate(userSelectedDate.subtract(1, 'day'));
        break;
      default:
        break;
    }
  };

  const handleNextClick = () => {
    switch (selectedView) {
      case 'month':
        setMonth(selectedMonthIndex + 1);
        break;
      case 'week':
        setDate(userSelectedDate.add(1, 'week'));
        break;
      case 'day':
        setDate(userSelectedDate.add(1, 'day'));
        break;
      default:
        break;
    }
  };

  const getCurrentDateLabel = () => {
    switch (selectedView) {
      case 'month':
        return dayjs(new Date(dayjs().year(), selectedMonthIndex)).format('MMMM YYYY');
      case 'week':
        const weekStart = userSelectedDate.startOf('week');
        const weekEnd = userSelectedDate.endOf('week');
        if (weekStart.month() === weekEnd.month()) {
          return `${weekStart.format('MMM D')} – ${weekEnd.format('D, YYYY')}`;
        }
        return `${weekStart.format('MMM D')} – ${weekEnd.format('MMM D, YYYY')}`;
      case 'day':
        return userSelectedDate.format('dddd, MMMM D, YYYY');
      default:
        return '';
    }
  };

  return (
    <div className="d-flex align-items-center" style={{ gap: '24px' }}>
      <div className="d-none d-lg-flex align-items-center" style={{ gap: '8px' }}>
        <button
          className="btn btn-link p-2"
          onClick={() => setSideBarOpen()}
          style={{
            borderRadius: '50%',
            color: 'var(--google-gray)',
            minWidth: '40px',
            minHeight: '40px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--google-light-gray)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Menu size={20} />
        </button>
        <img
          src={`/img/calendar_${todaysDate.date().toString()}_2x.png`}
          width={40}
          height={40}
          alt="icon"
          style={{ marginLeft: '8px' }}
        />
        <h1 
          className="mb-0"
          style={{
            fontSize: '22px',
            fontWeight: 400,
            color: '#202124',
            marginLeft: '8px'
          }}
        >
          Calendar
        </h1>
      </div>

      <div className="d-flex align-items-center" style={{ gap: '8px' }}>
        <button 
          className="btn-google"
          onClick={handleTodayClick}
          style={{ fontSize: '14px', fontWeight: 500 }}
        >
          Today
        </button>

        <div className="d-flex align-items-center" style={{ gap: '0' }}>
          <button
            className="btn btn-link p-2"
            onClick={handlePrevClick}
            style={{
              borderRadius: '4px',
              color: 'var(--google-gray)',
              minWidth: '36px',
              minHeight: '36px',
              padding: '8px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--google-light-gray)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <MdKeyboardArrowLeft size={20} />
          </button>
          <button
            className="btn btn-link p-2"
            onClick={handleNextClick}
            style={{
              borderRadius: '4px',
              color: 'var(--google-gray)',
              minWidth: '36px',
              minHeight: '36px',
              padding: '8px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--google-light-gray)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <MdKeyboardArrowRight size={20} />
          </button>
        </div>

        <h2 
          className="mb-0 d-none d-md-block"
          style={{
            fontSize: '22px',
            fontWeight: 400,
            color: '#202124',
            marginLeft: '16px',
            minWidth: '200px'
          }}
        >
          {getCurrentDateLabel()}
        </h2>
      </div>
    </div>
  );
}

