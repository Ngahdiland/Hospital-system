"use client";
import PatientLayout from "@/components/patient-layout";
import { useEffect, useState } from "react";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch prescriptions and doctors data from the API
    const fetchData = async () => {
      try {
        const prescriptionsResponse = await fetch("/api/prescriptions");
        const doctorsResponse = await fetch("/api/doctors");
        const prescriptionsData = await prescriptionsResponse.json();
        const doctorsData = await doctorsResponse.json();

        setPrescriptions(prescriptionsData);
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <PatientLayout>
      <div className="w-full h-full flex flex-col justify-start">
        <h1 className="text-2xl font-bold mb-6 text-[#011204]">
          Prescriptions
        </h1>
        <div className="bg-white border border-[#E8F6FE] rounded shadow p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#2379F8]">
                <th className="py-2">Doctor</th>
                <th className="py-2">Content</th>
                <th className="py-2">File</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((p) => {
                const doctor = doctors.find((d) => d.id === p.doctor_id);
                return (
                  <tr key={p.id} className="border-t border-[#E8F6FE]">
                    <td className="py-2">{doctor ? doctor.bio : "Unknown"}</td>
                    <td className="py-2">{p.content}</td>
                    <td className="py-2">
                      {p.file_url ? (
                        <a
                          href={p.file_url}
                          download
                          className="text-[#03C7FC] hover:underline font-medium"
                        >
                          Download
                        </a>
                      ) : (
                        <span className="text-gray-400">No file</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PatientLayout>
  );
}
