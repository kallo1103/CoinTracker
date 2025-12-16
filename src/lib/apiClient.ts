/**
 * API Client with retry logic, caching, and error handling
 * Centralized HTTP client for all API requests
 */

import { logger } from '@/utils/logger';
import { ApiError, handleError } from '@/utils/errors';
import { API_CONFIG } from '@/config/api';

interface FetchOptions extends RequestInit {
    timeout?: number;
    retries?: number;
    retryDelay?: number;
    skipCache?: boolean;
}

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    timestamp?: string;
}

/**
 * Enhanced fetch with timeout support
 */
async function fetchWithTimeout(
    url: string,
    options: FetchOptions = {}
): Promise<Response> {
    const { timeout = API_CONFIG.timeout.medium, ...fetchOptions } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === 'AbortError') {
            throw new ApiError('Request timeout', 408);
        }
        throw error;
    }
}

/**
 * Retry logic for failed requests
 */
async function fetchWithRetry(
    url: string,
    options: FetchOptions = {}
): Promise<Response> {
    const {
        retries = API_CONFIG.rateLimit.maxRetries,
        retryDelay = API_CONFIG.rateLimit.retryDelay,
        ...fetchOptions
    } = options;

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetchWithTimeout(url, fetchOptions);

            // Don't retry on client errors (4xx)
            if (response.status >= 400 && response.status < 500) {
                return response;
            }

            // Retry on server errors (5xx)
            if (response.status >= 500 && attempt < retries) {
                logger.warn(`Request failed (attempt ${attempt + 1}/${retries + 1}), retrying...`);
                await sleep(retryDelay * (attempt + 1)); // Exponential backoff
                continue;
            }

            return response;
        } catch (error) {
            lastError = error instanceof Error ? error : new Error('Unknown error');
            if (attempt < retries) {
                logger.warn(`Request failed (attempt ${attempt + 1}/${retries + 1}), retrying...`);
                await sleep(retryDelay * (attempt + 1));
                continue;
            }
        }
    }

    throw lastError || new Error('Request failed after retries');
}

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Main API Client class
 */
class ApiClient {
    private cache: Map<string, { data: unknown; timestamp: number }> = new Map();

    /**
     * GET request with caching
     */
    async get<T>(
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<ApiResponse<T>> {
        const cacheKey = `${endpoint}${JSON.stringify(options.headers || {})}`;

        // Check cache if not skipped
        if (!options.skipCache) {
            const cached = this.cache.get(cacheKey);
            if (cached && Date.now() - cached.timestamp < 60000) {
                // 1 minute cache
                logger.debug(`Cache hit for ${endpoint}`);
                return cached.data as ApiResponse<T>;
            }
        }

        try {
            const response = await fetchWithRetry(endpoint, {
                ...options,
                method: 'GET',
            });

            if (!response.ok) {
                throw new ApiError(
                    `API request failed: ${response.statusText}`,
                    response.status
                );
            }

            const data: ApiResponse<T> = await response.json();

            // Cache successful responses
            if (data.success) {
                this.cache.set(cacheKey, { data, timestamp: Date.now() });
            }

            return data;
        } catch (error) {
            logger.error(`GET ${endpoint} failed:`, error);
            throw handleError(error, `GET ${endpoint}`);
        }
    }

    /**
     * POST request
     */
    async post<T, D = unknown>(
        endpoint: string,
        body: D,
        options: FetchOptions = {}
    ): Promise<ApiResponse<T>> {
        try {
            const response = await fetchWithRetry(endpoint, {
                ...options,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new ApiError(
                    `API request failed: ${response.statusText}`,
                    response.status
                );
            }

            return await response.json();
        } catch (error) {
            logger.error(`POST ${endpoint} failed:`, error);
            throw handleError(error, `POST ${endpoint}`);
        }
    }

    /**
     * PUT request
     */
    async put<T, D = unknown>(
        endpoint: string,
        body: D,
        options: FetchOptions = {}
    ): Promise<ApiResponse<T>> {
        try {
            const response = await fetchWithRetry(endpoint, {
                ...options,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new ApiError(
                    `API request failed: ${response.statusText}`,
                    response.status
                );
            }

            return await response.json();
        } catch (error) {
            logger.error(`PUT ${endpoint} failed:`, error);
            throw handleError(error, `PUT ${endpoint}`);
        }
    }

    /**
     * DELETE request
     */
    async delete<T>(
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<ApiResponse<T>> {
        try {
            const response = await fetchWithRetry(endpoint, {
                ...options,
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new ApiError(
                    `API request failed: ${response.statusText}`,
                    response.status
                );
            }

            return await response.json();
        } catch (error) {
            logger.error(`DELETE ${endpoint} failed:`, error);
            throw handleError(error, `DELETE ${endpoint}`);
        }
    }

    /**
     * Clear cache
     */
    clearCache(pattern?: string) {
        if (pattern) {
            Array.from(this.cache.keys()).forEach((key) => {
                if (key.includes(pattern)) {
                    this.cache.delete(key);
                }
            });
        } else {
            this.cache.clear();
        }
    }
}

// Export singleton instance
export const apiClient = new ApiClient();
