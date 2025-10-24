"use client";

import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();
  const { t } = useLanguage();

  const themes = [
    { value: 'light', icon: Sun, label: t('theme.light') },
    { value: 'dark', icon: Moon, label: t('theme.dark') },
    { value: 'auto', icon: Monitor, label: t('theme.auto') }
  ] as const;

  const currentTheme = themes.find(t => t.value === theme) || themes[2];
  const CurrentIcon = currentTheme.icon;

  const handleThemeChange = () => {
    const currentIndex = themes.findIndex(t => t.value === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].value as 'light' | 'dark' | 'auto');
  };

  return (
    <button
      onClick={handleThemeChange}
      className="group relative p-2 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700/20 hover:bg-gray-700/80 transition-all duration-300 hover:scale-105"
      title={`${t('settings.theme')}: ${currentTheme.label}`}
    >
      <CurrentIcon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
      
      {/* Theme indicator */}
      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900"
           style={{
             backgroundColor: actualTheme === 'dark' ? '#1f2937' : '#f3f4f6'
           }}
      />
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        {currentTheme.label}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </button>
  );
}
