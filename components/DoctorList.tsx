// DoctorList.tsx
import DoctorCard from "./DoctorCard";

export default function DoctorList({ doctors, selectedDoctor, onSelect }: {
  doctors: any[];
  selectedDoctor: any;
  onSelect: (doc: any) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {doctors.map((doc) => (
        <DoctorCard
          key={doc.id}
          doc={doc}
          selected={selectedDoctor?.id === doc.id}
          onClick={() => onSelect(doc)}
        />
      ))}
    </div>
  );
}
