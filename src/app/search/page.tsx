'use client';

import { useState } from 'react';
import CryptoSearch from '@/components/CryptoSearch';
import PopularCoins from '@/components/PopularCoins';
import Link from 'next/link';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-blue-600 hover:text-blue-800 hover:bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-6 group"
          >
            <svg className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại Dashboard
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              🔍 Tìm kiếm Cryptocurrency
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Khám phá thông tin chi tiết về các loại tiền điện tử phổ biến trên thế giới
            </p>
          </div>
        </div>

        {/* Search Component */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tìm kiếm coin
            </h2>
            <p className="text-gray-600">
              Nhập tên hoặc ký hiệu của coin để tìm kiếm
            </p>
          </div>
          <div className="flex justify-center">
            <CryptoSearch />
          </div>
        </div>

        {/* Popular Searches */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              🚀 Top Cryptocurrencies
            </h2>
            <p className="text-gray-600">
              Các loại tiền điện tử có market cap cao nhất
            </p>
          </div>
          <PopularCoins limit={8} />
        </div>

        {/* Search Tips */}
        <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm border border-blue-200/50 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl mr-4">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-blue-900">
              💡 Mẹo tìm kiếm
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-blue-800">Nhập tên đầy đủ hoặc ký hiệu của coin (ví dụ: "bitcoin" hoặc "BTC")</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-blue-800">Tìm kiếm bằng tên tiếng Anh sẽ cho kết quả chính xác hơn</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-blue-800">Bạn cần nhập ít nhất 2 ký tự để bắt đầu tìm kiếm</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-blue-800">Click vào kết quả để xem thông tin chi tiết của coin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
