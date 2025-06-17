import React from 'react';

const AdminHeader: React.FC = () => (
  <header style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '60px',
    background: '#1a202c',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  }}>
    <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Admin Panel</div>
    <nav>
      {/* Add header actions or user menu here */}
    </nav>
  </header>
);

export default AdminHeader;
