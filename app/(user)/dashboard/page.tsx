// Example protected page using the patient layout
import PatientLayout from '../../../components/patient-layout';
import Image from 'next/image';

export default function Dashboard() {
  return (
    <PatientLayout>
      <div className="w-full h-full flex flex-col justify-start">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">Welcome, Patient!</h1>
            <p className="mb-4">This is your dashboard. Here you can view your appointments, profile, and more.</p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/sample.jpg"
              alt="Sample design"
              width={400}
              height={300}
              className="rounded-lg shadow-lg object-cover max-w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
