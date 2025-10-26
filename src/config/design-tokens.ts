/**
 * Design Tokens - Hệ thống tokens thiết kế tập trung
 * Single source of truth cho tất cả giá trị thiết kế
 */

export const DESIGN_TOKENS = {
  // ==================== COLORS ====================
  colors: {
    // Brand colors - Màu thương hiệu
    brand: {
      primary: '#1a1a1a',
      primaryHover: '#2a2a2a',
      secondary: '#4a4a4a',
      secondaryHover: '#5a5a5a',
      light: '#ffffff',
      lightHover: '#f5f5f5',
      dark: '#000000',
      darkHover: '#1a1a1a',
    },

    // Semantic colors - Màu theo ngữ nghĩa
    status: {
      success: '#10b981',      // green-500
      successLight: '#d1fae5', // green-100
      successDark: '#047857',  // green-700
      error: '#ef4444',        // red-500
      errorLight: '#fee2e2',   // red-100
      errorDark: '#b91c1c',    // red-700
      warning: '#f59e0b',      // amber-500
      warningLight: '#fef3c7', // amber-100
      warningDark: '#d97706',  // amber-600
      info: '#3b82f6',         // blue-500
      infoLight: '#dbeafe',    // blue-100
      infoDark: '#1d4ed8',     // blue-700
    },

    // Fear & Greed sentiment colors
    sentiment: {
      extremeFear: '#ef4444',   // red-500
      fear: '#f97316',          // orange-500
      neutral: '#eab308',       // yellow-500
      greed: '#84cc16',         // lime-500
      extremeGreed: '#22c55e',  // green-500
    },

    // Chart colors
    chart: {
      grid: '#e5e7eb',          // gray-200
      gridDark: '#374151',      // gray-700
      axis: '#6b7280',          // gray-500
      positive: '#10b981',      // green-500
      negative: '#ef4444',      // red-500
      gradient: {
        positiveStart: '#10b981',
        positiveEnd: '#10b981',
        negativeStart: '#ef4444',
        negativeEnd: '#ef4444',
      }
    },

    // Neutral grays
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    }
  },

  // ==================== SPACING ====================
  spacing: {
    // Sidebar dimensions
    sidebar: {
      collapsed: 64,    // 4rem = 64px
      expanded: 256,    // 16rem = 256px
    },

    // Container widths
    container: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },

    // Common spacing scale (pixels)
    scale: {
      0: 0,
      1: 4,      // 0.25rem
      2: 8,      // 0.5rem
      3: 12,     // 0.75rem
      4: 16,     // 1rem
      5: 20,     // 1.25rem
      6: 24,     // 1.5rem
      8: 32,     // 2rem
      10: 40,    // 2.5rem
      12: 48,    // 3rem
      16: 64,    // 4rem
      20: 80,    // 5rem
      24: 96,    // 6rem
    }
  },

  // ==================== TYPOGRAPHY ====================
  typography: {
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
    },

    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    }
  },

  // ==================== BORDER RADIUS ====================
  borderRadius: {
    none: '0',
    sm: '0.375rem',    // 6px
    md: '0.5rem',      // 8px
    lg: '0.75rem',     // 12px
    xl: '1rem',        // 16px
    '2xl': '1.5rem',   // 24px
    '3xl': '2rem',     // 32px
    full: '9999px',
  },

  // ==================== SHADOWS ====================
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },

  // ==================== TRANSITIONS ====================
  transition: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    timing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      linear: 'linear',
    }
  },

  // ==================== CHART SPECIFIC ====================
  chart: {
    // Chart heights responsive
    heights: {
      mobile: 250,
      tablet: 350,
      desktop: 400,
      large: 500,
    },

    // Stroke widths
    strokeWidth: {
      thin: 1,
      normal: 2,
      thick: 3,
    },

    // Chart margins
    margins: {
      top: 10,
      right: 30,
      bottom: 0,
      left: 0,
    }
  },

  // ==================== Z-INDEX ====================
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  }
} as const;

// Type helper để đảm bảo type safety
export type DesignTokens = typeof DESIGN_TOKENS;

