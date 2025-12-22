"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import AuthButton from "@/components/AuthButton";
import {
  BarChart3,
  Search,
  Building2,
  BookOpen,
  Newspaper,
  Menu,
  X,
  Users,
  Bell,
  StickyNote,
  CreditCard,
  Heart,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Core navigation items - always visible on desktop
  const primaryLinks = [
    { href: "/app", icon: <BarChart3 size={18} />, label: t('nav.dashboard') },
    { href: "/portfolio", icon: <CreditCard size={18} />, label: "Portfolio" },
    { href: "/search", icon: <Search size={18} />, label: t('nav.search') },
    { href: "/exchange", icon: <Building2 size={18} />, label: t('nav.exchange') },
  ];

  // Secondary items - grouped in "More" dropdown on desktop
  const secondaryLinks = [
    { href: "/crypto-news", icon: <Newspaper size={18} />, label: t('nav.news') },
    { href: "/community", icon: <Users size={18} />, label: "Community" },
    { href: "/alerts", icon: <Bell size={18} />, label: "Alerts" },
    { href: "/portfolio/transactions", icon: <BookOpen size={18} />, label: "Ledger" },
    { href: "/watchlist", icon: <Heart size={18} />, label: "Watchlist" },
    { href: "/notes", icon: <StickyNote size={18} />, label: "Notes" },
    { href: "/docs", icon: <BookOpen size={18} />, label: t('nav.docs') },
  ];

  const allLinks = [...primaryLinks, ...secondaryLinks];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 h-16">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50 mr-8">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Crypto Tracker
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {primaryLinks.map((link) => (
              <DesktopNavLink key={link.href} {...link} isActive={pathname === link.href} />
            ))}

            {/* More Dropdown */}
            <div className="relative group ml-1">
              <button className="flex items-center gap-1 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
                <span>More</span>
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left translate-y-2 group-hover:translate-y-0">
                <div className="p-1.5 flex flex-col gap-0.5">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                        ${pathname === link.href 
                          ? "bg-blue-600/10 text-blue-400" 
                          : "text-gray-400 hover:text-white hover:bg-white/10"
                        }
                      `}
                    >
                      {link.icon}
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <AuthButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-gray-900 border-b border-white/10 overflow-hidden absolute w-full"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <nav className="grid grid-cols-2 gap-2">
                {allLinks.map((link) => (
                  <MobileNavLink 
                    key={link.href} 
                    {...link} 
                    isActive={pathname === link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </nav>
              <div className="border-t border-white/10 pt-4 flex flex-col gap-4">
                <div className="flex justify-center">
                   <AuthButton />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DesktopNavLink({ href, icon, label, isActive }: { href: string; icon: React.ReactNode; label: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${isActive 
          ? "bg-blue-600/10 text-blue-400" 
          : "text-gray-400 hover:text-white hover:bg-white/5"
        }
      `}
    >
      <span>{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  );
}

function MobileNavLink({ href, icon, label, isActive, onClick }: { href: string; icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center gap-3 p-3 rounded-xl transition-all duration-200
        ${isActive 
          ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" 
          : "bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white"
        }
      `}
    >
      <span className={isActive ? "text-blue-400" : "text-gray-500"}>{icon}</span>
      <span className="font-medium truncate">{label}</span>
    </Link>
  );
}
