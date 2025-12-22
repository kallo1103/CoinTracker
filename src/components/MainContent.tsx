'use client';

// Component để sử dụng context trong main content
export default function MainContent({ children }: { children: React.ReactNode }) {
  
  return (
    <main 
      className="min-h-screen bg-black transition-all pt-20"
    >
      {children}
    </main>
  );
}
