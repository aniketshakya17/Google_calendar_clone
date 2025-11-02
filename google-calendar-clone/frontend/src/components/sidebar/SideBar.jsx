import React from 'react';
import Create from './create';
import SideBarCalendar from './side-bar-calendar';
import SearchUsers from './search-users';
import MyCalendars from './my-calendars';
import { useToggleSideBarStore } from '../../lib/store';

export default function SideBar() {
  const { isSideBarOpen } = useToggleSideBarStore();
  
  if (!isSideBarOpen) {
    return null;
  }

  return (
    <aside
      className="d-none d-lg-block"
      style={{ 
        width: '280px', 
        transition: 'all 0.3s ease-in-out',
        backgroundColor: '#ffffff',
        borderRight: '1px solid var(--google-border)',
        padding: '16px 8px',
        minHeight: 'calc(100vh - 64px)'
      }}
    >
      <Create />
      <SideBarCalendar />
      <SearchUsers />
      <MyCalendars />
    </aside>
  );
}

