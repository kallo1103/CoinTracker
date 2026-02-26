'use client';

export default function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#060010] grain-overlay transition-all pt-20">
      {children}
    </main>
  );
}
