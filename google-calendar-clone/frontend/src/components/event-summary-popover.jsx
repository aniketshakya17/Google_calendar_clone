import React, { useRef, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { IoCloseSharp } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/api';
import { useEventStore } from '../lib/store';

export function EventSummaryPopover({ isOpen, onClose, event }) {
  const popoverRef = useRef(null);
  const { refreshEvents } = useEventStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event?.date || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      setIsLoading(true);
      await api.deleteEvent(event.id);
      await refreshEvents();
      onClose();
    } catch (error) {
      alert('Failed to delete event. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await api.updateEvent(event.id, formData);
      await refreshEvents();
      setIsEditing(false);
      onClose();
    } catch (error) {
      alert('Failed to update event. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
            className="bg-white rounded-4 shadow-lg w-100 p-4"
            style={{ maxWidth: '500px' }}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{
              duration: 0.25,
              type: 'spring',
              stiffness: 140,
              damping: 18,
            }}
          >
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h5 className="mb-0 fw-semibold">
                {isEditing ? 'Edit Event' : 'Event Summary'}
              </h5>
              <button
                className="btn btn-sm btn-light rounded-circle"
                type="button"
                onClick={onClose}
              >
                <IoCloseSharp size={18} />
              </button>
            </div>

            {/* View Mode */}
            {!isEditing ? (
              <>
                <motion.div
                  key="view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="mb-2">
                    <strong>Title:</strong> {event.title}
                  </p>
                  <p className="mb-2">
                    <strong>Date:</strong>{' '}
                    {dayjs(event.date).format('dddd, MMMM D, YYYY h:mm A')}
                  </p>
                  {event.description && (
                    <p className="mb-0">
                      <strong>Description:</strong> {event.description}
                    </p>
                  )}
                </motion.div>

                <div className="mt-4 d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </>
            ) : (
              // Edit Mode
              <motion.div
                key="edit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <label className="form-label fw-semibold mt-2">Title</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />

                <label className="form-label fw-semibold">Date</label>
                <input
                  type="datetime-local"
                  className="form-control mb-3"
                  value={dayjs(formData.date).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />

                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control mb-3"
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />

                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-success"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
