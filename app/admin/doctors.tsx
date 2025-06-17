import { useState } from "react";
import db from "../db.json";

const initialDoctors = db.doctors;
const allSpecializations = [
  ...new Set(initialDoctors.map((d) => d.specialty)),
];

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({
    id: 0,
    bio: "",
    specialty: allSpecializations[0] || "",
    image_url: "",
    schedule_json: "{}",
  });
  const [newSpecialty, setNewSpecialty] = useState("");

  function handleEdit(doc: any) {
    setEditing(doc.id);
    setForm(doc);
  }

  function handleDelete(id: number) {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
    if (editing === id) setEditing(null);
  }

  function handleSave() {
    setDoctors((prev) =>
      prev.map((d) => (d.id === form.id ? { ...form } : d))
    );
    setEditing(null);
  }

  function handleAdd() {
    const nextId = Math.max(...doctors.map((d) => d.id)) + 1;
    setDoctors((prev) => [
      ...prev,
      { ...form, id: nextId },
    ]);
    setForm({ id: 0, bio: "", specialty: allSpecializations[0] || "", image_url: "", schedule_json: "{}" });
  }

  function handleSpecialtyAdd() {
    if (newSpecialty && !allSpecializations.includes(newSpecialty)) {
      allSpecializations.push(newSpecialty);
      setForm((f) => ({ ...f, specialty: newSpecialty }));
      setNewSpecialty("");
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-[THICCCBOI]">
      <h1 className="text-2xl font-bold mb-6 text-[#011204]">Manage Doctors</h1>
      {/* Add/Edit Doctor Form */}
      <div className="bg-white border border-[#E8F6FE] rounded shadow p-6 mb-8">
        <h2 className="font-semibold text-lg mb-4 text-[#011204]">{editing ? "Edit Doctor" : "Add Doctor"}</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            className="border rounded px-3 py-2 flex-1"
            placeholder="Bio"
            value={form.bio}
            onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
          />
          <select
            className="border rounded px-3 py-2 flex-1"
            value={form.specialty}
            onChange={e => setForm(f => ({ ...f, specialty: e.target.value }))}
          >
            {allSpecializations.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <input
            className="border rounded px-3 py-2 flex-1"
            placeholder="Image URL"
            value={form.image_url}
            onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
          />
        </div>
        <div className="flex gap-2 mb-4">
          <input
            className="border rounded px-3 py-2 flex-1"
            placeholder="Add new specialization"
            value={newSpecialty}
            onChange={e => setNewSpecialty(e.target.value)}
          />
          <button
            className="bg-[#03C7FC] hover:bg-[#2379F8] text-white font-bold px-4 py-2 rounded-full shadow"
            onClick={handleSpecialtyAdd}
            type="button"
          >
            Add Specialty
          </button>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                className="bg-[#03C7FC] hover:bg-[#2379F8] text-white font-bold px-6 py-2 rounded-full shadow"
                onClick={handleSave}
                type="button"
              >
                Save
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold px-6 py-2 rounded-full shadow"
                onClick={() => setEditing(null)}
                type="button"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="bg-[#03C7FC] hover:bg-[#2379F8] text-white font-bold px-6 py-2 rounded-full shadow"
              onClick={handleAdd}
              type="button"
            >
              Add Doctor
            </button>
          )}
        </div>
      </div>
      {/* Doctors Table */}
      <div className="bg-white border border-[#E8F6FE] rounded shadow p-6">
        <h2 className="font-semibold text-lg mb-4 text-[#011204]">Doctors List</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-[#2379F8]">
              <th className="py-2">Bio</th>
              <th className="py-2">Specialty</th>
              <th className="py-2">Image</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id} className="border-t border-[#E8F6FE]">
                <td className="py-2">{doc.bio}</td>
                <td className="py-2">{doc.specialty}</td>
                <td className="py-2">
                  {doc.image_url ? (
                    <img src={doc.image_url} alt="doctor" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="py-2 flex gap-2">
                  <button
                    className="bg-[#2379F8] hover:bg-[#03C7FC] text-white font-bold px-4 py-1 rounded"
                    onClick={() => handleEdit(doc)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-[#FF7674] hover:bg-[#e05553] text-white font-bold px-4 py-1 rounded"
                    onClick={() => handleDelete(doc.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
