"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import CryptoSearch from "@/components/CryptoSearch";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  
  // Do not render if not authenticated (redirect will occur)
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with welcome message */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎉 Welcome to the Dashboard!
          </h1>
          <p className="text-gray-300">
            You have successfully logged in
          </p>
        </div>

        {/* User info card */}
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Header card with gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Account Information</h2>
          </div>

          {/* Card content */}
          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User avatar"}
                    width={120}
                    height={120}
                    className="rounded-full ring-4 ring-indigo-100"
                    unoptimized
                  />
                ) : (
                  <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold ring-4 ring-indigo-100">
                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Detailed information */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {session.user?.name || "User"}
                </h3>
                <p className="text-gray-300 mb-4 flex items-center justify-center sm:justify-start gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {session.user?.email}
                </p>

                {/* Additional stats or info */}
                <div className="flex gap-4 justify-center sm:justify-start">
                  <div className="bg-indigo-900/50 px-4 py-2 rounded-lg">
                    <p className="text-xs text-indigo-300 font-medium">Status</p>
                    <p className="text-sm font-bold text-indigo-100">Active</p>
                  </div>
                  <div className="bg-purple-900/50 px-4 py-2 rounded-lg">
                    <p className="text-xs text-purple-300 font-medium">Account Type</p>
                    <p className="text-sm font-bold text-purple-100">Premium</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-gray-700/20 hover:shadow-3xl transition-all duration-300">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent mb-2">
               Tìm kiếm Cryptocurrency
            </h2>
            <p className="text-gray-300 text-lg">Tìm kiếm thông tin chi tiết về các loại tiền điện tử</p>
          </div>
          <div className="flex justify-center">
            <CryptoSearch />
          </div>
        </div>


        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-700/20 hover:border-indigo-500 hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">Profile</h3>
            <p className="text-sm text-gray-300">Manage personal information</p>
          </div>

          <div className="group bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-700/20 hover:border-purple-500 hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Settings</h3>
            <p className="text-sm text-gray-300">Customize account</p>
          </div>

          <div className="group bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-700/20 hover:border-green-500 hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Statistics</h3>
            <p className="text-sm text-gray-300">View your activity</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/")}
            className="group px-8 py-4 bg-gray-800/80 backdrop-blur-sm text-indigo-300 rounded-2xl font-semibold hover:bg-gray-700 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-indigo-500 hover:border-indigo-400 hover:-translate-y-1"
          >
            <span className="flex items-center">
              <svg className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </span>
          </button>
          
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="group px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <span className="flex items-center">
              Sign Out
              <svg className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </span>
          </button>
        </div>

       
        {/* {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 bg-gray-900 rounded-xl p-6 text-white">
            <h3 className="text-sm font-bold mb-2 text-gray-400">DEBUG - Session Data:</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        )} */}
      </div>
    </div>
  );
}
