"use client";
import { useEffect, useRef, useState } from "react";
import db from "../../../db/db.json";
import PatientLayout from "@/components/patient-layout";

// Simulate chat messages per appointment (in-memory for demo)
const initialMessages: Record<
  number,
  { sender: "patient" | "doctor"; text: string; time: string }[]
> = {
  1: [
    {
      sender: "doctor",
      text: "Hello, how are you feeling today?",
      time: "09:00",
    },
    {
      sender: "patient",
      text: "I'm feeling better, thank you!",
      time: "09:01",
    },
  ],
};

export default function Chat() {
  const [appointmentId, setAppointmentId] = useState(
    db.appointments[0]?.id || 1
  );
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const appointmentOptions = db.appointments.map((a) => {
    const doctor = db.doctors.find((d) => d.id === a.doctor_id);
    return {
      id: a.id,
      label: `${a.date} with ${doctor ? doctor.bio : "Doctor"}`,
    };
  });

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, appointmentId]);

  function sendMessage() {
    if (!input.trim()) return;
    setMessages((prev) => ({
      ...prev,
      [appointmentId]: [
        ...(prev[appointmentId] || []),
        {
          sender: "patient",
          text: input,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    }));
    setInput("");
    // Simulate doctor reply after 1s
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [appointmentId]: [
          ...(prev[appointmentId] || []),
          {
            sender: "doctor",
            text: "Thank you for your message.",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
      }));
    }, 1000);
  }

  return (
    <PatientLayout>
      <div className="max-w-2xl mx-auto py-8 px-4 font-[THICCCBOI]">
        <h1 className="text-2xl font-bold mb-6 text-[#011204]">Live Chat</h1>
        <div className="mb-4">
          <label className="font-medium text-[#011204] mr-2">
            Select Appointment:
          </label>
          <select
            className="border rounded px-2 py-1"
            value={appointmentId}
            onChange={(e) => setAppointmentId(Number(e.target.value))}
          >
            {appointmentOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-white border border-[#E8F6FE] rounded shadow p-4 h-96 overflow-y-auto flex flex-col gap-2 mb-4">
          {(messages[appointmentId] || []).map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "patient" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm flex flex-col ${
                  msg.sender === "patient"
                    ? "bg-[#03C7FC] text-white rounded-br-none"
                    : "bg-[#E8F6FE] text-[#011204] rounded-bl-none"
                }`}
              >
                <span>{msg.text}</span>
                <span className="text-xs text-right mt-1 opacity-60">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
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
    </PatientLayout>
  );
}
