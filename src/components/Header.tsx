'use client';

import { useNavbar } from '@/contexts/NavbarContext';
import { useLanguage } from '@/contexts/LanguageContext';
import AuthButton from '@/components/AuthButton';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import Link from 'next/link';
import { 
  ChevronRight, 
  ChevronLeft, 
  BarChart3, 
  Search, 
  Building2, 
  BookOpen, 
  Newspaper 
} from "lucide-react";
import { DESIGN_TOKENS } from '@/config/design-tokens';
import { getSidebarWidth } from '@/utils/responsive';

// Header Component - Navigation Bar dọc bên trái với toggle button
export default function Header() {
  const { isCollapsed, toggleNavbar } = useNavbar();
  const { t } = useLanguage();

  return (
    <header 
      className="fixed left-0 top-0 h-full bg-gray-100 dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-800 transition-all"
      style={{
        width: `${getSidebarWidth(isCollapsed)}px`,
        transitionDuration: DESIGN_TOKENS.transition.duration.slow,
        zIndex: DESIGN_TOKENS.zIndex.fixed
      }}
    >
      <div style={{ padding: `${DESIGN_TOKENS.spacing.scale[4]}px` }}>
        {/* Logo and Toggle Button */}
        <div 
          className="flex items-center justify-between"
          style={{ marginBottom: `${DESIGN_TOKENS.spacing.scale[8]}px` }}
        >
          {!isCollapsed && (
            <div 
              className="font-bold text-gray-900 dark:text-white"
              style={{ fontSize: DESIGN_TOKENS.typography.fontSize['2xl'] }}
            >
              Crypto Tracker
            </div>
          )}
          <button
            onClick={toggleNavbar}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
            style={{
              padding: `${DESIGN_TOKENS.spacing.scale[2]}px`,
              borderRadius: DESIGN_TOKENS.borderRadius.lg,
              transitionDuration: DESIGN_TOKENS.transition.duration.base
            }}
            title={isCollapsed ? "Expand navbar" : "Collapse navbar"}
          >
            {isCollapsed ? <ChevronRight style={{ width: '20px', height: '20px' }} /> : <ChevronLeft style={{ width: '20px', height: '20px' }} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: `${DESIGN_TOKENS.spacing.scale[2]}px` }}>
          <Link 
            href="/" 
            className={`flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            style={{
              padding: `${DESIGN_TOKENS.spacing.scale[3]}px ${DESIGN_TOKENS.spacing.scale[4]}px`,
              borderRadius: DESIGN_TOKENS.borderRadius.lg,
              transitionDuration: DESIGN_TOKENS.transition.duration.base
            }}
            title={isCollapsed ? t('nav.dashboard') : ""}
          >
            <BarChart3 
              style={{ 
                width: '20px', 
                height: '20px',
                marginRight: isCollapsed ? '0' : `${DESIGN_TOKENS.spacing.scale[3]}px`
              }} 
            />
            {!isCollapsed && t('nav.dashboard')}
          </Link>
          
          <Link 
            href="/search" 
            className={`flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            style={{
              padding: `${DESIGN_TOKENS.spacing.scale[3]}px ${DESIGN_TOKENS.spacing.scale[4]}px`,
              borderRadius: DESIGN_TOKENS.borderRadius.lg,
              transitionDuration: DESIGN_TOKENS.transition.duration.base
            }}
            title={isCollapsed ? t('nav.search') : ""}
          >
            <Search 
              style={{ 
                width: '20px', 
                height: '20px',
                marginRight: isCollapsed ? '0' : `${DESIGN_TOKENS.spacing.scale[3]}px`
              }} 
            />
            {!isCollapsed && t('nav.search')}
          </Link>
          
          <Link 
            href="/exchange" 
            className={`flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            style={{
              padding: `${DESIGN_TOKENS.spacing.scale[3]}px ${DESIGN_TOKENS.spacing.scale[4]}px`,
              borderRadius: DESIGN_TOKENS.borderRadius.lg,
              transitionDuration: DESIGN_TOKENS.transition.duration.base
            }}
            title={isCollapsed ? t('nav.exchange') : ""}
          >
            <Building2 
              style={{ 
                width: '20px', 
                height: '20px',
                marginRight: isCollapsed ? '0' : `${DESIGN_TOKENS.spacing.scale[3]}px`
              }} 
            />
            {!isCollapsed && t('nav.exchange')}
          </Link>
          
          <Link 
            href="/docs" 
            className={`flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            style={{
              padding: `${DESIGN_TOKENS.spacing.scale[3]}px ${DESIGN_TOKENS.spacing.scale[4]}px`,
              borderRadius: DESIGN_TOKENS.borderRadius.lg,
              transitionDuration: DESIGN_TOKENS.transition.duration.base
            }}
            title={isCollapsed ? t('nav.docs') : ""}
          >
            <BookOpen 
              style={{ 
                width: '20px', 
                height: '20px',
                marginRight: isCollapsed ? '0' : `${DESIGN_TOKENS.spacing.scale[3]}px`
              }} 
            />
            {!isCollapsed && t('nav.docs')}
          </Link>

          <Link 
            href="/crypto-news" 
            className={`flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            style={{
              padding: `${DESIGN_TOKENS.spacing.scale[3]}px ${DESIGN_TOKENS.spacing.scale[4]}px`,
              borderRadius: DESIGN_TOKENS.borderRadius.lg,
              transitionDuration: DESIGN_TOKENS.transition.duration.base
            }}
            title={isCollapsed ? t('nav.news') : ""}
          >
            <Newspaper 
              style={{ 
                width: '20px', 
                height: '20px',
                marginRight: isCollapsed ? '0' : `${DESIGN_TOKENS.spacing.scale[3]}px`
              }} 
            />
            {!isCollapsed && t('nav.news')}
          </Link>
        </nav>

        {/* Theme & Language Controls - phía trên Auth Button */}
        <div 
          className="absolute left-0 right-0"
          style={{
            bottom: '96px',
            paddingLeft: isCollapsed ? `${DESIGN_TOKENS.spacing.scale[2]}px` : `${DESIGN_TOKENS.spacing.scale[6]}px`,
            paddingRight: isCollapsed ? `${DESIGN_TOKENS.spacing.scale[2]}px` : `${DESIGN_TOKENS.spacing.scale[6]}px`
          }}
        >
          <div 
            className={`flex ${
              isCollapsed ? 'flex-col items-center' : 'flex-row justify-center'
            }`}
            style={{ gap: `${DESIGN_TOKENS.spacing.scale[2]}px` }}
          >
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>

        {/* Auth Button - Sign In/Sign Out */}
        <div 
          className="absolute left-0 right-0"
          style={{
            bottom: `${DESIGN_TOKENS.spacing.scale[6]}px`,
            paddingLeft: isCollapsed ? `${DESIGN_TOKENS.spacing.scale[1]}px` : `${DESIGN_TOKENS.spacing.scale[6]}px`,
            paddingRight: isCollapsed ? `${DESIGN_TOKENS.spacing.scale[1]}px` : `${DESIGN_TOKENS.spacing.scale[6]}px`
          }}
        >
          <div className={`${isCollapsed ? 'flex justify-center' : ''}`}>
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
}
