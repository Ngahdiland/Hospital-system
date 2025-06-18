"use client";
import { useEffect, useState } from "react";
import DoctorList from "../../../components/DoctorList";
import BookForm from "../../../components/BookForm";
import PatientLayout from "@/components/patient-layout";

export default function BookAppointment() {
  const [filter, setFilter] = useState("");
  const [doctors, setDoctors] = useState<any[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("/api/doctors")
      .then((r) => r.json())
      .then((data) => {
        setDoctors(data);
        setSpecializations(
          Array.from(new Set(data.map((d: any) => d.specialty)))
        );
      });
  }, []);

  const filteredDoctors = doctors.filter((d) =>
    filter ? d.specialty === filter : true
  );

  function handleBook() {
    if (selectedDoctor && date && time) {
      setSuccess(
        `Appointment booked with ${selectedDoctor.bio} on ${date} at ${time}`
      );
      setSelectedDoctor(null);
      setDate("");
      setTime("");
    }
  }

  return (
    <PatientLayout>
      <div className="w-full h-full flex flex-col justify-start">
        <h1 className="text-2xl font-bold mb-6 text-[#011204]">
          Book Appointment
        </h1>
        <div className="mb-4 flex gap-2 items-center">
          <label className="font-medium text-[#011204]">
            Filter by specialization:
          </label>
          <select
            className="border rounded px-2 py-1"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            {specializations.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <DoctorList
          doctors={filteredDoctors}
          selectedDoctor={selectedDoctor}
          onSelect={setSelectedDoctor}
        />
        {selectedDoctor && (
          <BookForm
            selectedDoctor={selectedDoctor}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            onBook={handleBook}
          />
        )}
        {success && (
          <div className="text-green-600 font-medium mb-4">{success}</div>
        )}
      </div>
    </PatientLayout>
  );
}
