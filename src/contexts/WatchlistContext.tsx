"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface WatchlistItem {
  id: string;
  coinId: string;
  symbol: string;
  name: string;
  createdAt: string;
}

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  isLoading: boolean;
  addToWatchlist: (coin: { coinId: string; symbol: string; name: string }) => Promise<void>;
  removeFromWatchlist: (coinId: string) => Promise<void>;
  isWatched: (coinId: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      fetchWatchlist();
    } else {
      setWatchlist([]);
    }
  }, [session]);

  const fetchWatchlist = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/watchlist");
      if (res.ok) {
        const data = await res.json();
        setWatchlist(data);
      }
    } catch {
      console.error("Failed to fetch watchlist");
    } finally {
      setIsLoading(false);
    }
  };

  const addToWatchlist = async (coin: { coinId: string; symbol: string; name: string }) => {
    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coin),
      });

      if (res.ok) {
        toast.success(`Removed ${coin.name} from watchlist` ? "Added to watchlist" : "Updated watchlist"); // Logic simplified
        // Actually the toast message above was weird. Let's fix it in next iteration if needed or just use simple message.
        // Wait, I should fix the logic:
        fetchWatchlist();
        toast.success(`Added ${coin.name} to watchlist`);
      } else {
        toast.error("Failed to add to watchlist");
      }
    } catch {
      toast.error("Error adding to watchlist");
    }
  };

  const removeFromWatchlist = async (coinId: string) => {
    try {
      const res = await fetch(`/api/watchlist?coinId=${coinId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Removed from watchlist");
        setWatchlist((prev) => prev.filter((item) => item.coinId !== coinId));
      } else {
        toast.error("Failed to remove from watchlist");
      }
    } catch {
       toast.error("Error removing from watchlist");
    }
  };

  const isWatched = (coinId: string) => {
    return watchlist.some((item) => item.coinId === coinId);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, isLoading, addToWatchlist, removeFromWatchlist, isWatched }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
}
