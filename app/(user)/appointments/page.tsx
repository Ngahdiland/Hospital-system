"use client";
// Example appointments page for patient users
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PatientLayout from '../../../components/patient-layout';

interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  date: string;
  time: string;
  status: string;
  notes?: string;
}

interface Doctor {
  id: number;
  bio: string;
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [rescheduleId, setRescheduleId] = useState<number | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [aRes, dRes] = await Promise.all([
        fetch("/api/appointments"),
        fetch("/api/doctors")
      ]);
      const [aData, dData] = await Promise.all([aRes.json(), dRes.json()]);
      setAppointments(aData);
      setDoctors(dData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleReschedule = async (id: number) => {
    if (!newDate || !newTime) return toast.error("Pick date and time");
    const res = await fetch(`/api/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: newDate, time: newTime, status: "Pending" })
    });
    if (res.ok) {
      toast.success("Appointment rescheduled");
      setAppointments((prev) => prev.map(a => a.id === id ? { ...a, date: newDate, time: newTime, status: "Pending" } : a));
      setRescheduleId(null);
      setNewDate("");
      setNewTime("");
      // TODO: Notify user
    } else {
      toast.error("Failed to reschedule");
    }
  };

  const handleCancel = async (id: number) => {
    const res = await fetch(`/api/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Cancelled" })
    });
    if (res.ok) {
      toast.success("Appointment cancelled");
      setAppointments((prev) => prev.map(a => a.id === id ? { ...a, status: "Cancelled" } : a));
      // TODO: Notify user
    } else {
      toast.error("Failed to cancel");
    }
  };

  return (
    <PatientLayout>
      <div className="w-full h-full flex flex-col justify-start">
        <h1 className="text-2xl font-bold mb-6 text-[#011204]">My Appointments</h1>
        <div className="bg-white border border-[#E8F6FE] rounded shadow p-6">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#2379F8]">
                  <th className="py-2">Date</th>
                  <th className="py-2">Time</th>
                  <th className="py-2">Doctor</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => {
                  const doctor = doctors.find((d) => d.id === a.doctor_id);
                  return (
                    <tr key={a.id} className="border-t border-[#E8F6FE]">
                      <td className="py-2">{a.date}</td>
                      <td className="py-2">{a.time}</td>
                      <td className="py-2">{doctor ? doctor.bio : "Unknown"}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${a.status === "Cancelled" ? "bg-red-100 text-red-600" : a.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{a.status}</span>
                      </td>
                      <td className="py-2 flex gap-2">
                        <button className="text-blue-600 hover:underline font-medium" onClick={() => setRescheduleId(a.id)} disabled={a.status === "Cancelled"}>Reschedule</button>
                        <button className="text-red-600 hover:underline font-medium" onClick={() => handleCancel(a.id)} disabled={a.status === "Cancelled"}>Cancel</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        {/* Reschedule Modal */}
        {rescheduleId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Reschedule Appointment</h2>
              <input type="date" className="input input-bordered w-full mb-2" value={newDate} onChange={e => setNewDate(e.target.value)} />
              <input type="time" className="input input-bordered w-full mb-4" value={newTime} onChange={e => setNewTime(e.target.value)} />
              <div className="flex gap-2 justify-end">
                <button className="btn" onClick={() => setRescheduleId(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => handleReschedule(rescheduleId)}>Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
}
