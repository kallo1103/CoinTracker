'use client';

import { useEffect, useState } from 'react';

// Interface cho dữ liệu Fear & Greed Index
interface FearGreedData {
  value: number;
  value_classification: string;
  classification: {
    text: string;
    color: string;
  };
  timestamp: string;
  time_until_update: string;
}

export default function FearGreedIndex() {
  const [data, setData] = useState<FearGreedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dữ liệu Fear & Greed Index
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/fear-greed?limit=1');
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
          setData(result.data[0]);
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
    // Refresh mỗi 1 giờ
    const interval = setInterval(fetchData, 3600000);
    return () => clearInterval(interval);
  }, []);

  // Lấy màu background dựa trên giá trị
  const getBackgroundColor = (value: number) => {
    if (value <= 25) return 'bg-red-500';
    if (value <= 45) return 'bg-orange-500';
    if (value <= 55) return 'bg-yellow-500';
    if (value <= 75) return 'bg-lime-500';
    return 'bg-green-500';
  };

  // Lấy text color dựa trên giá trị
  const getTextColor = (value: number) => {
    if (value <= 55) return 'text-white';
    return 'text-gray-900';
  };

  if (loading) {
    return (
      <div className="rounded-lg shadow p-6 border border-gray-900 bg-slate-900">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="border border-gray-900 rounded-lg p-4 bg-slate-900">
        <p className="text-red-600">❌ {error || 'Không có dữ liệu'}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg shadow p-6 border border-gray-900 bg-slate-900">
      <h3 className="text-lg font-semibold text-white mb-4">
        😱 Crypto Fear & Greed Index
      </h3>
      
      {/* Gauge/Meter hiển thị */}
      <div className="relative">
        {/* Background bar */}
        <div className="w-full h-8 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full relative overflow-hidden">
          {/* Indicator */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-black shadow-lg transition-all duration-500"
            style={{ left: `${data.value}%` }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-sm font-bold whitespace-nowrap">
              {data.value}
            </div>
          </div>
        </div>

        {/* Scale labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>

      {/* Value display */}
      <div className="mt-6 text-center">
        <div className={`inline-block px-6 py-3 rounded-lg ${getBackgroundColor(data.value)} ${getTextColor(data.value)} font-bold text-2xl`}>
          {data.value} - {data.value_classification}
        </div>
      </div>

      {/* Description */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p className="mb-2">
          <strong>Meaning:</strong>
        </p>
        <div className="flex justify-around text-xs">
          <div>
            <span className="inline-block w-3 h-3 bg-red-500 rounded mr-1"></span>
            <span>Extreme Fear (0-25)</span>
          </div>
          <div>
            <span className="inline-block w-3 h-3 bg-orange-500 rounded mr-1"></span>
            <span>Fear (26-45)</span>
          </div>
          <div>
            <span className="inline-block w-3 h-3 bg-yellow-500 rounded mr-1"></span>
            <span>Neutral (46-55)</span>
          </div>
          <div>
            <span className="inline-block w-3 h-3 bg-lime-500 rounded mr-1"></span>
            <span>Greed (56-75)</span>
          </div>
          <div>
            <span className="inline-block w-3 h-3 bg-green-500 rounded mr-1"></span>
            <span>Extreme Greed (76-100)</span>
          </div>
        </div>
      </div>

      {/* Update time */}
      <div className="mt-4 text-xs text-gray-400 text-center">
        Updated: {new Date(parseInt(data.timestamp) * 1000).toLocaleString('vi-VN')}
      </div>
    </div>
  );
}

