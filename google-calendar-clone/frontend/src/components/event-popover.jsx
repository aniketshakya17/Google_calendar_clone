import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseSharp } from 'react-icons/io5';
import { HiOutlineMenuAlt2, HiOutlineUsers, HiOutlineMenuAlt4 } from 'react-icons/hi';
import { api } from '../lib/api';
import { useEventStore } from '../lib/store';

export default function EventPopover({ isOpen, onClose, date }) {
  const popoverRef = useRef(null);
  const [eventDateTime, setEventDateTime] = useState(dayjs(date).format('YYYY-MM-DDTHH:mm'));
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refreshEvents } = useEventStore();

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    const formData = new FormData(e.target);
    const title = formData.get('title');
    const description = formData.get('description');
    const datetime = formData.get('datetime');

    try {
      await api.createEvent({
        title,
        description,
        date: datetime,
      });
      setSuccess(true);
      refreshEvents();
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            zIndex: 1050,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(5px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={popoverRef}
            className="bg-white rounded-4 shadow-lg p-4 w-100"
            style={{ maxWidth: '500px' }}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{
              duration: 0.25,
              type: 'spring',
              stiffness: 150,
              damping: 20,
            }}
          >
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <div className="d-flex align-items-center gap-2">
                <HiOutlineMenuAlt4 size={20} className="text-primary" />
                <h5 className="mb-0 fw-semibold">Add Event</h5>
              </div>
              <button
                className="btn btn-sm btn-light rounded-circle"
                type="button"
                onClick={onClose}
              >
                <IoCloseSharp size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit}>
              {/* Title */}
              <div className="mb-3">
                <input
                  type="text"
                  name="title"
                  className="form-control form-control-lg border-2 rounded-3"
                  placeholder="Event title"
                  required
                />
              </div>

              {/* Date and Time Picker */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Date & Time:</label>
                <input
                  type="datetime-local"
                  name="datetime"
                  value={eventDateTime}
                  onChange={(e) => setEventDateTime(e.target.value)}
                  className="form-control border-2 rounded-3"
                  required
                />
              </div>

              {/* Guests */}
              <div className="d-flex align-items-center gap-3 mb-3">
                <HiOutlineUsers size={20} className="text-muted" />
                <input
                  type="text"
                  name="guests"
                  className="form-control bg-light border-0 rounded-3"
                  placeholder="Add guests (optional)"
                />
              </div>

              {/* Description */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <HiOutlineMenuAlt2 size={20} className="text-muted" />
                <input
                  type="text"
                  name="description"
                  className="form-control bg-light border-0 rounded-3"
                  placeholder="Add description"
                />
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>

              {/* Feedback */}
              {error && <p className="text-danger mt-3 small">{error}</p>}
              {success && <p className="text-success mt-3 small">Event saved!</p>}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
