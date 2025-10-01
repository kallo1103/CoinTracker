'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Context type definition
interface NavbarContextType {
  isCollapsed: boolean;
  toggleNavbar: () => void;
}

// Create context
const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

// Provider component
export function NavbarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <NavbarContext.Provider value={{ isCollapsed, toggleNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
}

// Hook to use context
export function useNavbar() {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
}
