"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
