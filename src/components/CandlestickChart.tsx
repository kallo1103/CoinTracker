'use client';

import { useEffect, useState } from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

// Interface cho candlestick data
interface CandleData {
  timestamp: number;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface CandlestickChartProps {
  symbol?: string; // Coin symbol (BTC, ETH, etc)
  days?: number; // Số ngày muốn hiển thị
}

export default function CandlestickChart({ symbol = 'BTC', days = 30 }: CandlestickChartProps) {
  const { t } = useLanguage();
  const [data, setData] = useState<CandleData[]>([]);
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
        setError('Error loading data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [symbol, days]);

  // Prepare data cho candlestick
  const candleData = data.map(item => {
    const isGreen = item.close >= item.open; // Nến xanh (tăng) hay đỏ (giảm)
    
    return {
      ...item,
      // Để vẽ nến, cần tính các giá trị
      wickLow: item.low, // Đuôi dưới
      wickHigh: item.high, // Đuôi trên
      bodyLow: Math.min(item.open, item.close), // Thân nến dưới
      bodyHigh: Math.max(item.open, item.close), // Thân nến trên
      isGreen,
    };
  });

  // Custom Candlestick Shape
  const CandlestickShape = (props: { x?: number; y?: number; width?: number; height?: number; payload?: CandleData & { isGreen: boolean; bodyLow: number; bodyHigh: number; wickLow: number; wickHigh: number } }) => {
    const { x, y, width, height, payload } = props;
    
    if (!payload || !x || !y || !width || !height) return null;

    const { high, low, open, close, isGreen } = payload;
    
    // Tính scale cho Y axis
    const yMin = Math.min(...candleData.map(d => d.low));
    const yMax = Math.max(...candleData.map(d => d.high));
    const yRange = yMax - yMin;
    const yScale = height / yRange;

    // Vị trí các điểm
    const highY = y + (yMax - high) * yScale;
    const lowY = y + (yMax - low) * yScale;
    const openY = y + (yMax - open) * yScale;
    const closeY = y + (yMax - close) * yScale;
    const bodyTop = Math.min(openY, closeY);
    const bodyBottom = Math.max(openY, closeY);
    const bodyHeight = Math.abs(closeY - openY);

    const color = isGreen ? '#10b981' : '#ef4444'; // Xanh tăng, đỏ giảm
    const wickWidth = 2;
    const bodyWidth = width * 0.7;
    const centerX = x + width / 2;

    return (
      <g>
        {/* Đuôi trên (high → body top) */}
        <line
          x1={centerX}
          y1={highY}
          x2={centerX}
          y2={bodyTop}
          stroke={color}
          strokeWidth={wickWidth}
        />
        
        {/* Thân nến (body) */}
        <rect
          x={x + (width - bodyWidth) / 2}
          y={bodyTop}
          width={bodyWidth}
          height={bodyHeight || 1} // Minimum 1px nếu open = close
          fill={color}
          stroke={color}
          strokeWidth={1}
        />
        
        {/* Đuôi dưới (body bottom → low) */}
        <line
          x1={centerX}
          y1={bodyBottom}
          x2={centerX}
          y2={lowY}
          stroke={color}
          strokeWidth={wickWidth}
        />
      </g>
    );
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: CandleData & { isGreen: boolean } }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const change = data.close - data.open;
      const percentChange = ((change / data.open) * 100);
      const isGreen = data.isGreen;

      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
          <p className="text-sm text-gray-600 mb-2 font-medium">{data.date}</p>
          
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">{t('chart.open')}:</span>
              <span className="font-semibold">${data.open.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">{t('chart.high')}:</span>
              <span className="font-semibold text-green-600">${data.high.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">{t('chart.low')}:</span>
              <span className="font-semibold text-red-600">${data.low.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">{t('chart.close')}:</span>
              <span className="font-semibold">${data.close.toFixed(2)}</span>
            </div>
          </div>

          <div className={`mt-3 pt-2 border-t ${isGreen ? 'border-green-200' : 'border-red-200'}`}>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Change:</span>
              <div className="text-right">
                <span className={`font-bold ${isGreen ? 'text-green-600' : 'text-red-600'}`}>
                  {isGreen ? '+' : ''}{change.toFixed(2)} ({percentChange.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500 text-xs">{t('chart.volume')}:</span>
              <span className="font-medium text-xs">
                ${(data.volume / 1e9).toFixed(2)}B
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="rounded-lg shadow p-6 border border-gray-200 dark:border-gray-900 bg-white dark:bg-slate-900">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || data.length === 0) {
    return (
      <div className="border border-gray-900 rounded-lg p-4 bg-slate-900">
        <p className="text-red-600">❌ {error || 'Không có dữ liệu'}</p>
      </div>
    );
  }


  const firstPrice = data[0]?.open || 0;
  const lastPrice = data[data.length - 1]?.close || 0;
  const priceChange = lastPrice - firstPrice;
  const percentChange = ((priceChange / firstPrice) * 100);
  const isPositive = percentChange >= 0;

  // Đếm số nến xanh và đỏ
  const greenCandles = candleData.filter(d => d.isGreen).length;
  const redCandles = candleData.length - greenCandles;

  return (
    <div className="rounded-lg shadow p-6 border border-gray-200 dark:border-gray-900 bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white"> {symbol} Candlestick Chart</h3>
          <p className="text-sm text-gray-500">{days} {t('chart.recentDays')}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${lastPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '▲' : '▼'} {Math.abs(percentChange).toFixed(2)}% ({days}d)
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-xs text-gray-900 dark:text-white mb-1">{t('chart.open')}</p>
          <p className="font-semibold text-gray-900 dark:text-white text-sm">${firstPrice.toFixed(2)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">{t('chart.high')}</p>
          <p className="font-semibold text-sm text-green-600">
            ${Math.max(...data.map(d => d.high)).toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">{t('chart.low')}</p>
          <p className="font-semibold text-sm text-red-600">
            ${Math.min(...data.map(d => d.low)).toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-900 dark:text-white mb-1">{t('chart.close')}</p>
          <p className="font-semibold text-gray-900 dark:text-white text-sm">${lastPrice.toFixed(2)}</p>
        </div>
      </div>

      {/* Candlestick Chart */}
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart data={candleData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#FFFFFF"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => {
              const parts = value.split('/');
              return `${parts[0]}/${parts[1]}`;
            }}
          />
          <YAxis 
            domain={['auto', 'auto']}
            stroke="#FFFFFF"
            style={{  fontSize: '12px' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Volume bars ở dưới */}
          <Bar 
            dataKey="volume" 
            fill="#FFFFFF" 
            opacity={0.3}
            yAxisId="volume"
          >
            {candleData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.isGreen ? '#10b981' : '#ef4444'} />
            ))}
          </Bar>

          {/* Candlesticks - Custom rendering */}
          <Bar 
            dataKey="high" 
            shape={<CandlestickShape />}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Legend & Info */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-600">{t('chart.priceIncrease')} ({greenCandles} {t('chart.candles')})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-gray-600">{t('chart.priceDecrease')} ({redCandles} {t('chart.candles')})</span>
          </div>
        </div>
        <p className="text-xs text-gray-400">
          {t('common.updated')}: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
}

