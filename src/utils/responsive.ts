/**
 * Responsive Utilities - Helpers cho responsive design
 * Hooks và utilities để handle responsive behaviors
 */

'use client';

import { useState, useEffect } from 'react';
import { BREAKPOINTS, DEVICE_TYPES } from '@/config/breakpoints';
import { DESIGN_TOKENS } from '@/config/design-tokens';

// ==================== RESPONSIVE HOOK ====================

/**
 * Hook để detect responsive breakpoints
 * @returns Object với breakpoint info và device type
 */
export const useResponsive = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    // Set initial width
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    // Call immediately
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    // Current width
    width: windowWidth,

    // Breakpoint checks
    isXs: windowWidth >= BREAKPOINTS.xs,
    isSm: windowWidth >= BREAKPOINTS.sm,
    isMd: windowWidth >= BREAKPOINTS.md,
    isLg: windowWidth >= BREAKPOINTS.lg,
    isXl: windowWidth >= BREAKPOINTS.xl,
    is2Xl: windowWidth >= BREAKPOINTS['2xl'],

    // Device type checks
    isMobile: windowWidth < DEVICE_TYPES.tablet.min,
    isTablet: windowWidth >= DEVICE_TYPES.tablet.min && windowWidth < DEVICE_TYPES.desktop.min,
    isDesktop: windowWidth >= DEVICE_TYPES.desktop.min,

    // Convenience flags
    isMobileOrTablet: windowWidth < DEVICE_TYPES.desktop.min,
    isTabletOrDesktop: windowWidth >= DEVICE_TYPES.tablet.min,
  };
};

// ==================== CHART HEIGHT ====================

/**
 * Lấy chart height phù hợp dựa trên viewport
 * @param windowWidth - Window width (optional, sẽ dùng current width nếu không truyền)
 * @returns Chart height (pixels)
 */
export const getResponsiveChartHeight = (windowWidth?: number): number => {
  const width = windowWidth || (typeof window !== 'undefined' ? window.innerWidth : BREAKPOINTS.lg);

  if (width < BREAKPOINTS.md) {
    return DESIGN_TOKENS.chart.heights.mobile;
  }
  if (width < BREAKPOINTS.lg) {
    return DESIGN_TOKENS.chart.heights.tablet;
  }
  return DESIGN_TOKENS.chart.heights.desktop;
};

/**
 * Hook để lấy responsive chart height
 * @returns Chart height động theo viewport
 */
export const useChartHeight = (): number => {
  const { width } = useResponsive();
  return getResponsiveChartHeight(width);
};

// ==================== SIDEBAR WIDTH ====================

/**
 * Lấy sidebar width từ collapsed state
 * @param isCollapsed - True nếu sidebar collapsed
 * @returns Sidebar width (pixels)
 */
export const getSidebarWidth = (isCollapsed: boolean): number => {
  return isCollapsed 
    ? DESIGN_TOKENS.spacing.sidebar.collapsed 
    : DESIGN_TOKENS.spacing.sidebar.expanded;
};

/**
 * Lấy margin-left cho content area dựa trên sidebar state
 * @param isCollapsed - True nếu sidebar collapsed
 * @returns Margin left (pixels)
 */
export const getContentMarginLeft = (isCollapsed: boolean): number => {
  return getSidebarWidth(isCollapsed);
};

// ==================== GRID COLUMNS ====================

/**
 * Lấy số columns cho grid layout dựa trên viewport
 * @param windowWidth - Window width (optional)
 * @returns Number of columns
 */
export const getResponsiveGridColumns = (windowWidth?: number): number => {
  const width = windowWidth || (typeof window !== 'undefined' ? window.innerWidth : BREAKPOINTS.lg);

  if (width < BREAKPOINTS.sm) return 1;
  if (width < BREAKPOINTS.md) return 2;
  if (width < BREAKPOINTS.lg) return 3;
  if (width < BREAKPOINTS.xl) return 4;
  return 6;
};

// ==================== PAGINATION ====================

/**
 * Lấy số items per page dựa trên device type
 * @param deviceType - 'mobile' | 'tablet' | 'desktop'
 * @returns Items per page
 */
