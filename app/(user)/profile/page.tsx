// Example profile page for patient users
import PatientLayout from '../../../components/patient-layout';

export default function Profile() {
  return (
    <PatientLayout>
      <div className="w-full h-full flex flex-col justify-start">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p>View and update your patient profile information here.</p>
      </div>
    </PatientLayout>
  );
}