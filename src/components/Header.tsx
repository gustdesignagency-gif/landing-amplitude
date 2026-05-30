"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  const links = [
    { href: "/", label: t("home") },
    { href: "/experiences", label: t("experiences") },
    { href: "/contact", label: t("contact") },
  ] as const;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`pointer-events-none fixed inset-x-4 z-50 ${isHome ? "top-10" : "top-4"}`}
    >
      <div
        ref={menuRef}
        className={`pointer-events-auto mx-auto max-w-6xl overflow-hidden rounded-[24px] border shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors duration-300 ${
          isHome
            ? "border-white/15 bg-black/45"
            : "border-white/10 bg-black/75"
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3 md:px-6 md:py-3.5">
          <Link
            href="/"
            className="font-display text-xl font-light tracking-[0.2em] text-white transition-colors hover:text-gold md:text-2xl"
            translate="no"
          >
            Reliz
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            {links.map(({ href, label }) => {
              const active =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm tracking-wide transition-colors ${
                    active ? "text-gold" : "text-white/70 hover:text-white"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}
            <LanguageSwitcher />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-gold/40 hover:text-gold"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                {open ? (
                  <path
                    d="M4 4L16 16M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                ) : (
                  <path
                    d="M3 6H17M3 10H17M3 14H17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div
            id="mobile-menu"
            className="border-t border-white/10 px-5 pb-4 md:hidden"
          >
            <nav className="flex flex-col pt-1" aria-label="Mobile">
              {links.map(({ href, label }) => {
                const active =
                  href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`min-h-11 py-3 text-sm tracking-wide transition-colors ${
                      active ? "text-gold" : "text-white/80 hover:text-gold"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
