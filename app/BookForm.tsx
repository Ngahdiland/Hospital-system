// BookForm.tsx
export default function BookForm({ selectedDoctor, date, setDate, time, setTime, onBook }: {
  selectedDoctor: any;
  date: string;
  setDate: (v: string) => void;
  time: string;
  setTime: (v: string) => void;
  onBook: () => void;
}) {
  return (
    <div className="mb-6 p-4 border border-[#03C7FC] rounded bg-[#E8F6FE]">
      <h2 className="font-semibold mb-2 text-[#011204]">Book with {selectedDoctor.bio}</h2>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="date"
          className="border rounded px-2 py-1"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />
        <input
          type="time"
          className="border rounded px-2 py-1"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button
          className="bg-[#03C7FC] hover:bg-[#2379F8] text-white font-bold px-6 py-2 rounded-full shadow transition-colors"
          onClick={onBook}
        >
          Book
        </button>
      </div>
    </div>
  );
}
