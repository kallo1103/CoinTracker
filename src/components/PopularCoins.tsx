'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Interface cho dữ liệu coin từ CoinGecko
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

  // Fetch dữ liệu popular coins từ API route
  useEffect(() => {
    async function fetchPopularCoins() {
      try {
        const response = await fetch(`/api/coins/markets?limit=${limit}`);
        const result = await response.json();
        
        if (result.success) {
          setCoins(result.data);
        } else {
          setError(result.error || 'Không thể tải dữ liệu coin');
        }
      } catch (err) {
        setError('Không thể kết nối đến server');
        console.error('Error fetching popular coins:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularCoins();
  }, [limit]);

  // Format giá
  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return `$${price.toFixed(6)}`;
    } else if (price < 1) {
      return `$${price.toFixed(4)}`;
    } else {
      return `$${price.toFixed(2)}`;
    }
  };

  // Format phần trăm thay đổi
  const formatPercent = (percent: number) => {
    const isPositive = percent >= 0;
    return (
      <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? '▲' : '▼'} {Math.abs(percent).toFixed(2)}%
      </span>
    );
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: limit }).map((_, index) => (
          <div
            key={index}
            className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl animate-pulse"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-600 rounded-full mx-auto mb-3"></div>
              <div className="h-4 bg-gray-600 rounded mb-2"></div>
              <div className="h-3 bg-gray-600 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">
          <svg className="h-12 w-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {coins.map((coin) => (
        <Link
          key={coin.id}
          href={`/coin/${coin.id}`}
          className="group block p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:from-gray-700/50 hover:to-gray-800/50 hover:border-gray-500 dark:hover:border-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="text-center">
            <div className="relative mb-3">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-12 h-12 rounded-full mx-auto ring-2 ring-gray-600 group-hover:ring-blue-400 transition-all duration-200"
                onError={(e) => {
                  // Fallback to symbol if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              {/* Fallback avatar */}
              <div 
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto items-center justify-center text-white font-bold text-lg hidden"
                style={{ display: 'none' }}
              >
                {coin.symbol.charAt(0)}
              </div>
              {coin.market_cap_rank <= 3 && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                  {coin.market_cap_rank}
                </div>
              )}
            </div>
            <h3 className="font-semibold text-white transition-colors text-sm mb-1">
              {coin.name}
            </h3>
            <p className="text-xs text-gray-400 uppercase font-medium mb-2">
              {coin.symbol}
            </p>
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-200">
                {formatPrice(coin.current_price)}
              </p>
              {formatPercent(coin.price_change_percentage_24h)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
