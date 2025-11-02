import React, { useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { IoCloseSharp } from 'react-icons/io5';

export function EventSummaryPopover({ isOpen, onClose, event }) {
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 1040, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        ref={popoverRef}
        className="bg-white rounded shadow-lg w-100 p-4"
        style={{ maxWidth: '500px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="h4 mb-0 fw-semibold">Event Summary</h2>
          <button className="btn btn-sm btn-link p-1" onClick={onClose}>
            <IoCloseSharp size={16} />
          </button>
        </div>
        <div>
          <p className="mb-2">
            <strong>Title:</strong> {event.title}
          </p>
          <p className="mb-0">
            <strong>Date:</strong>{' '}
            {dayjs(event.date).format('dddd, MMMM D, YYYY h:mm A')}
          </p>
          {event.description && (
            <p className="mb-0 mt-2">
              <strong>Description:</strong> {event.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

