'use client';

import { useEffect, useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { API_CONFIG } from '@/config/api';
import { DESIGN_TOKENS } from '@/config/design-tokens';
import { formatCurrency, formatPercent } from '@/utils/formatters';
import { getPriceChangeColor } from '@/utils/theme';
import { apiClient } from '@/lib/apiClient';
import { logger } from '@/utils/logger';

// Interface cho Global Metrics data
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

  // Fetch dữ liệu Global Metrics
  useEffect(() => {
    fetchData();
    
    // Refresh interval từ config
    const interval = setInterval(fetchData, API_CONFIG.polling.frequent);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Format phần trăm với màu
  const renderPercentChange = (percent: number) => {
    const { color, isPositive } = getPriceChangeColor(percent);
    return (
      <span style={{ color }}>
        {isPositive ? '▲' : '▼'} {formatPercent(percent)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg shadow p-6 animate-pulse border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="border border-red-200 dark:border-red-800 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
        <p className="text-red-600 dark:text-red-400">❌ {error || t('common.noData')}</p>
        <button 
          onClick={fetchData}
          className="mt-2 text-sm text-blue-500 hover:text-blue-600 underline"
        >
          {t('common.tryAgain')}
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: `${DESIGN_TOKENS.spacing.scale[6]}px` }}>
      {/* Tiêu đề */}
      <h3 
        className="text-2xl font-semibold text-white mb-6"
        style={{ 
          fontSize: DESIGN_TOKENS.typography.fontSize['2xl'],
          marginBottom: `${DESIGN_TOKENS.spacing.scale[6]}px`
        }}
      >
         {t('metrics.title')}
      </h3>

      {/* Grid metrics */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        style={{ gap: `${DESIGN_TOKENS.spacing.scale[4]}px` }}
      >
        {/* Bitcoin Dominance */}
        <div 
          className="rounded-lg bg-slate-900 text-white"
          style={{ 
            borderRadius: DESIGN_TOKENS.borderRadius.lg,
            padding: `${DESIGN_TOKENS.spacing.scale[6]}px`
          }}
        >
          <div 
            className="flex items-center justify-between"
            style={{ marginBottom: `${DESIGN_TOKENS.spacing.scale[2]}px` }}
          >
            <h4 
              className="font-medium opacity-90 text-white"
              style={{ fontSize: DESIGN_TOKENS.typography.fontSize.sm }}
            >
               {t('metrics.btcDominance')}
            </h4>
            {/* Icon BTC */}
            <span className="text-orange-500" style={{ fontSize: DESIGN_TOKENS.typography.fontSize['xl'] }}>₿</span>
          </div>
          <div 
            className="font-bold text-white relative"
            style={{ fontSize: DESIGN_TOKENS.typography.fontSize['3xl'] }}
          >
            {data.btc_dominance.toFixed(2)}%
            <div className="w-full bg-gray-800 h-1.5 mt-3 rounded-full overflow-hidden">
              <div 
                className="bg-orange-500 h-full rounded-full transition-all duration-1000" 
                style={{ width: `${Math.min(data.btc_dominance, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Ethereum Dominance */}
        <div 
          className="rounded-lg bg-slate-900 text-white"
          style={{ 
            borderRadius: DESIGN_TOKENS.borderRadius.lg,
            padding: `${DESIGN_TOKENS.spacing.scale[6]}px`
          }}
        >
          <div 
            className="flex items-center justify-between"
            style={{ marginBottom: `${DESIGN_TOKENS.spacing.scale[2]}px` }}
          >
            <h4 
              className="font-medium opacity-90 text-white"
              style={{ fontSize: DESIGN_TOKENS.typography.fontSize.sm }}
            >
              {t('metrics.ethDominance')}
            </h4>
            {/* Icon ETH */}
            <span className="text-blue-400" style={{ fontSize: DESIGN_TOKENS.typography.fontSize['xl'] }}>♦</span>
          </div>
          <div 
            className="font-bold text-white relative"
            style={{ fontSize: DESIGN_TOKENS.typography.fontSize['3xl'] }}
          >
            {data.eth_dominance.toFixed(2)}%
            <div className="w-full bg-gray-800 h-1.5 mt-3 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-1000" 
                style={{ width: `${Math.min(data.eth_dominance, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Total Market Cap */}
        <div 
          className="rounded-lg bg-slate-900 text-white"
          style={{ 
            borderRadius: DESIGN_TOKENS.borderRadius.lg,
            padding: `${DESIGN_TOKENS.spacing.scale[6]}px`
          }}
        >
          <div 
            className="flex items-center justify-between"
            style={{ marginBottom: `${DESIGN_TOKENS.spacing.scale[2]}px` }}
          >
            <h4 
              className="font-medium opacity-90 text-white"
              style={{ fontSize: DESIGN_TOKENS.typography.fontSize.sm }}
            >
              {t('metrics.totalMarketCap')}
            </h4>
            <span className="text-green-500" style={{ fontSize: DESIGN_TOKENS.typography.fontSize['xl'] }}>$</span>
          </div>
          <div 
            className="font-bold text-white"
            style={{ fontSize: DESIGN_TOKENS.typography.fontSize['3xl'] }}
          >
            {formatCurrency(data.total_market_cap)}
          </div>
          <div 
            className="opacity-75 text-white"
            style={{ 
              marginTop: `${DESIGN_TOKENS.spacing.scale[2]}px`,
              fontSize: DESIGN_TOKENS.typography.fontSize.xs
            }}
          >
            {t('common.change24h')}: {renderPercentChange(data.total_market_cap_yesterday_percentage_change)}
          </div>
        </div>

        {/* Total Volume 24h */}
        <div 
          className="rounded-lg bg-slate-900 text-white"
          style={{ 
            borderRadius: DESIGN_TOKENS.borderRadius.lg,
            padding: `${DESIGN_TOKENS.spacing.scale[6]}px`
          }}
        >
          <div 
            className="flex items-center justify-between"
            style={{ marginBottom: `${DESIGN_TOKENS.spacing.scale[2]}px` }}
          >
            <h4 
              className="font-medium opacity-90 text-white"
              style={{ fontSize: DESIGN_TOKENS.typography.fontSize.sm }}
            >
              {t('metrics.totalVolume24h')}
            </h4>
            <span className="text-purple-400" style={{ fontSize: DESIGN_TOKENS.typography.fontSize['xl'] }}>📊</span>
          </div>
          <div 
            className="font-bold text-white relative"
            style={{ fontSize: DESIGN_TOKENS.typography.fontSize['3xl'] }}
          >
            {formatCurrency(data.total_volume_24h)}
          </div>
          <div 
            className="opacity-75 text-white"
            style={{ 
              marginTop: `${DESIGN_TOKENS.spacing.scale[2]}px`,
              fontSize: DESIGN_TOKENS.typography.fontSize.xs
            }}
          >
            {data.active_cryptocurrencies.toLocaleString()} {t('common.cryptocurrencies')}
          </div>
        </div>
      </div>
    </div>
  );
}

