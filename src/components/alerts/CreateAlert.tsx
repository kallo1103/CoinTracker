
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const alertSchema = z.object({
  coinId: z.string().min(1, "Coin ID required"),
  targetPrice: z.coerce.number().positive("Price must be positive"),
  condition: z.enum(["ABOVE", "BELOW"]),
});

import { useCryptoSearch } from "@/hooks/useMarketData";
import { CoinImage } from "@/components/OptimizedImage";

// ... imports

type FormData = z.infer<typeof alertSchema>;

export default function CreateAlert({ onSuccess }: { onSuccess?: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const form = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(alertSchema) as any,
    defaultValues: {
       condition: "ABOVE",
       targetPrice: 0,
    }
  });

  const coinIdValue = form.watch("coinId");
  const { data: searchResults = [] } = useCryptoSearch(coinIdValue || "");

  const handleSelectCoin = (coin: { id: string }) => {
    form.setValue("coinId", coin.id);
    setShowSuggestions(false);
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create alert");

      toast.success("Alert set!");
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create alert");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
           <label className="text-xs font-medium text-gray-500 uppercase">Coin ID</label>
           <input 
              {...form.register("coinId")}
              placeholder="e.g. bitcoin"
              autoComplete="off"
              onFocus={() => setShowSuggestions(true)}
              className="w-full mt-1 bg-gray-50 dark:bg-gray-800 border-none rounded-lg p-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
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
           {/* Backdrop */}
           {showSuggestions && (
            <div className="fixed inset-0 z-40" onClick={() => setShowSuggestions(false)} />
           )}
           {form.formState.errors.coinId && <p className="text-red-500 text-xs mt-1">{form.formState.errors.coinId.message}</p>}
        </div>

        <div className="flex gap-4">
           <div className="flex-1">
              <label className="text-xs font-medium text-gray-500 uppercase">Target Price ($)</label>
              <input 
                  type="number"
                  step="any"
                  {...form.register("targetPrice")}
                  className="w-full mt-1 bg-gray-50 dark:bg-gray-800 border-none rounded-lg p-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
           </div>
           
           <div className="w-1/3">
              <label className="text-xs font-medium text-gray-500 uppercase">Condition</label>
              <select
                 {...form.register("condition")}
                 className="w-full mt-1 bg-gray-50 dark:bg-gray-800 border-none rounded-lg p-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 h-[38px]"
              >
                  <option value="ABOVE">Above</option>
                  <option value="BELOW">Below</option>
              </select>
           </div>
        </div>
        {form.formState.errors.targetPrice && <p className="text-red-500 text-xs">{form.formState.errors.targetPrice.message}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
        >
           {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Set Alert"}
        </button>
      </form>
    </div>
  );
}
