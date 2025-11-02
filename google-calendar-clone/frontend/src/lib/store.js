import dayjs from 'dayjs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getMonth } from './getTime';

export const useViewStore = create(
  persist(
    (set) => ({
      selectedView: 'month',
      setView: (value) => {
        set({ selectedView: value });
      },
    }),
    { name: 'calendar_view' }
  )
);

export const useDateStore = create((set) => ({
  userSelectedDate: dayjs(),
  twoDMonthArray: getMonth(),
  selectedMonthIndex: dayjs().month(),
  setDate: (value) => {
    set({ userSelectedDate: value });
  },
  setMonth: (index) => {
    set({ twoDMonthArray: getMonth(index), selectedMonthIndex: index });
  },
}));

export const useEventStore = create((set) => ({
  events: [],
  isPopoverOpen: false,
  isEventSummaryOpen: false,
  selectedEvent: null,
  setEvents: (events) => set({ events }),
  openPopover: () => set({ isPopoverOpen: true }),
  closePopover: () => set({ isPopoverOpen: false }),
  openEventSummary: (event) =>
    set({ isEventSummaryOpen: true, selectedEvent: event }),
  closeEventSummary: () =>
    set({ isEventSummaryOpen: false, selectedEvent: null }),
  refreshEvents: async () => {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        const mappedEvents = data.map((event) => ({
          id: event.id,
          date: dayjs(event.date),
          title: event.title,
          description: event.description,
        }));
        set({ events: mappedEvents });
      }
    } catch (error) {
      console.error('Error refreshing events:', error);
    }
  },
}));

export const useToggleSideBarStore = create((set, get) => ({
  isSideBarOpen: true,
  setSideBarOpen: () => {
    set({ isSideBarOpen: !get().isSideBarOpen });
  },
}));

export const CalendarEventType = {
  id: '',
  title: '',
  date: dayjs(),
  description: '',
};

