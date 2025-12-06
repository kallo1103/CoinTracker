'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Trophy, 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Activity, 
  BarChart2, 
  Box, 
  Tag, 
  FileText, 
  Link as LinkIcon, 
  Globe, 
  Github, 
  MessageSquare, 
  Blocks
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { formatPrice, formatPercent, formatMarketCap } from '@/utils/formatters';
import { getPriceChangeColor } from '@/utils/theme';

// Interface cho dữ liệu chi tiết coin từ CoinGecko
interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
      vnd: number;
    };
    market_cap: {
      usd: number;
      vnd: number;
    };
    total_volume: {
      usd: number;
      vnd: number;
    };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    market_cap_rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: {
      usd: number;
    };
    ath_change_percentage: {
      usd: number;
    };
    atl: {
      usd: number;
    };
    atl_change_percentage: {
      usd: number;
    };
  };
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  categories: string[];
  genesis_date: string;
  country_origin: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
}

interface CoinProfileResponse {
  success: boolean;
  data: CoinData;
  error?: string;
}

export default function CoinProfile() {
  const params = useParams();
  const coinId = params.id as string;
  
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dữ liệu coin khi component mount
  useEffect(() => {
    async function fetchCoinData() {
      try {
        const response = await fetch(`/api/coin/${coinId}`);
        const result: CoinProfileResponse = await response.json();
        
        if (result.success) {
          setCoin(result.data);
        } else {
          setError(result.error || 'Không thể tải dữ liệu coin');
        }
      } catch (err) {
        setError('Lỗi kết nối server');
        console.error('Error fetching coin data:', err);
      } finally {
        setLoading(false);
      }
    }

    if (coinId) {
      fetchCoinData();
    }
  }, [coinId]);

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

  const formatSupply = (value: number) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toFixed(0);
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

  if (error || !coin) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-red-500/5 border-red-500/20 text-center">
          <div className="text-red-400 text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-red-400 mb-2">Lỗi tải dữ liệu</h2>
          <p className="text-red-400 mb-4">{error}</p>
          <Link 
            href="/profile" 
            className="inline-flex items-center px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-md transition-colors border border-blue-500/20"
          >
            ← Quay lại Dashboard
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/profile" 
            className="inline-flex items-center px-4 py-2 glass-card text-slate-300 hover:text-white hover:translate-y-[-2px] transition-all duration-300 mb-6 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Quay lại Dashboard
          </Link>
          
          <Card className="p-8" hoverEffect>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Image
                  src={coin.image.large}
                  alt={coin.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full ring-4 ring-white/10 shadow-lg"
                  unoptimized
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/favicon.svg';
                  }}
                />
                {coin.market_data.market_cap_rank <= 10 && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
                    {coin.market_data.market_cap_rank}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-slate-100">
                  {coin.name}
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                    {coin.symbol.toUpperCase()}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium glass-card text-slate-300">
                    <Trophy className="h-4 w-4 mr-1" />
                    Rank #{coin.market_data.market_cap_rank}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Price Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6" hoverEffect>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-400">Giá hiện tại</h3>
              <DollarSign className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <p className="text-3xl font-bold text-emerald-400">
              {formatPrice(coin.market_data.current_price.usd)}
            </p>
          </Card>
          
          <Card className="p-6" hoverEffect>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-400">Thay đổi 24h</h3>
              <TrendingUp className="h-5 w-5 text-slate-400 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <div className="text-2xl">
              {renderPercentChange(coin.market_data.price_change_percentage_24h)}
            </div>
          </Card>
          
          <Card className="p-6" hoverEffect>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-400">Market Cap</h3>
              <PieChart className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <p className="text-2xl font-bold text-purple-400">
              {formatMarketCap(coin.market_data.market_cap.usd)}
            </p>
          </Card>
          
          <Card className="p-6" hoverEffect>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-400">Volume 24h</h3>
              <Activity className="h-5 w-5 text-orange-400 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <p className="text-2xl font-bold text-orange-400">
              {formatMarketCap(coin.market_data.total_volume.usd)}
            </p>
          </Card>
        </div>

        {/* Detailed Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Market Data */}
          <Card className="p-8" hoverEffect>
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4">
                <BarChart2 className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100">Thống kê thị trường</h2>
            </div>
            <div className="space-y-5">
              <div className="flex justify-between items-center p-3 glass-card rounded-xl">
                <span className="text-slate-400 font-medium">Thay đổi 7 ngày:</span>
                {renderPercentChange(coin.market_data.price_change_percentage_7d)}
              </div>
              <div className="flex justify-between items-center p-3 glass-card rounded-xl">
                <span className="text-slate-400 font-medium">Thay đổi 30 ngày:</span>
                {renderPercentChange(coin.market_data.price_change_percentage_30d)}
              </div>
              <div className="flex justify-between items-center p-3 glass-card rounded-xl">
                <span className="text-slate-400 font-medium">All Time High:</span>
                <span className="font-bold text-emerald-400">{formatPrice(coin.market_data.ath.usd)}</span>
              </div>
              <div className="flex justify-between items-center p-3 glass-card rounded-xl">
                <span className="text-slate-400 font-medium">ATH Change:</span>
                {renderPercentChange(coin.market_data.ath_change_percentage.usd)}
              </div>
              <div className="flex justify-between items-center p-3 glass-card rounded-xl">
                <span className="text-slate-400 font-medium">All Time Low:</span>
                <span className="font-bold text-red-400">{formatPrice(coin.market_data.atl.usd)}</span>
              </div>
              <div className="flex justify-between items-center p-3 glass-card rounded-xl">
                <span className="text-slate-400 font-medium">ATL Change:</span>
                {renderPercentChange(coin.market_data.atl_change_percentage.usd)}
              </div>
            </div>
          </Card>

          {/* Supply Information */}
          <Card className="p-8" hoverEffect>
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl mr-4">
                <Box className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100">Thông tin nguồn cung</h2>
            </div>
            <div className="space-y-5">
              <div className="flex justify-between items-center p-3 glass-card rounded-xl">
                <span className="text-slate-400 font-medium">Đang lưu hành:</span>
                <span className="font-bold text-slate-100">{formatSupply(coin.market_data.circulating_supply)}</span>
              </div>
              <div className="flex justify-between items-center p-3 glass-card rounded-xl">
                <span className="text-slate-400 font-medium">Tổng cung:</span>
                <span className="font-bold text-purple-400">
                  {coin.market_data.total_supply ? formatSupply(coin.market_data.total_supply) : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 glass-card rounded-xl">
                <span className="text-slate-400 font-medium">Cung tối đa:</span>
                <span className="font-bold text-indigo-400">
                  {coin.market_data.max_supply ? formatSupply(coin.market_data.max_supply) : 'N/A'}
                </span>
              </div>
              {coin.genesis_date && (
                <div className="flex justify-between items-center p-3 glass-card rounded-xl">
                  <span className="text-slate-400 font-medium">Ngày ra mắt:</span>
                  <span className="font-bold text-emerald-400">
                    {new Date(coin.genesis_date).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              )}
              {coin.country_origin && (
                <div className="flex justify-between items-center p-3 glass-card rounded-xl">
                  <span className="text-slate-400 font-medium">Quốc gia:</span>
                  <span className="font-bold text-orange-400">{coin.country_origin}</span>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Categories */}
        {coin.categories && coin.categories.length > 0 && (
          <Card className="p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl mr-4">
                <Tag className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100">Danh mục</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {coin.categories.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium glass-card text-slate-300 hover:text-white transition-all duration-200"
                >
                  {category}
                </span>
              ))}
            </div>
          </Card>
        )}

        {/* Description */}
        {coin.description.en && (
          <Card className="p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl mr-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100">Mô tả</h2>
            </div>
            <div 
              className="prose prose-invert max-w-none text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: coin.description.en.substring(0, 1000) + (coin.description.en.length > 1000 ? '...' : '')
              }}
            />
          </Card>
        )}

        {/* Links */}
        <Card className="p-8">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl mr-4">
              <LinkIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Liên kết hữu ích</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coin.links.homepage && coin.links.homepage.length > 0 && (
              <div className="glass-card rounded-xl p-4">
                <h3 className="font-semibold text-slate-100 mb-3 flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-slate-400" />
                  Trang chủ
                </h3>
                <div className="space-y-2">
                  {coin.links.homepage.slice(0, 3).map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-slate-400 hover:text-blue-400 text-sm truncate p-2 glass-card rounded-lg hover:border-blue-500/20 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {coin.links.blockchain_site && coin.links.blockchain_site.length > 0 && (
              <div className="glass-card rounded-xl p-4">
                <h3 className="font-semibold text-slate-100 mb-3 flex items-center">
                  <Blocks className="h-5 w-5 mr-2 text-emerald-400" />
                  Blockchain Explorer
                </h3>
                <div className="space-y-2">
                  {coin.links.blockchain_site.slice(0, 3).map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-slate-400 hover:text-emerald-400 text-sm truncate p-2 glass-card rounded-lg hover:border-emerald-500/20 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {coin.links.repos_url.github && coin.links.repos_url.github.length > 0 && (
              <div className="glass-card rounded-xl p-4">
                <h3 className="font-semibold text-slate-100 mb-3 flex items-center">
                  <Github className="h-5 w-5 mr-2 text-slate-300" />
                  GitHub
                </h3>
                <div className="space-y-2">
                  {coin.links.repos_url.github.slice(0, 3).map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-slate-400 hover:text-purple-400 text-sm truncate p-2 glass-card rounded-lg hover:border-purple-500/20 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {coin.links.subreddit_url && (
              <div className="glass-card rounded-xl p-4">
                <h3 className="font-semibold text-slate-100 mb-3 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-orange-400" />
                  Reddit
                </h3>
                <a
                  href={coin.links.subreddit_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate-400 hover:text-orange-400 text-sm truncate p-2 glass-card rounded-lg hover:border-orange-500/20 transition-colors duration-200"
                >
                  {coin.links.subreddit_url}
                </a>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
