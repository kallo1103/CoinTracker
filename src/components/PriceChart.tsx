'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { API_CONFIG } from '@/config/api';
import { DESIGN_TOKENS } from '@/config/design-tokens';
import { DEFAULT_LIMITS } from '@/config/constants';
import { formatChartAxisValue, formatChartDateLabel } from '@/utils/formatters';
import { getChartGradientColors, getPriceChangeColor, getChartGridColor, getChartAxisColor } from '@/utils/theme';
import { useChartHeight } from '@/utils/responsive';

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

export default function PriceChart({ symbol = 'BTC', days = DEFAULT_LIMITS.historyDays.default, type = 'area' }: PriceChartProps) {
  const { t } = useLanguage();
  const [data, setData] = useState<PriceDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Responsive chart height
  const chartHeight = useChartHeight();

  // Fetch price history data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_CONFIG.endpoints.priceHistory}?symbol=${symbol}&count=${days}&interval=1d`);
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
  }, [symbol, days]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: PriceDataPoint }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{data.date}</p>
          <p className="text-lg font-bold text-white">
            ${data.close.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-400">
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
      <div className="rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || data.length === 0) {
    return (
      <div className="border border-red-200 dark:border-red-800 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
        <p className="text-red-600 dark:text-red-400">❌ {error || 'Không có dữ liệu'}</p>
      </div>
    );
  }

  // Tính % thay đổi và màu sắc
  const firstPrice = data[0]?.close || 0;
  const lastPrice = data[data.length - 1]?.close || 0;
  const priceChange = lastPrice - firstPrice;
  const percentChange = ((priceChange / firstPrice) * 100);
  
  // Lấy màu từ theme utils
  const { color: changeColor, isPositive } = getPriceChangeColor(percentChange);
  const gradientColors = getChartGradientColors(isPositive);

  return (
    <div 
      className="rounded-lg shadow p-6 bg-slate-900"
      style={{ borderRadius: DESIGN_TOKENS.borderRadius.lg }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 
            className="text-xl font-bold text-white"
            style={{ fontSize: DESIGN_TOKENS.typography.fontSize.xl }}
          >
            {symbol} Price Chart
          </h3>
          <p 
            className="text-sm text-gray-500 dark:text-gray-400"
            style={{ fontSize: DESIGN_TOKENS.typography.fontSize.sm }}
          >
            {days} {t('chart.recentDays')}
          </p>
        </div>
        <div className="text-right">
          <p 
            className="text-2xl font-bold text-white"
            style={{ fontSize: DESIGN_TOKENS.typography.fontSize['2xl'] }}
          >
            ${lastPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p 
            className="text-sm font-medium"
            style={{ 
              fontSize: DESIGN_TOKENS.typography.fontSize.sm,
              color: changeColor
            }}
          >
            {isPositive ? '▲' : '▼'} {Math.abs(percentChange).toFixed(2)}% ({days}d)
          </p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={chartHeight}>
        {type === 'area' ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`color${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradientColors.start} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={gradientColors.end} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={getChartGridColor()} 
            />
            <XAxis 
              dataKey="date" 
              stroke={getChartAxisColor()}
              style={{ fontSize: DESIGN_TOKENS.typography.fontSize.xs }}
              tickFormatter={formatChartDateLabel}
            />
            <YAxis 
              stroke={getChartAxisColor()}
              style={{ fontSize: DESIGN_TOKENS.typography.fontSize.xs }}
              tickFormatter={formatChartAxisValue}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="close" 
              stroke={gradientColors.stroke}
              strokeWidth={DESIGN_TOKENS?.chart?.strokeWidth?.normal || 2}
              fill={`url(#color${symbol})`}
            />
          </AreaChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={getChartGridColor()} 
            />
            <XAxis 
              dataKey="date" 
              stroke={getChartAxisColor()}
              style={{ fontSize: DESIGN_TOKENS.typography.fontSize.xs }}
              tickFormatter={formatChartDateLabel}
            />
            <YAxis 
              stroke={getChartAxisColor()}
              style={{ fontSize: DESIGN_TOKENS.typography.fontSize.xs }}
              tickFormatter={formatChartAxisValue}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="close" 
              stroke={gradientColors.stroke}
              strokeWidth={DESIGN_TOKENS?.chart?.strokeWidth?.normal || 2}
              dot={false}
              name="Price"
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

