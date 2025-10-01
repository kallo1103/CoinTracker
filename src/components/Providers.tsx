"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

// Component Provider để wrap các context providers
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
