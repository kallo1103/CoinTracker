import type { RecaptchaVerifier } from "firebase/auth";

// Global declarations for browser-only objects used across the app
declare global {
  interface EthereumProvider {
    isMetaMask?: boolean;
    request?: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    on?: (event: string, callback: (...args: unknown[]) => void) => void;
    removeListener?: (event: string, callback: (...args: unknown[]) => void) => void;
  }

  interface Window {
    ethereum?: EthereumProvider;
    // Firebase Recaptcha verifier used in AuthButton
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export {};


