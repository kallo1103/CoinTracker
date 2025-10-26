/**
 * API Configuration - Cấu hình tập trung cho API
 * Single source of truth cho tất cả API endpoints và settings
 */

export const API_CONFIG = {
  // Base URL - có thể override qua env variable
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '',

  // API Endpoints
  endpoints: {
    // Crypto data
    crypto: '/api/crypto',
    coins: {
      markets: '/api/coins/markets',
      detail: '/api/coin', // + /{id}
    },
    
    // Market data
    globalMetrics: '/api/global-metrics',
    priceHistory: '/api/price-history',
    fearGreed: '/api/fear-greed',
    
    // Exchange data
    exchange: {
      list: '/api/exchange/list',
    },
    
    // Content
    cryptoNews: '/api/crypto-news',
    content: {
      crypto: '/api/content/crypto',
    },
    
    // Search
    search: '/api/search',
    
    // Auth
    auth: {
      nextAuth: '/api/auth',
    }
  },

  // Cache settings (seconds)
  cache: {
    revalidate: {
      realtime: 10,     // 10 seconds - cho data realtime
      short: 60,        // 1 minute - cho data thường xuyên thay đổi
      medium: 300,      // 5 minutes - cho data ổn định
      long: 3600,       // 1 hour - cho data ít thay đổi
      daily: 86400,     // 24 hours - cho data static
    }
  },

  // Polling intervals (milliseconds)
  polling: {
    realtime: 30000,     // 30 seconds - cho dashboard realtime
    frequent: 120000,    // 2 minutes - cho global metrics
    moderate: 300000,    // 5 minutes - cho exchange data
    hourly: 3600000,     // 1 hour - cho fear & greed
    daily: 86400000,     // 24 hours - cho historical data
  },

  // Request timeouts (milliseconds)
  timeout: {
    short: 5000,      // 5 seconds
    medium: 10000,    // 10 seconds
    long: 30000,      // 30 seconds
  },

  // Rate limiting
  rateLimit: {
    maxRetries: 3,
    retryDelay: 1000,  // 1 second between retries
  }
} as const;

// Helper function để build full endpoint URL
export const buildEndpoint = (path: string, params?: Record<string, string | number>): string => {
  let url = `${API_CONFIG.baseUrl}${path}`;
  
  if (params) {
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    url += `?${queryString}`;
  }
  
  return url;
};

// Type helpers
export type ApiEndpoint = typeof API_CONFIG.endpoints;
export type CacheStrategy = keyof typeof API_CONFIG.cache.revalidate;
export type PollingInterval = keyof typeof API_CONFIG.polling;

