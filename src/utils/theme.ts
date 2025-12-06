/**
 * Theme Utilities - Helper functions cho theme và colors
 * Tính toán màu sắc dựa trên business logic
 */

import { FEAR_GREED_THRESHOLDS, getFearGreedSentiment } from '@/config/constants';
import { DESIGN_TOKENS } from '@/config/design-tokens';
import type { FearGreedSentiment } from '@/config/constants';

// ==================== SENTIMENT COLORS ====================

/**
 * Lấy màu sentiment dựa trên giá trị Fear & Greed
 * @param value - Giá trị Fear & Greed (0-100)
 * @returns Mã màu hex
 */
export const getSentimentColor = (value: number): string => {
  const sentiment = getFearGreedSentiment(value);
  return DESIGN_TOKENS.colors.sentiment[sentiment];
};

/**
 * Lấy tất cả thông tin sentiment (color, label, range)
 * @param value - Giá trị Fear & Greed (0-100)
 * @returns Object chứa sentiment info
 */
export const getSentimentInfo = (value: number) => {
  const sentiment = getFearGreedSentiment(value);
  const threshold = FEAR_GREED_THRESHOLDS[sentiment];
  const color = DESIGN_TOKENS.colors.sentiment[sentiment];
  
  return {
    sentiment,
    color,
    range: threshold,
    label: getSentimentLabel(sentiment),
  };
};

/**
 * Lấy label tiếng Anh cho sentiment
 * @param sentiment - Sentiment type
 * @returns Label string
 */
export const getSentimentLabel = (sentiment: FearGreedSentiment): string => {
  const labels: Record<FearGreedSentiment, string> = {
    extremeFear: 'Extreme Fear',
    fear: 'Fear',
    neutral: 'Neutral',
    greed: 'Greed',
    extremeGreed: 'Extreme Greed',
  };
  return labels[sentiment];
};

// ==================== STATUS COLORS ====================

/**
 * Lấy màu status (success, error, warning, info)
 * @param type - Status type
 * @param variant - Color variant (default, light, dark)
 * @returns Mã màu hex
 */
export const getStatusColor = (
  type: 'success' | 'error' | 'warning' | 'info',
  variant: 'default' | 'light' | 'dark' = 'default'
): string => {
  if (variant === 'light') {
    return DESIGN_TOKENS.colors.status[`${type}Light` as keyof typeof DESIGN_TOKENS.colors.status];
  }
  if (variant === 'dark') {
    return DESIGN_TOKENS.colors.status[`${type}Dark` as keyof typeof DESIGN_TOKENS.colors.status];
  }
  return DESIGN_TOKENS.colors.status[type];
};

// ==================== PRICE CHANGE COLORS ====================

/**
 * Lấy màu dựa trên sự thay đổi giá (positive/negative)
 * @param value - Giá trị thay đổi (có thể là %, price change)
 * @returns Object với color và isPositive
 */
export const getPriceChangeColor = (value: number) => {
  const isPositive = value >= 0;
  return {
    color: isPositive 
      ? DESIGN_TOKENS.colors.chart.positive 
      : DESIGN_TOKENS.colors.chart.negative,
    isPositive,
  };
};

/**
 * Lấy màu gradient cho chart dựa trên positive/negative
 * @param isPositive - True nếu giá tăng
 * @returns Object với gradient colors
 */
export const getChartGradientColors = (isPositive: boolean) => {
  return isPositive
    ? {
        start: DESIGN_TOKENS.colors.chart.gradient.positiveStart,
        end: DESIGN_TOKENS.colors.chart.gradient.positiveEnd,
        stroke: DESIGN_TOKENS.colors.chart.positive,
      }
    : {
        start: DESIGN_TOKENS.colors.chart.gradient.negativeStart,
        end: DESIGN_TOKENS.colors.chart.gradient.negativeEnd,
        stroke: DESIGN_TOKENS.colors.chart.negative,
      };
};

// ==================== BACKGROUND COLORS ====================

/**
 * Lấy background color cho Fear & Greed indicator
 * @param value - Giá trị Fear & Greed (0-100)
 * @returns Tailwind class string
 */
export const getFearGreedBgClass = (value: number): string => {
  if (value <= FEAR_GREED_THRESHOLDS.extremeFear.max) return 'bg-red-500';
  if (value <= FEAR_GREED_THRESHOLDS.fear.max) return 'bg-orange-500';
  if (value <= FEAR_GREED_THRESHOLDS.neutral.max) return 'bg-yellow-500';
  if (value <= FEAR_GREED_THRESHOLDS.greed.max) return 'bg-lime-500';
  return 'bg-green-500';
};

/**
 * Lấy text color cho Fear & Greed indicator
 * @param value - Giá trị Fear & Greed (0-100)
 * @returns Tailwind class string
 */
export const getFearGreedTextClass = (value: number): string => {
  // Dark text cho light backgrounds (yellow, lime)
  if (value > FEAR_GREED_THRESHOLDS.fear.max && value <= FEAR_GREED_THRESHOLDS.greed.max) {
    return 'text-gray-900';
  }
  // Light text cho dark backgrounds (red, orange, green)
  return 'text-white';
};

// ==================== GRAY SCALE ====================

/**
 * Lấy gray color từ scale
 * @param shade - Shade number (50-900)
 * @returns Mã màu hex
 */
export const getGrayColor = (shade: keyof typeof DESIGN_TOKENS.colors.gray): string => {
  return DESIGN_TOKENS.colors.gray[shade];
};

// ==================== BRAND COLORS ====================

/**
 * Lấy brand color
 * @param variant - Color variant
 * @returns Mã màu hex
 */
export const getBrandColor = (
  variant: keyof typeof DESIGN_TOKENS.colors.brand = 'primary'
): string => {
  return DESIGN_TOKENS.colors.brand[variant];
};

// ==================== OPACITY HELPERS ====================

/**
 * Convert hex color sang rgba với opacity
 * @param color - Mã màu hex (vd: "#10b981") hoặc rgba string
 * @param opacity - Opacity (0-1)
 * @returns RGBA string
 */
export const hexToRgba = (color: string, opacity: number): string => {
  // Nếu là rgba/rgb sẵn rồi thì trả về (có thể xử lý opacity nếu cần, nhưng ở đây đơn giản hóa)
  if (color.startsWith('rgb')) {
    return color;
  }

  // Remove # if present
  const hex = color.replace('#', '');
  
  // Parse RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// ==================== CHART COLORS ====================

/**
 * Lấy màu cho chart axis
 * @returns Mã màu hex
 */
export const getChartAxisColor = (): string => {
  return DESIGN_TOKENS.colors.chart.axis;
};

/**
 * Lấy màu cho chart grid
 * @returns Mã màu hex
 */
export const getChartGridColor = (): string => {
  return DESIGN_TOKENS.colors.chart.grid;
};

