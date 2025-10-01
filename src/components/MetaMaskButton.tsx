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

  // Kiểm tra xem MetaMask có được cài đặt không
  const isMetaMaskInstalled = () => {
    return typeof window !== "undefined" && typeof (window as any).ethereum !== "undefined";
  };

  // Kết nối với MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError("MetaMask chưa được cài đặt! Vui lòng cài đặt MetaMask extension.");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);

      // Yêu cầu quyền truy cập tài khoản
      const provider = new BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length > 0) {
        const address = accounts[0];
        setAccount(address);
        
        // Lưu vào localStorage
        localStorage.setItem("walletAddress", address);
        
        // Callback
        if (onConnect) {
          onConnect(address);
        }

        // Đăng nhập với NextAuth (custom credentials)
        await signInWithWallet(address);
      }
    } catch (err: any) {
      console.error("Lỗi khi kết nối MetaMask:", err);
      setError(err.message || "Không thể kết nối với MetaMask");
    } finally {
      setIsConnecting(false);
    }
  };

  // Đăng nhập với wallet address qua NextAuth
  const signInWithWallet = async (address: string) => {
    try {
      // Tạo message để ký
      const message = `Đăng nhập vào Crypto Tracker\n\nĐịa chỉ: ${address}\nThời gian: ${new Date().toISOString()}`;
      
      const provider = new BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(message);

      // Đăng nhập qua NextAuth với credentials provider
      const { signIn } = await import("next-auth/react");
      
      const result = await signIn("metamask", {
        address,
        message,
        signature,
        redirect: false,
      });

      if (result?.ok) {
        // Redirect về dashboard
        window.location.href = "/dashboard";
      } else {
        setError(result?.error || "Xác thực thất bại");
      }
    } catch (err: any) {
      console.error("Lỗi khi ký message:", err);
      setError("Không thể xác thực chữ ký");
    }
  };

  // Ngắt kết nối
  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem("walletAddress");
  };

  // Rút gọn địa chỉ wallet
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
          title="Ngắt kết nối"
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
            Đang kết nối...
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
          Chưa có MetaMask? <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Tải về tại đây</a>
        </p>
      )}
    </div>
  );
}

