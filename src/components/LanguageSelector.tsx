"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { value: 'vi', label: t('language.vietnamese'), flag: '🇻🇳', abbr: 'VI' },
    { value: 'en', label: t('language.english'), flag: '🇺🇸', abbr: 'EN' }
  ] as const;

  const currentLanguage = languages.find(lang => lang.value === language) || languages[0];

  const handleToggleLanguage = () => {
    const newLanguage = language === 'vi' ? 'en' : 'vi';
    setLanguage(newLanguage);
  };

  return (
    <button
      onClick={handleToggleLanguage}
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
  );
}
