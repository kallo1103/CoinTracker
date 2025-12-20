"use client";

import { useWatchlist } from "@/contexts/WatchlistContext";
import { useMemo } from "react";
import WatchlistButton from "@/components/WatchlistButton";
import { CoinImage } from "@/components/OptimizedImage";
import { Loader2, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { useMarketData } from "@/hooks/useMarketData";

export default function WatchlistPage() {
  const { watchlist, isLoading: isWatchlistLoading } = useWatchlist();

  // Derive coin IDs for market data
  const coinIds = useMemo(() => {
    return watchlist.map(w => w.coinId).join(",");
  }, [watchlist]);

  const { data: marketDataList = [] } = useMarketData(coinIds);

  const marketData = useMemo(() => {
    const map: Record<string, { current_price: number; image: string; price_change_percentage_24h: number; market_cap: number; total_volume: number }> = {};
    marketDataList.forEach(coin => {
      map[coin.id] = coin;
    });
    return map;
  }, [marketDataList]);

  if (isWatchlistLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          My Watchlist
        </h1>
        <p className="text-gray-400 mt-1">Keep track of your favorite coins</p>
      </div>

      {watchlist.length === 0 ? (
        <div className="text-center py-20 bg-gray-900/50 rounded-2xl border border-gray-800">
           <div className="text-6xl mb-4">👀</div>
           <h3 className="text-xl font-bold text-white mb-2">Your watchlist is empty</h3>
           <p className="text-gray-400 mb-6">Start following coins to track their performance here.</p>
           <Link href="/dashboard" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
              Discover Coins
           </Link>
        </div>
      ) : (
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800/50 text-gray-400 text-left text-sm">
                  <th className="p-4 font-medium">Asset</th>
                  <th className="p-4 font-medium text-right">Price</th>
                  <th className="p-4 font-medium text-right">24h Change</th>
                  <th className="p-4 font-medium text-right">Market Cap</th>
                  <th className="p-4 font-medium text-right">Volume (24h)</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {watchlist.map((item) => {
                  const coin = marketData[item.coinId];
                  
                  return (
                    <tr key={item.id} className="border-t border-gray-800 hover:bg-gray-800/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                            <WatchlistButton 
                                coinId={item.coinId} 
                                symbol={item.symbol} 
                                name={item.name} 
                            />
                            {coin ? (
                                <CoinImage src={coin.image} symbol={item.symbol} size={32} className="rounded-full" />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse" />
                            )}
                            <div>
                                <div className="font-bold text-white">{item.name}</div>
                                <div className="text-sm text-gray-500 uppercase">{item.symbol}</div>
                            </div>
                        </div>
                      </td>
                      <td className="p-4 text-right font-medium text-white">
                        {coin ? `$${coin.current_price.toLocaleString()}` : <div className="h-4 w-20 bg-gray-800 rounded animate-pulse ml-auto" />}
                      </td>
                      <td className="p-4 text-right">
                        {coin ? (
                            <div className={`flex items-center justify-end gap-1 ${coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                                {coin.price_change_percentage_24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                            </div>
                        ) : (
                            <div className="h-4 w-16 bg-gray-800 rounded animate-pulse ml-auto" />
                        )}
                      </td>
                      <td className="p-4 text-right text-gray-400">
                        {coin ? `$${coin.market_cap.toLocaleString()}` : "-"}
                      </td>
                        <td className="p-4 text-right text-gray-400">
                        {coin ? `$${coin.total_volume.toLocaleString()}` : "-"}
                      </td>
                      <td className="p-4 text-right">
                         <Link href={`/coin/${item.coinId}`} className="text-blue-400 hover:text-blue-300 text-sm">
                            Details
                         </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
