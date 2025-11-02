import React from 'react';
import HeaderLeft from './left-side';
import HeaderRight from './right-side';

export default function Header() {
  return (
    <div 
      className="d-flex align-items-center justify-content-between"
      style={{
        padding: '8px 16px',
        borderBottom: '1px solid var(--google-border)',
        backgroundColor: '#ffffff',
        minHeight: '64px'
      }}
    >
      <HeaderLeft />
      <HeaderRight />
    </div>
  );
}

