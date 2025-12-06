'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { API_CONFIG } from '@/config/api';
import { formatPrice, formatPercent, formatMarketCap } from '@/utils/formatters';
import { getPriceChangeColor } from '@/utils/theme';
import { Card } from '@/components/ui/Card';

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
      <span className={`
        inline-flex items-center font-medium px-2.5 py-0.5 rounded-full text-xs
        ${isPositive 
          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
          : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }
      `}>
        {isPositive ? '▲' : '▼'} {formatPercent(percent)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-purple-500/20 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-500/5 border-red-500/20 text-center">
        <div className="text-red-400 text-4xl mb-2">❌</div>
        <p className="text-red-400 font-medium">{error}</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-0 border-0 bg-slate-900 shadow-none">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="backdrop-blur-sm">
            <tr>
              {['#', t('common.name'), t('common.price'), '24h', '7d', t('common.marketCap')].map((head, i) => (
                <th key={i} className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider first:rounded-tl-xl last:rounded-tr-xl">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-slate-900/5 backdrop-blur-md">
            {cryptos.map((crypto) => (
              <tr 
                key={crypto.id} 
                className="hover:bg-white/5 transition-colors duration-200 group"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                  {crypto.market_cap_rank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/coin/${crypto.id}`} className="flex items-center group/link">
                    <Avatar
                      src={crypto.image}
                      alt={crypto.name}
                      className="w-10 h-10 rounded-full ring-2 ring-transparent group-hover/link:ring-blue-500/50 transition-all mr-4"
                    />
                    <div>
                      <div className="font-bold text-slate-100 group-hover/link:text-blue-400 transition-colors">
                        {crypto.name}
                      </div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                        {crypto.symbol}
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-200">
                  {formatPrice(crypto.current_price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderPercentChange(crypto.price_change_percentage_24h)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderPercentChange(crypto.price_change_percentage_7d)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 font-mono">
                  {formatMarketCap(crypto.market_cap)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
