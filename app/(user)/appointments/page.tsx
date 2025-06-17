// Example appointments page for patient users
import PatientLayout from '../../../components/patient-layout';

export default function Appointments() {
  return (
    <PatientLayout>
      <div className="w-full h-full flex flex-col justify-start">
        <h1 className="text-2xl font-bold mb-4">Appointments</h1>
        <p>View your upcoming and past appointments here.</p>
      </div>
    </PatientLayout>
  );
}
