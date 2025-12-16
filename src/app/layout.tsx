import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { NavbarProvider } from "@/contexts/NavbarContext";
import Providers from "@/components/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: "Crypto Tracker",
  description: "Nền tảng theo dõi giá cryptocurrency thời gian thực",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Dùng favicon từ thư mục public - hỗ trợ SVG và ICO */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body className="antialiased min-h-screen text-white">
        <Providers>
          <NavbarProvider>
            <ErrorBoundary>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </ErrorBoundary>
          </NavbarProvider>
        </Providers>
        {/* Vercel Speed Insights - theo dõi hiệu suất ứng dụng */}
        <SpeedInsights />
      </body>
    </html>
  );
}