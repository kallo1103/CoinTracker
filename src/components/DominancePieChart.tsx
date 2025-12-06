'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Interface cho dominance data
interface DominanceData {
  btc_dominance: number;
  eth_dominance: number;
}

export default function DominancePieChart() {
  const [data, setData] = useState<DominanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dominance data
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
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="border border-red-200 dark:border-red-800 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
        <p className="text-red-600 dark:text-red-400">❌ {error || 'Không có dữ liệu'}</p>
      </div>
    );
  }

  // Chuẩn bị dữ liệu cho pie chart
  const pieData = [
    { name: 'Bitcoin (BTC)', value: data.btc_dominance, color: '#FFA500' },
    { name: 'Ethereum (ETH)', value: data.eth_dominance, color: '#3399CC' },
    { name: 'Others (Altcoins)', value: 100 - data.btc_dominance - data.eth_dominance, color: '#663399' },
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">{data.name}</p>
          <p className="text-lg font-bold" style={{ color: data.payload.color }}>
            {data.value.toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-lg shadow p-6 border border-gray-200 dark:border-gray-900 bg-white dark:bg-slate-900">
      {/* Header */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6"> Market Dominance</h3>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry) => `${(entry.value as number).toFixed(1)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">Bitcoin</div>
          <div className="text-xl font-bold text-orange-600 dark:text-orange-400">{data.btc_dominance.toFixed(2)}%</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">Ethereum</div>
          <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{data.eth_dominance.toFixed(2)}%</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">Others</div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            {(100 - data.btc_dominance - data.eth_dominance).toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}

