import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";
import { NavbarProvider } from "@/contexts/NavbarContext";
import Providers from "@/components/Providers";

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
    <html lang="en">
      <body className="antialiased min-h-screen">
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
      </body>
    </html>
  );
}