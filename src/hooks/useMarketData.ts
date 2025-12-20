
import { useQuery } from '@tanstack/react-query';

interface CoinData {
    id: string;
    current_price: number;
    image: string;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
}

interface CoinSearchResult {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
}

const fetchMarketData = async (ids: string): Promise<CoinData[]> => {
    if (!ids) return [];
    const res = await fetch(`/api/coins/markets?ids=${ids}`);
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
        return data.data;
    }
    throw new Error('Failed to fetch market data');
};

const searchCoins = async (query: string): Promise<CoinSearchResult[]> => {
    if (query.length < 2) return [];
    const res = await fetch(`/api/coins/search?query=${query}`);
    const data = await res.json();
    return data.coins || [];
};

export function useMarketData(ids: string) {
    return useQuery({
        queryKey: ['marketData', ids],
        queryFn: () => fetchMarketData(ids),
        enabled: !!ids,
        staleTime: 30 * 1000, // 30 seconds
        refetchInterval: 60 * 1000, // Refetch every minute
    });
}

export function useCryptoSearch(query: string) {
    return useQuery({
        queryKey: ['cryptoSearch', query],
        queryFn: () => searchCoins(query),
        enabled: query.length >= 2,
        staleTime: 5 * 60 * 1000, // 5 minutes cache for search
    });
}
