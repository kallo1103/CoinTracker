import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";
import { NavbarProvider } from "@/contexts/NavbarContext";
import Providers from "@/components/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        {/* Script để load theme trước khi React hydrate - tránh flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'auto';
                  var actualTheme = theme;
                  
                  if (theme === 'auto') {
                    actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(actualTheme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
        <Providers>
          <NavbarProvider>
            {/* Navigation Bar dọc bên trái */}
            <Header />
            
            {/* Main Content với margin-left để tránh navigation bar */}
            <MainContent>
              {children}
            </MainContent>
            
            {/* Footer - Footer */}
            <Footer />
          </NavbarProvider>
        </Providers>
        {/* Vercel Speed Insights - theo dõi hiệu suất ứng dụng */}
        <SpeedInsights />
      </body>
    </html>
  );
}