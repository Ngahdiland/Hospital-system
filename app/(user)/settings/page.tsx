// Example settings page for patient users
"use client";
import PatientLayout from '../../../components/patient-layout';
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [chatHistory, setChatHistory] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [language, setLanguage] = useState("en");
  const [profileVisibility, setProfileVisibility] = useState(true);

  function validatePassword(pw: string) {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(pw);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (showPasswordForm && newPassword && newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (showPasswordForm && newPassword && !validatePassword(newPassword)) {
      toast.error("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: showPasswordForm ? currentPassword : undefined,
        newPassword: showPasswordForm ? newPassword : undefined,
        emailNotifications,
        chatHistory,
        darkMode,
        smsNotifications,
        language,
        profileVisibility,
      }),
    });
    setLoading(false);
    if (res.ok) {
      toast.success("Settings updated!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } else {
      toast.error("Failed to update settings");
    }
  }

  return (
    <PatientLayout>
      <Toaster />
      <div className="w-5/6 h-full flex flex-col justify-start items-center bg-white">
        <div className="w-full max-w-2xl flex-1 flex flex-col justify-center py-8 px-4">
          <h1 className="text-2xl font-bold mb-6 text-[#011204]">Settings</h1>
          <form onSubmit={handleSave} className="space-y-8 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="font-semibold mb-2">Preferences</h2>
              <div className="flex flex-wrap gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(v => !v)}
                    className="accent-blue-600"
                  />
                  Email Notifications
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chatHistory}
                    onChange={() => setChatHistory(v => !v)}
                    className="accent-blue-600"
                  />
                  Chat History Visibility
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(v => !v)}
                    className="accent-blue-600"
                  />
                  Dark Mode
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsNotifications}
                    onChange={() => setSmsNotifications(v => !v)}
                    className="accent-blue-600"
                  />
                  SMS Notifications
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileVisibility}
                    onChange={() => setProfileVisibility(v => !v)}
                    className="accent-blue-600"
                  />
                  Public Profile
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <span>Language:</span>
                  <select
                    className="border rounded px-2 py-1"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </label>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-bold hover:bg-gray-300 transition-colors mb-4"
                onClick={() => setShowPasswordForm(v => !v)}
              >
                {showPasswordForm ? "Hide Password Change" : "Change Password"}
              </button>
              {showPasswordForm && (
                <div className="bg-gray-50 border rounded p-4 mb-4">
                  <h2 className="font-semibold mb-2">Change Password</h2>
                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Current Password</label>
                    <input
                      type="password"
                      className="border rounded px-3 py-2 w-full"
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-medium">New Password</label>
                    <input
                      type="password"
                      className="border rounded px-3 py-2 w-full"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                    {newPassword && !validatePassword(newPassword) && (
                      <div className="text-xs text-red-500 mt-1">
                        Password must be at least 8 characters, include uppercase, lowercase, number, and special character.
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Confirm New Password</label>
                    <input
                      type="password"
                      className="border rounded px-3 py-2 w-full"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                    {confirmPassword && newPassword !== confirmPassword && (
                      <div className="text-xs text-red-500 mt-1">Passwords do not match.</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 w-full"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </form>
        </div>
      </div>
    </PatientLayout>
  );
}
