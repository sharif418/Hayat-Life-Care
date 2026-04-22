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
  title: 'Hayat Life Care - One Stop Healthcare & Lifestyle Destination | Chattogram',
  description: 'Hayat Life Care is Chattogram\'s premier healthcare and lifestyle complex offering 11 business wings including doctor chambers, diagnostic center, pharmacy, restaurant, super shop, and more. Invest in healthcare future with shares at 10 Lacs BDT.',
  keywords: ['Hayat Life Care', 'healthcare Chattogram', 'hospital Chattogram', 'diagnostic center', 'doctor chamber', 'investment Bangladesh', 'healthcare complex'],
  openGraph: {
    title: 'Hayat Life Care - One Stop Healthcare & Lifestyle Destination',
    description: '11 business wings under one roof. Premium healthcare, daily essentials, dining & entertainment in Chattogram.',
    type: 'website',
    locale: 'en_BD',
  },
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
