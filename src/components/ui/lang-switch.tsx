"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function LangSwitch() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const next = locale === "fr" ? "en" : "fr";
    router.replace(pathname, { locale: next });
  }

  return (
    <button
      onClick={switchLocale}
      aria-label="Switch language"
      className="px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors uppercase tracking-wide"
    >
      {locale === "fr" ? "EN" : "FR"}
    </button>
  );
}
