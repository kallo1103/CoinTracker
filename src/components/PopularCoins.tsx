'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { CoinImage } from '@/components/OptimizedImage';
import { apiClient } from '@/lib/apiClient';
import { API_CONFIG, buildEndpoint } from '@/config/api';
import { logger } from '@/utils/logger';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  market_cap_rank: number;
  current_price: number;
  price_change_percentage_24h: number;
}

interface PopularCoinsProps {
  limit?: number;
}

export default function PopularCoins({ limit = 8 }: PopularCoinsProps) {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPopularCoins() {
      try {
        const url = buildEndpoint(API_CONFIG.endpoints.coins.markets, { limit });
        const response = await apiClient.get<CoinData[]>(url);

        if (response.success && response.data) {
          setCoins(response.data);
        } else {
          setError(response.error || 'Failed to load coins');
        }
      } catch (err) {
        setError('Connection error');
        logger.error('Error fetching popular coins:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularCoins();
  }, [limit]);

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: limit }).map((_, index) => (
          <div key={index} className="web3-card p-6 animate-pulse">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/5 rounded-full mx-auto mb-3" />
              <div className="h-4 bg-white/5 rounded mb-2" />
              <div className="h-3 bg-white/5 rounded w-2/3 mx-auto" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="web3-card text-center p-8 border-red-500/20">
        <AlertCircle className="h-10 w-10 mx-auto mb-3 text-red-400" />
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {coins.map((coin) => {
        const isPositive = coin.price_change_percentage_24h >= 0;

        return (
          <Link
            key={coin.id}
            href={`/coin/${coin.id}`}
            className="group metric-card p-5 text-center"
          >
            <div className="relative mb-3 inline-block">
              <CoinImage
                src={coin.image}
                symbol={coin.symbol}
                size={44}
                className="rounded-full transition-transform duration-200 group-hover:scale-110"
              />
              {coin.market_cap_rank <= 3 && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold rounded-full h-4.5 w-4.5 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  {coin.market_cap_rank}
                </div>
              )}
            </div>
            <h3 className="font-semibold text-white text-sm mb-0.5 group-hover:text-indigo-300 transition-colors">
              {coin.name}
            </h3>
            <p className="text-[10px] text-gray-500 uppercase font-medium tracking-wider mb-2">
              {coin.symbol}
            </p>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-200">
                {formatPrice(coin.current_price)}
              </p>
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                isPositive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {isPositive ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
