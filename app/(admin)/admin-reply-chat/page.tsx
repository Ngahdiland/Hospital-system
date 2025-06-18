"use client";
import { useEffect, useState } from "react";
import PatientLayout from "@/components/patient-layout";
import toast, { Toaster } from "react-hot-toast";

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  from: "user" | "admin";
  time: string;
}

export default function AdminReplyChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [reply, setReply] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      setLoading(true);
      const res = await fetch("/api/chat");
      const data = await res.json();
      setMessages(data);
      setLoading(false);
    }
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  const users = Array.from(new Set(messages.map((m) => m.user)));
  const userMessages = selectedUser ? messages.filter(m => m.user === selectedUser) : [];

  async function sendReply() {
    if (!reply.trim() || !selectedUser) return;
    const newMsg: ChatMessage = {
      id: Math.random().toString(36).slice(2),
      user: selectedUser,
      message: reply,
      from: "admin",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages(prev => [...prev, newMsg]);
    setReply("");
    // Save to shared chat API so user can see admin reply
    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMsg)
    });
    toast.success("Reply sent");
  }

  return (
    <div className="w-full h-full flex flex-col md:flex-row">
      <Toaster />
      <div className="w-full md:w-1/4 bg-gray-100 p-4 border-r">
        <h2 className="font-bold mb-4">User Chats</h2>
        <ul>
          {users.map((u) => (
            <li key={u}>
              <button
                className={`w-full text-left px-3 py-2 rounded mb-2 ${selectedUser === u ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'}`}
                onClick={() => setSelectedUser(u)}
              >
                {u}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 flex flex-col p-4">
        <h2 className="font-bold mb-4">Chat with {selectedUser || '...'}</h2>
        <div className="flex-1 overflow-y-auto bg-white border rounded p-4 mb-4">
          {userMessages.length === 0 ? (
            <div className="text-gray-400">No messages</div>
          ) : (
            userMessages.map((msg) => (
              <div key={msg.id} className={`mb-2 flex ${msg.from === 'admin' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2 rounded-lg shadow text-sm max-w-xs ${msg.from === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}>
                  <span>{msg.message}</span>
                  <span className="block text-xs text-right mt-1 opacity-60">{msg.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
        {selectedUser && (
          <form
            className="flex gap-2"
            onSubmit={e => { e.preventDefault(); sendReply(); }}
          >
            <input
              className="flex-1 border rounded px-3 py-2"
              placeholder="Type your reply..."
              value={reply}
              onChange={e => setReply(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-full shadow transition-colors"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
