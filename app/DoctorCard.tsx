// DoctorCard.tsx
import React from "react";

export default function DoctorCard({ doc, selected, onClick }: {
  doc: any;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`border rounded p-4 flex flex-col gap-2 shadow hover:shadow-lg transition cursor-pointer ${selected ? "border-[#03C7FC] bg-[#E8F6FE]" : "border-[#E8F6FE] bg-white"}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#03C7FC]/20 flex items-center justify-center font-bold text-[#03C7FC]">
          {doc.bio.split(" ").map((w) => w[0]).join("").toUpperCase()}
        </div>
        <div>
          <div className="font-medium text-[#011204]">{doc.bio}</div>
          <div className="text-sm text-[#2379F8]">{doc.specialty}</div>
        </div>
      </div>
    </div>
  );
}
