/**
 * Test Utilities
 * Reusable helpers for testing React components and hooks
 */

import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { NavbarProvider } from '@/contexts/NavbarContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { vi } from 'vitest';


/**
 * All providers wrapper for testing
 */
interface AllProvidersProps {
  children: ReactNode;
}

function AllProviders({ children }: AllProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <LanguageProvider>
        <NavbarProvider>{children}</NavbarProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

/**
 * Custom render with all providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

/**
 * Mock API response helper
 */
export function mockApiResponse<T>(data: T, success = true) {
  return {
    success,
    data: success ? data : undefined,
    error: success ? undefined : 'Error message',
    timestamp: new Date().toISOString(),
  };
}

/**
 * Mock fetch implementation
 */
export function mockFetch(response: unknown, ok = true, status = 200) {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok,
      status,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
      statusText: ok ? 'OK' : 'Error',
    } as Response)
  );
}

/**
 * Mock localStorage
 */
export function mockLocalStorage() {
  const storage: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => storage[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      storage[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete storage[key];
    }),
    clear: vi.fn(() => {
      Object.keys(storage).forEach((key) => delete storage[key]);
    }),
    get length() {
      return Object.keys(storage).length;
    },
    key: vi.fn((index: number) => Object.keys(storage)[index] || null),
  };
}

/**
 * Wait for async operations
 */
export function waitForAsync(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Mock session data for NextAuth
 */
export function mockSession(overrides = {}) {
  return {
    user: {
      id: 'test-user-id',
      name: 'Test User',
      email: 'test@example.com',
      image: 'https://example.com/avatar.jpg',
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    ...overrides,
  };
}

/**
 * Mock crypto data
 */
export function mockCryptoData(count = 10) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Crypto ${i + 1}`,
    symbol: `CRY${i + 1}`,
    slug: `crypto-${i + 1}`,
    cmc_rank: i + 1,
    quote: {
      USD: {
        price: 1000 + i * 100,
        volume_24h: 1000000 + i * 10000,
        percent_change_24h: (Math.random() - 0.5) * 10,
        percent_change_7d: (Math.random() - 0.5) * 20,
        market_cap: 10000000 + i * 100000,
      },
    },
  }));
}

/**
 * Mock global metrics data
 */
export function mockGlobalMetrics() {
  return {
    btc_dominance: 45.5,
    eth_dominance: 18.2,
    total_market_cap: 2500000000000,
    total_volume_24h: 150000000000,
    active_cryptocurrencies: 9500,
    total_market_cap_yesterday_percentage_change: 2.5,
    last_updated: new Date().toISOString(),
  };
}

/**
 * Mock exchange data
 */
export function mockExchangeData(count = 10) {
  return Array.from({ length: count }, (_, i) => ({
    id: `exchange-${i + 1}`,
    name: `Exchange ${i + 1}`,
    year_established: 2015 + i,
    country: 'USA',
    description: `Description for Exchange ${i + 1}`,
    url: `https://exchange${i + 1}.com`,
    image: `https://example.com/logo${i + 1}.png`,
    trust_score: 9 - i * 0.5,
    trust_score_rank: i + 1,
    trade_volume_24h_btc: 10000 - i * 100,
  }));
}

export * from '@testing-library/react';
export { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

