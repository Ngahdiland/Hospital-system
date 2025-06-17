import Image from "next/image";
import PatientLayout from "./patient-layout";

export default function Home() {
  return (
    <PatientLayout>
      <div className="max-w-5xl mx-auto py-8 px-4 font-[THICCCBOI]">
        {/* Welcome message + Find a doctor button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1 text-[#011204]">
              Welcome back, Patient!
            </h1>
            <p className="text-[#2379F8] text-base">
              Here is your health overview and upcoming activities.
            </p>
          </div>
          <a
            href="/doctors"
            className="inline-block bg-[#03C7FC] hover:bg-[#2379F8] text-white font-bold py-2 px-6 rounded-full shadow transition-colors text-base"
          >
            Find a doctor
          </a>
        </div>

        {/* Notification preview */}
        <div className="flex items-center gap-2 bg-[#FF7674]/10 border-l-4 border-[#FF7674] p-3 rounded mb-6">
          <span className="text-[#FF7674] font-bold">!</span>
          <span className="text-[#011204]">
            Appointment tomorrow at 10:00 AM
          </span>
        </div>

        {/* Next appointment */}
        <div className="bg-[#E8F6FE] border-l-4 border-[#03C7FC] p-4 rounded mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="font-semibold text-lg mb-1 text-[#011204]">
              Next Appointment
            </h2>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-[#2379F8]">
              <span className="font-medium">Dr. Jane Smith</span>
              <span className="hidden md:inline">•</span>
              <span>June 20, 2025 at 10:00 AM</span>
              <span className="hidden md:inline">•</span>
              <span>Cardiology</span>
            </div>
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <button className="bg-[#03C7FC] hover:bg-[#2379F8] text-white px-4 py-2 rounded-full font-bold transition-colors">
              Join
            </button>
            <button className="bg-[#FF7674] hover:bg-[#e05553] text-white px-4 py-2 rounded-full font-bold transition-colors">
              Cancel
            </button>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-[#E8F6FE] shadow rounded p-4 flex flex-col items-center">
            <span className="text-2xl font-bold text-[#03C7FC]">3</span>
            <span className="text-[#011204]">Appointments</span>
          </div>
          <div className="bg-white border border-[#E8F6FE] shadow rounded p-4 flex flex-col items-center">
            <span className="text-2xl font-bold text-[#FF7674]">2</span>
            <span className="text-[#011204]">Prescriptions</span>
          </div>
          <div className="bg-white border border-[#E8F6FE] shadow rounded p-4 flex flex-col items-center">
            <span className="text-2xl font-bold text-[#2379F8]">$120.00</span>
            <span className="text-[#011204]">Wallet Balance</span>
          </div>
        </div>

        {/* Doctor list preview */}
        <div className="bg-white border border-[#E8F6FE] shadow rounded p-4">
          <h2 className="font-semibold text-lg mb-4 text-[#011204]">Your Doctors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded hover:shadow border-[#E8F6FE]">
              <div className="w-12 h-12 bg-[#03C7FC]/20 rounded-full flex items-center justify-center font-bold text-[#03C7FC]">
                JS
              </div>
              <div>
                <div className="font-medium text-[#011204]">Dr. Jane Smith</div>
                <div className="text-sm text-[#2379F8]">Cardiologist</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded hover:shadow border-[#E8F6FE]">
              <div className="w-12 h-12 bg-[#FF7674]/20 rounded-full flex items-center justify-center font-bold text-[#FF7674]">
                AB
              </div>
              <div>
                <div className="font-medium text-[#011204]">Dr. Alex Brown</div>
                <div className="text-sm text-[#2379F8]">Dermatologist</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded hover:shadow border-[#E8F6FE]">
              <div className="w-12 h-12 bg-[#2379F8]/20 rounded-full flex items-center justify-center font-bold text-[#2379F8]">
                MR
              </div>
              <div>
                <div className="font-medium text-[#011204]">Dr. Maria Rossi</div>
                <div className="text-sm text-[#2379F8]">Pediatrician</div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-right">
            <a
              href="/profile"
              className="text-[#03C7FC] hover:underline text-sm font-medium"
            >
              View all doctors →
            </a>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
