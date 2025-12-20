
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PortfolioPieChartProps {
  assets: {
    name: string;
    symbol: string;
    totalQuantity: number;
    currentPrice: number;
  }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

export default function PortfolioPieChart({ assets }: PortfolioPieChartProps) {
  const data = assets
    .map(asset => ({
      name: asset.symbol.toUpperCase(),
      value: asset.totalQuantity * asset.currentPrice
    }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: { name: string; value: number } }[] }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-gray-700 p-2 rounded shadow-lg text-white">
          <p className="font-bold">{item.name}</p>
          <p>${item.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          <p className="text-sm text-gray-400">
            {totalValue > 0 ? ((item.value / totalValue) * 100).toFixed(2) : 0}%
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) return null;

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl mb-8">
      <h3 className="text-xl font-bold text-white mb-4">Asset Allocation</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: '#fff' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
