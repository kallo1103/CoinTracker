'use client';

import { useNavbar } from '@/contexts/NavbarContext';

// Component để sử dụng context trong main content
export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useNavbar();
  
  return (
    <main className={`min-h-screen transition-all duration-300 ${
      isCollapsed ? 'ml-16' : 'ml-64'
    }`}>
      {children}
    </main>
  );
}
