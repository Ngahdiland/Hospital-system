import { useState } from "react";
import db from "./db.json";

const wallet = db.wallets[0];
const transactions = [
  { id: 1, date: "2025-06-10", type: "credit", amount: 50, status: "Completed" },
  { id: 2, date: "2025-06-12", type: "debit", amount: 30, status: "Completed" },
  { id: 3, date: "2025-06-15", type: "credit", amount: 100, status: "Pending" },
];

export default function Wallet() {
  const [amount, setAmount] = useState("");
  const [card, setCard] = useState("");
  const [success, setSuccess] = useState("");

  function handleAddFunds(e: React.FormEvent) {
    e.preventDefault();
    if (amount && card) {
      setSuccess(`$${amount} added to your wallet (simulated)`);
      setAmount("");
      setCard("");
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 font-[THICCCBOI]">
      <h1 className="text-2xl font-bold mb-6 text-[#011204]">Wallet</h1>
      <div className="bg-white border border-[#E8F6FE] rounded shadow p-6 mb-8 flex flex-col items-center">
        <span className="text-lg text-[#2379F8] mb-2">Current Balance</span>
        <span className="text-3xl font-bold text-[#03C7FC] mb-2">${wallet.balance.toFixed(2)}</span>
      </div>
      <form onSubmit={handleAddFunds} className="bg-[#E8F6FE] border border-[#03C7FC] rounded p-6 mb-8">
        <h2 className="font-semibold text-lg mb-4 text-[#011204]">Add Funds</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="number"
            min="1"
            placeholder="Amount"
            className="border rounded px-3 py-2 flex-1"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Card Number"
            className="border rounded px-3 py-2 flex-1"
            value={card}
            onChange={e => setCard(e.target.value)}
            required
          />
        </div>
        <button className="bg-[#03C7FC] hover:bg-[#2379F8] text-white font-bold px-6 py-2 rounded-full shadow transition-colors" type="submit">
          Add Funds
        </button>
        {success && <div className="text-green-600 font-medium mt-4">{success}</div>}
      </form>
      <div className="bg-white border border-[#E8F6FE] rounded shadow p-6">
        <h2 className="font-semibold text-lg mb-4 text-[#011204]">Transaction History</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-[#2379F8]">
              <th className="py-2">Date</th>
              <th className="py-2">Type</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} className="border-t border-[#E8F6FE]">
                <td className="py-2">{tx.date}</td>
                <td className="py-2 capitalize">{tx.type}</td>
                <td className="py-2">${tx.amount.toFixed(2)}</td>
                <td className={`py-2 font-medium ${tx.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
