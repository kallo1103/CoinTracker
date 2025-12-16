import { renderWithProviders, screen, waitFor, mockGlobalMetrics } from '@/utils/test-utils';
import GlobalMetrics from '../GlobalMetrics';
import { apiClient } from '@/lib/apiClient';
import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest';

import { API_CONFIG } from '@/config/api';

// Mock apiClient
vi.mock('@/lib/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe('GlobalMetrics Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    // Mock promise that never resolves explicitly to keep loading state
    (apiClient.get as Mock).mockImplementation(() => new Promise(() => {}));

    renderWithProviders(<GlobalMetrics />);
    
    // Check for pulse animation elements (skeleton loader)
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders metrics data correctly after successful fetch', async () => {
    const mockData = mockGlobalMetrics();
    
    (apiClient.get as Mock).mockResolvedValue({
      success: true,
      data: mockData,
    });

    renderWithProviders(<GlobalMetrics />);

    // Wait for loading to finish and data to appear
    await waitFor(() => {
      expect(screen.getByText('BTC Dominance')).toBeInTheDocument();
    });

    // Check if values are rendered
    expect(screen.getByText(`${mockData.btc_dominance.toFixed(2)}%`)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.eth_dominance.toFixed(2)}%`)).toBeInTheDocument();
  });

  it('renders error state on API failure', async () => {
    (apiClient.get as Mock).mockResolvedValue({
      success: false,
      error: 'API Error',
    });

    renderWithProviders(<GlobalMetrics />);

    await waitFor(() => {
      expect(screen.getByText(/API Error/i)).toBeInTheDocument();
    });
    
    // Check for retry button
    expect(screen.getByRole('button', { name: /common.tryAgain/i })).toBeInTheDocument();
  });


  it('handles network exceptions gracefully', async () => {
    (apiClient.get as Mock).mockRejectedValue(new Error('Network Error'));

    renderWithProviders(<GlobalMetrics />);

    await waitFor(() => {
      expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
    });
  });

  it('polls for data updates', async () => {
    const mockData = mockGlobalMetrics();
    (apiClient.get as Mock).mockResolvedValue({
      success: true,
      data: mockData,
    });

    vi.useFakeTimers();

    renderWithProviders(<GlobalMetrics />);

    // Initial fetch
    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledTimes(1);
    });

    // Fast forward time
    vi.advanceTimersByTime(API_CONFIG.polling.frequent + 100);

    // Should have called again
    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledTimes(2);
    });

    vi.useRealTimers();
  });
});
