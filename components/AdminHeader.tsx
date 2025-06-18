import React from 'react';
import Link from 'next/link';

const AdminHeader: React.FC = () => (
  <header className="bg-blue-900 text-white fixed top-0 left-0 w-full h-[60px] flex items-center justify-between px-6 z-40 shadow">
    <div className="font-bold text-xl">Admin Panel</div>
    <nav className="flex items-center gap-4">
      {/* Add admin actions or user menu here */}
      <Link href="/admin-settings" className="hover:underline">Settings</Link>
      <Link href="/" className="hover:underline">User App</Link>
    </nav>
  </header>
);

export default AdminHeader;
