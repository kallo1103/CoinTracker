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
        setError('Lỗi khi tải dữ liệu');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg shadow p-6 border border-gray-900">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
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

  // Chuẩn bị dữ liệu cho pie chart
  const pieData = [
    { name: 'Bitcoin (BTC)', value: data.btc_dominance, color: '#FFA500' },
    { name: 'Ethereum (ETH)', value: data.eth_dominance, color: '#3399CC' },
    { name: 'Others (Altcoins)', value: 100 - data.btc_dominance - data.eth_dominance, color: '#663399' },
  ];

  // Custom label
  const renderLabel = (entry: any) => {
    return `${entry.value.toFixed(1)}%`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-lg font-bold" style={{ color: data.payload.color }}>
            {data.value.toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-lg shadow p-6 border border-gray-900">
      {/* Header */}
      <h3 className="text-xl font-bold text-white mb-6">🥧 Market Dominance</h3>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry: any) => (
              <span style={{ color: '#374151' }}>
                {value}: <strong>{entry.payload.value.toFixed(2)}%</strong>
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-sm text-gray-600">Bitcoin</div>
          <div className="text-xl font-bold text-orange-600">{data.btc_dominance.toFixed(2)}%</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Ethereum</div>
          <div className="text-xl font-bold text-purple-600">{data.eth_dominance.toFixed(2)}%</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Others</div>
          <div className="text-xl font-bold text-blue-600">
            {(100 - data.btc_dominance - data.eth_dominance).toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}

