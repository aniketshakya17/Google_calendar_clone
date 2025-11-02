/**
 * ============================================
 * MAIN APP COMPONENT
 * ============================================
 * 
 * This is the root component of the React application.
 * It handles:
 * - Initial data fetching from the backend API
 * - Rendering the main layout (Header + Calendar View)
 * - Global state management setup
 * 
 * Flow:
 * 1. Component mounts → Fetch events from API
 * 2. Store events in Zustand store
 * 3. Render Header and MainView components
 */

import { useEffect } from 'react';
import Header from './components/header/Header';
import MainView from './components/MainView';
import { useEventStore } from './lib/store';
import dayjs from 'dayjs';

function App() {
  // Get the setEvents function from our global store
  const { setEvents } = useEventStore();

  // Fetch events when component first loads
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Call our backend API
        const response = await fetch('/api/events');
        
        if (response.ok) {
          const data = await response.json();
          
          // Convert date strings to Day.js objects for easier manipulation
          const mappedEvents = data.map((event) => ({
            id: event.id,
            date: dayjs(event.date),  // Convert string to Day.js object
            title: event.title,
            description: event.description,
          }));
          
          // Save events to global store
          setEvents(mappedEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [setEvents]);

  // Main application layout
  return (
    <div>
      {/* Top navigation bar */}
      <Header />
      
      {/* Main calendar view (Month/Week/Day) */}
      <MainView />
    </div>
  );
}

export default App;

