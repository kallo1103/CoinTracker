import React from 'react';
import ExchangeList from '@/components/ExchangeList';

// Trang Exchange - Hiển thị danh sách các sàn giao dịch cryptocurrency
// Sử dụng dữ liệu từ CoinMarketCap API thông qua route /api/exchange/list
export default function ExchangePage() {
  return (
    <main className="p-4 md:p-12 pb-12 mx-auto max-w-7xl">
      {/* Header - responsive */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Sàn Giao Dịch Cryptocurrency
        </h1>
        <p className="text-sm md:text-base text-gray-400">
          Danh sách các sàn giao dịch hàng đầu với volume và thống kê theo thời gian thực
        </p>
      </div>

      {/* Exchange List Component */}
      <ExchangeList limit={50} />
    </main>
  );
}



