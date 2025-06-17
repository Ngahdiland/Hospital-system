// Example settings page for patient users
import PatientLayout from './patient-layout';

export default function Settings() {
  return (
    <PatientLayout>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>Manage your account settings here.</p>
    </PatientLayout>
  );
}
