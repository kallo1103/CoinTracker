/**
 * Business Logic Constants - Các hằng số logic nghiệp vụ
 * Định nghĩa các ngưỡng, giới hạn và constants cho business logic
 */

// ==================== FEAR & GREED INDEX ====================
export const FEAR_GREED_THRESHOLDS = {
  extremeFear: { min: 0, max: 25 },
  fear: { min: 26, max: 45 },
  neutral: { min: 46, max: 55 },
  greed: { min: 56, max: 75 },
  extremeGreed: { min: 76, max: 100 },
} as const;

// Fear & Greed sentiment types
export type FearGreedSentiment = keyof typeof FEAR_GREED_THRESHOLDS;

// Helper function để lấy sentiment từ value
export const getFearGreedSentiment = (value: number): FearGreedSentiment => {
  if (value <= FEAR_GREED_THRESHOLDS.extremeFear.max) return 'extremeFear';
  if (value <= FEAR_GREED_THRESHOLDS.fear.max) return 'fear';
  if (value <= FEAR_GREED_THRESHOLDS.neutral.max) return 'neutral';
  if (value <= FEAR_GREED_THRESHOLDS.greed.max) return 'greed';
  return 'extremeGreed';
};

// ==================== DEFAULT LIMITS ====================
export const DEFAULT_LIMITS = {
  // Số lượng items hiển thị mặc định
  cryptoList: 10,
  newsList: 20,
  exchangeList: 50,
  searchResults: 10,
  
  // Historical data
  historyDays: {
    default: 30,
    week: 7,
    month: 30,
    quarter: 90,
    year: 365,
  },
  
  // Pagination
  itemsPerPage: {
    mobile: 10,
    tablet: 20,
    desktop: 50,
  }
} as const;

// ==================== PRICE THRESHOLDS ====================
export const PRICE_THRESHOLDS = {
  // Số thập phân hiển thị dựa trên giá
  decimals: {
    microCap: 6,      // < $0.01
    smallCap: 4,      // < $1
    standard: 2,      // >= $1
  },
  
  // Breakpoints cho formatting
  breakpoints: {
    microCap: 0.01,
    smallCap: 1,
  }
} as const;

// ==================== MARKET CAP THRESHOLDS ====================
export const MARKET_CAP_THRESHOLDS = {
  trillion: 1e12,
  billion: 1e9,
  million: 1e6,
  thousand: 1e3,
} as const;

// ==================== CHART SETTINGS ====================
export const CHART_SETTINGS = {
  // Số điểm dữ liệu tối đa trên chart
  maxDataPoints: {
    mobile: 30,
    tablet: 60,
    desktop: 100,
  },
  
  // Số tick marks trên axis
  tickCount: {
    mobile: 5,
    tablet: 7,
    desktop: 10,
  },
  
  // Animation duration
  animationDuration: 300, // milliseconds
  
  // Opacity cho gradient
  gradientOpacity: {
    start: 0.3,
    end: 0,
  }
} as const;

// ==================== PAGINATION ====================
export const PAGINATION = {
  defaultPage: 1,
  maxPageSize: 100,
  pageSizeOptions: [10, 20, 50, 100],
} as const;

// ==================== VALIDATION ====================
export const VALIDATION = {
  // Search query
  search: {
    minLength: 2,
    maxLength: 100,
  },
  
  // User input
  input: {
    maxLength: 255,
  }
} as const;

// ==================== DATETIME ====================
export const DATETIME = {
  // Format strings
  formats: {
    date: 'YYYY-MM-DD',
    time: 'HH:mm:ss',
    datetime: 'YYYY-MM-DD HH:mm:ss',
    display: 'MMM DD, YYYY',
  },
  
  // Locales
  locales: {
    en: 'en-US',
    vi: 'vi-VN',
  }
} as const;

// ==================== CRYPTO SYMBOLS ====================
export const CRYPTO_SYMBOLS = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  tether: 'USDT',
  binanceCoin: 'BNB',
  usdCoin: 'USDC',
} as const;

// Top crypto IDs for CoinGecko API
export const TOP_CRYPTO_IDS = {
  bitcoin: 'bitcoin',
  ethereum: 'ethereum',
  tether: 'tether',
  binancecoin: 'binancecoin',
  solana: 'solana',
} as const;

// ==================== ERROR MESSAGES ====================
export const ERROR_MESSAGES = {
  network: 'Không thể kết nối đến server',
  timeout: 'Request timeout - vui lòng thử lại',
  notFound: 'Không tìm thấy dữ liệu',
  unauthorized: 'Bạn cần đăng nhập để truy cập',
  forbidden: 'Bạn không có quyền truy cập',
  serverError: 'Lỗi server - vui lòng thử lại sau',
  unknown: 'Đã xảy ra lỗi không xác định',
} as const;

// ==================== SUCCESS MESSAGES ====================
export const SUCCESS_MESSAGES = {
  dataLoaded: 'Dữ liệu đã được tải thành công',
  saved: 'Đã lưu thành công',
  updated: 'Đã cập nhật thành công',
  deleted: 'Đã xóa thành công',
} as const;

