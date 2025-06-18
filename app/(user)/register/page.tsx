// Register page for patient users
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    town: "",
    dob: "",
    contact_info: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  function validate() {
    if (!form.name.trim()) return "Full name is required";
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      return "Valid email is required";
    if (!form.gender) return "Gender is required";
    if (!form.town.trim()) return "Town is required";
    if (!form.dob) return "Date of birth is required";
    if (new Date(form.dob) > new Date()) return "DOB cannot be in the future";
    if (!form.contact_info.trim()) return "Contact info is required";
    if (form.password.length < 6)
      return "Password must be at least 6 characters";
    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const validation = validate();
    if (validation) {
      setError(validation);
      return;
    }
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSuccess("Registration successful! Please login.");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      setError("Registration failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Patient Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1">Town</label>
            <input
              type="text"
              placeholder="Town"
              value={form.town}
              onChange={(e) => setForm((f) => ({ ...f, town: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              placeholder="Date of Birth"
              value={form.dob}
              onChange={(e) => setForm((f) => ({ ...f, dob: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1">
              Contact Info
            </label>
            <input
              type="text"
              placeholder="Contact Info"
              value={form.contact_info}
              onChange={(e) =>
                setForm((f) => ({ ...f, contact_info: e.target.value }))
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        <label className="block font-semibold text-gray-700 mb-1">
          Create Password
        </label>
        <input
          type="password"
          placeholder="Create Password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          className="w-full mb-6 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
