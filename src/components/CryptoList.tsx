'use client';

import { useEffect, useState } from 'react';

// Interface cho dữ liệu crypto từ CoinMarketCap
interface CryptoData {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
      percent_change_7d: number;
      market_cap: number;
      volume_24h: number;
    }
  }
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
        const response = await fetch(`/api/crypto?limit=${limit}`);
        const result = await response.json();
        
        if (result.success) {
          setCryptos(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Lỗi khi tải dữ liệu');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCryptos();
  }, [limit]);

  // Format số tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Format phần trăm thay đổi
  const formatPercent = (percent: number) => {
    const isPositive = percent >= 0;
    return (
      <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
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
      <div className="border border-gray-900 rounded-lg p-4">
        <p className="text-red-600">❌ {error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-lg shadow border border-gray-900">
        <thead className="border-b border-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              #
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Tên
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Giá
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              24h
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              7d
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Market Cap
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-900">
          {cryptos.map((crypto, index) => (
            <tr key={crypto.id} className="transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-white">
                      {crypto.name}
                    </div>
                    <div className="text-sm text-white">
                      {crypto.symbol}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {formatPrice(crypto.quote.USD.price)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {formatPercent(crypto.quote.USD.percent_change_24h)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {formatPercent(crypto.quote.USD.percent_change_7d)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {formatMarketCap(crypto.quote.USD.market_cap)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

