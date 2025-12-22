
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Trash2, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import toast from "react-hot-toast";

interface Transaction {
  id: string;
  type: "BUY" | "SELL" | "TRANSFER_IN" | "TRANSFER_OUT";
  symbol: string;
  amount: number;
  pricePerCoin: number;
  date: string;
  notes?: string;
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Transaction deleted");
        setTransactions((prev) => prev.filter((t) => t.id !== id));
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
       console.error(error);
       toast.error("Failed to delete transaction");
    }
  };

  if (loading) {
     return <div className="text-center py-10 text-gray-500">Loading transactions...</div>;
  }

  if (transactions.length === 0) {
    return <div className="text-center py-10 text-gray-500">No transactions found.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400">
          <tr>
            <th className="p-4 font-medium">Date</th>
            <th className="p-4 font-medium">Type</th>
            <th className="p-4 font-medium">Asset</th>
            <th className="p-4 font-medium text-right">Amount</th>
            <th className="p-4 font-medium text-right">Price</th>
            <th className="p-4 font-medium text-right">Total</th>
            <th className="p-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-white/10">
          {transactions.map((t) => {
            const isBuy = t.type === "BUY" || t.type === "TRANSFER_IN";
            const total = t.amount * t.pricePerCoin;
            
            return (
              <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="p-4 text-gray-600 dark:text-gray-300">
                   {format(new Date(t.date), "MMM d, yyyy HH:mm")}
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isBuy ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {isBuy ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                    {t.type.replace("_", " ")}
                  </span>
                </td>
                <td className="p-4 font-semibold text-gray-900 dark:text-white">
                  {t.symbol.toUpperCase()}
                </td>
                <td className="p-4 text-right text-gray-700 dark:text-gray-300">
                  {t.amount}
                </td>
                 <td className="p-4 text-right text-gray-700 dark:text-gray-300">
                  ${t.pricePerCoin.toLocaleString()}
                </td>
                <td className="p-4 text-right font-medium text-gray-900 dark:text-white">
                  ${total.toLocaleString()}
                </td>
                <td className="p-4 text-right">
                   <button
                     onClick={() => handleDelete(t.id)}
                     className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 rounded-lg transition-colors"
                     title="Delete"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
