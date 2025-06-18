"use client";
import { useState } from "react";

const allTickets = [
  { id: 1, user_id: 1, subject: "Payment Issue", description: "My payment did not go through.", status: "open", assigned_admin_id: null },
  { id: 2, user_id: 1, subject: "Prescription Download", description: "Can't download my prescription.", status: "pending", assigned_admin_id: null },
  { id: 3, user_id: 1, subject: "Appointment Reschedule", description: "Need to reschedule appointment.", status: "closed", assigned_admin_id: 2 },
];
const allAdmins = [
  { id: 2, name: "Admin Jane" },
  { id: 3, name: "Admin Bob" },
];
// Removed direct import of db.json. Use API fetch instead.
const allUsers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
];

export default function AdminSupport() {
  const [tickets, setTickets] = useState(allTickets);
  const [assignId, setAssignId] = useState<{ ticketId: number; adminId: number | null } | null>(null);

  function handleAssign(ticketId: number, adminId: number) {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, assigned_admin_id: adminId, status: "pending" } : t
      )
    );
    setAssignId(null);
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-[THICCCBOI]">
      <h1 className="text-2xl font-bold mb-6 text-[#011204]">Support Tickets</h1>
      <div className="bg-white border border-[#E8F6FE] rounded shadow p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[#2379F8]">
              <th className="py-2">Subject</th>
              <th className="py-2">User</th>
              <th className="py-2">Status</th>
              <th className="py-2">Assigned Admin</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => {
              const user = allUsers.find((u) => u.id === t.user_id);
              const admin = allAdmins.find((a) => a.id === t.assigned_admin_id);
              return (
                <tr key={t.id} className="border-t border-[#E8F6FE]">
                  <td className="py-2 font-medium">{t.subject}</td>
                  <td className="py-2">{user?.name || "Unknown"}</td>
                  <td className={`py-2 capitalize ${t.status === "closed" ? "text-green-600" : t.status === "pending" ? "text-yellow-600" : "text-[#FF7674]"}`}>{t.status}</td>
                  <td className="py-2">{admin ? admin.name : <span className="text-gray-400">Unassigned</span>}</td>
                  <td className="py-2 flex gap-2">
                    <button
                      className="bg-[#03C7FC] hover:bg-[#2379F8] text-white font-bold px-4 py-1 rounded"
                      onClick={() => setAssignId({ ticketId: t.id, adminId: t.assigned_admin_id })}
                      disabled={t.status === "closed"}
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Assignment Modal */}
      {assignId && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow p-6 w-full max-w-sm">
            <h2 className="font-semibold text-lg mb-4 text-[#011204]">Assign Admin</h2>
            <select
              className="border rounded px-3 py-2 w-full mb-4"
              value={assignId.adminId ?? ""}
              onChange={e => setAssignId({ ...assignId, adminId: Number(e.target.value) })}
            >
              <option value="">Select admin</option>
              {allAdmins.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                className="bg-[#03C7FC] hover:bg-[#2379F8] text-white font-bold px-6 py-2 rounded-full shadow"
                onClick={() => assignId.adminId && handleAssign(assignId.ticketId, assignId.adminId)}
                disabled={!assignId.adminId}
              >
                Assign
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold px-6 py-2 rounded-full shadow"
                onClick={() => setAssignId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
