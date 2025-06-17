import React from 'react';

const sidebarWidth = 220;

const AdminSidebar: React.FC = () => (
  <aside
    style={{
      position: 'fixed',
      top: 60, // height of header
      left: 0,
      width: sidebarWidth,
      height: 'calc(100vh - 60px)',
      background: '#2d3748',
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
        <li><a href="/admin/admin-dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</a></li>
        <li><a href="/admin/admin-appointments" style={{ color: '#fff', textDecoration: 'none' }}>Appointments</a></li>
        <li><a href="/admin/admin-doctors" style={{ color: '#fff', textDecoration: 'none' }}>Doctors</a></li>
        <li><a href="/admin/admin-support" style={{ color: '#fff', textDecoration: 'none' }}>Support</a></li>
      </ul>
    </nav>
  </aside>
);

export default AdminSidebar;
