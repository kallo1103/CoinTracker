"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import CryptoSearch from "@/components/CryptoSearch";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  User, 
  Mail, 
  Check, 
  Search, 
  User as ProfileIcon, 
  Settings, 
  BarChart3, 
  ArrowLeft, 
  LogOut 
} from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useLanguage();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  // Do not render if not authenticated (redirect will occur)
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with welcome message */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <User className="w-10 h-10" />
            {t('profile.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('profile.subtitle')}
          </p>
        </div>

        {/* User info card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Header card with gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">{t('profile.accountInfo')}</h2>
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
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Detailed information */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {session.user?.name || "User"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center justify-center sm:justify-start gap-2">
                  <Mail className="w-5 h-5" />
                  {session.user?.email}
                </p>

                {/* Additional stats or info */}
                <div className="flex gap-4 justify-center sm:justify-start">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 px-4 py-2 rounded-lg">
                    <p className="text-xs text-indigo-600 dark:text-indigo-300 font-medium">{t('profile.status')}</p>
                    <p className="text-sm font-bold text-indigo-800 dark:text-indigo-100">{t('profile.active')}</p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/50 px-4 py-2 rounded-lg">
                    <p className="text-xs text-purple-600 dark:text-purple-300 font-medium">{t('profile.accountType')}</p>
                    <p className="text-sm font-bold text-purple-800 dark:text-purple-100">{t('profile.premium')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 hover:shadow-3xl transition-all duration-300 relative z-50">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
              {t('profile.searchCrypto')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">{t('profile.searchCryptoDesc')}</p>
          </div>
          <div className="flex justify-center">
            <CryptoSearch />
          </div>
        </div>


        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => router.push("/profile/edit")}
            className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1 w-full text-left"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-200">
              <ProfileIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-400 transition-colors">{t('profile.edit')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{t('profile.manageInfo')}</p>
          </button>

          <button
            onClick={() => router.push("/profile/settings")}
            className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1 w-full text-left"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-200">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-400 transition-colors">{t('profile.settings')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{t('profile.customizeAccount')}</p>
          </button>

          <button
            onClick={() => router.push("/profile/statistics")}
            className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1 w-full text-left"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-200">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-400 transition-colors">{t('profile.statistics')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{t('profile.viewActivity')}</p>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/app")}
            className="group px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-indigo-600 dark:text-indigo-300 rounded-2xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <span className="flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              {t('dashboard.backToDashboard')}
            </span>
          </button>
          
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="group px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <span className="flex items-center">
              {t('auth.signout')}
              <LogOut className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
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
