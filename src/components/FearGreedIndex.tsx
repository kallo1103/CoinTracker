'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, X } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { API_CONFIG } from '@/config/api';
import { FEAR_GREED_THRESHOLDS } from '@/config/constants';
import { getFearGreedBgClass, getFearGreedTextClass } from '@/utils/theme';
import { formatDateTime } from '@/utils/formatters';

interface FearGreedData {
  value: number;
  value_classification: string;
  classification: {
    text: string;
    color: string;
  };
  timestamp: string;
  time_until_update: string;
}

const SENTIMENT_COLORS = [
  { color: '#ef4444', label: 'extremeFear', range: `0-${FEAR_GREED_THRESHOLDS.extremeFear.max}` },
  { color: '#f97316', label: 'fear', range: `${FEAR_GREED_THRESHOLDS.fear.min}-${FEAR_GREED_THRESHOLDS.fear.max}` },
  { color: '#eab308', label: 'neutral', range: `${FEAR_GREED_THRESHOLDS.neutral.min}-${FEAR_GREED_THRESHOLDS.neutral.max}` },
  { color: '#84cc16', label: 'greed', range: `${FEAR_GREED_THRESHOLDS.greed.min}-${FEAR_GREED_THRESHOLDS.greed.max}` },
  { color: '#22c55e', label: 'extremeGreed', range: `${FEAR_GREED_THRESHOLDS.extremeGreed.min}-100` },
];

export default function FearGreedIndex() {
  const { t } = useLanguage();
  const [data, setData] = useState<FearGreedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_CONFIG.endpoints.fearGreed}?limit=1`);
        const result = await response.json();

        if (result.success && result.data.length > 0) {
          setData(result.data[0]);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Error loading data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, API_CONFIG.polling.hourly);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="web3-card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/5 rounded w-1/2" />
          <div className="h-8 bg-white/5 rounded-full" />
          <div className="h-10 bg-white/5 rounded-xl w-1/3 mx-auto" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="web3-card border-red-500/20 p-5">
        <p className="text-red-400 flex items-center gap-2">
          <X className="w-4 h-4" /> {error || 'No data available'}
        </p>
      </div>
    );
  }

  return (
    <div className="web3-card p-6">
      <h3 className="font-semibold text-white flex items-center gap-2 text-lg mb-5">
        <AlertTriangle className="w-5 h-5 text-amber-400" />
        {t('fearGreed.title')}
      </h3>

      {/* Gauge Bar */}
      <div className="relative mt-8">
        <div
          className="w-full h-3 rounded-full relative overflow-hidden"
          style={{
            background: `linear-gradient(to right, #ef4444, #f97316, #eab308, #84cc16, #22c55e)`,
          }}
        >
          {/* Indicator */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-700 rounded-full"
            style={{ left: `${data.value}%` }}
          >
            <div className="absolute left-1/2 -translate-x-1/2 -top-8 bg-white text-gray-900 font-bold text-xs px-2.5 py-1 rounded-lg whitespace-nowrap shadow-lg">
              {data.value}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white" />
            </div>
          </div>
        </div>

        {/* Scale labels */}
        <div className="flex justify-between mt-2 text-[10px] text-gray-500">
          <span>0</span>
          <span>{FEAR_GREED_THRESHOLDS.extremeFear.max}</span>
          <span>{FEAR_GREED_THRESHOLDS.neutral.max}</span>
          <span>{FEAR_GREED_THRESHOLDS.greed.max}</span>
          <span>100</span>
        </div>
      </div>

      {/* Classification Badge */}
      <div className="text-center mt-6">
        <div
          className={`inline-block font-bold text-xl px-5 py-2.5 rounded-xl ${getFearGreedBgClass(data.value)} ${getFearGreedTextClass(data.value)}`}
        >
          {data.value} — {data.value_classification}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-5">
        <p className="text-xs text-gray-400 text-center mb-3 font-medium">
          {t('fearGreed.meaning')}:
        </p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] text-gray-400">
          {SENTIMENT_COLORS.map(({ color, label, range }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
              <span>{t(`fearGreed.${label}`)} ({range})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Update Time */}
      <p className="text-[11px] text-gray-600 text-center mt-4">
        {t('common.updated')}: {formatDateTime(parseInt(data.timestamp))}
      </p>
    </div>
  );
}
