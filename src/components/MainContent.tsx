'use client';

import { useNavbar } from '@/contexts/NavbarContext';
import { DESIGN_TOKENS } from '@/config/design-tokens';
import { getContentMarginLeft } from '@/utils/responsive';

// Component để sử dụng context trong main content
export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useNavbar();
  
  return (
    <main 
      className="min-h-screen bg-black transition-all"
      style={{
        marginLeft: `${getContentMarginLeft(isCollapsed)}px`,
        transitionDuration: DESIGN_TOKENS.transition.duration.slow
      }}
    >
      {children}
    </main>
  );
}
