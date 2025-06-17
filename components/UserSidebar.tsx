import React from 'react';

const sidebarWidth = 200;

const UserSidebar: React.FC = () => (
  <aside
    style={{
      position: 'fixed',
      top: 60, // height of header
      left: 0,
      width: sidebarWidth,
      height: 'calc(100vh - 60px)',
      background: '#1e293b',
      color: '#fff',
      padding: '2rem 1rem',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      boxShadow: '2px 0 8px rgba(0,0,0,0.05)'
    }}
  >
    <nav>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li><a href="/user/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</a></li>
        <li><a href="/user/appointments" style={{ color: '#fff', textDecoration: 'none' }}>Appointments</a></li>
        <li><a href="/user/book-appointment" style={{ color: '#fff', textDecoration: 'none' }}>Book Appointment</a></li>
        <li><a href="/user/prescribtions" style={{ color: '#fff', textDecoration: 'none' }}>Prescriptions</a></li>
        <li><a href="/user/wallet" style={{ color: '#fff', textDecoration: 'none' }}>Wallet</a></li>
        <li><a href="/user/settings" style={{ color: '#fff', textDecoration: 'none' }}>Settings</a></li>
      </ul>
    </nav>
  </aside>
);

export default UserSidebar;
