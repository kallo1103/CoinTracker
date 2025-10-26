/**
 * Breakpoints - Custom responsive breakpoints system
 * Định nghĩa các điểm ngắt cho responsive design
 */

export const BREAKPOINTS = {
  xs: 375,      // Mobile small (iPhone SE)
  sm: 640,      // Mobile (phones)
  md: 768,      // Tablet (iPads)
  lg: 1024,     // Laptop (small laptops)
  xl: 1280,     // Desktop (standard desktops)
  '2xl': 1536,  // Large desktop (large monitors)
} as const;

// Media queries cho CSS-in-JS
export const MEDIA_QUERIES = {
  xs: `@media (min-width: ${BREAKPOINTS.xs}px)`,
  sm: `@media (min-width: ${BREAKPOINTS.sm}px)`,
  md: `@media (min-width: ${BREAKPOINTS.md}px)`,
  lg: `@media (min-width: ${BREAKPOINTS.lg}px)`,
  xl: `@media (min-width: ${BREAKPOINTS.xl}px)`,
  '2xl': `@media (min-width: ${BREAKPOINTS['2xl']}px)`,
} as const;

// Max-width media queries (đôi khi cần thiết)
export const MEDIA_QUERIES_MAX = {
  xs: `@media (max-width: ${BREAKPOINTS.xs - 1}px)`,
  sm: `@media (max-width: ${BREAKPOINTS.sm - 1}px)`,
  md: `@media (max-width: ${BREAKPOINTS.md - 1}px)`,
  lg: `@media (max-width: ${BREAKPOINTS.lg - 1}px)`,
  xl: `@media (max-width: ${BREAKPOINTS.xl - 1}px)`,
  '2xl': `@media (max-width: ${BREAKPOINTS['2xl'] - 1}px)`,
} as const;

// Device type helpers
export const DEVICE_TYPES = {
  mobile: { min: 0, max: BREAKPOINTS.md - 1 },
  tablet: { min: BREAKPOINTS.md, max: BREAKPOINTS.lg - 1 },
  desktop: { min: BREAKPOINTS.lg, max: Infinity },
} as const;

// Type helpers
export type Breakpoint = keyof typeof BREAKPOINTS;
export type MediaQuery = keyof typeof MEDIA_QUERIES;

