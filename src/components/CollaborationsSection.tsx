import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CollaborationCard } from "@/components/CollaborationCard";
import { FadeIn } from "@/components/FadeIn";
import { MikelQuesadaSection } from "@/components/MikelQuesadaSection";
import { Section, sectionSpacing } from "@/components/Section";

type CollaborationsSectionProps = {
  compact?: boolean;
};

export async function CollaborationsSection({
  compact = false,
}: CollaborationsSectionProps) {
  const t = await getTranslations("experiences.collaborations");

  const cards = [
    {
      key: "cocktail",
      imageSrc: "/images/collaborations/cocktail-experience.jpg",
      imageCrop: "full" as const,
    },
    {
      key: "essence",
      imageSrc: "/images/collaborations/essence-culinaire.jpg",
      imageCrop: "full" as const,
    },
    {
      key: "festin",
      imageSrc: "/images/collaborations/festin-traiteur.jpg",
      imageCrop: "full" as const,
    },
    {
      key: "zandbergen",
      imageSrc: "/images/collaborations/zandbergen-eventcatering.jpg",
      imageCrop: "full" as const,
    },
    {
      key: "vinsmoselle",
      imageSrc: "/images/collaborations/vinsmoselle-chateau.png",
      imageCrop: "left" as const,
    },
    {
      key: "chateau",
      imageSrc: "/images/collaborations/vinsmoselle-chateau.png",
      imageCrop: "right" as const,
    },
  ];

  const visibleCards = compact
    ? cards.filter((c) => c.key === "festin" || c.key === "zandbergen")
    : cards;

  return (
    <Section
      id="collaborations"
      variant="muted"
      className={sectionSpacing}
      innerClassName="mx-auto max-w-6xl"
    >
      <FadeIn>
        <div className="mb-12 text-center">
          <div className="gold-line mx-auto mb-8" />
          <h2 className="font-display text-3xl font-light text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70">
            {t("intro")}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
            {visibleCards.map(({ key, imageSrc, imageCrop }) => {
              const item = t.raw(key) as {
                title: string;
                subtitle?: string;
                description: string;
                imageAlt: string;
                email?: string;
                phone?: string;
                links?: { label: string; href: string }[];
              };

              return (
                <CollaborationCard
                  key={key}
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                  imageSrc={imageSrc}
                  imageAlt={item.imageAlt}
                  imageCrop={imageCrop}
                  contact={
                    item.email || item.phone
                      ? { email: item.email, phone: item.phone }
                      : undefined
                  }
                  links={item.links}
                />
              );
            })}
          </div>

          {compact && (
            <p className="mt-10 text-center">
              <Link
                href="/experiences#collaborations"
                className="text-sm tracking-wide text-gold underline-offset-4 hover:underline"
              >
                {t("viewAll")} →
              </Link>
            </p>
          )}

          {!compact && (
            <div className="mt-16 border-t border-white/10 pt-16">
              <MikelQuesadaSection
                label={t("mikel.label")}
                title={t("mikel.title")}
                subtitle={t("mikel.subtitle")}
                description={t("mikel.description")}
                services={t.raw("mikel.services") as string[]}
                disclaimer={t("mikel.disclaimer")}
              />
            </div>
          )}
        </FadeIn>
      </Section>
  );
}
