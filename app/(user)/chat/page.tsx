"use client";
import { useEffect, useRef, useState } from "react";
import PatientLayout from "@/components/patient-layout";

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  from: "user" | "admin";
  time: string;
}

const CURRENT_USER = "john stive"; // Replace with dynamic user if available

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchMessages() {
      setLoading(true);
      const res = await fetch("/api/chat");
      const data = await res.json();
      setMessages(data.filter((msg: ChatMessage) => msg.user === CURRENT_USER));
      setLoading(false);
    }
    fetchMessages();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: Math.random().toString(36).slice(2),
      user: CURRENT_USER,
      message: input,
      from: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMsg),
    });
  }

  return (
    <PatientLayout>
      <div className="w-full h-full flex flex-col justify-start">
        <div className="max-w-2xl mx-auto py-8 px-4 font-[THICCCBOI]">
          <h1 className="text-2xl font-bold mb-6 text-[#011204]">Live Chat</h1>
          <div className="bg-white border border-[#E8F6FE] rounded shadow p-4 h-96 overflow-y-auto flex flex-col gap-2 mb-4">
            {loading ? (
              <div className="text-gray-400">Loading...</div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={msg.id + idx}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm flex flex-col ${
                      msg.from === "user"
                        ? "bg-[#03C7FC] text-white rounded-br-none"
                        : "bg-[#E8F6FE] text-[#011204] rounded-bl-none"
                    }`}
                  >
                    <span>{msg.message}</span>
                    <span className="text-xs text-right mt-1 opacity-60">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              className="flex-1 border rounded px-3 py-2"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#03C7FC] hover:bg-[#2379F8] text-white font-bold px-6 py-2 rounded-full shadow transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </PatientLayout>
  );
}
