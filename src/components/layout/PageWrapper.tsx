"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const pathname = usePathname();

  useEffect(() => {
    // Check if there's a hash in the URL and scroll to it after a short delay
    // to allow the page to render and animations to start
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // 500ms delay to wait for page transition
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen flex flex-col relative transition-colors duration-300"
      style={{
        background: isDarkMode ? "#0F172A" : "#FAFFFE",
      }}
    >
      <main className="flex-1">
        {children}
      </main>
    </motion.div>
  );
}
