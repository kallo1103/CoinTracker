"use client";

import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sun, Moon, Monitor } from 'lucide-react';
import { DESIGN_TOKENS } from '@/config/design-tokens';

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
      className="group relative backdrop-blur-sm bg-white/10 dark:bg-gray-800/80 border border-gray-300/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-700/80 transition-all hover:scale-105"
      style={{
        padding: `${DESIGN_TOKENS.spacing.scale[2]}px`,
        borderRadius: DESIGN_TOKENS.borderRadius.xl,
        transitionDuration: DESIGN_TOKENS.transition.duration.slow
      }}
      title={`${t('settings.theme')}: ${currentTheme.label}`}
    >
      <CurrentIcon 
        className="text-gray-800 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
        style={{
          width: '20px',
          height: '20px'
        }}
      />
      
      {/* Theme indicator */}
      <div 
        className="absolute rounded-full border-2 border-white dark:border-gray-900"
        style={{
          top: '-4px',
          right: '-4px',
          width: '12px',
          height: '12px',
          borderRadius: DESIGN_TOKENS.borderRadius.full,
          backgroundColor: actualTheme === 'dark' ? DESIGN_TOKENS.colors.brand.dark : DESIGN_TOKENS.colors.brand.light
        }}
      />
      
      {/* Tooltip */}
      <div 
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
        style={{
          marginBottom: `${DESIGN_TOKENS.spacing.scale[2]}px`,
          padding: `${DESIGN_TOKENS.spacing.scale[1]}px ${DESIGN_TOKENS.spacing.scale[3]}px`,
          fontSize: DESIGN_TOKENS.typography.fontSize.sm,
          borderRadius: DESIGN_TOKENS.borderRadius.lg,
          transitionDuration: DESIGN_TOKENS.transition.duration.base,
          zIndex: DESIGN_TOKENS.zIndex.tooltip
        }}
      >
        {currentTheme.label}
        <div 
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-white"
        ></div>
      </div>
    </button>
  );
}
