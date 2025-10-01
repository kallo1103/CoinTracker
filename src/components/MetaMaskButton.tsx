"use client";

import { useState } from "react";
import { BrowserProvider } from "ethers";

interface MetaMaskButtonProps {
  onConnect?: (address: string) => void;
}

export default function MetaMaskButton({ onConnect }: MetaMaskButtonProps) {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== "undefined" && typeof (window as any).ethereum !== "undefined";
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError("MetaMask is not installed! Please install MetaMask extension.");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);

      // Request account access
      const provider = new BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length > 0) {
        const address = accounts[0];
        setAccount(address);
        
        // Save to localStorage
        localStorage.setItem("walletAddress", address);
        
        // Callback
        if (onConnect) {
          onConnect(address);
        }

        // Sign in with NextAuth
        await signInWithWallet(address);
      }
    } catch (err: any) {
      console.error("Error connecting to MetaMask:", err);
      setError(err.message || "Unable to connect to MetaMask");
    } finally {
      setIsConnecting(false);
    }
  };

  // Sign in with wallet address via NextAuth
  const signInWithWallet = async (address: string) => {
    try {
      // Create message to sign
      const message = `Sign in to Crypto Tracker\n\nAddress: ${address}\nTimestamp: ${new Date().toISOString()}`;
      
      const provider = new BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(message);

      // Sign in via NextAuth with credentials provider
      const { signIn } = await import("next-auth/react");
      
      const result = await signIn("metamask", {
        address,
        message,
        signature,
        redirect: false,
      });

      if (result?.ok) {
        // Redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        setError(result?.error || "Authentication failed");
      }
    } catch (err: any) {
      console.error("Error signing message:", err);
      setError("Unable to verify signature");
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem("walletAddress");
  };

  // Shorten wallet address
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (account) {
    return (
      <div className="flex items-center gap-2">
        <div className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-medium shadow-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm7.5 12c0 .414-.336.75-.75.75h-3.75v3.75c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-3.75H9.75c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3.75V7.5c0-.414.336-.75.75-.75s.75.336.75.75v3.75h3.75c.414 0 .75.336.75.75z"/>
          </svg>
          <span className="font-mono text-sm">{shortenAddress(account)}</span>
        </div>
        <button
          onClick={disconnectWallet}
          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
          title="Disconnect"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
      >
        {isConnecting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Connecting...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm7.5 12c0 .414-.336.75-.75.75h-3.75v3.75c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-3.75H9.75c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3.75V7.5c0-.414.336-.75.75-.75s.75.336.75.75v3.75h3.75c.414 0 .75.336.75.75z"/>
            </svg>
            Connect MetaMask
          </>
        )}
      </button>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}

      {!isMetaMaskInstalled() && (
        <p className="text-gray-500 text-xs mt-2 text-center">
          Don't have MetaMask? <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Download here</a>
        </p>
      )}
    </div>
  );
}

