"use client";

import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // On every mount/re-mount (including after locale switch), re-apply the
    // theme from localStorage so it is never lost during client navigation.
    try {
      const stored = localStorage.getItem("theme");
      const shouldBeDark =
        stored === "dark" ||
        (!stored &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.classList.toggle("dark", shouldBeDark);
    } catch {
      // Ignore
    }
  });

  return <>{children}</>;
}
