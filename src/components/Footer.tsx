'use client';

import { useNavbar } from '@/contexts/NavbarContext';
import { 
  BarChart3, 
  Search, 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";
import { DESIGN_TOKENS } from '@/config/design-tokens';
import { getContentMarginLeft } from '@/utils/responsive';

// Footer Component - Phù hợp với navigation bar dọc
export default function Footer() {
  const { isCollapsed } = useNavbar();
  
  return (
    <footer 
      className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white mt-auto transition-all border-t border-gray-200 dark:border-gray-800"
      style={{
        marginLeft: `${getContentMarginLeft(isCollapsed)}px`,
        transitionDuration: DESIGN_TOKENS.transition.duration.slow
      }}
    >
      <div 
        className="container mx-auto"
        style={{
          padding: `${DESIGN_TOKENS.spacing.scale[8]}px ${DESIGN_TOKENS.spacing.scale[6]}px`
        }}
      >
        <div 
          className="grid grid-cols-1 md:grid-cols-4"
          style={{ gap: `${DESIGN_TOKENS.spacing.scale[8]}px` }}
        >
          {/* Column 1 - Information */}
          <div>
            <h3 
              className="font-bold text-gray-900 dark:text-white"
              style={{
                fontSize: DESIGN_TOKENS.typography.fontSize.xl,
                marginBottom: `${DESIGN_TOKENS.spacing.scale[4]}px`
              }}
            >
              Crypto Tracker
            </h3>
          </div>

          {/* Column 2 - Navigation Links */}
          <div>
            <h3 
              className="font-bold text-gray-900 dark:text-white"
              style={{
                fontSize: DESIGN_TOKENS.typography.fontSize.xl,
                marginBottom: `${DESIGN_TOKENS.spacing.scale[4]}px`
              }}
            >
              Navigation
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: `${DESIGN_TOKENS.spacing.scale[2]}px` }}>
              <li>
                <a href="/profile" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Profile
                </a>
              </li>
              <li>
                <a href="/discover" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center">
                  <Search className="w-4 h-4 mr-2" />
                  Discover
                </a>
              </li>
              <li>
                <a href="/docs" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Support Links */}
          <div>
            <h3 
              className="font-bold text-gray-900 dark:text-white"
              style={{
                fontSize: DESIGN_TOKENS.typography.fontSize.xl,
                marginBottom: `${DESIGN_TOKENS.spacing.scale[4]}px`
              }}
            >
              Support
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: `${DESIGN_TOKENS.spacing.scale[2]}px` }}>
              <li>
                <a href="/help" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/api" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h3 
              className="font-bold text-gray-900 dark:text-white"
              style={{
                fontSize: DESIGN_TOKENS.typography.fontSize.xl,
                marginBottom: `${DESIGN_TOKENS.spacing.scale[4]}px`
              }}
            >
              Contact
            </h3>
            <ul 
              className="text-gray-600 dark:text-gray-400"
              style={{ display: 'flex', flexDirection: 'column', gap: `${DESIGN_TOKENS.spacing.scale[2]}px` }}
            >
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                info@cryptotracker.com
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                +84 123 456 789
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Hanoi, Vietnam
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div 
          className="border-t border-gray-300 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400"
          style={{
            marginTop: `${DESIGN_TOKENS.spacing.scale[8]}px`,
            paddingTop: `${DESIGN_TOKENS.spacing.scale[6]}px`
          }}
        >
          <p>&copy; {new Date().getFullYear()} Crypto Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
