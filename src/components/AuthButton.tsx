"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MetaMaskButton from "./MetaMaskButton";
import { useState } from "react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);

  // Shorten display name for logged in users
  const shortenName = (name?: string | null) => {
    if (!name) return 'User';
    const trimmed = name.trim();
    // If full name, show first name only
    if (trimmed.includes(' ')) return trimmed.split(' ')[0];
    // If single long name, truncate
    if (trimmed.length > 12) return `${trimmed.slice(0, 10)}...`;
    return trimmed;
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg animate-pulse">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-20 h-4 bg-gray-300 rounded"></div>
      </div>
    );
  }

  // Logged in - show user info
  if (session) {
    return (
      <button
        onClick={() => router.push("/dashboard")}
        className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg transition-colors shadow-sm border border-gray-200 mx-auto"
      >
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={32}
            height={32}
            className="rounded-full"
            unoptimized
          />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {session.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
        <span className="font-medium text-gray-700 hidden sm:block">
          {shortenName(session.user?.name)}
        </span>
      </button>
    );
  }

  // Not logged in - show sign in options
  return (
    <div className="relative">
      {!showOptions ? (
        <button
          onClick={() => setShowOptions(true)}
          className="px-6 py-2.5 bg-blue-900 text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2 mx-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Sign in
        </button>
      ) : (
        <div className="bg-gray-800 rounded-lg p-4 shadow-xl border border-gray-700 space-y-3 min-w-[250px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">Choose Method</h3>
            <button
              onClick={() => setShowOptions(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Google Sign In */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full px-4 py-2.5 bg-white hover:bg-gray-100 text-gray-800 rounded-lg transition-all font-medium shadow-sm flex items-center gap-2 justify-center"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
            </svg>
            Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="text-gray-400 text-xs">OR</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* MetaMask */}
          <MetaMaskButton onConnect={(address) => {
            console.log("Connected:", address);
            setShowOptions(false);
          }} />
        </div>
      )}
    </div>
  );
}
