'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Interface cho price data
interface PriceDataPoint {
  timestamp: number;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface PriceChartProps {
  symbol?: string; // Coin symbol (BTC, ETH, etc)
  days?: number; // Số ngày muốn hiển thị
  type?: 'line' | 'area'; // Loại chart
}

export default function PriceChart({ symbol = 'BTC', days = 30, type = 'area' }: PriceChartProps) {
  const [data, setData] = useState<PriceDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch price history data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/price-history?symbol=${symbol}&count=${days}&interval=1d`);
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
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

    fetchData();
  }, [symbol, days]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">{data.date}</p>
          <p className="text-lg font-bold text-gray-900">
            ${data.close.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="mt-2 space-y-1 text-xs text-gray-600">
            <p>Open: ${data.open.toFixed(2)}</p>
            <p>High: ${data.high.toFixed(2)}</p>
            <p>Low: ${data.low.toFixed(2)}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="rounded-lg shadow p-6 border border-gray-900">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || data.length === 0) {
    return (
      <div className="border border-gray-900 rounded-lg p-4">
        <p className="text-red-600">❌ {error || 'Không có dữ liệu'}</p>
      </div>
    );
  }

  // Tính % thay đổi
  const firstPrice = data[0]?.close || 0;
  const lastPrice = data[data.length - 1]?.close || 0;
  const priceChange = lastPrice - firstPrice;
  const percentChange = ((priceChange / firstPrice) * 100);
  const isPositive = percentChange >= 0;

  return (
    <div className="rounded-lg shadow p-6 border border-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">{symbol} Price Chart</h3>
          <p className="text-sm text-gray-500">{days} ngày gần đây</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">
            ${lastPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '▲' : '▼'} {Math.abs(percentChange).toFixed(2)}% ({days}d)
          </p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        {type === 'area' ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`color${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => {
                // Chỉ hiển thị một số ngày để không bị đông
                const parts = value.split('/');
                return `${parts[0]}/${parts[1]}`;
              }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="close" 
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth={2}
              fill={`url(#color${symbol})`}
            />
          </AreaChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => {
                const parts = value.split('/');
                return `${parts[0]}/${parts[1]}`;
              }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="close" 
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth={2}
              dot={false}
              name="Price"
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

