'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { API_CONFIG } from '@/config/api';
import { DESIGN_TOKENS } from '@/config/design-tokens';
import { DEFAULT_LIMITS } from '@/config/constants';
import { formatPrice, formatPercent, formatMarketCap } from '@/utils/formatters';
import { getPriceChangeColor, getStatusColor } from '@/utils/theme';

// Interface cho dữ liệu crypto từ CoinGecko
interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  market_cap: number;
  total_volume: number;
  market_cap_rank: number;
}

interface CryptoListProps {
  limit?: number; // Số lượng coins muốn hiển thị
}

export default function CryptoList({ limit = DEFAULT_LIMITS.cryptoList }: CryptoListProps) {
  const { t } = useLanguage();
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dữ liệu crypto khi component mount
  useEffect(() => {
    async function fetchCryptos() {
      try {
        const response = await fetch(`${API_CONFIG.endpoints.coins.markets}?limit=${limit}`);
        const result = await response.json();
        
        if (result.success) {
          setCryptos(result.data);
        } else {
          setError(result.error || 'Không thể tải dữ liệu cryptocurrency');
        }
      } catch (err) {
        setError('Không thể kết nối đến server');
        console.error('Error fetching crypto data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCryptos();
  }, [limit]);

  // Render phần trăm thay đổi với style
  const renderPercentChange = (percent: number) => {
    const { color, isPositive } = getPriceChangeColor(percent);
    const bgColor = isPositive 
      ? getStatusColor('success', 'light')
      : getStatusColor('error', 'light');
    
    return (
      <span 
        className="inline-flex items-center font-medium rounded-full"
        style={{
          padding: `${DESIGN_TOKENS.spacing.scale[1]}px ${DESIGN_TOKENS.spacing.scale[2]}px`,
          fontSize: DESIGN_TOKENS.typography.fontSize.xs,
          backgroundColor: bgColor,
          color: color,
          borderRadius: DESIGN_TOKENS.borderRadius.full
        }}
      >
        {isPositive ? '▲' : '▼'} {formatPercent(percent)}
      </span>
    );
  };

  if (loading) {
    return (
      <div 
        className="flex justify-center items-center"
        style={{ 
          padding: `${DESIGN_TOKENS.spacing.scale[12]}px 0`
        }}
      >
        <div 
          className="animate-spin rounded-full border-b-2 border-gray-600 dark:border-white"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: DESIGN_TOKENS.borderRadius.full
          }}
        ></div>
        <span 
          className="text-gray-600 dark:text-gray-300"
          style={{ 
            marginLeft: `${DESIGN_TOKENS.spacing.scale[3]}px`,
            fontSize: DESIGN_TOKENS.typography.fontSize.base
          }}
        >
          {t('common.loadingData')}
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
        <div className="text-red-600 dark:text-red-400 text-4xl mb-2">❌</div>
        <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table 
        className="min-w-full bg-white dark:bg-slate-900 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-white/20"
        style={{ 
          borderRadius: DESIGN_TOKENS.borderRadius['2xl']
        }}
      >
        <thead className="bg-gray-100 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900">
          <tr>
            <th 
              className="text-left font-semibold text-gray-700 dark:text-white uppercase tracking-wider"
              style={{
                padding: `${DESIGN_TOKENS.spacing.scale[4]}px ${DESIGN_TOKENS.spacing.scale[6]}px`,
                fontSize: DESIGN_TOKENS.typography.fontSize.xs
              }}
            >
              #
            </th>
            <th 
              className="text-left font-semibold text-gray-700 dark:text-white uppercase tracking-wider"
              style={{
                padding: `${DESIGN_TOKENS.spacing.scale[4]}px ${DESIGN_TOKENS.spacing.scale[6]}px`,
                fontSize: DESIGN_TOKENS.typography.fontSize.xs
              }}
            >
              {t('common.name')}
            </th>
            <th 
              className="text-left font-semibold text-gray-700 dark:text-white uppercase tracking-wider"
              style={{
                padding: `${DESIGN_TOKENS.spacing.scale[4]}px ${DESIGN_TOKENS.spacing.scale[6]}px`,
                fontSize: DESIGN_TOKENS.typography.fontSize.xs
              }}
            >
              {t('common.price')}
            </th>
            <th 
              className="text-left font-semibold text-gray-700 dark:text-white uppercase tracking-wider"
              style={{
                padding: `${DESIGN_TOKENS.spacing.scale[4]}px ${DESIGN_TOKENS.spacing.scale[6]}px`,
                fontSize: DESIGN_TOKENS.typography.fontSize.xs
              }}
            >
              24h
            </th>
            <th 
              className="text-left font-semibold text-gray-700 dark:text-white uppercase tracking-wider"
              style={{
                padding: `${DESIGN_TOKENS.spacing.scale[4]}px ${DESIGN_TOKENS.spacing.scale[6]}px`,
                fontSize: DESIGN_TOKENS.typography.fontSize.xs
              }}
            >
              7d
            </th>
            <th 
              className="text-left font-semibold text-gray-700 dark:text-white uppercase tracking-wider"
              style={{
                padding: `${DESIGN_TOKENS.spacing.scale[4]}px ${DESIGN_TOKENS.spacing.scale[6]}px`,
                fontSize: DESIGN_TOKENS.typography.fontSize.xs
              }}
            >
              {t('common.marketCap')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {cryptos.map((crypto) => (
            <tr 
              key={crypto.id} 
              className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group"
              style={{ transitionDuration: DESIGN_TOKENS.transition.duration.base }}
            >
              <td 
                className="whitespace-nowrap font-medium text-gray-500 dark:text-gray-400"
                style={{
                  padding: `${DESIGN_TOKENS.spacing.scale[4]}px ${DESIGN_TOKENS.spacing.scale[6]}px`,
                  fontSize: DESIGN_TOKENS.typography.fontSize.sm
                }}
              >
                {crypto.market_cap_rank}
              </td>
              <td 
                className="whitespace-nowrap"
                style={{
                  padding: `${DESIGN_TOKENS.spacing.scale[4]}px ${DESIGN_TOKENS.spacing.scale[6]}px`
                }}
              >
                <Link 
                  href={`/coin/${crypto.id}`} 
                  className="flex items-center group-hover:bg-gray-700/20 rounded-lg transition-colors"
                  style={{
                    padding: `${DESIGN_TOKENS.spacing.scale[2]}px`,
                    margin: `-${DESIGN_TOKENS.spacing.scale[2]}px`,
                    borderRadius: DESIGN_TOKENS.borderRadius.lg,
                    transitionDuration: DESIGN_TOKENS.transition.duration.base
                  }}
                >
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="rounded-full ring-2 ring-gray-100 group-hover:ring-gray-400 dark:group-hover:ring-white transition-all"
                    style={{
                      height: '40px',
                      width: '40px',
                      marginRight: `${DESIGN_TOKENS.spacing.scale[4]}px`,
                      transitionDuration: DESIGN_TOKENS.transition.duration.base,
                      borderRadius: DESIGN_TOKENS.borderRadius.full
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/favicon.svg';
                    }}
                  />
                  <div>
                    <div 
                      className="font-semibold text-gray-900 dark:text-white transition-colors"
                      style={{ fontSize: DESIGN_TOKENS.typography.fontSize.sm }}
                    >
                      {crypto.name}
                    </div>
                    <div 
                      className="text-gray-500 dark:text-gray-400 uppercase font-medium"
                      style={{ fontSize: DESIGN_TOKENS.typography.fontSize.sm }}
                    >
                      {crypto.symbol}
                    </div>
                  </div>
                </Link>
              </td>
              <td 
                className="whitespace-nowrap font-semibold text-gray-900 dark:text-white"
                style={{
                  padding: `${DESIGN_TOKENS.spacing.scale[4]}px ${DESIGN_TOKENS.spacing.scale[6]}px`,
                  fontSize: DESIGN_TOKENS.typography.fontSize.sm
                }}
              >
                {formatPrice(crypto.current_price)}
              </td>
              <td 
                className="whitespace-nowrap"
                style={{
                  padding: `${DESIGN_TOKENS.spacing.scale[4]}px ${DESIGN_TOKENS.spacing.scale[6]}px`,
                  fontSize: DESIGN_TOKENS.typography.fontSize.sm
                }}
              >
                {renderPercentChange(crypto.price_change_percentage_24h)}
              </td>
              <td 
                className="whitespace-nowrap"
                style={{
                  padding: `${DESIGN_TOKENS.spacing.scale[4]}px ${DESIGN_TOKENS.spacing.scale[6]}px`,
                  fontSize: DESIGN_TOKENS.typography.fontSize.sm
                }}
              >
                {renderPercentChange(crypto.price_change_percentage_7d)}
              </td>
              <td 
                className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                style={{
                  padding: `${DESIGN_TOKENS.spacing.scale[4]}px ${DESIGN_TOKENS.spacing.scale[6]}px`,
                  fontSize: DESIGN_TOKENS.typography.fontSize.sm
                }}
              >
                {formatMarketCap(crypto.market_cap)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

