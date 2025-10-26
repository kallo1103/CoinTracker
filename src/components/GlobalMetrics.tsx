'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { API_CONFIG } from '@/config/api';
import { DESIGN_TOKENS } from '@/config/design-tokens';
import { formatCurrency, formatPercent } from '@/utils/formatters';
import { getPriceChangeColor } from '@/utils/theme';

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

  // Fetch dữ liệu Global Metrics
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_CONFIG.endpoints.globalMetrics);
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
    // Refresh interval từ config
    const interval = setInterval(fetchData, API_CONFIG.polling.frequent);
    return () => clearInterval(interval);
  }, []);

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
        <p className="text-red-600 dark:text-red-400">❌ {error || 'Không có dữ liệu'}</p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: `${DESIGN_TOKENS.spacing.scale[6]}px` }}>
      {/* Tiêu đề */}
      <h3 
        className="text-2xl font-semibold text-gray-900 dark:text-white mb-6"
        style={{ 
          fontSize: DESIGN_TOKENS.typography.fontSize['2xl'],
          marginBottom: `${DESIGN_TOKENS.spacing.scale[6]}px`
        }}
      >
        📊 Global Crypto Metrics
      </h3>

      {/* Grid metrics */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        style={{ gap: `${DESIGN_TOKENS.spacing.scale[4]}px` }}
      >
        {/* Bitcoin Dominance */}
        <div 
          className="rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
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
              className="font-medium opacity-90 text-gray-900 dark:text-white"
              style={{ fontSize: DESIGN_TOKENS.typography.fontSize.sm }}
            >
              ₿ {t('metrics.btcDominance')}
            </h4>
            <span style={{ fontSize: DESIGN_TOKENS.typography.fontSize['2xl'] }}>₿</span>
          </div>
          <div 
            className="font-bold text-gray-900 dark:text-white"
            style={{ fontSize: DESIGN_TOKENS.typography.fontSize['3xl'] }}
          >
            {data.btc_dominance.toFixed(2)}%
          </div>
        </div>

        {/* Ethereum Dominance */}
        <div 
          className="rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
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
              className="font-medium opacity-90 text-gray-900 dark:text-white"
              style={{ fontSize: DESIGN_TOKENS.typography.fontSize.sm }}
            >
              Ξ {t('metrics.ethDominance')}
            </h4>
            <span style={{ fontSize: DESIGN_TOKENS.typography.fontSize['2xl'] }}>Ξ</span>
          </div>
          <div 
            className="font-bold text-gray-900 dark:text-white"
            style={{ fontSize: DESIGN_TOKENS.typography.fontSize['3xl'] }}
          >
            {data.eth_dominance.toFixed(2)}%
          </div>
        </div>

        {/* Total Market Cap */}
        <div 
          className="rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
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
              className="font-medium opacity-90 text-gray-900 dark:text-white"
              style={{ fontSize: DESIGN_TOKENS.typography.fontSize.sm }}
            >
              💰 {t('metrics.totalMarketCap')}
            </h4>
            <span style={{ fontSize: DESIGN_TOKENS.typography.fontSize['2xl'] }}>💰</span>
          </div>
          <div 
            className="font-bold text-gray-900 dark:text-white"
            style={{ fontSize: DESIGN_TOKENS.typography.fontSize['3xl'] }}
          >
            {formatCurrency(data.total_market_cap)}
          </div>
          <div 
            className="opacity-75 text-gray-900 dark:text-white"
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
          className="rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
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
              className="font-medium opacity-90 text-gray-900 dark:text-white"
              style={{ fontSize: DESIGN_TOKENS.typography.fontSize.sm }}
            >
              📈 {t('metrics.totalVolume24h')}
            </h4>
            <span style={{ fontSize: DESIGN_TOKENS.typography.fontSize['2xl'] }}>📈</span>
          </div>
          <div 
            className="font-bold text-gray-900 dark:text-white"
            style={{ fontSize: DESIGN_TOKENS.typography.fontSize['3xl'] }}
          >
            {formatCurrency(data.total_volume_24h)}
          </div>
          <div 
            className="opacity-75 text-gray-900 dark:text-white"
            style={{ 
              marginTop: `${DESIGN_TOKENS.spacing.scale[2]}px`,
              fontSize: DESIGN_TOKENS.typography.fontSize.xs
            }}
          >
            {data.active_cryptocurrencies.toLocaleString()} cryptocurrencies
          </div>
        </div>
      </div>
    </div>
  );
}

