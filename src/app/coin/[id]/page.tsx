'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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

  // Format số tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(price);
  };

  // Format phần trăm thay đổi
  const formatPercent = (percent: number) => {
    const isPositive = percent >= 0;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {isPositive ? '▲' : '▼'} {Math.abs(percent).toFixed(2)}%
      </span>
    );
  };

  // Format số lớn
  const formatLargeNumber = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  // Format supply
  const formatSupply = (value: number) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toFixed(0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Đang tải thông tin coin...</span>
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-red-800 mb-2">Lỗi tải dữ liệu</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Link 
            href="/dashboard" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            ← Quay lại Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-blue-600 hover:text-blue-800 hover:bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-6 group"
          >
            <svg className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại Dashboard
          </Link>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={coin.image.large}
                  alt={coin.name}
                  className="h-20 w-20 rounded-full ring-4 ring-white shadow-lg"
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
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {coin.name}
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                    {coin.symbol.toUpperCase()}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                    Rank #{coin.market_data.market_cap_rank}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-500">Giá hiện tại</h3>
              <svg className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {formatPrice(coin.market_data.current_price.usd)}
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-500">Thay đổi 24h</h3>
              <svg className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="text-2xl">
              {formatPercent(coin.market_data.price_change_percentage_24h)}
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-500">Market Cap</h3>
              <svg className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {formatLargeNumber(coin.market_data.market_cap.usd)}
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-500">Volume 24h</h3>
              <svg className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {formatLargeNumber(coin.market_data.total_volume.usd)}
            </p>
          </div>
        </div>

        {/* Detailed Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Market Data */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl mr-4">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Thống kê thị trường</h2>
            </div>
            <div className="space-y-5">
              <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                <span className="text-gray-600 font-medium">Thay đổi 7 ngày:</span>
                {formatPercent(coin.market_data.price_change_percentage_7d)}
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                <span className="text-gray-600 font-medium">Thay đổi 30 ngày:</span>
                {formatPercent(coin.market_data.price_change_percentage_30d)}
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                <span className="text-gray-600 font-medium">All Time High:</span>
                <span className="font-bold text-green-600">{formatPrice(coin.market_data.ath.usd)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                <span className="text-gray-600 font-medium">ATH Change:</span>
                {formatPercent(coin.market_data.ath_change_percentage.usd)}
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                <span className="text-gray-600 font-medium">All Time Low:</span>
                <span className="font-bold text-red-600">{formatPrice(coin.market_data.atl.usd)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                <span className="text-gray-600 font-medium">ATL Change:</span>
                {formatPercent(coin.market_data.atl_change_percentage.usd)}
              </div>
            </div>
          </div>

          {/* Supply Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl mr-4">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Thông tin nguồn cung</h2>
            </div>
            <div className="space-y-5">
              <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                <span className="text-gray-600 font-medium">Đang lưu hành:</span>
                <span className="font-bold text-blue-600">{formatSupply(coin.market_data.circulating_supply)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                <span className="text-gray-600 font-medium">Tổng cung:</span>
                <span className="font-bold text-purple-600">
                  {coin.market_data.total_supply ? formatSupply(coin.market_data.total_supply) : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                <span className="text-gray-600 font-medium">Cung tối đa:</span>
                <span className="font-bold text-indigo-600">
                  {coin.market_data.max_supply ? formatSupply(coin.market_data.max_supply) : 'N/A'}
                </span>
              </div>
              {coin.genesis_date && (
                <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                  <span className="text-gray-600 font-medium">Ngày ra mắt:</span>
                  <span className="font-bold text-green-600">
                    {new Date(coin.genesis_date).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              )}
              {coin.country_origin && (
                <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl">
                  <span className="text-gray-600 font-medium">Quốc gia:</span>
                  <span className="font-bold text-orange-600">{coin.country_origin}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Categories */}
        {coin.categories && coin.categories.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl mr-4">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Danh mục</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {coin.categories.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 hover:from-blue-200 hover:to-indigo-200 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {coin.description.en && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl mr-4">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Mô tả</h2>
            </div>
            <div 
              className="prose max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: coin.description.en.substring(0, 1000) + (coin.description.en.length > 1000 ? '...' : '')
              }}
            />
          </div>
        )}

        {/* Links */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl mr-4">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Liên kết hữu ích</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coin.links.homepage && coin.links.homepage.length > 0 && (
              <div className="bg-gray-50/50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Trang chủ
                </h3>
                <div className="space-y-2">
                  {coin.links.homepage.slice(0, 3).map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 text-sm truncate p-2 bg-white/50 rounded-lg hover:bg-white/80 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {coin.links.blockchain_site && coin.links.blockchain_site.length > 0 && (
              <div className="bg-gray-50/50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Blockchain Explorer
                </h3>
                <div className="space-y-2">
                  {coin.links.blockchain_site.slice(0, 3).map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 text-sm truncate p-2 bg-white/50 rounded-lg hover:bg-white/80 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {coin.links.repos_url.github && coin.links.repos_url.github.length > 0 && (
              <div className="bg-gray-50/50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  GitHub
                </h3>
                <div className="space-y-2">
                  {coin.links.repos_url.github.slice(0, 3).map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 text-sm truncate p-2 bg-white/50 rounded-lg hover:bg-white/80 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {coin.links.subreddit_url && (
              <div className="bg-gray-50/50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Reddit
                </h3>
                <a
                  href={coin.links.subreddit_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 text-sm truncate p-2 bg-white/50 rounded-lg hover:bg-white/80 transition-colors duration-200"
                >
                  {coin.links.subreddit_url}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
