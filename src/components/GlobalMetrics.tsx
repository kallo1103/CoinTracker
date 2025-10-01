'use client';

import { useEffect, useState } from 'react';

// Interface cho Global Metrics data
interface GlobalMetricsData {
  btc_dominance: number;
  eth_dominance: number;
  total_market_cap: number;
  total_volume_24h: number;
  active_cryptocurrencies: number;
  total_market_cap_yesterday_percentage_change: number;
  last_updated: string;
}

export default function GlobalMetrics() {
  const [data, setData] = useState<GlobalMetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dữ liệu Global Metrics
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/global-metrics');
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Error loading data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // Refresh mỗi 2 phút
    const interval = setInterval(fetchData, 120000);
    return () => clearInterval(interval);
  }, []);

  // Format số tiền
  const formatCurrency = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toFixed(2)}`;
  };

  // Format phần trăm
  const formatPercent = (percent: number) => {
    const isPositive = percent >= 0;
    return (
      <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
        {isPositive ? '▲' : '▼'} {Math.abs(percent).toFixed(2)}%
      </span>
    );
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg shadow p-6 animate-pulse border border-gray-900">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="border border-gray-900 rounded-lg p-4">
        <p className="text-red-600">❌ {error || 'Không có dữ liệu'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tiêu đề */}
      <h3 className="text-2xl font-semibold text-white">📊 Global Crypto Metrics</h3>

      {/* Grid metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Bitcoin Dominance */}
        <div 
          className="rounded-lg bg-blue-900 shadow-lg p-6 border border-gray-900"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium opacity-90">₿ Bitcoin Dominance</h4>
            <span className="text-2xl">₿</span>
          </div>
          <div className="text-3xl font-bold">{data.btc_dominance.toFixed(2)}%</div>
          <div className="mt-2 text-xs opacity-75">
            Bitcoin chiếm {data.btc_dominance.toFixed(2)}% tổng thị trường
          </div>
        </div>

        {/* Ethereum Dominance */}
        <div 
          className="rounded-lg bg-blue-900 shadow-lg p-6 border border-gray-900"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium opacity-90">Ξ Ethereum Dominance</h4>
            <span className="text-2xl">Ξ</span>
          </div>
          <div className="text-3xl font-bold">{data.eth_dominance.toFixed(2)}%</div>
          <div className="mt-2 text-xs opacity-75">
            Ethereum chiếm {data.eth_dominance.toFixed(2)}% tổng thị trường
          </div>
        </div>

        {/* Total Market Cap */}
        <div 
          className="rounded-lg bg-blue-900 shadow-lg p-6 border border-gray-900"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium opacity-90">💰 Total Market Cap</h4>
            <span className="text-2xl">💰</span>
          </div>
          <div className="text-3xl font-bold">{formatCurrency(data.total_market_cap)}</div>
          <div className="mt-2 text-xs opacity-75">
            Thay đổi 24h: {formatPercent(data.total_market_cap_yesterday_percentage_change)}
          </div>
        </div>

        {/* Total Volume 24h */}
        <div 
          className="rounded-lg bg-blue-900 shadow-lg p-6 border border-gray-900"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium opacity-90">📈 Volume 24h</h4>
            <span className="text-2xl">📈</span>
          </div>
          <div className="text-3xl font-bold">{formatCurrency(data.total_volume_24h)}</div>
          <div className="mt-2 text-xs opacity-75">
            {data.active_cryptocurrencies.toLocaleString()} cryptocurrencies
          </div>
        </div>
      </div>
    </div>
  );
}

