'use client';

import { useNavbar } from '@/contexts/NavbarContext';
import { useLanguage } from '@/contexts/LanguageContext';
import AuthButton from '@/components/AuthButton';
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

// Header Component - Navigation Bar dọc bên trái với toggle button
export default function Header() {
  const { isCollapsed, toggleNavbar } = useNavbar();
  const { t } = useLanguage();

  return (
    <header className={`fixed left-0 top-0 h-full bg-gray-900 shadow-lg z-50 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4">
        {/* Logo and Toggle Button */}
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <div className="text-2xl font-bold text-white">
              Crypto Tracker
            </div>
          )}
          <button
            onClick={toggleNavbar}
            className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
            title={isCollapsed ? "Expand navbar" : "Collapse navbar"}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          <Link 
            href="/" 
            className={`flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? t('nav.dashboard') : ""}
          >
            <BarChart3 className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
            {!isCollapsed && t('nav.dashboard')}
          </Link>
          
          <Link 
            href="/search" 
            className={`flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? t('nav.search') : ""}
          >
            <Search className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
            {!isCollapsed && t('nav.search')}
          </Link>
          
          <Link 
            href="/exchange" 
            className={`flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? t('nav.exchange') : ""}
          >
            <Building2 className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
            {!isCollapsed && t('nav.exchange')}
          </Link>
          
          <Link 
            href="/docs" 
            className={`flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? t('nav.docs') : ""}
          >
            <BookOpen className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
            {!isCollapsed && t('nav.docs')}
          </Link>

          <Link 
            href="/crypto-news" 
            className={`flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? t('nav.news') : ""}
          >
            <Newspaper className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
            {!isCollapsed && t('nav.news')}
          </Link>
        </nav>

        {/* Auth Button - Sign In/Sign Out */}
        <div className={`absolute bottom-6 left-0 right-0 ${
          isCollapsed ? 'px-1' : 'px-6'
        }`}>
          <div className={`${isCollapsed ? 'flex justify-center' : ''}`}>
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
}
