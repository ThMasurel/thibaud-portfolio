"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LangSwitch } from "@/components/ui/lang-switch";

const sections = ["about", "skills", "projects", "contact"] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";

  function sectionHref(section: string) {
    if (isHome) return `#${section}`;
    return `/${locale}#${section}`;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          TM<span className="text-primary">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {sections.map((s) => (
            <a
              key={s}
              href={sectionHref(s)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(s)}
            </a>
          ))}
          <Link
            href="/blog"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("blog")}
          </Link>
          <div className="flex items-center gap-1 ml-2">
            <LangSwitch />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-1 md:hidden">
          <LangSwitch />
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-border">
          <div className="px-4 py-4 flex flex-col gap-3">
            {sections.map((s) => (
              <a
                key={s}
                href={sectionHref(s)}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(s)}
              </a>
            ))}
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("blog")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
