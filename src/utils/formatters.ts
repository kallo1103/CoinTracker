/**
 * Formatters - Utility functions cho formatting
 * Tái sử dụng logic format currency, price, percent, dates
 */

import { PRICE_THRESHOLDS, MARKET_CAP_THRESHOLDS } from '@/config/constants';

// ==================== CURRENCY FORMATTING ====================

/**
 * Format số tiền với suffix (T, B, M, K)
 * @param value - Giá trị cần format
 * @returns Chuỗi đã format (vd: "$1.23T", "$456.78B")
 */
export const formatCurrency = (value: number): string => {
  if (value >= MARKET_CAP_THRESHOLDS.trillion) {
    return `$${(value / MARKET_CAP_THRESHOLDS.trillion).toFixed(2)}T`;
  }
  if (value >= MARKET_CAP_THRESHOLDS.billion) {
    return `$${(value / MARKET_CAP_THRESHOLDS.billion).toFixed(2)}B`;
  }
  if (value >= MARKET_CAP_THRESHOLDS.million) {
    return `$${(value / MARKET_CAP_THRESHOLDS.million).toFixed(2)}M`;
  }
  if (value >= MARKET_CAP_THRESHOLDS.thousand) {
    return `$${(value / MARKET_CAP_THRESHOLDS.thousand).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
};

/**
 * Format giá cryptocurrency với số thập phân phù hợp
 * @param price - Giá cần format
 * @returns Chuỗi giá đã format
 */
export const formatPrice = (price: number): string => {
  // Micro-cap coins (< $0.01) - 6 decimals
  if (price < PRICE_THRESHOLDS.breakpoints.microCap) {
    return `$${price.toFixed(PRICE_THRESHOLDS.decimals.microCap)}`;
  }
  
  // Small-cap coins (< $1) - 4 decimals
  if (price < PRICE_THRESHOLDS.breakpoints.smallCap) {
    return `$${price.toFixed(PRICE_THRESHOLDS.decimals.smallCap)}`;
  }
  
  // Standard coins (>= $1) - 2 decimals
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: PRICE_THRESHOLDS.decimals.standard,
    maximumFractionDigits: PRICE_THRESHOLDS.decimals.standard,
  }).format(price);
};

/**
 * Format số với separators (không có currency symbol)
 * @param value - Số cần format
 * @param decimals - Số chữ số thập phân
 * @returns Chuỗi số đã format
 */
export const formatNumber = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

// ==================== PERCENT FORMATTING ====================

/**
 * Format phần trăm (không có dấu +/-)
 * @param percent - Giá trị phần trăm
 * @param decimals - Số chữ số thập phân (default: 2)
 * @returns Chuỗi percent đã format
 */
export const formatPercent = (percent: number, decimals: number = 2): string => {
  return `${Math.abs(percent).toFixed(decimals)}%`;
};

/**
 * Format phần trăm có dấu +/-
 * @param percent - Giá trị phần trăm
 * @param decimals - Số chữ số thập phân (default: 2)
 * @returns Chuỗi percent với dấu
 */
export const formatPercentWithSign = (percent: number, decimals: number = 2): string => {
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(decimals)}%`;
};

// ==================== DATE/TIME FORMATTING ====================

/**
 * Format timestamp thành date string
 * @param timestamp - Unix timestamp (seconds or milliseconds)
 * @param locale - Locale string (default: 'en-US')
 * @returns Chuỗi date đã format
 */
export const formatDate = (timestamp: number, locale: string = 'en-US'): string => {
  // Check if timestamp is in seconds (< year 3000 in seconds)
  const date = timestamp < 10000000000 ? new Date(timestamp * 1000) : new Date(timestamp);
  
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format timestamp thành datetime string
 * @param timestamp - Unix timestamp (seconds or milliseconds)
 * @param locale - Locale string (default: 'en-US')
 * @returns Chuỗi datetime đã format
 */
export const formatDateTime = (timestamp: number, locale: string = 'en-US'): string => {
  const date = timestamp < 10000000000 ? new Date(timestamp * 1000) : new Date(timestamp);
  
  return date.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format thời gian relative (vd: "2 hours ago")
 * @param timestamp - Unix timestamp (seconds or milliseconds)
 * @returns Chuỗi relative time
 */
export const formatRelativeTime = (timestamp: number): string => {
  const date = timestamp < 10000000000 ? new Date(timestamp * 1000) : new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return `${diffSec} seconds ago`;
  if (diffMin < 60) return `${diffMin} minutes ago`;
  if (diffHour < 24) return `${diffHour} hours ago`;
  if (diffDay < 7) return `${diffDay} days ago`;
  
  return formatDate(timestamp);
};

// ==================== VOLUME FORMATTING ====================

/**
 * Format trading volume
 * @param volume - Volume value
 * @returns Formatted volume string
 */
export const formatVolume = (volume: number): string => {
  return formatCurrency(volume);
};

// ==================== MARKET CAP FORMATTING ====================

/**
 * Format market cap (alias của formatCurrency)
 * @param marketCap - Market cap value
 * @returns Formatted market cap string
 */
export const formatMarketCap = (marketCap: number): string => {
  return formatCurrency(marketCap);
};

// ==================== CHART TICK FORMATTING ====================

/**
 * Format giá trị cho Y-axis của chart (rút gọn)
 * @param value - Giá trị cần format
 * @returns Chuỗi rút gọn cho axis
 */
export const formatChartAxisValue = (value: number): string => {
  if (value >= MARKET_CAP_THRESHOLDS.billion) {
    return `$${(value / MARKET_CAP_THRESHOLDS.billion).toFixed(0)}B`;
  }
  if (value >= MARKET_CAP_THRESHOLDS.million) {
    return `$${(value / MARKET_CAP_THRESHOLDS.million).toFixed(0)}M`;
  }
  if (value >= MARKET_CAP_THRESHOLDS.thousand) {
    return `$${(value / MARKET_CAP_THRESHOLDS.thousand).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
};

/**
 * Format date cho X-axis của chart (rút gọn)
 * @param dateString - Date string (format: "DD/MM/YYYY")
 * @returns Chuỗi rút gọn (format: "DD/MM")
 */
export const formatChartDateLabel = (dateString: string): string => {
  const parts = dateString.split('/');
  if (parts.length >= 2) {
    return `${parts[0]}/${parts[1]}`;
  }
  return dateString;
};

// ==================== ABBREVIATION ====================

/**
 * Rút gọn tên dài với ellipsis
 * @param text - Text cần rút gọn
 * @param maxLength - Độ dài tối đa
 * @returns Text đã rút gọn
 */
export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Rút gọn address (wallet address, transaction hash)
 * @param address - Address cần rút gọn
 * @param startChars - Số ký tự đầu (default: 6)
 * @param endChars - Số ký tự cuối (default: 4)
 * @returns Address đã rút gọn
 */
export const truncateAddress = (
  address: string,
  startChars: number = 6,
  endChars: number = 4
): string => {
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

