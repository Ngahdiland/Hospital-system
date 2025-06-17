// Responsive layout with sidebar and top navbar for patient users
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-blue-700 text-white flex items-center justify-between px-4 py-3">
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
          className={`bg-gray-100 h-full top-0 left-0 transition-transform duration-200 z-20 md:static fixed md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:block w-1/6 min-w-[120px] max-w-xs p-4`}
        >
          <nav className="flex flex-col gap-4 items-center md:items-start">
            <Link href="/" className="hover:text-blue-700" title="Dashboard">🏠 <span className="hidden md:inline">Dashboard</span></Link>
            <Link href="/appointments" className="hover:text-blue-700" title="Appointments">📅 <span className="hidden md:inline">Appointments</span></Link>
            <Link href="/chat" className="hover:text-blue-700" title="Live Chat">💬 <span className="hidden md:inline">Chat</span></Link>
            <Link href="/book-appointment" className="hover:text-blue-700" title="Book Appointment">➕ <span className="hidden md:inline">Book</span></Link>
            <Link href="/prescriptions" className="hover:text-blue-700" title="Prescriptions">💊 <span className="hidden md:inline">Prescriptions</span></Link>
            <Link href="/profile" className="hover:text-blue-700" title="Profile">👤 <span className="hidden md:inline">Profile</span></Link>
            <Link href="/wallet" className="hover:text-blue-700" title="Wallet">💳 <span className="hidden md:inline">Wallet</span></Link>
            <Link href="/settings" className="hover:text-blue-700" title="Settings">⚙️ <span className="hidden md:inline">Settings</span></Link>
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
        <main className="flex-1 w-5/6 p-4 md:p-8 bg-white min-h-screen transition-all duration-200">{children}</main>
      </div>
    </div>
  );
}
