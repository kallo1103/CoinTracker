'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Interface cho dữ liệu crypto từ CoinGecko
interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  market_cap: number;
  total_volume: number;
  market_cap_rank: number;
}

interface CryptoListProps {
  limit?: number; // Số lượng coins muốn hiển thị
}

export default function CryptoList({ limit = 10 }: CryptoListProps) {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dữ liệu crypto khi component mount
  useEffect(() => {
    async function fetchCryptos() {
      try {
        const response = await fetch(`/api/coins/markets?limit=${limit}`);
        const result = await response.json();
        
        if (result.success) {
          setCryptos(result.data);
        } else {
          setError(result.error || 'Không thể tải dữ liệu cryptocurrency');
        }
      } catch (err) {
        setError('Không thể kết nối đến server');
        console.error('Error fetching crypto data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCryptos();
  }, [limit]);

  // Format số tiền
  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return `$${price.toFixed(6)}`;
    } else if (price < 1) {
      return `$${price.toFixed(4)}`;
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);
    }
  };

  // Format phần trăm thay đổi
  const formatPercent = (percent: number) => {
    const isPositive = percent >= 0;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {isPositive ? '▲' : '▼'} {Math.abs(percent).toFixed(2)}%
      </span>
    );
  };

  // Format market cap
  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-4xl mb-2">❌</div>
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-slate-900 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
        <thead className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-t-2xl">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
              #
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Tên
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Giá
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
              24h
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
              7d
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Market Cap
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {cryptos.map((crypto, index) => (
            <tr key={crypto.id} className="hover:bg-gray-50/50 transition-colors duration-200 group">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                {crypto.market_cap_rank}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/coin/${crypto.id}`} className="flex items-center group-hover:bg-blue-50/50 rounded-lg p-2 -m-2 transition-colors duration-200">
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="h-10 w-10 rounded-full ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-200 mr-4"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/favicon.svg';
                    }}
                  />
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-blue-600 transition-colors">
                      {crypto.name}
                    </div>
                    <div className="text-sm text-gray-500 uppercase font-medium">
                      {crypto.symbol}
                    </div>
                  </div>
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                {formatPrice(crypto.current_price)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {formatPercent(crypto.price_change_percentage_24h)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {formatPercent(crypto.price_change_percentage_7d)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {formatMarketCap(crypto.market_cap)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

