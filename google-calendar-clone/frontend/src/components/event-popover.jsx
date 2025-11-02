import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import {
  HiOutlineMenuAlt2,
  HiOutlineMenuAlt4,
  HiOutlineUsers,
} from 'react-icons/hi';
import { IoCloseSharp } from 'react-icons/io5';
import { IoMdCalendar } from 'react-icons/io';
import { FiClock } from 'react-icons/fi';
import AddTime from './add-time';
import { api } from '../lib/api';
import { useEventStore } from '../lib/store';

export default function EventPopover({ isOpen, onClose, date }) {
  const popoverRef = useRef(null);
  const [selectedTime, setSelectedTime] = useState('00:00');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refreshEvents } = useEventStore();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target)
      ) {
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

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  const handlePopoverClick = (e) => {
    e.stopPropagation();
  };

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    const formData = new FormData(e.target);
    const title = formData.get('title');
    const description = formData.get('description');
    const eventDate = formData.get('date');
    const time = formData.get('time');

    try {
      await api.createEvent({
        title,
        description,
        date: eventDate,
        time,
      });
      setSuccess(true);
      refreshEvents();
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 1050, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleClose}
    >
      <div
        ref={popoverRef}
        className="bg-white rounded shadow-lg w-100"
        style={{ maxWidth: '500px' }}
        onClick={handlePopoverClick}
      >
        <div className="d-flex align-items-center justify-content-between bg-light rounded-top p-2">
          <HiOutlineMenuAlt4 />
          <button
            className="btn btn-sm btn-link p-1"
            type="button"
            onClick={handleClose}
          >
            <IoCloseSharp size={16} />
          </button>
        </div>
        <form className="p-4" onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              className="form-control form-control-lg border-0 border-bottom rounded-0 fs-4"
              placeholder="Add title"
              style={{ borderBottom: '2px solid transparent !important' }}
              onFocus={(e) => (e.target.style.borderBottomColor = '#0d6efd')}
              onBlur={(e) => (e.target.style.borderBottomColor = 'transparent')}
              required
            />
          </div>
          <div className="d-flex gap-2 mb-3">
            <button className="btn btn-light text-primary" type="button">
              Event
            </button>
            
           
          </div>

          <div className="d-flex align-items-center gap-3 mb-3">
            <FiClock size={20} className="text-muted" />
            <div className="d-flex align-items-center gap-3 small">
              <p className="mb-0">{dayjs(date).format('dddd, MMMM D')}</p>
              <AddTime onTimeSelect={setSelectedTime} />
              <input type="hidden" name="date" value={date} />
              <input type="hidden" name="time" value={selectedTime} />
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 mb-3">
            <HiOutlineUsers size={20} className="text-muted" />
            <input
              type="text"
              name="guests"
              className="form-control bg-light border-0"
              placeholder="Add guests"
            />
          </div>

          <div className="d-flex align-items-center gap-3 mb-3">
            <HiOutlineMenuAlt2 size={20} className="text-muted" />
            <input
              type="text"
              name="description"
              className="form-control bg-light border-0"
              placeholder="Add description"
              required
            />
          </div>



          <div className="d-flex justify-content-end gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>

          {error && <p className="text-danger mt-2">{error}</p>}
          {success && <p className="text-success mt-2">Success!</p>}
        </form>
      </div>
    </div>
  );
}

