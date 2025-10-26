'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, X } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { API_CONFIG } from '@/config/api';
import { DESIGN_TOKENS } from '@/config/design-tokens';
import { FEAR_GREED_THRESHOLDS } from '@/config/constants';
import { getSentimentColor, getFearGreedBgClass, getFearGreedTextClass } from '@/utils/theme';
import { formatDateTime } from '@/utils/formatters';

// Interface cho dữ liệu Fear & Greed Index
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

export default function FearGreedIndex() {
  const { t } = useLanguage();
  const [data, setData] = useState<FearGreedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dữ liệu Fear & Greed Index
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
    // Refresh từ config
    const interval = setInterval(fetchData, API_CONFIG.polling.hourly);
    return () => clearInterval(interval);
  }, []);

  // Note: Sử dụng utils từ theme.ts thay vì hard-code

  if (loading) {
    return (
      <div className="rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="border border-red-200 dark:border-red-800 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
        <p className="text-red-600 dark:text-red-400 flex items-center gap-2"><X className="w-4 h-4" /> {error || 'Không có dữ liệu'}</p>
      </div>
    );
  }

  return (
    <div 
      className="rounded-lg shadow border border-gray-200 dark:border-gray-900 bg-white dark:bg-slate-900"
      style={{ 
        borderRadius: DESIGN_TOKENS.borderRadius.lg,
        padding: `${DESIGN_TOKENS.spacing.scale[6]}px`
      }}
    >
      <h3 
        className="font-semibold text-gray-900 dark:text-white flex items-center"
        style={{ 
          fontSize: DESIGN_TOKENS.typography.fontSize.lg,
          marginBottom: `${DESIGN_TOKENS.spacing.scale[4]}px`,
          gap: `${DESIGN_TOKENS.spacing.scale[2]}px`
        }}
      >
        <AlertTriangle style={{ width: '20px', height: '20px' }} />
        {t('fearGreed.title')}
      </h3>
      
      {/* Gauge/Meter hiển thị */}
      <div className="relative">
        {/* Background bar - Fear & Greed gradient */}
        <div 
          className="w-full rounded-full relative overflow-hidden"
          style={{
            height: `${DESIGN_TOKENS.spacing.scale[8]}px`,
            background: `linear-gradient(to right, ${DESIGN_TOKENS.colors.sentiment.extremeFear}, ${DESIGN_TOKENS.colors.sentiment.fear}, ${DESIGN_TOKENS.colors.sentiment.neutral}, ${DESIGN_TOKENS.colors.sentiment.greed}, ${DESIGN_TOKENS.colors.sentiment.extremeGreed})`,
            borderRadius: DESIGN_TOKENS.borderRadius.full
          }}
        >
          {/* Indicator */}
          <div 
            className="absolute top-0 bottom-0 shadow-lg transition-all"
            style={{ 
              left: `${data.value}%`,
              width: '4px',
              backgroundColor: DESIGN_TOKENS.colors.brand.dark,
              transitionDuration: DESIGN_TOKENS.transition.duration.slower
            }}
          >
            <div 
              className="absolute left-1/2 -translate-x-1/2 font-bold whitespace-nowrap"
              style={{
                top: '-32px',
                backgroundColor: DESIGN_TOKENS.colors.brand.dark,
                color: DESIGN_TOKENS.colors.brand.light,
                padding: `${DESIGN_TOKENS.spacing.scale[1]}px ${DESIGN_TOKENS.spacing.scale[3]}px`,
                borderRadius: DESIGN_TOKENS.borderRadius.md,
                fontSize: DESIGN_TOKENS.typography.fontSize.sm
              }}
            >
              {data.value}
            </div>
          </div>
        </div>

        {/* Scale labels */}
        <div 
          className="flex justify-between text-gray-500 dark:text-gray-400"
          style={{ 
            marginTop: `${DESIGN_TOKENS.spacing.scale[2]}px`,
            fontSize: DESIGN_TOKENS.typography.fontSize.xs
          }}
        >
          <span>0</span>
          <span>{FEAR_GREED_THRESHOLDS.extremeFear.max}</span>
          <span>{FEAR_GREED_THRESHOLDS.neutral.max}</span>
          <span>{FEAR_GREED_THRESHOLDS.greed.max}</span>
          <span>100</span>
        </div>
      </div>

      {/* Value display */}
      <div className="text-center" style={{ marginTop: `${DESIGN_TOKENS.spacing.scale[6]}px` }}>
        <div 
          className={`inline-block font-bold ${getFearGreedBgClass(data.value)} ${getFearGreedTextClass(data.value)}`}
          style={{
            padding: `${DESIGN_TOKENS.spacing.scale[3]}px ${DESIGN_TOKENS.spacing.scale[6]}px`,
            borderRadius: DESIGN_TOKENS.borderRadius.lg,
            fontSize: DESIGN_TOKENS.typography.fontSize['2xl']
          }}
        >
          {data.value} - {data.value_classification}
        </div>
      </div>

      {/* Description */}
      <div 
        className="text-gray-600 dark:text-gray-400 text-center"
        style={{ 
          marginTop: `${DESIGN_TOKENS.spacing.scale[4]}px`,
          fontSize: DESIGN_TOKENS.typography.fontSize.sm
        }}
      >
        <p style={{ marginBottom: `${DESIGN_TOKENS.spacing.scale[2]}px` }}>
          <strong>{t('fearGreed.meaning')}:</strong>
        </p>
        <div 
          className="flex justify-around"
          style={{ fontSize: DESIGN_TOKENS.typography.fontSize.xs }}
        >
          <div>
            <span 
              className="inline-block rounded"
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: DESIGN_TOKENS.colors.sentiment.extremeFear,
                marginRight: `${DESIGN_TOKENS.spacing.scale[1]}px`
              }}
            ></span>
            <span>{t('fearGreed.extremeFear')} (0-{FEAR_GREED_THRESHOLDS.extremeFear.max})</span>
          </div>
          <div>
            <span 
              className="inline-block rounded"
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: DESIGN_TOKENS.colors.sentiment.fear,
                marginRight: `${DESIGN_TOKENS.spacing.scale[1]}px`
              }}
            ></span>
            <span>{t('fearGreed.fear')} ({FEAR_GREED_THRESHOLDS.fear.min}-{FEAR_GREED_THRESHOLDS.fear.max})</span>
          </div>
          <div>
            <span 
              className="inline-block rounded"
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: DESIGN_TOKENS.colors.sentiment.neutral,
                marginRight: `${DESIGN_TOKENS.spacing.scale[1]}px`
              }}
            ></span>
            <span>{t('fearGreed.neutral')} ({FEAR_GREED_THRESHOLDS.neutral.min}-{FEAR_GREED_THRESHOLDS.neutral.max})</span>
          </div>
          <div>
            <span 
              className="inline-block rounded"
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: DESIGN_TOKENS.colors.sentiment.greed,
                marginRight: `${DESIGN_TOKENS.spacing.scale[1]}px`
              }}
            ></span>
            <span>{t('fearGreed.greed')} ({FEAR_GREED_THRESHOLDS.greed.min}-{FEAR_GREED_THRESHOLDS.greed.max})</span>
          </div>
          <div>
            <span 
              className="inline-block rounded"
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: DESIGN_TOKENS.colors.sentiment.extremeGreed,
                marginRight: `${DESIGN_TOKENS.spacing.scale[1]}px`
              }}
            ></span>
            <span>{t('fearGreed.extremeGreed')} ({FEAR_GREED_THRESHOLDS.extremeGreed.min}-100)</span>
          </div>
        </div>
      </div>

      {/* Update time */}
      <div 
        className="text-gray-400 dark:text-gray-500 text-center"
        style={{ 
          marginTop: `${DESIGN_TOKENS.spacing.scale[4]}px`,
          fontSize: DESIGN_TOKENS.typography.fontSize.xs
        }}
      >
        {t('common.updated')}: {formatDateTime(parseInt(data.timestamp))}
      </div>
    </div>
  );
}

