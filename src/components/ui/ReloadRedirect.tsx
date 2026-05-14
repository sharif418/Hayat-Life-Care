"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ReloadRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Use PerformanceNavigationTiming API to check if it's a reload
      const entries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      if (entries.length > 0 && entries[0].type === "reload") {
        // On reload, if not on home page, redirect to home page
        if (pathname !== "/") {
          router.replace("/");
        } else {
          // If already on home page, just scroll to top
          window.scrollTo(0, 0);
        }
      }
    }
  }, [pathname, router]);

  return null;
}
