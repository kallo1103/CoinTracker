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
          </div>

          {/* Column 2 - Navigation Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="/profile" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Profile
                </a>
              </li>
              <li>
                <a href="/discover" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Search className="w-4 h-4 mr-2" />
                  Discover
                </a>
              </li>
              <li>
                <a href="/docs" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
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
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Crypto Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
