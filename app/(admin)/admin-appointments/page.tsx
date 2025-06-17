'use client';
import { useState } from "react";
import db from "../../../db/db.json";

const allDoctors = db.doctors;
const allAppointments = db.appointments;
const allUsers = db.users;

export default function AdminAppointments() {
  const [doctorFilter, setDoctorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);
  const [prescriptionText, setPrescriptionText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState("");

  const filteredAppointments = allAppointments.filter((a) => {
    const doctor = allDoctors.find((d) => d.id === a.doctor_id);
    return (
      (!doctorFilter || doctor?.id === Number(doctorFilter)) &&
      (!statusFilter || a.status === statusFilter)
    );
  });

  function handlePrescriptionSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess("Prescription created (simulated)");
    setPrescriptionText("");
    setFile(null);
    setSelectedAppointment(null);
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 font-[THICCCBOI]">
      <h1 className="text-2xl font-bold mb-6 text-[#011204]">Manage Appointments & Prescriptions</h1>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div>
          <label className="font-medium text-[#011204] mr-2">Filter by Doctor:</label>
          <select
            className="border rounded px-2 py-1"
            value={doctorFilter}
            onChange={e => setDoctorFilter(e.target.value)}
          >
            <option value="">All</option>
            {allDoctors.map(d => (
              <option key={d.id} value={d.id}>{d.bio} ({d.specialty})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-medium text-[#011204] mr-2">Status:</label>
          <select
            className="border rounded px-2 py-1"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      {/* Appointments Table */}
      <div className="bg-white border border-[#E8F6FE] rounded shadow p-6 mb-8">
        <h2 className="font-semibold text-lg mb-4 text-[#011204]">Appointments</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-[#2379F8]">
              <th className="py-2">Date</th>
              <th className="py-2">Time</th>
              <th className="py-2">Patient</th>
              <th className="py-2">Doctor</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((a) => {
              const doctor = allDoctors.find((d) => d.id === a.doctor_id);
              const patient = allUsers.find((u) => u.id === a.patient_id);
              return (
                <tr key={a.id} className="border-t border-[#E8F6FE]">
                  <td className="py-2">{a.date}</td>
                  <td className="py-2">{a.time}</td>
                  <td className="py-2">{patient?.name || "Unknown"}</td>
                  <td className="py-2">{doctor?.bio || "Unknown"}</td>
                  <td className="py-2 capitalize">{a.status}</td>
                  <td className="py-2">
                    <button
                      className="bg-[#03C7FC] hover:bg-[#2379F8] text-white font-bold px-4 py-1 rounded"
                      onClick={() => setSelectedAppointment(a.id)}
                    >
                      Create Prescription
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Prescription Form */}
      {selectedAppointment && (
        <form
          className="bg-[#E8F6FE] border border-[#03C7FC] rounded p-6 mb-8"
          onSubmit={handlePrescriptionSubmit}
        >
          <h2 className="font-semibold text-lg mb-4 text-[#011204]">Create Prescription</h2>
          <textarea
            className="border rounded px-3 py-2 w-full mb-4"
            placeholder="Prescription details..."
            value={prescriptionText}
            onChange={e => setPrescriptionText(e.target.value)}
            required
          />
          <input
            type="file"
            className="mb-4"
            onChange={e => setFile(e.target.files?.[0] || null)}
          />
          <div className="flex gap-2">
            <button
              className="bg-[#03C7FC] hover:bg-[#2379F8] text-white font-bold px-6 py-2 rounded-full shadow"
              type="submit"
            >
              Save Prescription
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold px-6 py-2 rounded-full shadow"
              type="button"
              onClick={() => setSelectedAppointment(null)}
            >
              Cancel
            </button>
          </div>
          {success && <div className="text-green-600 font-medium mt-4">{success}</div>}
        </form>
      )}
    </div>
  );
}
