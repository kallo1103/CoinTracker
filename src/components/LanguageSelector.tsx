"use client";

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Check } from 'lucide-react';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { value: 'vi', label: t('language.vietnamese'), flag: '🇻🇳', abbr: 'VI' },
    { value: 'en', label: t('language.english'), flag: '🇺🇸', abbr: 'EN' }
  ] as const;

  const currentLanguage = languages.find(lang => lang.value === language) || languages[0];

  const handleLanguageChange = (newLanguage: 'vi' | 'en') => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-105"
        title={t('settings.language')}
      >
        <span className="text-lg">
          {currentLanguage.flag}
        </span>
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          {currentLanguage.abbr}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-300/20 dark:border-gray-700/20 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-2">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => handleLanguageChange(lang.value as 'vi' | 'en')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    language === lang.value
                      ? 'bg-gray-900/10 dark:bg-white/10 text-gray-900 dark:text-white font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.label}</span>
                  </div>
                  {language === lang.value && (
                    <Check className="w-4 h-4 text-gray-900 dark:text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
