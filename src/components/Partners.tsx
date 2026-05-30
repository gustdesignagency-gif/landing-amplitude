import { useTranslations } from "next-intl";

function PartnerLogo({ initials }: { initials: string }) {
  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-white/5"
      aria-hidden
    >
      <span className="font-display text-lg text-gold">{initials}</span>
    </div>
  );
}

export function Partners() {
  const t = useTranslations("partners");

  const items = [
    { key: "zandbergen", initials: "ZE", name: t("zandbergen.name"), url: t("zandbergen.url") },
    { key: "festin", initials: "F", name: t("festin.name"), url: t("festin.url") },
  ] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
      {items.map(({ key, initials, name, url }) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-4 transition-opacity hover:opacity-80"
        >
          <PartnerLogo initials={initials} />
          <span className="max-w-[180px] text-center text-sm text-white/70 transition-colors group-hover:text-gold">
            {name}
          </span>
        </a>
      ))}
    </div>
  );
}
