import { getTranslations, setRequestLocale } from "next-intl/server";
import { CollaborationsSection } from "@/components/CollaborationsSection";
import { FadeIn } from "@/components/FadeIn";
import { Section, sectionSpacing } from "@/components/Section";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-white/70 before:mt-2.5 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-gold before:content-['']"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ExperienceSection({
  id,
  title,
  subtitle,
  children,
  variant = "default",
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: "default" | "muted";
}) {
  return (
    <Section
      id={id}
      variant={variant}
      className={`scroll-mt-28 ${sectionSpacing}`}
    >
      <FadeIn>
        <div className="gold-line mb-8" />
        <h2 className="font-display text-3xl font-light text-white md:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm tracking-[0.2em] text-gold uppercase">
            {subtitle}
          </p>
        )}
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-white/70">
          {children}
        </div>
      </FadeIn>
    </Section>
  );
}

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("experiences");

  return (
    <div className="pb-4 pt-28">
      <Section innerClassName="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-4xl font-light text-white md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-gold">{t("subtitle")}</p>
      </Section>

      <ExperienceSection id="reliz" title={t("reliz.title")}>
        <p>{t("reliz.intro")}</p>
        <p className="font-display text-xl text-gold">{t("reliz.interlocutor")}</p>
        <p className="font-medium text-white/90">{t("reliz.scopeTitle")}</p>
        <BulletList items={t.raw("reliz.scope") as string[]} />
      </ExperienceSection>

      <ExperienceSection
        id="innovation"
        title={t("innovation.title")}
        variant="muted"
      >
        <p>{t("innovation.intro")}</p>
        <p>{t("innovation.principle")}</p>
        <p className="font-medium text-white/90">{t("innovation.featuresTitle")}</p>
        <BulletList items={t.raw("innovation.features") as string[]} />
        <p className="font-medium text-white/90">{t("innovation.goalsTitle")}</p>
        <BulletList items={t.raw("innovation.goals") as string[]} />
        <p className="italic text-white/50">{t("innovation.note")}</p>
      </ExperienceSection>

      <ExperienceSection
        id="brooklyn"
        title={t("brooklyn.title")}
        subtitle={t("brooklyn.subtitle")}
      >
        <p>{t("brooklyn.intro")}</p>
        <p className="font-medium text-white/90">{t("brooklyn.representsTitle")}</p>
        <BulletList items={t.raw("brooklyn.represents") as string[]} />
        <p className="font-medium text-white/90">{t("brooklyn.universeTitle")}</p>
        <TagList items={t.raw("brooklyn.universe") as string[]} />
      </ExperienceSection>

      <ExperienceSection
        id="collection"
        title={t("collection.title")}
        variant="muted"
      >
        <p>{t("collection.intro")}</p>
        <p className="font-medium text-white/90">{t("collection.forTitle")}</p>
        <BulletList items={t.raw("collection.for") as string[]} />
      </ExperienceSection>

      <ExperienceSection id="families" title={t("families.title")}>
        <p>{t("families.intro")}</p>
        <p className="font-medium text-white/90">{t("families.conceptTitle")}</p>
        <BulletList items={t.raw("families.concept") as string[]} />
        <p className="font-medium text-white/90">{t("families.modelTitle")}</p>
        <p className="font-display text-xl text-gold">{t("families.model")}</p>
        <p className="font-medium text-white/90">{t("families.imageTitle")}</p>
        <TagList items={t.raw("families.image") as string[]} />
      </ExperienceSection>

      <CollaborationsSection />
    </div>
  );
}
