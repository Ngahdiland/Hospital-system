// Example settings page for patient users
import PatientLayout from '../../../components/patient-layout';

export default function Settings() {
  return (
    <PatientLayout>
      <div className="w-full h-full flex flex-col justify-start">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <p>Manage your account settings here.</p>
      </div>
    </PatientLayout>
  );
}
