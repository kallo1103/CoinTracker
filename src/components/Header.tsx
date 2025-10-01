'use client';

import { useNavbar } from '@/contexts/NavbarContext';
import AuthButton from '@/components/AuthButton';
import Link from 'next/link';

// Header Component - Navigation Bar dọc bên trái với toggle button
export default function Header() {
  const { isCollapsed, toggleNavbar } = useNavbar();

  return (
    <header className={`fixed left-0 top-0 h-full bg-gray-900 shadow-lg z-50 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-6">
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
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          <Link 
            href="/" 
            className={`flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? "Dashboard" : ""}
          >
            <span className={isCollapsed ? '' : 'mr-3'}>📊</span>
            {!isCollapsed && "Dashboard"}
          </Link>
          
          <Link 
            href="/discover" 
            className={`flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? "Discover" : ""}
          >
            <span className={isCollapsed ? '' : 'mr-3'}>🔍</span>
            {!isCollapsed && "Discover"}
          </Link>
          
          <Link 
            href="/verification" 
            className={`flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? "Verification" : ""}
          >
            <span className={isCollapsed ? '' : 'mr-3'}>✅</span>
            {!isCollapsed && "Verification"}
          </Link>
          
          <Link 
            href="/docs" 
            className={`flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? "Docs" : ""}
          >
            <span className={isCollapsed ? '' : 'mr-3'}>📚</span>
            {!isCollapsed && "Docs"}
          </Link>
        </nav>

        {/* Auth Button - Sign In/Sign Out */}
        <div className="absolute bottom-6 left-0 right-0 px-6">
          <div className={`${isCollapsed ? 'flex justify-center' : ''}`}>
            {!isCollapsed && <AuthButton />}
            {isCollapsed && (
              <div className="text-center">
                <AuthButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
