// Responsive layout with sidebar and top navbar for patient users
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaCalendarAlt, FaComments, FaPlus, FaPrescriptionBottleAlt, FaUser, FaWallet, FaCog } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const navLinks = [
    { href: '/', label: 'Dashboard', icon: <FaHome /> },
    { href: '/appointments', label: 'Appointments', icon: <FaCalendarAlt /> },
    { href: '/chat', label: 'Chat', icon: <FaComments /> },
    { href: '/book-appointment', label: 'Book', icon: <FaPlus /> },
    { href: '/prescriptions', label: 'Prescriptions', icon: <FaPrescriptionBottleAlt /> },
    { href: '/profile', label: 'Profile', icon: <FaUser /> },
    { href: '/wallet', label: 'Wallet', icon: <FaWallet /> },
    { href: '/settings', label: 'Settings', icon: <FaCog /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-blue-700 z-40 fixed top-0 left-0 w-full  text-white flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            className="md:hidden mr-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-bold text-lg">Patient Portal</span>
        </div>
        <div>
          <Link href="/login" className="mr-4 hover:underline">Login</Link>
          <Link href="/register" className="hover:underline">Register</Link>
        </div>
      </nav>
      {/* Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-gray-100 h-screen mt-[53px] left-0 transition-transform duration-200 z-20 md:static fixed md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:block w-1/6 min-w-[120px] max-w-xs p-4`}
        >
          <nav className="flex flex-col gap-4 items-center md:items-start">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg shadow-sm transition-all font-medium text-base
                    ${isActive ? 'bg-blue-700 text-white' : 'bg-white text-[#011204] hover:bg-blue-100 hover:text-blue-700'}
                  `}
                  style={{ boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)' }}
                  title={link.label}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="hidden md:inline">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 mt-[55px] bg-white min-h-screen transition-all duration-200">
          {children}
        </main>
      </div>
    </div>
  );
}
