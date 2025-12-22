
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  type: z.enum(["BUY", "SELL", "TRANSFER_IN", "TRANSFER_OUT"]),
  coinId: z.string().min(1, "Coin ID is required"),
  symbol: z.string().min(1, "Symbol is required"),
  amount: z.number().positive("Amount must be positive"),
  pricePerCoin: z.number().positive("Price must be positive"),
  fee: z.coerce.number(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface TransactionFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<FormData>;
}

import { useCryptoSearch } from "@/hooks/useMarketData";
import { CoinImage } from "@/components/OptimizedImage";

// ... existing imports

export default function TransactionForm({ onSuccess, defaultValues }: TransactionFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const form = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      type: "BUY",
      date: new Date().toISOString().slice(0, 16),
      fee: 0,
      ...defaultValues,
    },
  });

  const coinIdValue = form.watch("coinId");
  const { data: searchResults = [] } = useCryptoSearch(coinIdValue || "");

  const handleSelectCoin = (coin: { id: string; symbol: string }) => {
    form.setValue("coinId", coin.id);
    form.setValue("symbol", coin.symbol.toUpperCase());
    setShowSuggestions(false);
  };

  const onSubmit = async (data: FormData) => {
    // ... existing onSubmit logic
    setIsLoading(true);
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to create transaction");
      }

      toast.success("Transaction added successfully");
      form.reset();
      router.refresh();
      onSuccess?.();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</label>
          <select
            {...form.register("type")}
            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
            <option value="TRANSFER_IN">Transfer In</option>
            <option value="TRANSFER_OUT">Transfer Out</option>
          </select>
          {form.formState.errors.type && <p className="text-red-500 text-xs">{form.formState.errors.type.message}</p>}
        </div>

        {/* Coin ID / Symbol */}
        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Coin ID</label>
          <input
            {...form.register("coinId")}
            placeholder="bitcoin"
            autoComplete="off"
            onFocus={() => setShowSuggestions(true)}
            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {showSuggestions && searchResults.length > 0 && coinIdValue && (
            <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
              {searchResults.map((coin) => (
                <div
                  key={coin.id}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-3 transition-colors"
                  onClick={() => handleSelectCoin(coin)}
                >
                  <CoinImage src={coin.thumb} symbol={coin.symbol} size={24} className="rounded-full" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{coin.name}</div>
                    <div className="text-xs text-gray-500">{coin.symbol}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showSuggestions && searchResults.length === 0 && coinIdValue?.length >= 2 && (
             // Optional: Show "No results" or just nothing. keeping it clean for now.
             null
          )}
          
          {/* Backdrop for closing suggestions */}
          {showSuggestions && (
            <div className="fixed inset-0 z-40" onClick={() => setShowSuggestions(false)} />
          )}

          {form.formState.errors.coinId && <p className="text-red-500 text-xs">{form.formState.errors.coinId.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Symbol</label>
          <input
            {...form.register("symbol")}
            placeholder="BTC"
            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {form.formState.errors.symbol && <p className="text-red-500 text-xs">{form.formState.errors.symbol.message}</p>}
        </div>

        {/* Amount & Price */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount</label>
          <input
            {...form.register("amount", { valueAsNumber: true })}
            type="number"
            step="any"
            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {form.formState.errors.amount && <p className="text-red-500 text-xs">{form.formState.errors.amount.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Price Per Coin ($)</label>
          <input
            {...form.register("pricePerCoin", { valueAsNumber: true })}
            type="number"
            step="any"
            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {form.formState.errors.pricePerCoin && <p className="text-red-500 text-xs">{form.formState.errors.pricePerCoin.message}</p>}
        </div>
        
         {/* Fee & Date */}
         <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Fee ($)</label>
          <input
            {...form.register("fee", { valueAsNumber: true })}
            type="number"
            step="any"
            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</label>
          <input
            {...form.register("date")}
            type="datetime-local"
            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</label>
        <textarea
           {...form.register("notes")}
           className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px]"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium rounded-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Transaction"}
      </button>
    </form>
  );
}
