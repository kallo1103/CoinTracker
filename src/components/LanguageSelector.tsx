"use client";

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Check } from 'lucide-react';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { value: 'vi', label: t('language.vietnamese'), flag: '🇻🇳' },
    { value: 'en', label: t('language.english'), flag: '🇺🇸' }
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
        className="group flex items-center gap-2 p-2 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700/20 hover:bg-gray-700/80 transition-all duration-300 hover:scale-105"
        title={t('settings.language')}
      >
        <Globe className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
          {currentLanguage.flag}
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
          <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm border border-gray-700/20 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-2">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => handleLanguageChange(lang.value as 'vi' | 'en')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    language === lang.value
                      ? 'bg-blue-600/20 text-blue-300'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.label}</span>
                  </div>
                  {language === lang.value && (
                    <Check className="w-4 h-4 text-blue-400" />
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
