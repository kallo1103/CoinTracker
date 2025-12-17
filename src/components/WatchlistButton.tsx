"use client";

import { useWatchlist } from "@/contexts/WatchlistContext";
import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface WatchlistButtonProps {
  coinId: string;
  symbol: string;
  name: string;
  className?: string;
  size?: number;
}

export default function WatchlistButton({ coinId, symbol, name, className, size = 20 }: WatchlistButtonProps) {
  const { isWatched, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const watched = isWatched(coinId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (watched) {
      removeFromWatchlist(coinId);
    } else {
      addToWatchlist({ coinId, symbol, name });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
        watched ? "text-red-500" : "text-gray-400 hover:text-red-400",
        className
      )}
      title={watched ? "Remove from watchlist" : "Add to watchlist"}
    >
      <motion.div
        whileTap={{ scale: 0.8 }}
        animate={watched ? { scale: [1, 1.2, 1] } : {}}
      >
        <Heart
          size={size}
          fill={watched ? "currentColor" : "none"}
          strokeWidth={2}
        />
      </motion.div>
    </button>
  );
}
