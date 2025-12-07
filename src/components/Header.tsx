'use client';

import { useNavbar } from '@/contexts/NavbarContext';
import { useLanguage } from '@/contexts/LanguageContext';
import AuthButton from '@/components/AuthButton';
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
import { getSidebarWidth } from '@/utils/responsive';

// Header Component - Navigation Bar (Sidebar)
export default function Header() {
  const { isCollapsed, toggleNavbar } = useNavbar();
  const { t } = useLanguage();

  const sidebarWidth = getSidebarWidth(isCollapsed);

  return (
    <header 
      className="fixed left-0 top-0 h-full bg-slate-900/80 dark:bg-black/60 backdrop-blur-xl border-r border-white/10 shadow-2xl z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{ width: `${sidebarWidth}px` }}
    >
      <div className="flex flex-col h-full p-4">
        {/* Logo and Toggle Button */}
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <div className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap overflow-hidden">
              Crypto Tracker
            </div>
          )}
          <button
            onClick={toggleNavbar}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            title={isCollapsed ? "Expand navbar" : "Collapse navbar"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-2 flex-1">
          <NavLink href="/app" icon={<BarChart3 size={20} />} label={t('nav.dashboard')} isCollapsed={isCollapsed} />
          <NavLink href="/search" icon={<Search size={20} />} label={t('nav.search')} isCollapsed={isCollapsed} />
          <NavLink href="/exchange" icon={<Building2 size={20} />} label={t('nav.exchange')} isCollapsed={isCollapsed} />
          <NavLink href="/docs" icon={<BookOpen size={20} />} label={t('nav.docs')} isCollapsed={isCollapsed} />
          <NavLink href="/crypto-news" icon={<Newspaper size={20} />} label={t('nav.news')} isCollapsed={isCollapsed} />
        </nav>

        {/* Bottom Controls */}
        <div className="mt-auto flex flex-col gap-6">
          {/* Language Control */}
          <div className="flex justify-center">
            <LanguageSelector />
          </div>

          {/* Auth Button */}
          <div className={`flex ${isCollapsed ? 'justify-center' : ''}`}>
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, icon, label, isCollapsed }: { href: string; icon: React.ReactNode; label: string; isCollapsed: boolean }) {
  return (
    <Link 
      href={href} 
      className={`
        flex items-center text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/5 border border-transparent rounded-xl transition-all duration-200 group
        ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3'}
      `}
      title={isCollapsed ? label : ""}
    >
      <span className={`transition-transform duration-200 ${!isCollapsed ? 'mr-3 group-hover:scale-110 group-hover:text-blue-400' : 'group-hover:scale-110 group-hover:text-blue-400'}`}>
        {icon}
      </span>
      {!isCollapsed && <span className="font-medium">{label}</span>}
    </Link>
  );
}
