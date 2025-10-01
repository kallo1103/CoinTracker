'use client';

import { useNavbar } from '@/contexts/NavbarContext';

// Footer Component - Phù hợp với navigation bar dọc
export default function Footer() {
  const { isCollapsed } = useNavbar();
  
  return (
    <footer className={`bg-gray-900 text-white mt-auto transition-all duration-300 ${
      isCollapsed ? 'ml-16' : 'ml-64'
    }`}>
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Crypto Tracker</h3>
            <p className="text-gray-400">
              Real-time cryptocurrency price tracking platform, 
              providing accurate and up-to-date information on prices, 
              market capitalization, and trends of top cryptocurrencies.
            </p>
          </div>

          {/* Column 2 - Navigation Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="/dashboard" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">📊</span>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/discover" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">🔍</span>
                  Discover
                </a>
              </li>
              <li>
                <a href="/verification" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">✅</span>
                  Verification
                </a>
              </li>
              <li>
                <a href="/docs" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">📚</span>
                  Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Support Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/api" className="text-gray-400 hover:text-white transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                info@cryptotracker.com
              </li>
              <li className="flex items-center">
                <span className="mr-2">📱</span>
                +84 123 456 789
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                Hanoi, Vietnam
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Crypto Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
