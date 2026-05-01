import type { Metadata } from "next";
import { Outfit, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AppointmentProvider } from "@/components/providers/AppointmentProvider";
import Navbar from "@/components/layout/Navbar";
import GlobalUI from "@/components/layout/GlobalUI";
import { DownloadProvider } from "@/components/providers/DownloadProvider";
import SiteVisitTracker from "@/components/ui/SiteVisitTracker";

export const metadata: Metadata = {
  title: 'Hayat Life Care - One Stop Healthcare & Lifestyle Destination | Chattogram',
  description: 'Hayat Life Care is Chattogram\'s premier healthcare and lifestyle complex offering 11 business wings including doctor chambers, diagnostic center, pharmacy, restaurant, super shop, and more. Invest in healthcare future with shares at 10 Lacs BDT.',
  keywords: ['Hayat Life Care', 'healthcare Chattogram', 'hospital Chattogram', 'diagnostic center', 'doctor chamber', 'investment Bangladesh', 'healthcare complex'],
  openGraph: {
    title: 'Hayat Life Care - One Stop Healthcare & Lifestyle Destination',
    description: '11 business wings under one roof. Premium healthcare, daily essentials, dining & entertainment in Chattogram.',
    type: 'website',
    locale: 'en_BD',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Hayat Life Care Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hayat Life Care - One Stop Healthcare & Lifestyle Destination',
    description: '11 business wings under one roof. Premium healthcare, daily essentials, dining & entertainment in Chattogram.',
    images: ['/images/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AppointmentProvider>
            <DownloadProvider>
              <SiteVisitTracker />
              <Navbar />
              {children}
              <GlobalUI />
              <Toaster richColors position="top-right" />
            </DownloadProvider>
          </AppointmentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
