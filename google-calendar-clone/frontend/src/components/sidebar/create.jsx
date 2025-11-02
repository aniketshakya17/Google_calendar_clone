import React, { useCallback, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useDateStore } from '../../lib/store';
import EventPopover from '../event-popover';
import { SvgIcons } from '../svg-icons';

export default function Create() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { userSelectedDate } = useDateStore();

  const handleOpenPopover = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPopoverOpen(true);
  }, []);

  const handleClosePopover = useCallback(() => {
    setIsPopoverOpen(false);
  }, []);

  return (
    <>
      <button
        className="btn w-100 d-flex justify-content-start align-items-center mb-3"
        onClick={handleOpenPopover}
        style={{
          borderRadius: '24px',
          padding: '12px 16px',
          backgroundColor: 'var(--google-blue)',
          color: '#ffffff',
          border: 'none',
          fontSize: '14px',
          fontWeight: 500,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          transition: 'box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.16), 0 2px 4px rgba(0,0,0,0.23)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';
        }}
      >
        <SvgIcons.googleCreate className="me-2" style={{ width: '20px', height: '20px' }} />
        <span style={{ flex: 1, textAlign: 'left' }}>Create</span>
        <ChevronDown size={16} />
      </button>
      {isPopoverOpen && (
        <EventPopover
          isOpen={isPopoverOpen}
          onClose={handleClosePopover}
          date={userSelectedDate.format('YYYY-MM-DD')}
        />
      )}
    </>
  );
}

