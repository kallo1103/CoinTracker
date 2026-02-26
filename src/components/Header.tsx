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
  ChevronDown,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const primaryLinks = [
    { href: "/app", icon: <BarChart3 size={18} />, label: t('nav.dashboard') },
    { href: "/portfolio", icon: <CreditCard size={18} />, label: "Portfolio" },
    { href: "/search", icon: <Search size={18} />, label: t('nav.search') },
    { href: "/exchange", icon: <Building2 size={18} />, label: t('nav.exchange') },
  ];

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
    <header className="fixed top-0 left-0 right-0 z-50 h-16">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl border-b border-white/[0.06]" />

      {/* Subtle gradient accent along bottom border */}
      <div className="absolute bottom-0 left-0 right-0 neon-line opacity-40" />

      <div className="relative container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 z-50 mr-8 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow duration-300">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Crypto</span>{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Tracker</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {primaryLinks.map((link) => (
              <DesktopNavLink key={link.href} {...link} isActive={pathname === link.href} />
            ))}

            {/* More Dropdown */}
            <div className="relative group ml-1">
              <button className="flex items-center gap-1.5 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-xl text-sm font-medium transition-all duration-200">
                <span>More</span>
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>

              <div className="absolute top-full left-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left translate-y-3 group-hover:translate-y-0">
                <div className="p-1.5 flex flex-col gap-0.5">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200
                        ${pathname === link.href
                          ? "bg-indigo-500/10 text-indigo-400"
                          : "text-gray-400 hover:text-white hover:bg-white/[0.06]"
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

          {/* Auth */}
          <div className="hidden lg:flex items-center gap-4">
            <AuthButton />
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-all duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-gray-950/95 backdrop-blur-2xl border-b border-white/[0.06] overflow-hidden absolute w-full"
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
              <div className="border-t border-white/[0.06] pt-4 flex flex-col gap-4">
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
        relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200
        ${isActive
          ? "bg-indigo-500/10 text-indigo-400"
          : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
        }
      `}
    >
      <span>{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
      {isActive && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute -bottom-[17px] left-3 right-3 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
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
          ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20"
          : "bg-white/[0.03] text-gray-400 hover:bg-white/[0.06] hover:text-white border border-transparent"
        }
      `}
    >
      <span className={isActive ? "text-indigo-400" : "text-gray-500"}>{icon}</span>
      <span className="font-medium truncate">{label}</span>
    </Link>
  );
}
