import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AddTime({ onTimeSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('00:00');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const generateTimeIntervals = () => {
    const intervals = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        intervals.push(
          `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        );
      }
    }
    return intervals;
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    onTimeSelect(time);
    setIsOpen(false);
  };

  return (
    <div className="position-relative" ref={dropdownRef}>
      <button
        className="btn btn-outline-secondary btn-sm d-flex justify-content-between align-items-center"
        style={{ width: '100px' }}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {selectedTime}
        <ChevronDown size={16} />
      </button>
      {isOpen && (
        <div
          className="position-absolute bg-white border rounded shadow-sm"
          style={{
            zIndex: 1000,
            width: '100px',
            maxHeight: '240px',
            overflowY: 'auto',
            marginTop: '4px',
          }}
        >
          {generateTimeIntervals().map((time) => (
            <button
              key={time}
              className="btn btn-sm btn-light w-100 text-start"
              onClick={() => handleTimeSelect(time)}
              type="button"
            >
              {time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

