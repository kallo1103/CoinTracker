"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { WatchlistProvider } from "@/contexts/WatchlistContext";

import { ThemeProvider } from "@/components/ThemeProvider";

// Component Provider để wrap các context providers
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <LanguageProvider>
          <WatchlistProvider>
            {children}
          </WatchlistProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
