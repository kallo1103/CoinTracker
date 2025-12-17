"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Loader2 } from "lucide-react";

interface PortfolioHistoryChartProps {
  assets: { coinId: string; totalQuantity: number }[];
}

interface ChartDataPoint {
  date: string;
  timestamp: number;
  value: number;
}


interface HistoryPoint {
  date: string;
  timestamp: number;
  close: number;
}

interface AssetResponse {
  coinId: string;
  quantity: number;
  history: HistoryPoint[];
}

export default function PortfolioHistoryChart({ assets }: PortfolioHistoryChartProps) {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (assets.length === 0) {
      setLoading(false);
      setData([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all(
          assets.map(async (asset) => {
            try {
              const res = await fetch(`/api/price-history?coinId=${asset.coinId}&count=30`);
              const json = await res.json();
              if (json.success && Array.isArray(json.data)) {
                 return {
                    coinId: asset.coinId,
                    quantity: asset.totalQuantity,
                    history: json.data // { timestamp, close, date, ...}
                 } as AssetResponse;
              }
            } catch {
               console.error(`Failed to fetch history for ${asset.coinId}`);
            }
            return null;
          })
        );

        const validData = responses.filter((item): item is AssetResponse => item !== null);
        
        // 1. Organize data: CoinId -> Date -> Price (Close)
        // We take the LAST price entry for each day to represent that day's closing price
        const coinPriceMap: Record<string, Record<string, number>> = {};
        const allDates = new Set<string>();
        const dateTimestampMap: Record<string, number> = {};

        validData.forEach((item) => {
            if (!coinPriceMap[item.coinId]) {
                coinPriceMap[item.coinId] = {};
            }
            
            // Sort history by timestamp to ensure we process in order
            const sortedHistory = item.history.sort((a, b) => a.timestamp - b.timestamp);
            
            sortedHistory.forEach((point) => {
                // date string format from API is already 'dd/mm/yyyy' (vi-VN) or similar
                // We trust it groups by day correctly.
                // Overwrite ensures we keep the LATEST price for that specific date
                coinPriceMap[item.coinId][point.date] = point.close;
                
                allDates.add(point.date);
                // Keep the latest timestamp for this date for sorting later
                dateTimestampMap[point.date] = Math.max(dateTimestampMap[point.date] || 0, point.timestamp);
            });
        });

        // 2. Aggregate total value per day
        // Sort dates to process chronologically for forward-filling
        const sortedDates = Array.from(allDates).sort((a, b) => {
            return (dateTimestampMap[a] || 0) - (dateTimestampMap[b] || 0);
        });

        const valueMap: Record<string, number> = {};
        const lastKnownPrices: Record<string, number> = {};
        
        // Initialize lastKnownPrices with the first available price for each coin if needed? 
        // Actually, we can just start iterating. If data starts later for some coins, they will be 0 until data appears.
        
        sortedDates.forEach(date => {
            let dailyTotal = 0;
            
            assets.forEach(asset => {
                const prices = coinPriceMap[asset.coinId];
                if (prices) {
                    const currentPrice = prices[date];
                    if (currentPrice !== undefined) {
                        lastKnownPrices[asset.coinId] = currentPrice;
                    }
                }
                
                // Use current price for this date, or fallback to last known price
                // This handles gaps in data (e.g. weekends or missing API points)
                const priceToUse = lastKnownPrices[asset.coinId];
                
                if (priceToUse !== undefined) {
                    dailyTotal += priceToUse * asset.totalQuantity;
                }
            });
            
            valueMap[date] = dailyTotal;
        });

        // Convert to array
        const chartData = Object.keys(valueMap).map(date => ({
            date,
            timestamp: dateTimestampMap[date],
            value: valueMap[date]
        })).sort((a, b) => a.timestamp - b.timestamp);

        setData(chartData);

      } catch (error) {
         console.error("Chart data fetch error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [assets]);

  if (loading) {
    return (
       <div className="h-[300px] w-full flex items-center justify-center bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
       </div>
    );
  }

  if (data.length === 0) {
      return null;
  }

  return (
    <div className="h-[350px] w-full bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-6 rounded-xl mb-8">
       <h3 className="text-xl font-bold text-white mb-6">Portfolio Performance (30D)</h3>
       <div className="h-[250px] w-full">
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
              <XAxis 
                  dataKey="date" 
                  tick={{fontSize: 12, fill: '#9ca3af'}} 
                  tickMargin={10}
                  tickFormatter={(value) => {
                      // Handle potential vi-VN format or just slice
                      return value.split('/')[0] + '/' + value.split('/')[1];
                  }}
                  interval="preserveStartEnd"
              />
              <YAxis 
                  tick={{fontSize: 12, fill: '#9ca3af'}} 
                  tickFormatter={(value) => `$${value >= 1000 ? (value/1000).toFixed(1) + 'k' : value.toFixed(0)}`}
                  domain={['auto', 'auto']}
                  width={60}
              />
              <RechartsTooltip 
                  contentStyle={{backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.5rem'}}
                  itemStyle={{color: '#fff'}}
                  formatter={(value: number) => [`$${value.toLocaleString(undefined, {maximumFractionDigits: 2})}`, 'Total Value']}
                  labelStyle={{color: '#9ca3af'}}
              />
              <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  strokeWidth={2}
                  activeDot={{r: 6, fill: '#3b82f6', stroke: '#fff'}}
              />
            </AreaChart>
         </ResponsiveContainer>
       </div>
    </div>
  );
}
