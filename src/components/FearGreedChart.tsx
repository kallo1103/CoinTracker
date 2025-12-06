'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

// Interface cho Fear & Greed data
interface FearGreedDataPoint {
  value: number;
  value_classification: string;
  timestamp: string;
}

export default function FearGreedChart() {
  const { t } = useLanguage();
  const [data, setData] = useState<FearGreedDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Fear & Greed history (30 ngày)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/fear-greed?limit=30');
        const result = await response.json();
        
        if (result.success) {
          // Reverse để hiển thị từ cũ đến mới
          setData(result.data.reverse());
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
  }, []);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: FearGreedDataPoint }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const date = new Date(parseInt(data.timestamp) * 1000).toLocaleDateString('vi-VN');
      
      // Xác định màu và text dựa trên giá trị
      let bgColor = 'bg-yellow-500';
      let textColor = 'text-gray-900';
      if (data.value <= 25) {
        bgColor = 'bg-red-500';
        textColor = 'text-gray-900 dark:text-white';
      } else if (data.value <= 45) {
        bgColor = 'bg-orange-500';
        textColor = 'text-gray-900 dark:text-white';
      } else if (data.value <= 55) {
        bgColor = 'bg-yellow-500';
      } else if (data.value <= 75) {
        bgColor = 'bg-lime-500';
      } else {
        bgColor = 'bg-green-500';
      }

      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{date}</p>
          <div className={`inline-block px-3 py-1 rounded ${bgColor} ${textColor} font-bold`}>
            {data.value} - {data.value_classification}
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
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
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

  const currentValue = data[data.length - 1]?.value || 50;
  const previousValue = data[data.length - 8]?.value || 50; // 7 ngày trước
  const change = currentValue - previousValue;

  return (
    <div className="rounded-lg shadow p-6 border border-gray-200 dark:border-gray-900 bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white"> Fear & Greed History</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">30 {t('chart.recentDays')}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentValue}</p>
          <p className={`text-sm font-medium ${change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(0)} (7d)
          </p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorFearGreed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="50%" stopColor="#eab308" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="timestamp" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(timestamp) => {
              const date = new Date(parseInt(timestamp) * 1000);
              return `${date.getDate()}/${date.getMonth() + 1}`;
            }}
          />
          <YAxis 
            domain={[0, 100]}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Reference lines cho các mức */}
          <ReferenceLine y={25} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Extreme Fear', position: 'right', fontSize: 10 }} />
          <ReferenceLine y={50} stroke="#eab308" strokeDasharray="3 3" label={{ value: 'Neutral', position: 'right', fontSize: 10 }} />
          <ReferenceLine y={75} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Extreme Greed', position: 'right', fontSize: 10 }} />
          
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#colorFearGreed)"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 flex justify-around text-xs text-gray-600">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-red-500 rounded mr-1"></span>
          <span>0-25: Extreme Fear</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-orange-500 rounded mr-1"></span>
          <span>26-45: Fear</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-yellow-500 rounded mr-1"></span>
          <span>46-55: Neutral</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-lime-500 rounded mr-1"></span>
          <span>56-75: Greed</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-green-500 rounded mr-1"></span>
          <span>76-100: Extreme Greed</span>
        </div>
      </div>
    </div>
  );
}

