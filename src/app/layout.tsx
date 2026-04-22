import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: 'Hayat Life Care - One Stop Service for Healthcare & Daily Essentials | Chattogram',
  description: 'Hayat Life Care is Chattogram\'s premier healthcare & lifestyle complex offering 11 business wings including Doctor\'s Chambers, Diagnostic Center, Pharmacy, Super Shop, Restaurant, and more. Invest in shares at 10 Lacs BDT with guaranteed buyback.',
  keywords: ['Hayat Life Care', 'healthcare Chattogram', 'diagnostic center', 'doctor chamber', 'hospital Bangladesh', 'Chittagong medical', 'healthcare investment', 'medical complex'],
  authors: [{ name: 'Hayat Life Care' }],
  creator: 'Hayat Life Care',
  publisher: 'Hayat Holdings',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Hayat Life Care - One Stop Service for Healthcare & Daily Essentials',
    description: 'Chattogram\'s premier healthcare & lifestyle complex with 11 business wings. Invest in your health and future.',
    url: 'https://hayatlifecare.com',
    siteName: 'Hayat Life Care',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hayat Life Care - Healthcare & Lifestyle Complex',
    description: 'Chattogram\'s premier healthcare & lifestyle complex with 11 business wings',
  },
  alternates: { canonical: 'https://hayatlifecare.com' },
  icons: {
    icon: "/favicon.ico",
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
        className={`${outfit.variable} ${inter.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
