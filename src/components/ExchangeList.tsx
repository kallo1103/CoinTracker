'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Interface cho dữ liệu exchange từ CoinGecko
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

export default function ExchangeList({ limit = 50 }: ExchangeListProps) {
  const { t } = useLanguage();
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hàm format BTC volume
  const formatBTC = (value: number): string => {
    if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M BTC`;
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(2)}K BTC`;
    }
    return `${value.toFixed(2)} BTC`;
  };

  // Hàm render trust score
  const getTrustScoreColor = (score: number): string => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    if (score >= 4) return 'text-orange-400';
    return 'text-red-400';
  };

  // Fetch dữ liệu exchanges
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/exchange/list?limit=${limit}`);
        const json = await response.json();

        if (json.success) {
          setExchanges(json.data);
          setError(null);
        } else {
          setError(json.error || 'Không thể tải dữ liệu');
        }
      } catch (err) {
        console.error('Error fetching exchanges:', err);
        setError('Lỗi kết nối đến server');
      } finally {
        setLoading(false);
      }
    };

    fetchExchanges();
    
    // Auto-refresh mỗi 5 phút
    const interval = setInterval(fetchExchanges, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [limit]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 dark:border-white"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-400">
        <p className="font-semibold">⚠️ Lỗi</p>
        <p>{error}</p>
      </div>
    );
  }

  // Empty state
  if (exchanges.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        Không tìm thấy exchanges.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header thống kê - responsive */}
      <div className="bg-gray-800/50 rounded-lg p-3 md:p-4 border border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 text-center">
          <div>
            <p className="text-gray-400 text-xs md:text-sm">{t('exchange.totalExchanges')}</p>
            <p className="text-xl md:text-2xl font-bold text-white">{exchanges.length}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs md:text-sm">{t('exchange.totalVolume')}</p>
            <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {formatBTC(exchanges.reduce((sum, ex) => sum + ex.volume_24h_btc, 0))}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-xs md:text-sm">{t('exchange.totalMarkets')}</p>
            <p className="text-xl md:text-2xl font-bold text-green-400">
              {exchanges.reduce((sum, ex) => sum + ex.num_market_pairs, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop: Bảng - ẩn trên mobile */}
      <div className="hidden md:block bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/80">
              <tr className="text-left text-gray-400 text-sm">
                <th className="px-6 py-4 font-semibold">#</th>
                <th className="px-6 py-4 font-semibold">Sàn giao dịch</th>
                <th className="px-6 py-4 font-semibold text-right">Volume 24h (BTC)</th>
                <th className="px-6 py-4 font-semibold text-center">Trust Score</th>
                <th className="px-6 py-4 font-semibold text-center">Quốc gia</th>
                <th className="px-6 py-4 font-semibold text-center">Market Pairs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {exchanges.map((exchange) => (
                <tr 
                  key={exchange.id} 
                  className="hover:bg-gray-800/40 transition-colors"
                >
                  {/* Số thứ tự */}
                  <td className="px-6 py-4 text-gray-400">
                    {exchange.trust_score_rank || exchange.rank}
                  </td>

                  {/* Tên sàn với logo */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {exchange.image && (
                        <img 
                          src={exchange.image} 
                          alt={exchange.name}
                          className="w-8 h-8 rounded-full"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <div>
                        <div className="font-semibold text-white">
                          {exchange.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {exchange.year_established && `Est. ${exchange.year_established}`}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Volume 24h BTC */}
                  <td className="px-6 py-4 text-right">
                    <div className="text-white font-medium">
                      {formatBTC(exchange.volume_24h_btc)}
                    </div>
                    <div className="text-xs text-gray-400">
                      Normalized: {formatBTC(exchange.volume_24h_btc_normalized)}
                    </div>
                  </td>

                  {/* Trust Score */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center">
                      <div className="flex flex-row items-center">
                        <span className={`text-lg font-bold ${getTrustScoreColor(exchange.trust_score)}`}>
                          {exchange.trust_score || 'N/A'}
                        </span>
                        <span className="text-lg text-gray-500">/ 10</span>
                      </div>
                    </div>
                  </td>

                  {/* Quốc gia */}
                  <td className="px-6 py-4 text-center text-gray-300">
                    {exchange.country || 'N/A'}
                  </td>

                  {/* Market Pairs */}
                  <td className="px-6 py-4 text-center text-gray-300">
                    {exchange.num_market_pairs.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile: Card layout - chỉ hiển thị trên mobile */}
      <div className="md:hidden space-y-3">
        {exchanges.map((exchange) => (
          <div 
            key={exchange.id}
            className="bg-gray-800/30 rounded-lg border border-gray-700 p-4 hover:bg-gray-800/50 transition-colors"
          >
            {/* Header card với logo và tên */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 flex-1">
                {exchange.image && (
                  <img 
                    src={exchange.image} 
                    alt={exchange.name}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">
                    {exchange.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {exchange.year_established ? `Est. ${exchange.year_established}` : 'N/A'}
                    {exchange.country && ` • ${exchange.country}`}
                  </div>
                </div>
              </div>
              
              {/* Rank badge */}
              <div className="flex-shrink-0 ml-2">
                <div className="bg-gray-700/50 px-2 py-1 rounded text-xs text-gray-300">
                  #{exchange.trust_score_rank || exchange.rank}
                </div>
              </div>
            </div>

            {/* Thông tin chi tiết - grid 2 cột */}
            <div className="grid grid-cols-2 gap-3">
              {/* Volume */}
              <div>
                <p className="text-xs text-gray-400 mb-1">Volume 24h</p>
                <p className="text-sm font-medium text-white">
                  {formatBTC(exchange.volume_24h_btc)}
                </p>
              </div>

              {/* Trust Score */}
              <div>
                <p className="text-xs text-gray-400 mb-1">Trust Score</p>
                <div className="flex items-baseline">
                  <span className={`text-lg font-bold ${getTrustScoreColor(exchange.trust_score)}`}>
                    {exchange.trust_score || 'N/A'}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">/ 10</span>
                </div>
              </div>

              {/* Market Pairs */}
              <div>
                <p className="text-xs text-gray-400 mb-1">Market Pairs</p>
                <p className="text-sm font-medium text-gray-300">
                  {exchange.num_market_pairs.toLocaleString()}
                </p>
              </div>

              {/* Volume Normalized */}
              <div>
                <p className="text-xs text-gray-400 mb-1">Normalized</p>
                <p className="text-sm font-medium text-gray-300">
                  {formatBTC(exchange.volume_24h_btc_normalized)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer info - responsive */}
      <div className="text-xs md:text-sm text-gray-400 text-center px-2">
        Dữ liệu được cập nhật tự động mỗi 5 phút • Nguồn: <span className="text-gray-700 dark:text-gray-300 font-semibold">CoinGecko API</span> (Miễn phí)
      </div>
    </div>
  );
}

