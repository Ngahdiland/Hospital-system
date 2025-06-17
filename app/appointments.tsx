// Example appointments page for patient users
import PatientLayout from './patient-layout';

export default function Appointments() {
  return (
    <PatientLayout>
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <p>View your upcoming and past appointments here.</p>
    </PatientLayout>
  );
}
