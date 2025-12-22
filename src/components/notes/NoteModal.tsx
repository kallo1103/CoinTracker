
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  isPinned: z.boolean().optional(),
  coinId: z.string().optional(),
});

type FormData = z.infer<typeof noteSchema>;

interface CoinSuggestion {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editNote?: { id: string; title: string; content: string; isPinned: boolean; coinId?: string | null };
}

export default function NoteModal({ isOpen, onClose, onSuccess, editNote }: NoteModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<CoinSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSearch = (query: string) => {
    if (searchTimeout) clearTimeout(searchTimeout);

    if (!query) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/coins/search?query=${query}`);
        const data = await res.json();
        setSuggestions(data.coins || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 300);

    setSearchTimeout(timeout);
  };

  const handleSelectCoin = (coinId: string) => {
    form.setValue("coinId", coinId);
    setShowSuggestions(false);
  };

  const form = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(noteSchema) as any,
    defaultValues: {
      title: "",
      content: "",
      isPinned: false,
      coinId: "",
    },
  });

  useEffect(() => {
    if (editNote) {
      form.reset({
        title: editNote.title,
        content: editNote.content,
        isPinned: editNote.isPinned,
        coinId: editNote.coinId || "",
      });
    } else {
      form.reset({
        title: "",
        content: "",
        isPinned: false,
        coinId: "",
      });
    }
  }, [editNote, isOpen, form]);

  if (!isOpen) return null;

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const url = editNote ? `/api/notes/${editNote.id}` : "/api/notes";
      const method = editNote ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save note");

      toast.success(editNote ? "Note updated" : "Note created");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {editNote ? "Edit Note" : "New Note"}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div>
            <input
              {...form.register("title")}
              placeholder="Note Title"
              className="w-full bg-transparent text-xl font-bold border-none focus:ring-0 px-0 placeholder-gray-400 dark:text-white"
            />
            {form.formState.errors.title && (
              <p className="text-red-500 text-sm">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div>
             <textarea
               {...form.register("content")}
               placeholder="Write your thoughts..."
               className="w-full h-40 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-gray-900 dark:text-white border-none focus:ring-1 focus:ring-blue-500 resize-none"
             />
          </div>

          <div className="flex items-center gap-4">
             <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-300">
                 <input 
                    type="checkbox" 
                    {...form.register("isPinned")}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                 />
                 Pin this note
             </label>
             
             <div className="flex-1 relative">
                 <input 
                    {...form.register("coinId")}
                    onChange={(e) => {
                      form.register("coinId").onChange(e);
                      handleSearch(e.target.value);
                    }}
                    onFocus={() => {
                        const val = form.getValues("coinId");
                        if(val) handleSearch(val);
                    }}
                    autoComplete="off"
                    placeholder="Link to Coin ID (optional)"
                    className="w-full bg-gray-50 dark:bg-gray-800 text-sm border-none rounded-lg p-2 dark:text-white"
                 />
                 {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-xl max-h-48 overflow-y-auto z-10 w-full">
                        {suggestions.map((coin: CoinSuggestion) => (
                            <button
                                key={coin.id}
                                type="button"
                                onClick={() => handleSelectCoin(coin.id)}
                                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                            >
                                <Image 
                                  src={coin.thumb} 
                                  alt={coin.name} 
                                  width={20}
                                  height={20}
                                  className="rounded-full" 
                                />
                                <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{coin.name}</span>
                                <span className="text-xs text-gray-500 uppercase shrink-0">({coin.symbol})</span>
                            </button>
                        ))}
                    </div>
                 )}
             </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={18} />}
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
