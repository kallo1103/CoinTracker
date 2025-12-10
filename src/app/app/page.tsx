// Trang chủ - Home Page
'use client';

import CryptoList from '@/components/CryptoList';
import FearGreedIndex from '@/components/FearGreedIndex';
import GlobalMetrics from '@/components/GlobalMetrics';
import PriceChart from '@/components/PriceChart';
import FearGreedChart from '@/components/FearGreedChart';
import DominancePieChart from '@/components/DominancePieChart';
import CandlestickChart from '@/components/CandlestickChart';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AppPage() {
  const { t } = useLanguage();
  
  return (
    <div className="container bg-black mx-auto px-4 py-12 min-h-screen">
      {/* <h1 className="text-4xl font-bold mb-8 text-white">{t('home.title')}</h1> */}
      
      {/* Global Metrics - Bitcoin Dominance, Market Cap, etc */}
      <div className="mb-12">
        <GlobalMetrics />
      </div>

      {/* Candlestick Charts */}
      <div className="grid grid-cols-1 gap-6 mb-12">
        {/* Bitcoin Candlestick Chart */}
        <CandlestickChart symbol="BTC" days={30} />
      </div>

      {/* Area Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Bitcoin Price Chart */}
        <PriceChart symbol="BTC" days={30} type="area" />
        
        {/* Ethereum Price Chart */}
        <PriceChart symbol="ETH" days={30} type="area" />
      </div>

      {/* Fear & Greed Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Fear & Greed Current */}
        <FearGreedIndex />
        
        {/* Dominance Pie Chart */}
        <DominancePieChart />
      </div>

      {/* Fear & Greed History Chart */}
      <div className="mb-12">
        <FearGreedChart />
      </div>

      {/* Top Cryptocurrencies List */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4  text-white">{t('home.topCryptos')}</h2>
        <CryptoList limit={10} />
      </div>
    </div>
  );
}

