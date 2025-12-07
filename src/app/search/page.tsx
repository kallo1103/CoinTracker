'use client';

import React from 'react';
import CryptoSearch from '@/components/CryptoSearch';
import PopularCoins from '@/components/PopularCoins';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SearchPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/app" 
            className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-6 group border border-gray-200 dark:border-gray-700"
          >
            <svg className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('dashboard.backToDashboard')}
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-300 to-purple-300 bg-clip-text text-transparent mb-4">
              {t('search.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('search.subtitle')}
            </p>
          </div>
        </div>

        {/* Search Component */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-gray-200 dark:border-gray-700/20 relative z-50">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('search.searchCoin')}
            </h2>
            <p className="text-gray-300">
              {t('search.searchPlaceholder')}
            </p>
          </div>
          <div className="flex justify-center">
            <CryptoSearch />
          </div>
        </div>

        {/* Popular Searches */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-gray-200 dark:border-gray-700/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Top Cryptocurrencies
            </h2>
            <p className="text-gray-300">
              Các loại tiền điện tử có market cap cao nhất
            </p>
          </div>
          <PopularCoins limit={8} />
        </div>

        {/* Search Tips */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl mr-4">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">
              {t('search.tips')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-400 dark:bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600 dark:text-gray-300">{t('search.tip1')}</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-400 dark:bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600 dark:text-gray-300">{t('search.tip2')}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-400 dark:bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600 dark:text-gray-300">{t('search.tip3')}</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-400 dark:bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600 dark:text-gray-300">{t('search.tip4')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
