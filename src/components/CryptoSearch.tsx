'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, TrendingUp, AlertCircle, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import WatchlistButton from '@/components/WatchlistButton';

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchCoins = async (searchQuery: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const result: SearchResponse = await response.json();
      
      if (result.success) {
        setResults(result.data.coins.slice(0, 10));
        setShowResults(true);
      } else {
        setError(result.error || 'Search failed');
        setResults([]);
      }
    } catch (err) {
      setError('Network error');
      setResults([]);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCoinSelect = (coinId: string) => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    router.push(`/coin/${coinId}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && results.length > 0) {
      handleCoinSelect(results[0].id);
    }
  };

  return (
    <div className="relative w-full max-w-lg" ref={searchRef}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder="Search coins (e.g. bitcoin, ethereum)..."
          className="
            block w-full pl-12 pr-12 py-4 
            bg-slate-900/60 backdrop-blur-xl 
            border border-white/10 
            rounded-xl 
            text-white placeholder-slate-500 
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 
            transition-all duration-300 
            shadow-lg hover:shadow-xl hover:border-white/20
          "
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500/30 border-t-blue-500"></div>
          </div>
        )}
        {query && !loading && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setShowResults(false);
            }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (results.length > 0 || error) && (
        <div className="
          absolute z-[100] mt-2 w-full  bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl py-2 max-h-96 overflow-y-auto animate-in slide-in-from-top-2 fade-in duration-200">
          {error ? (
            <div className="px-4 py-3 text-red-400 text-sm bg-red-500/10 mx-2 rounded-xl flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          ) : (
            results.map((coin) => (
              <div
                key={coin.id}
                onClick={() => handleCoinSelect(coin.id)}
                className="
                  cursor-pointer select-none relative py-3 px-4 mx-2 
                  hover:bg-white/5 rounded-xl 
                  group transition-all duration-200
                "
              >
                  <div className="flex items-center">
                    <div onClick={(e) => e.stopPropagation()} className="mr-2">
                       <WatchlistButton 
                          coinId={coin.id} 
                          symbol={coin.symbol} 
                          name={coin.name} 
                          size={18}
                        />
                    </div>
                    <div className="relative">
                      {coin.thumb && (
                          <Image src={coin.thumb} alt={coin.name} width={32} height={32} unoptimized className="w-8 h-8 rounded-full mr-3" />
                      )}
                      {coin.market_cap_rank && coin.market_cap_rank <= 10 && (
                        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                          {coin.market_cap_rank}
                        </div>
                      )}
                    </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors truncate">
                        {coin.name}
                      </p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                        {coin.symbol.toUpperCase()}
                      </span>
                    </div>
                    {coin.market_cap_rank && (
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Rank #{coin.market_cap_rank}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="ml-2 h-4 w-4 text-slate-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* No Results Message */}
      {showResults && results.length === 0 && query.length >= 2 && !loading && !error && (
        <div className="absolute z-[100] mt-2 w-full bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl py-8 text-center text-sm text-slate-400">
          <Search className="h-8 w-8 mx-auto mb-2 text-slate-600" />
          <span>No results for &quot;<span className="text-white font-medium">{query}</span>&quot;</span>
        </div>
      )}
    </div>
  );
}
