"use client";
import { useEffect, useState } from "react";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Fake monthly stats for chart
const monthlyStats = [12, 18, 15, 22, 30, 25, 28, 20, 18, 24, 27, 32];

const activities = [
  { time: "09:00", text: "Patient John Doe booked an appointment." },
  { time: "09:10", text: "Dr. Jane Smith completed a consultation." },
  { time: "09:20", text: "Payment received from John Doe." },
];

export default function AdminDashboard() {
  // KPIs
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  // Fetch data from API (replace with your API endpoints)
  useEffect(() => {
    const fetchData = async () => {
      const patientsRes = await fetch('/api/patients');
      const patientsData = await patientsRes.json();
      setPatients(patientsData);

      const doctorsRes = await fetch('/api/doctors');
      const doctorsData = await doctorsRes.json();
      setDoctors(doctorsData);

      // Calculate total income from patients data (assuming income is a field in patient data)
      const income = patientsData.reduce((acc, patient) => acc + patient.income, 0);
      setTotalIncome(income);
    };

    fetchData();
  }, []);

  // Chart state (could be dynamic)
  const [selectedYear] = useState(2025);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 font-[THICCCBOI]">
      <h1 className="text-2xl font-bold mb-6 text-[#011204]">Admin Dashboard</h1>
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-[#E8F6FE] shadow rounded p-6 flex flex-col items-center">
          <span className="text-lg text-[#2379F8] mb-1">Total Patients</span>
          <span className="text-3xl font-bold text-[#03C7FC]">{patients.length}</span>
        </div>
        <div className="bg-white border border-[#E8F6FE] shadow rounded p-6 flex flex-col items-center">
          <span className="text-lg text-[#2379F8] mb-1">Total Doctors</span>
          <span className="text-3xl font-bold text-[#03C7FC]">{doctors.length}</span>
        </div>
        <div className="bg-white border border-[#E8F6FE] shadow rounded p-6 flex flex-col items-center">
          <span className="text-lg text-[#2379F8] mb-1">Total Income</span>
          <span className="text-3xl font-bold text-[#03C7FC]">${totalIncome.toLocaleString()}</span>
        </div>
      </div>
      {/* Chart */}
      <div className="bg-white border border-[#E8F6FE] shadow rounded p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg text-[#011204]">Monthly Appointments ({selectedYear})</h2>
        </div>
        <div className="flex items-end gap-2 h-40">
          {monthlyStats.map((val, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div
                className="w-6 rounded-t bg-[#03C7FC]"
                style={{ height: `${val * 4}px` }}
                title={`${months[i]}: ${val}`}
              ></div>
              <span className="text-xs mt-1 text-[#2379F8]">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Activity Feed */}
      <div className="bg-white border border-[#E8F6FE] shadow rounded p-6">
        <h2 className="font-semibold text-lg mb-4 text-[#011204]">Recent Activity</h2>
        <ul className="space-y-2">
          {activities.map((a, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-[#2379F8] font-bold">{a.time}</span>
              <span className="text-[#011204]">{a.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
