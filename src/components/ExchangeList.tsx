'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExchangeLogo } from '@/components/OptimizedImage';
import { apiClient } from '@/lib/apiClient';
import { API_CONFIG, buildEndpoint } from '@/config/api';
import { logger } from '@/utils/logger';

interface Exchange {
  id: string;
  name: string;
  slug: string;
  num_market_pairs: number;
  volume_24h_btc: number;
  volume_24h_btc_normalized: number;
  trust_score: number;
  trust_score_rank: number;
  year_established: number | null;
  country: string | null;
  image: string;
  url: string;
  rank: number;
}

interface ExchangeListProps {
  limit?: number;
}

function formatBTC(value: number): string {
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M BTC`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K BTC`;
  return `${value.toFixed(2)} BTC`;
}

function getTrustScoreColor(score: number): string {
  if (score >= 8) return 'text-emerald-400';
  if (score >= 6) return 'text-amber-400';
  if (score >= 4) return 'text-orange-400';
  return 'text-red-400';
}

export default function ExchangeList({ limit = 50 }: ExchangeListProps) {
  const { t } = useLanguage();
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        setLoading(true);
        const url = buildEndpoint(API_CONFIG.endpoints.exchange.list, { limit });
        const response = await apiClient.get<Exchange[]>(url);

        if (response.success && response.data) {
          setExchanges(response.data);
          setError(null);
        } else {
          setError(response.error || 'Failed to load exchanges');
        }
      } catch (err) {
        logger.error('Error fetching exchanges:', err);
        setError('Connection error');
      } finally {
        setLoading(false);
      }
    };

    fetchExchanges();
    const interval = setInterval(fetchExchanges, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="web3-card border-red-500/20 p-5">
        <p className="font-semibold text-red-400">⚠️ Error</p>
        <p className="text-red-400 text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (exchanges.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        No exchanges found.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Summary Stats */}
      <div className="web3-card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{t('exchange.totalExchanges')}</p>
            <p className="text-xl font-bold text-white">{exchanges.length}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{t('exchange.totalVolume')}</p>
            <p className="text-xl font-bold text-white">
              {formatBTC(exchanges.reduce((sum, ex) => sum + ex.volume_24h_btc, 0))}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{t('exchange.totalMarkets')}</p>
            <p className="text-xl font-bold text-emerald-400">
              {exchanges.reduce((sum, ex) => sum + ex.num_market_pairs, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block web3-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-6 py-4 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Exchange</th>
                <th className="px-6 py-4 text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Volume 24h (BTC)</th>
                <th className="px-6 py-4 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Trust Score</th>
                <th className="px-6 py-4 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-4 text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Market Pairs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {exchanges.map((exchange) => (
                <tr
                  key={exchange.id}
                  className="hover:bg-white/[0.03] transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {exchange.trust_score_rank || exchange.rank}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {exchange.image && (
                        <ExchangeLogo
                          src={exchange.image}
                          name={exchange.name}
                          size={32}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <div className="font-semibold text-white text-sm">{exchange.name}</div>
                        <div className="text-xs text-gray-500">
                          {exchange.year_established && `Est. ${exchange.year_established}`}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-white font-medium text-sm">{formatBTC(exchange.volume_24h_btc)}</div>
                    <div className="text-[10px] text-gray-500">Norm: {formatBTC(exchange.volume_24h_btc_normalized)}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-lg font-bold ${getTrustScoreColor(exchange.trust_score)}`}>
                      {exchange.trust_score || 'N/A'}
                    </span>
                    <span className="text-gray-600 text-sm">/ 10</span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-400 text-sm">
                    {exchange.country || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-400 text-sm">
                    {exchange.num_market_pairs.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {exchanges.map((exchange) => (
          <div
            key={exchange.id}
            className="web3-card p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {exchange.image && (
                  <ExchangeLogo
                    src={exchange.image}
                    name={exchange.name}
                    size={36}
                    className="rounded-full flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <div className="font-semibold text-white text-sm truncate">{exchange.name}</div>
                  <div className="text-xs text-gray-500">
                    {exchange.year_established ? `Est. ${exchange.year_established}` : 'N/A'}
                    {exchange.country && ` · ${exchange.country}`}
                  </div>
                </div>
              </div>
              <div className="bg-white/[0.05] px-2 py-1 rounded-lg text-xs text-gray-400 flex-shrink-0 ml-2">
                #{exchange.trust_score_rank || exchange.rank}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Volume 24h</p>
                <p className="text-sm font-medium text-white">{formatBTC(exchange.volume_24h_btc)}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Trust Score</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-lg font-bold ${getTrustScoreColor(exchange.trust_score)}`}>
                    {exchange.trust_score || 'N/A'}
                  </span>
                  <span className="text-xs text-gray-600">/ 10</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Market Pairs</p>
                <p className="text-sm font-medium text-gray-300">{exchange.num_market_pairs.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Normalized</p>
                <p className="text-sm font-medium text-gray-300">{formatBTC(exchange.volume_24h_btc_normalized)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-600 text-center">
        Auto-updated every 5 minutes · Source: <span className="text-gray-400 font-medium">CoinGecko API</span>
      </p>
    </div>
  );
}
