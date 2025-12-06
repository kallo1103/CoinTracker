/**
 * Design Tokens - Web3 / Futuristic Theme
 * Single source of truth for all design values.
 */

export const DESIGN_TOKENS = {
  // ==================== COLORS ====================
  colors: {
    // Brand colors - Neon & Dark
    brand: {
      primary: '#3b82f6',      // Electric Blue
      primaryHover: '#2563eb',
      secondary: '#8b5cf6',    // Electric Purple
      secondaryHover: '#7c3aed',
      accent: '#06b6d4',       // Neon Cyan
      light: '#f8fafc',
      lightHover: '#f1f5f9',
      dark: '#020617',         // Deep Space Black
      darkHover: '#0f172a',
      muted: '#94a3b8',
    },

    // Semantic colors
    status: {
      success: '#10b981',      // Emerald
      successLight: 'rgba(16, 185, 129, 0.1)',
      successDark: '#059669',
      error: '#ef4444',        // Red
      errorLight: 'rgba(239, 68, 68, 0.1)',
      errorDark: '#b91c1c',
      warning: '#f59e0b',      // Amber
      warningLight: 'rgba(245, 158, 11, 0.1)',
      warningDark: '#d97706',
      info: '#3b82f6',         // Blue
      infoLight: 'rgba(59, 130, 246, 0.1)',
      infoDark: '#1d4ed8',
    },

    // Fear & Greed sentiment colors (Neon variants)
    sentiment: {
      extremeFear: '#ef4444',   
      fear: '#f97316',          
      neutral: '#eab308',       
      greed: '#84cc16',         
      extremeGreed: '#22c55e',  
    },

    // Chart colors (Neon gradients)
    chart: {
      grid: 'rgba(255, 255, 255, 0.05)',
      gridDark: 'rgba(255, 255, 255, 0.05)',
      axis: '#64748b',
      positive: '#10b981',
      negative: '#ef4444',
      gradient: {
        positiveStart: 'rgba(16, 185, 129, 0.5)',
        positiveEnd: 'rgba(16, 185, 129, 0)',
        negativeStart: 'rgba(239, 68, 68, 0.5)',
        negativeEnd: 'rgba(239, 68, 68, 0)',
      }
    },

    // Neutral grays (Slate for cool tone)
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    }
  },

  // ==================== CHART CONFIG (Top Level) ====================
  chart: {
    // Chart heights
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
    margins: {
      top: 10,
      right: 30,
      bottom: 0,
      left: 0,
    }
  },

  // ==================== SPACING ====================
  spacing: {
    sidebar: {
      collapsed: 80,    
      expanded: 280,    
    },
    container: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
    scale: {
      0: 0,
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 20,
      6: 24,
      8: 32,
      10: 40,
      12: 48,
      16: 64,
      20: 80,
      24: 96,
    }
  },

  // ==================== TYPOGRAPHY ====================
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
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
    sm: '0.375rem',
    md: '0.75rem',     // More rounded for modern feel
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.5rem',
    full: '9999px',
  },

  // ==================== SHADOWS (Glow effects) ====================
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
    glow: '0 0 15px rgba(59, 130, 246, 0.5)', // Primary glow
    glowAccent: '0 0 15px rgba(6, 182, 212, 0.5)', // Accent glow
  },

  // ==================== TRANSITIONS ====================
  transition: {
    duration: {
      fast: '150ms',
      base: '250ms', // Slightly slower for premium feel
      slow: '400ms',
      slower: '600ms',
    },
    timing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy for micro-interactions
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

export type DesignTokens = typeof DESIGN_TOKENS;
