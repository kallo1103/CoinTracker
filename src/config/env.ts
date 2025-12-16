/**
 * Environment Configuration Validator
 * Validates required environment variables at startup
 */

import { logger } from '@/utils/logger';

interface EnvConfig {
    // NextAuth
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;

    // Google OAuth (optional)
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;

    // CoinMarketCap API
    COINMARKETCAP_API_KEY: string;

    // CryptoPanic API (optional)
    CRYPTOPANIC_API_KEY?: string;

    // Database
    DATABASE_URL: string;

    // Firebase (optional)
    NEXT_PUBLIC_FIREBASE_API_KEY?: string;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?: string;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID?: string;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?: string;
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?: string;
    NEXT_PUBLIC_FIREBASE_APP_ID?: string;

    // Node environment
    NODE_ENV: 'development' | 'production' | 'test';
}

class EnvironmentValidator {
    private errors: string[] = [];
    private warnings: string[] = [];

    validate(): EnvConfig {
        this.validateRequired();
        this.validateOptional();
        this.reportIssues();

        return this.getConfig();
    }

    private validateRequired() {
        const required = {
            NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
            NEXTAUTH_URL: process.env.NEXTAUTH_URL,
            COINMARKETCAP_API_KEY: process.env.COINMARKETCAP_API_KEY,
            DATABASE_URL: process.env.DATABASE_URL,
            NODE_ENV: process.env.NODE_ENV,
        };

        Object.entries(required).forEach(([key, value]) => {
            if (!value) {
                this.errors.push(`Missing required environment variable: ${key}`);
            }
        });
    }

    private validateOptional() {
        // Check Google OAuth
        const hasGoogleId = !!process.env.GOOGLE_CLIENT_ID;
        const hasGoogleSecret = !!process.env.GOOGLE_CLIENT_SECRET;

        if (hasGoogleId && !hasGoogleSecret) {
            this.warnings.push('GOOGLE_CLIENT_ID is set but GOOGLE_CLIENT_SECRET is missing');
        } else if (!hasGoogleId && hasGoogleSecret) {
            this.warnings.push('GOOGLE_CLIENT_SECRET is set but GOOGLE_CLIENT_ID is missing');
        }

        // Check Firebase config
        const firebaseVars = [
            'NEXT_PUBLIC_FIREBASE_API_KEY',
            'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
            'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
            'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
            'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
            'NEXT_PUBLIC_FIREBASE_APP_ID',
        ];

        const firebaseSet = firebaseVars.filter((v) => !!process.env[v]);
        if (firebaseSet.length > 0 && firebaseSet.length < firebaseVars.length) {
            this.warnings.push(
                'Firebase configuration is incomplete. Either set all Firebase variables or none.'
            );
        }

        // Check CryptoPanic
        if (!process.env.CRYPTOPANIC_API_KEY) {
            this.warnings.push('CRYPTOPANIC_API_KEY is not set. News feature may use fallback data.');
        }
    }

    private reportIssues() {
        if (this.errors.length > 0) {
            logger.error('Environment validation failed:');
            this.errors.forEach((error) => logger.error(`  ❌ ${error}`));
            throw new Error('Invalid environment configuration. Check logs for details.');
        }

        if (this.warnings.length > 0) {
            logger.warn('Environment validation warnings:');
            this.warnings.forEach((warning) => logger.warn(`  ⚠️  ${warning}`));
        }
    }

    private getConfig(): EnvConfig {
        return {
            NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
            NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
            COINMARKETCAP_API_KEY: process.env.COINMARKETCAP_API_KEY!,
            CRYPTOPANIC_API_KEY: process.env.CRYPTOPANIC_API_KEY,
            DATABASE_URL: process.env.DATABASE_URL!,
            NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
                process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
            NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development',
        };
    }
}

// Validate and export config
const validator = new EnvironmentValidator();
export const env = validator.validate();

// Type-safe access to environment variables
export function getEnv<K extends keyof EnvConfig>(key: K): EnvConfig[K] {
    return env[key];
}
