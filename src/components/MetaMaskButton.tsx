"use client";

import { useState } from "react";
import { BrowserProvider, Eip1193Provider } from "ethers";
import { Wallet } from "lucide-react";
import Image from "next/image";

interface MetaMaskButtonProps {
  onConnect?: (address: string) => void;
}

export default function MetaMaskButton({ onConnect }: MetaMaskButtonProps) {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isMetaMaskInstalled = () => {
    return typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  };

  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError("MetaMask is not installed!");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);

      const provider = new BrowserProvider(window.ethereum as Eip1193Provider);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length > 0) {
        const address = accounts[0];
        setAccount(address);
        localStorage.setItem("walletAddress", address);
        
        if (onConnect) {
          onConnect(address);
        }

        await signInWithWallet(address);
      }
    } catch (err) {
      console.error("Error connecting to MetaMask:", err);
      const errorMessage = err instanceof Error ? err.message : "Unable to connect to MetaMask";
      setError(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  const signInWithWallet = async (address: string) => {
    try {
      const message = `Sign in to Crypto Tracker\n\nAddress: ${address}\nTimestamp: ${new Date().toISOString()}`;

      const provider = new BrowserProvider(window.ethereum as Eip1193Provider);
      const signer = await provider.getSigner();

      const signature = await signer.signMessage(message);

      const { signIn } = await import("next-auth/react");

      const result = await signIn("metamask", {
        address: address.toLowerCase(),
        message,
        signature,
        redirect: false,
      });

      if (result?.ok) {
        window.location.href = "/profile";
      } else {
        setError(result?.error || "Authentication failed");
      }
    } catch (err) {
      console.error("Error signing message:", err);
      const errorMessage = err instanceof Error ? err.message : "Unable to verify signature";
      setError(errorMessage);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem("walletAddress");
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (account) {
    return (
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 text-orange-200 rounded-xl font-mono text-sm shadow-sm flex items-center justify-center gap-2">
          <Wallet className="w-4 h-4 text-orange-500" />
          {shortenAddress(account)}
        </div>
        <button
          onClick={disconnectWallet}
          className="p-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-xl transition-colors"
          title="Disconnect"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="w-full px-4 py-3 bg-gradient-to-r from-[#f6851b] to-[#e2761b] hover:brightness-110 text-white rounded-xl transition-all font-bold shadow-lg shadow-orange-900/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {isConnecting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <div className="w-6 h-6 relative group-hover:scale-110 transition-transform">
              <Image
                src="/MetaMask-icon-fox-developer.svg"
                alt="MetaMask"
                width={24}
                height={24}
                className="w-full h-full"
              />
            </div>
            <span>Connect MetaMask</span>
          </>
        )}
      </button>

      {error && (
        <p className="text-red-400 text-xs mt-2 text-center bg-red-500/10 py-1 px-2 rounded-lg border border-red-500/20">
          {error}
        </p>
      )}

      {!isMetaMaskInstalled() && (
        <p className="text-slate-500 text-xs mt-3 text-center">
          New to Web3? <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 hover:underline transition-colors">Install MetaMask</a>
        </p>
      )}
    </div>
  );
}
