"use client";
import React from 'react';
import { FaTachometerAlt, FaCalendarAlt, FaUserMd, FaHeadset } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarWidth = 220;

const navLinks = [
  { href: '/admin-dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { href: '/admin-appointments', label: 'Appointments', icon: <FaCalendarAlt /> },
  { href: '/admin-doctors', label: 'Doctors', icon: <FaUserMd /> },
  { href: '/admin-support', label: 'Support', icon: <FaHeadset /> },
];

const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <aside
      className="bg-gray-800 text-white fixed top-[60px] left-0 h-screen w-[220px] z-30 shadow-lg p-4 flex flex-col gap-4"
    >
      <nav className="flex flex-col gap-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-base
                ${isActive ? 'bg-blue-700 text-white' : 'bg-gray-900 text-white hover:bg-blue-600 hover:text-white'}
              `}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
