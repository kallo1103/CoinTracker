'use client';

import { useEffect, useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { API_CONFIG } from '@/config/api';
import { formatCurrency, formatPercent } from '@/utils/formatters';
import { getPriceChangeColor } from '@/utils/theme';
import { apiClient } from '@/lib/apiClient';
import { logger } from '@/utils/logger';
import { TrendingUp, TrendingDown, Bitcoin, Layers, DollarSign, BarChart3 } from 'lucide-react';

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
  const { t } = useLanguage();
  const [data, setData] = useState<GlobalMetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await apiClient.get<GlobalMetricsData>(
        API_CONFIG.endpoints.globalMetrics
      );

      if (response.success && response.data) {
        setData(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch global metrics');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error loading data';
      setError(message);
      logger.error('GlobalMetrics fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, API_CONFIG.polling.frequent);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-white/5 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="web3-card p-6 animate-pulse">
              <div className="h-4 bg-white/5 rounded w-2/3 mb-4" />
              <div className="h-8 bg-white/5 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="web3-card border-red-500/20 p-5">
        <p className="text-red-400">❌ {error || t('common.noData')}</p>
        <button
          onClick={fetchData}
          className="mt-2 text-sm text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors"
        >
          {t('common.tryAgain')}
        </button>
      </div>
    );
  }

  const { isPositive } = getPriceChangeColor(data.total_market_cap_yesterday_percentage_change);

  return (
    <div className="space-y-6">
      <h3 className="section-title">{t('metrics.title')}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Bitcoin Dominance */}
        <div className="metric-card group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-400">{t('metrics.btcDominance')}</span>
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 transition-colors">
              <Bitcoin className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-3">{data.btc_dominance.toFixed(2)}%</p>
          <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(data.btc_dominance, 100)}%` }}
            />
          </div>
        </div>

        {/* Ethereum Dominance */}
        <div className="metric-card group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-400">{t('metrics.ethDominance')}</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-3">{data.eth_dominance.toFixed(2)}%</p>
          <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-blue-400 h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(data.eth_dominance, 100)}%` }}
            />
          </div>
        </div>

        {/* Total Market Cap */}
        <div className="metric-card group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-400">{t('metrics.totalMarketCap')}</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-2">{formatCurrency(data.total_market_cap)}</p>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-500">{t('common.change24h')}:</span>
            <span className={`flex items-center gap-1 font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {formatPercent(data.total_market_cap_yesterday_percentage_change)}
            </span>
          </div>
        </div>

        {/* Total Volume 24h */}
        <div className="metric-card group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-400">{t('metrics.totalVolume24h')}</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-2">{formatCurrency(data.total_volume_24h)}</p>
          <p className="text-xs text-gray-500">
            {data.active_cryptocurrencies.toLocaleString()} {t('common.cryptocurrencies')}
          </p>
        </div>
      </div>
    </div>
  );
}
