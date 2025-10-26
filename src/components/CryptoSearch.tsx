'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Interface cho kết quả tìm kiếm từ CoinGecko
interface SearchResult {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

interface SearchResponse {
  success: boolean;
  data: {
    coins: SearchResult[];
    exchanges: unknown[];
    categories: unknown[];
  };
  error?: string;
}

export default function CryptoSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Debounce tìm kiếm để tránh quá nhiều API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim().length >= 2) {
        searchCoins(query.trim());
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hàm tìm kiếm coin
  const searchCoins = async (searchQuery: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const result: SearchResponse = await response.json();
      
      if (result.success) {
        setResults(result.data.coins.slice(0, 10)); // Chỉ hiển thị 10 kết quả đầu tiên
        setShowResults(true);
      } else {
        setError(result.error || 'Lỗi tìm kiếm');
        setResults([]);
      }
    } catch (err) {
      setError('Không thể kết nối đến server');
      setResults([]);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi chọn một coin
  const handleCoinSelect = (coinId: string) => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    router.push(`/coin/${coinId}`);
  };

  // Xử lý khi nhấn Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && results.length > 0) {
      handleCoinSelect(results[0].id);
    }
  };

  return (
    <div className="relative w-full max-w-lg" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg 
            className="h-5 w-5 text-gray-400 transition-colors duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder="Tìm kiếm coin (ví dụ: bitcoin, ethereum)..."
          className="block w-full pl-12 pr-12 py-4 border-2 border-gray-600 rounded-xl leading-5 bg-gray-800/80 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-4 focus:ring-gray-500/20 focus:border-gray-400 dark:focus:border-white transition-all duration-300 shadow-lg hover:shadow-xl text-white font-medium"
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 dark:border-white border-t-transparent"></div>
          </div>
        )}
        {query && !loading && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setShowResults(false);
            }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (results.length > 0 || error) && (
        <div className="absolute z-50 mt-3 w-full bg-gray-800/95 backdrop-blur-md shadow-2xl max-h-80 rounded-2xl py-2 text-base ring-1 ring-gray-600/50 overflow-auto focus:outline-none sm:text-sm border border-gray-700">
          {error ? (
            <div className="px-6 py-4 text-red-400 text-sm bg-red-900/50 rounded-lg mx-2">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          ) : (
            results.map((coin, index) => (
              <div
                key={coin.id}
                onClick={() => handleCoinSelect(coin.id)}
                className="cursor-pointer select-none relative py-3 px-4 mx-2 hover:bg-gradient-to-r hover:from-gray-700/50 hover:to-gray-600/50 transition-all duration-200 rounded-xl group"
              >
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={coin.thumb}
                      alt={coin.name}
                      className="h-10 w-10 rounded-full mr-4 ring-2 ring-gray-600 group-hover:ring-gray-400 dark:group-hover:ring-white transition-all duration-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/favicon.svg';
                      }}
                    />
                    {coin.market_cap_rank && coin.market_cap_rank <= 10 && (
                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {coin.market_cap_rank}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white truncate transition-colors">
                        {coin.name}
                      </p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-200 group-hover:bg-gray-600 group-hover:text-white transition-colors">
                        {coin.symbol.toUpperCase()}
                      </span>
                    </div>
                    {coin.market_cap_rank && (
                      <p className="text-xs text-gray-400 mt-1">
                        <span className="inline-flex items-center">
                          <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                          </svg>
                          Rank #{coin.market_cap_rank}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="h-5 w-5 text-gray-400 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* No Results Message */}
      {showResults && results.length === 0 && query.length >= 2 && !loading && !error && (
        <div className="absolute z-50 mt-3 w-full bg-gray-800/95 backdrop-blur-md shadow-2xl rounded-2xl py-4 px-6 text-sm text-gray-400 border border-gray-700">
          <div className="flex items-center justify-center">
            <svg className="h-8 w-8 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Không tìm thấy coin nào với từ khóa &quot;<span className="font-medium text-gray-200">{query}</span>&quot;</span>
          </div>
        </div>
      )}
    </div>
  );
}
