"use client";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mx-4 mb-4 rounded-[24px] border border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-14">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {/* Colonne marque */}
          <div>
            <p
              className="font-display text-2xl tracking-[0.15em] text-gold"
              translate="no"
            >
              RELIZ
            </p>
            <p className="mt-1 text-[10px] tracking-[0.3em] text-white/50 uppercase">
              {t("tagline")}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              {t("services")}
            </p>
          </div>

          {/* Colonne groupe */}
          <div>
            <p className="text-xs tracking-[0.25em] text-gold uppercase">
              {t("groupTitle")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {t.rich("ledBy", {
                name: () => (
                  <span className="text-gold">{t("founderName")}</span>
                ),
              })}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {t("mikelCollaboration")}
            </p>
            <p className="mt-3 text-sm text-white/60">{t("regions")}</p>
          </div>

          {/* Colonne contact */}
          <div>
            <p className="text-xs tracking-[0.25em] text-gold uppercase">
              {t("contactTitle")}
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${t("email")}`}
                  className="text-white/70 transition-colors hover:text-gold"
                >
                  {t("email")}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${t("phone").replace(/\s/g, "")}`}
                  className="text-white/70 transition-colors hover:text-gold"
                >
                  {t("phone")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            {t("copyright", { year })}
          </p>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