export const getItemsPerPage = (deviceType: 'mobile' | 'tablet' | 'desktop'): number => {
  const itemsPerPageMap = {
    mobile: 10,
    tablet: 20,
    desktop: 50,
  };
  return itemsPerPageMap[deviceType];
};

/**
 * Hook để lấy responsive items per page
 * @returns Items per page động theo device
 */
export const useItemsPerPage = (): number => {
  const { isMobile, isTablet } = useResponsive();
  
  if (isMobile) return getItemsPerPage('mobile');
  if (isTablet) return getItemsPerPage('tablet');
  return getItemsPerPage('desktop');
};

// ==================== FONT SIZE ====================

/**
 * Lấy responsive font size class
 * @param base - Base size key
 * @param windowWidth - Window width (optional)
 * @returns Font size value
 */
export const getResponsiveFontSize = (
  base: keyof typeof DESIGN_TOKENS.typography.fontSize,
  windowWidth?: number
): string => {
  const width = windowWidth || (typeof window !== 'undefined' ? window.innerWidth : BREAKPOINTS.lg);

  // Scale down on mobile
  if (width < BREAKPOINTS.sm) {
    const sizeMap: Record<string, keyof typeof DESIGN_TOKENS.typography.fontSize> = {
      '4xl': '3xl',
      '3xl': '2xl',
      '2xl': 'xl',
      'xl': 'lg',
      'lg': 'base',
    };
    const scaledSize = sizeMap[base] || base;
    return DESIGN_TOKENS.typography.fontSize[scaledSize as keyof typeof DESIGN_TOKENS.typography.fontSize];
  }

  return DESIGN_TOKENS.typography.fontSize[base];
};

// ==================== SPACING ====================

/**
 * Lấy responsive spacing value
 * @param desktop - Desktop spacing (pixels)
 * @param tablet - Tablet spacing (pixels)  
 * @param mobile - Mobile spacing (pixels)
 * @param windowWidth - Window width (optional)
 * @returns Spacing value (pixels)
 */
export const getResponsiveSpacing = (
  desktop: number,
  tablet: number,
  mobile: number,
  windowWidth?: number
): number => {
  const width = windowWidth || (typeof window !== 'undefined' ? window.innerWidth : BREAKPOINTS.lg);

  if (width < BREAKPOINTS.md) return mobile;
  if (width < BREAKPOINTS.lg) return tablet;
  return desktop;
};

// ==================== CONTAINER WIDTH ====================

/**
 * Lấy max container width dựa trên breakpoint
 * @param windowWidth - Window width (optional)
 * @returns Container max width (pixels)
 */
export const getContainerMaxWidth = (windowWidth?: number): number => {
  const width = windowWidth || (typeof window !== 'undefined' ? window.innerWidth : BREAKPOINTS.lg);

  if (width < BREAKPOINTS.sm) return DESIGN_TOKENS.spacing.container.xs;
  if (width < BREAKPOINTS.md) return DESIGN_TOKENS.spacing.container.sm;
  if (width < BREAKPOINTS.lg) return DESIGN_TOKENS.spacing.container.md;
  if (width < BREAKPOINTS.xl) return DESIGN_TOKENS.spacing.container.lg;
  if (width < BREAKPOINTS['2xl']) return DESIGN_TOKENS.spacing.container.xl;
  return DESIGN_TOKENS.spacing.container['2xl'];
};

// ==================== MEDIA QUERY HELPERS ====================

/**
 * Check if matches media query (chỉ dùng trong browser)
 * @param breakpoint - Breakpoint key
 * @returns True nếu matches
 */
export const matchesBreakpoint = (breakpoint: keyof typeof BREAKPOINTS): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= BREAKPOINTS[breakpoint];
};

/**
 * Hook để check media query match
 * @param breakpoint - Breakpoint key
 * @returns True nếu matches
 */
export const useMediaQuery = (breakpoint: keyof typeof BREAKPOINTS): boolean => {
  const { width } = useResponsive();
  return width >= BREAKPOINTS[breakpoint];
};

