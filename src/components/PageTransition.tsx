"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const DURATION_MS = 550;

type NavigateOptions = {
  locale?: (typeof routing.locales)[number];
  replace?: boolean;
};

type PageTransitionContextValue = {
  navigateWithTransition: (href: string, options?: NavigateOptions) => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null,
);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      "usePageTransition must be used within PageTransitionProvider",
    );
  }
  return ctx;
}

function stripLocale(pathname: string) {
  for (const locale of routing.locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1) || "/";
    }
  }
  return pathname;
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [isCovered, setIsCovered] = useState(false);
  const isTransitioning = useRef(false);
  const prevPathname = useRef(pathname);
  const prevLocale = useRef(locale);

  const navigateWithTransition = useCallback(
    (href: string, options?: NavigateOptions) => {
      if (isTransitioning.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        if (options?.replace) {
          router.replace(href, options.locale ? { locale: options.locale } : {});
        } else {
          router.push(href);
        }
        return;
      }

      isTransitioning.current = true;
      setIsCovered(true);

      window.setTimeout(() => {
        if (options?.replace) {
          router.replace(href, options.locale ? { locale: options.locale } : {});
        } else {
          router.push(href);
        }
      }, DURATION_MS);
    },
    [router],
  );

  useEffect(() => {
    if (!isTransitioning.current) {
      prevPathname.current = pathname;
      prevLocale.current = locale;
      return;
    }

    const changed =
      pathname !== prevPathname.current || locale !== prevLocale.current;

    if (changed) {
      prevPathname.current = pathname;
      prevLocale.current = locale;

      requestAnimationFrame(() => {
        setIsCovered(false);
        window.setTimeout(() => {
          isTransitioning.current = false;
        }, DURATION_MS);
      });
    }
  }, [pathname, locale]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const hrefAttr = anchor.getAttribute("href");
      if (
        !hrefAttr ||
        hrefAttr.startsWith("#") ||
        hrefAttr.startsWith("mailto:") ||
        hrefAttr.startsWith("tel:")
      ) {
        return;
      }

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;

      const path = stripLocale(url.pathname) + url.search + url.hash;
      if (path === pathname) return;

      e.preventDefault();
      navigateWithTransition(path);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [navigateWithTransition, pathname]);

  return (
    <PageTransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      <div
        aria-hidden
        className={`page-transition-curtain ${isCovered ? "page-transition-curtain--covering" : ""}`}
      />
    </PageTransitionContext.Provider>
  );
}
