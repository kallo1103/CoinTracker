/**
 * Centralized Error Handling Utility
 * Provides consistent error handling across the application
 */

import { logger } from './logger';

export class AppError extends Error {
    constructor(
        message: string,
        public statusCode: number = 500,
        public code?: string,
        public isOperational: boolean = true
    ) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400, 'VALIDATION_ERROR');
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string) {
        super(`${resource} not found`, 404, 'NOT_FOUND');
    }
}

export class AuthenticationError extends AppError {
    constructor(message: string = 'Authentication failed') {
        super(message, 401, 'AUTHENTICATION_ERROR');
    }
}

export class ApiError extends AppError {
    constructor(message: string, statusCode: number = 500) {
        super(message, statusCode, 'API_ERROR');
    }
}

/**
 * Handle errors consistently across the application
 */
export function handleError(error: unknown, context?: string): AppError {
    // Log the error
    if (context) {
        logger.error(`Error in ${context}:`, error);
    } else {
        logger.error('Unhandled error:', error);
    }

    // If it's already an AppError, return it
    if (error instanceof AppError) {
        return error;
    }

    // If it's a standard Error
    if (error instanceof Error) {
        return new AppError(error.message);
    }

    // Unknown error type
    return new AppError('An unexpected error occurred');
}

/**
 * Async error wrapper for API routes and server functions
 */
export function asyncHandler<T extends (...args: unknown[]) => Promise<unknown>>(
    fn: T
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
    return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
        try {
            return (await fn(...args)) as ReturnType<T>;
        } catch (error) {
            throw handleError(error, fn.name);
        }
    };
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyMessage(error: unknown): string {
    if (error instanceof AppError) {
        return error.message;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'Đã xảy ra lỗi. Vui lòng thử lại sau.';
}

/**
 * Check if error is operational (expected) or programming error
 */
export function isOperationalError(error: unknown): boolean {
    if (error instanceof AppError) {
        return error.isOperational;
    }
    return false;
}
