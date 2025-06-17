import React from 'react';

const UserHeader: React.FC = () => (
  <header style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '60px',
    background: '#2563eb',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  }}>
    <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Patient Portal</div>
    <nav>
      {/* Add user menu or actions here */}
    </nav>
  </header>
);

export default UserHeader;
