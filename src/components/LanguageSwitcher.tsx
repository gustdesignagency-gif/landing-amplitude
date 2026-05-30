"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { usePageTransition } from "@/components/PageTransition";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const { navigateWithTransition } = usePageTransition();

  function switchLocale(next: "fr" | "en") {
    if (next === locale) return;
    navigateWithTransition(pathname, { locale: next, replace: true });
  }

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-white/15 p-0.5"
      role="group"
      aria-label="Language"
    >
      {(["fr", "en"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => switchLocale(lang)}
          className={`min-h-11 min-w-11 rounded-full px-3 text-xs font-medium uppercase tracking-widest transition-colors ${
            locale === lang
              ? "bg-gold text-black"
              : "text-white/70 hover:text-white"
          }`}
          aria-pressed={locale === lang}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
