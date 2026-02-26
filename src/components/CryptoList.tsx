'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { API_CONFIG } from '@/config/api';
import { formatPrice, formatPercent, formatMarketCap } from '@/utils/formatters';
import { getPriceChangeColor } from '@/utils/theme';

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
  limit?: number;
}

function Avatar({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={40}
      height={40}
      className={className}
      unoptimized
      onError={() => setImgSrc('/favicon.svg')}
    />
  );
}

export default function CryptoList({ limit = 10 }: CryptoListProps) {
  const { t } = useLanguage();
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCryptos() {
      try {
        const response = await fetch(`${API_CONFIG.endpoints.coins.markets}?limit=${limit}`);
        const result = await response.json();

        if (result.success) {
          setCryptos(result.data);
        } else {
          setError(result.error || 'Failed to load data');
        }
      } catch (err) {
        setError('Network error');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCryptos();
  }, [limit]);

  const renderPercentChange = (percent: number) => {
    const { isPositive } = getPriceChangeColor(percent);
    return (
      <span className={`inline-flex items-center gap-1 font-medium px-2.5 py-0.5 rounded-full text-xs ${
        isPositive
          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
          : 'bg-red-500/10 text-red-400 border border-red-500/20'
      }`}>
        {isPositive ? '▲' : '▼'} {formatPercent(percent)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="relative">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="web3-card border-red-500/20 text-center p-6">
        <p className="text-red-400 font-medium">❌ {error}</p>
      </div>
    );
  }

  return (
    <div className="web3-card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {['#', t('common.name'), t('common.price'), '24h', '7d', t('common.marketCap')].map((head, i) => (
                <th key={i} className="px-6 py-4 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {cryptos.map((crypto) => (
              <tr
                key={crypto.id}
                className="hover:bg-white/[0.03] transition-colors duration-200 group"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                  {crypto.market_cap_rank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/coin/${crypto.id}`} className="flex items-center group/link">
                    <Avatar
                      src={crypto.image}
                      alt={crypto.name}
                      className="w-9 h-9 rounded-full ring-2 ring-transparent group-hover/link:ring-indigo-500/40 transition-all mr-3.5"
                    />
                    <div>
                      <div className="font-semibold text-white text-sm group-hover/link:text-indigo-400 transition-colors">
                        {crypto.name}
                      </div>
                      <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                        {crypto.symbol}
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-white text-sm">
                  {formatPrice(crypto.current_price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderPercentChange(crypto.price_change_percentage_24h)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderPercentChange(crypto.price_change_percentage_7d)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">
                  {formatMarketCap(crypto.market_cap)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
