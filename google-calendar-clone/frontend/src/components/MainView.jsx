import React, { useEffect } from 'react';
import {
  useDateStore,
  useEventStore,
  useViewStore,
} from '../lib/store';
import MonthView from './month-view';
import SideBar from './sidebar/SideBar';
import WeekView from './week-view';
import DayView from './day-view';
import EventPopover from './event-popover';
import { EventSummaryPopover } from './event-summary-popover';
import dayjs from 'dayjs';

export default function MainView() {
  const { selectedView } = useViewStore();
  const {
    isPopoverOpen,
    closePopover,
    isEventSummaryOpen,
    closeEventSummary,
    selectedEvent,
    refreshEvents,
  } = useEventStore();
  const { userSelectedDate } = useDateStore();

  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  return (
    <div className="d-flex">
      <SideBar />

      <div className="flex-fill">
        {selectedView === 'month' && <MonthView />}
        {selectedView === 'week' && <WeekView />}
        {selectedView === 'day' && <DayView />}
      </div>

      {isPopoverOpen && (
        <EventPopover
          isOpen={isPopoverOpen}
          onClose={closePopover}
          date={userSelectedDate.format('YYYY-MM-DD')}
        />
      )}

      {isEventSummaryOpen && selectedEvent && (
        <EventSummaryPopover
          isOpen={isEventSummaryOpen}
          onClose={closeEventSummary}
          event={selectedEvent}
        />
      )}
    </div>
  );
}

