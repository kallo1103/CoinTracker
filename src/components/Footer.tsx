'use client';

import { useNavbar } from '@/contexts/NavbarContext';
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
  Linkedin
} from "lucide-react";
import { DESIGN_TOKENS } from '@/config/design-tokens';
import { getContentMarginLeft } from '@/utils/responsive';

export default function Footer() {
  const { isCollapsed } = useNavbar();
  const { t } = useLanguage();
  
  return (
    <footer 
      className="bg-black backdrop-blur-xl text-white mt-auto transition-all border-t border-white/10"
      style={{
        marginLeft: `${getContentMarginLeft(isCollapsed)}px`,
        transitionDuration: DESIGN_TOKENS.transition.duration.slow
      }}
    >
      <div 
        className="container mx-auto"
        style={{
          padding: `${DESIGN_TOKENS.spacing.scale[10]}px ${DESIGN_TOKENS.spacing.scale[6]}px ${DESIGN_TOKENS.spacing.scale[8]}px`
        }}
      >
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {/* Column 1 - Brand & Description */}
          <div className="lg:col-span-1">
            <h3 
              className="font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              style={{
                fontSize: DESIGN_TOKENS.typography.fontSize['2xl'],
                marginBottom: `${DESIGN_TOKENS.spacing.scale[4]}px`
              }}
            >
              {t('footer.title')}
            </h3>
            <p 
              className="text-muted-foreground text-sm leading-relaxed"
              style={{
                marginBottom: `${DESIGN_TOKENS.spacing.scale[4]}px`
              }}
            >
              {t('footer.description')}
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h3 
              className="font-semibold text-foreground mb-4"
              style={{
                fontSize: DESIGN_TOKENS.typography.fontSize.lg,
                marginBottom: `${DESIGN_TOKENS.spacing.scale[4]}px`
              }}
            >
              {t('footer.navigation')}
            </h3>
            <ul 
              className="flex flex-col gap-2"
            >
              <FooterLink href="/app" icon={<BarChart3 size={16} />} label={t('footer.dashboard')} />
              <FooterLink href="/search" icon={<Search size={16} />} label={t('footer.search')} />
              <FooterLink href="/exchange" icon={<Building2 size={16} />} label={t('footer.exchange')} />
              <FooterLink href="/crypto-news" icon={<Newspaper size={16} />} label={t('footer.news')} />
              <FooterLink href="/docs" icon={<BookOpen size={16} />} label={t('footer.docs')} />
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h3 
              className="font-semibold text-foreground mb-4"
              style={{
                fontSize: DESIGN_TOKENS.typography.fontSize.lg,
                marginBottom: `${DESIGN_TOKENS.spacing.scale[4]}px`
              }}
            >
              {t('footer.resources')}
            </h3>
            <ul 
              className="flex flex-col gap-2"
            >
              <FooterLink href="/profile" icon={<User size={16} />} label={t('footer.profile')} />
              <FooterLink href="/profile/settings" icon={<Settings size={16} />} label={t('footer.settings')} />
              <FooterLink href="/profile/statistics" icon={<TrendingUp size={16} />} label={t('footer.statistics')} />
              <FooterLink href="/docs" icon={<FileText size={16} />} label={t('footer.api')} />
            </ul>
          </div>

          {/* Column 4 - Support & Legal */}
          <div>
            <h3 
              className="font-semibold text-foreground mb-4"
              style={{
                fontSize: DESIGN_TOKENS.typography.fontSize.lg,
                marginBottom: `${DESIGN_TOKENS.spacing.scale[4]}px`
              }}
            >
              {t('footer.support')}
            </h3>
            <ul 
              className="flex flex-col gap-2 mb-6"
            >
              <FooterLink href="/docs" icon={<HelpCircle size={16} />} label={t('footer.help')} />
              <FooterLink href="/docs" icon={<FileText size={16} />} label={t('footer.faq')} />
              <FooterLink href="mailto:info@cryptotracker.com" icon={<Mail size={16} />} label={t('footer.contact')} />
            </ul>
            
            <h3 
              className="font-semibold text-foreground mb-4"
              style={{
                fontSize: DESIGN_TOKENS.typography.fontSize.lg,
                marginBottom: `${DESIGN_TOKENS.spacing.scale[4]}px`,
                marginTop: `${DESIGN_TOKENS.spacing.scale[6]}px`
              }}
            >
              {t('footer.legal')}
            </h3>
            <ul 
              className="flex flex-col gap-2"
            >
              <FooterLink href="/docs" label={t('footer.privacy')} />
              <FooterLink href="/docs" label={t('footer.terms')} />
              <FooterLink href="/docs" label={t('footer.about')} />
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div 
          className="border-t border-white/10 text-center text-gray-400 mt-8 pt-6"
          style={{
            marginTop: `${DESIGN_TOKENS.spacing.scale[8]}px`,
            paddingTop: `${DESIGN_TOKENS.spacing.scale[6]}px`
          }}
        >
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {t('footer.title')}. {t('footer.allRightsReserved')}.
          </p>
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
  
  const linkClassName = "text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm";

  if (isExternal) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {icon && (
            <span className="group-hover:scale-110 transition-transform">
              {icon}
            </span>
          )}
          <span>{label}</span>
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={href}
        className={linkClassName}
      >
        {icon && (
          <span className="group-hover:scale-110 transition-transform">
            {icon}
          </span>
        )}
        <span>{label}</span>
      </Link>
    </li>
  );
}
