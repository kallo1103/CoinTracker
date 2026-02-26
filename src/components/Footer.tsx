'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import {
  BarChart3,
  Search,
  Building2,
  Newspaper,
  BookOpen,
  User,
  Settings,
  TrendingUp,
  HelpCircle,
  FileText,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Zap
} from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative mt-auto border-t border-white/[0.06]">
      {/* Subtle gradient glow at top */}
      <div className="absolute top-0 left-0 right-0 neon-line opacity-30" />

      {/* Background with blur */}
      <div className="bg-black/60 backdrop-blur-2xl">
        <div className="container mx-auto px-6 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Zap className="w-3.5 h-3.5 text-white fill-white" />
                </div>
                <span className="font-bold text-lg tracking-tight">
                  <span className="text-white">Crypto</span>{' '}
                  <span className="text-indigo-400">Tracker</span>
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                {t('footer.description')}
              </p>
              <div className="flex gap-2">
                {[
                  { href: "https://github.com", icon: <Github size={16} />, label: "GitHub" },
                  { href: "https://twitter.com", icon: <Twitter size={16} />, label: "Twitter" },
                  { href: "https://linkedin.com", icon: <Linkedin size={16} />, label: "LinkedIn" }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white p-2.5 hover:bg-white/[0.06] rounded-xl transition-all duration-200"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
                {t('footer.navigation')}
              </h3>
              <ul className="flex flex-col gap-2.5">
                <FooterLink href="/app" icon={<BarChart3 size={14} />} label={t('footer.dashboard')} />
                <FooterLink href="/search" icon={<Search size={14} />} label={t('footer.search')} />
                <FooterLink href="/exchange" icon={<Building2 size={14} />} label={t('footer.exchange')} />
                <FooterLink href="/crypto-news" icon={<Newspaper size={14} />} label={t('footer.news')} />
                <FooterLink href="/docs" icon={<BookOpen size={14} />} label={t('footer.docs')} />
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
                {t('footer.resources')}
              </h3>
              <ul className="flex flex-col gap-2.5">
                <FooterLink href="/profile" icon={<User size={14} />} label={t('footer.profile')} />
                <FooterLink href="/profile/settings" icon={<Settings size={14} />} label={t('footer.settings')} />
                <FooterLink href="/profile/statistics" icon={<TrendingUp size={14} />} label={t('footer.statistics')} />
                <FooterLink href="/docs" icon={<FileText size={14} />} label={t('footer.api')} />
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
                {t('footer.support')}
              </h3>
              <ul className="flex flex-col gap-2.5 mb-6">
                <FooterLink href="/docs" icon={<HelpCircle size={14} />} label={t('footer.help')} />
                <FooterLink href="/docs" icon={<FileText size={14} />} label={t('footer.faq')} />
                <FooterLink href="mailto:info@cryptotracker.com" icon={<Mail size={14} />} label={t('footer.contact')} />
              </ul>

              <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 mt-6">
                {t('footer.legal')}
              </h3>
              <ul className="flex flex-col gap-2.5">
                <FooterLink href="/docs" label={t('footer.privacy')} />
                <FooterLink href="/docs" label={t('footer.terms')} />
                <FooterLink href="/docs" label={t('footer.about')} />
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/[0.06] text-center mt-10 pt-6">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} {t('footer.title')}. {t('footer.allRightsReserved')}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  icon,
  label
}: {
  href: string;
  icon?: React.ReactNode;
  label: string;
}) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:');
  const className = "text-gray-500 hover:text-gray-200 transition-colors duration-200 flex items-center gap-2 group text-sm";

  if (isExternal) {
    return (
      <li>
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {icon && <span className="group-hover:scale-110 transition-transform">{icon}</span>}
          <span>{label}</span>
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link href={href} className={className}>
        {icon && <span className="group-hover:scale-110 transition-transform">{icon}</span>}
        <span>{label}</span>
      </Link>
    </li>
  );
}
