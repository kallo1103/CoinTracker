"use client";

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
  const { isCollapsed } = useNavbar(); // Lấy trạng thái sidebar


  // Loading state - responsive cho cả sidebar đóng/mở
  if (status === "loading") {
    return (
      <div className={`flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg animate-pulse ${
        isCollapsed ? 'justify-center px-2' : ''
      }`}>
        <div className={`${isCollapsed ? 'w-10 h-10' : 'w-8 h-8'} bg-gray-300 rounded-full`}></div>
        {!isCollapsed && <div className="w-20 h-4 bg-gray-300 rounded"></div>}
      </div>
    );
  }

  // Logged in - show user info - responsive cho cả sidebar đóng/mở
  if (session) {
    return (
      <button
        onClick={() => router.push("/profile")}
        className={`flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-lg transition-all shadow-sm border border-gray-200 hover:shadow-md ${
          isCollapsed 
            ? 'w-15 h-12 justify-start px-2' 
            : 'w-full max-w-[300px] h-[60px] mx-auto'
        }`}
        title={isCollapsed ? `Profile - ${session.user?.name || 'User'}` : ''}
      >
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={isCollapsed ? 28 : 32}
            height={isCollapsed ? 28 : 32}
            className="rounded-full flex-shrink-0"
            unoptimized
          />
        ) : (
          <div className={`${
            isCollapsed ? 'w-7 h-7 text-xs' : 'w-10 h-10 text-sm'
          } bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
            {session.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
        {isCollapsed ? (
          <span className="font-medium text-gray-700 text-xs truncate ml-1">
            {session.user?.name || 'User'}
          </span>
        ) : (
          <span className="font-medium text-gray-700 text-sm sm:text-base whitespace-nowrap overflow-hidden">
            {session.user?.name || 'User'}
          </span>
        )}
      </button>
    );
  }

  // Not logged in - show sign in options - responsive cho cả sidebar đóng/mở
  return (
    <div className="relative">
      {!showOptions ? (
        <button
          onClick={() => setShowOptions(true)}
          className={`bg-blue-900 text-white rounded-lg transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2 ${
            isCollapsed 
              ? 'w-12 h-12 justify-center px-2' 
              : 'w-full max-w-[200px] px-4 sm:px-6 py-2 sm:py-2.5 mx-auto text-sm sm:text-base'
          }`}
          title={isCollapsed ? "Đăng nhập" : ''}
        >
          <LogIn className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'}`} />
          {!isCollapsed && "Sign in"}
        </button>
      ) : (
        <div className={`bg-gray-800 rounded-lg p-3 sm:p-4 shadow-xl border border-gray-700 space-y-3 ${
          isCollapsed 
            ? 'absolute left-16 bottom-0 w-64 z-50' 
            : 'w-full max-w-[280px] sm:min-w-[250px]'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">Choose Method</h3>
            <button
              onClick={() => setShowOptions(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Google Sign In */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/profile" })}
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
