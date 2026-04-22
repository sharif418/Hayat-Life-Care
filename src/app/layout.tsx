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
  title: "Hayat Life Care - One Stop Service for Healthcare & Daily Essentials",
  description:
    "Hayat Life Care is a one-stop lifestyle destination in Chattogram, offering healthcare, diagnostics, daily essentials, wellness, and leisure facilities — all under one roof. A sister concern of Hayat Holdings.",
  keywords: [
    "Hayat Life Care",
    "Healthcare Chattogram",
    "Diagnostic Center",
    "Doctor Chamber",
    "One Stop Healthcare",
    "Chittagong Medical",
    "Hayat Holdings",
    "Investment Healthcare",
  ],
  authors: [{ name: "Hayat Life Care" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Hayat Life Care - One Stop Service for Healthcare & Daily Essentials",
    description:
      "A one-stop lifestyle destination where health, wellness and everyday convenience come together under one roof.",
    siteName: "Hayat Life Care",
    type: "website",
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
