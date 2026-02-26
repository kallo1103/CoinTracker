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
    <div className="container mx-auto px-4 py-10 min-h-screen">
      {/* Global Metrics */}
      <section className="mb-12">
        <GlobalMetrics />
      </section>

      {/* Separator */}
      <div className="neon-line opacity-30 mb-12" />

      {/* Candlestick Charts */}
      <section className="mb-12">
        <CandlestickChart symbol="BTC" days={30} />
      </section>

      {/* Area Charts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <PriceChart symbol="BTC" days={30} type="area" />
        <PriceChart symbol="ETH" days={30} type="area" />
      </section>

      {/* Fear & Greed + Dominance */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <FearGreedIndex />
        <DominancePieChart />
      </section>

      {/* Fear & Greed History */}
      <section className="mb-12">
        <FearGreedChart />
      </section>

      {/* Top Cryptocurrencies */}
      <section className="mb-12">
        <div className="neon-line opacity-30 mb-8" />
        <h2 className="section-title mb-6">{t('home.topCryptos')}</h2>
        <CryptoList limit={10} />
      </section>
    </div>
  );
}
