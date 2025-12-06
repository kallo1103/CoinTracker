'use client';

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MetaMaskButton from "./MetaMaskButton";
import { useState } from "react";
import { useNavbar } from "@/contexts/NavbarContext";
import { LogIn, X } from "lucide-react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const { isCollapsed } = useNavbar();

  // Loading state
  if (status === "loading") {
    return (
      <div className={`flex items-center gap-2 bg-white/5 rounded-xl animate-pulse border border-white/10 ${
        isCollapsed ? 'p-2 justify-center' : 'px-4 py-2 w-full'
      }`}>
        <div className="w-8 h-8 bg-white/10 rounded-full"></div>
        {!isCollapsed && <div className="w-20 h-4 bg-white/10 rounded"></div>}
      </div>
    );
  }

  // Logged in
  if (session) {
    return (
      <button
        onClick={() => router.push("/profile")}
        className={`
          flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 
          rounded-xl transition-all duration-300 group
          ${isCollapsed ? 'p-2 justify-center' : 'w-full px-4 py-3'}
        `}
        title={isCollapsed ? `Profile - ${session.user?.name}` : ''}
      >
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={32}
            height={32}
            className="rounded-full ring-2 ring-transparent group-hover:ring-blue-500/50 transition-all"
            unoptimized
          />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
            {session.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
        
        {!isCollapsed && (
          <div className="flex flex-col items-start overflow-hidden">
            <span className="text-sm font-medium text-slate-200 truncate max-w-[120px] group-hover:text-white transition-colors">
              {session.user?.name || 'User'}
            </span>
          </div>
        )}
      </button>
    );
  }

  // Not logged in
  return (
    <div className="relative w-full">
      {!showOptions ? (
        <button
          onClick={() => setShowOptions(true)}
          className={`
            bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 
            text-white rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30 hover:-translate-y-0.5
            flex items-center justify-center
            ${isCollapsed ? 'w-12 h-12 p-0' : 'w-full px-6 py-3 gap-2 font-medium'}
          `}
          title={isCollapsed ? "Sign in" : ''}
        >
          <LogIn size={20} />
          {!isCollapsed && "Sign In"}
        </button>
      ) : (
        <div className={`
          bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-4
          flex flex-col gap-3 z-[60]
          ${isCollapsed ? 'fixed left-24 bottom-8 w-72 origin-bottom-left' : 'w-full absolute bottom-0 left-0 origin-bottom'}
          animate-in slide-in-from-bottom-2 fade-in duration-200
        `}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-white font-semibold text-sm">Connect Wallet</h3>
            <button onClick={() => setShowOptions(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/profile" })}
            className="flex items-center justify-center gap-3 w-full bg-white hover:bg-gray-50 text-slate-900 font-medium px-4 py-2.5 rounded-xl transition-all hover:scale-[1.02]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="h-px bg-white/10 flex-1"></div>
            <span>OR</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <MetaMaskButton onConnect={(address) => {
            console.log("Connected:", address);
            setShowOptions(false);
          }} />
        </div>
      )}
    </div>
  );
}
