import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CollaborationsSection } from "@/components/CollaborationsSection";
import { FadeIn } from "@/components/FadeIn";
import { GoalSection } from "@/components/GoalSection";
import { FounderSection } from "@/components/FounderSection";
import { HeroSocialProof } from "@/components/HeroSocialProof";
import { HeroBackground } from "@/components/HeroBackground";
import { HomeHeroParallax } from "@/components/HomeHeroParallax";
import { Section, sectionSpacing } from "@/components/Section";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");

  const hero = (
    <section className="relative flex h-full items-center justify-center overflow-hidden rounded-[24px]">
      <HeroBackground />
      <div
        className="pointer-events-none absolute inset-0 bg-black/55"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
        <span className="mb-8 inline-block rounded-full border border-gold/35 bg-gold/10 px-5 py-2 text-[11px] font-medium tracking-[0.22em] text-gold backdrop-blur-sm">
          {t("hero.badge")}
        </span>
        <h1 className="font-display text-4xl leading-tight font-light text-white md:text-6xl lg:text-7xl">
          {t("hero.tagline")}
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg text-white/80">
          {t("hero.subtitle")}
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/experiences"
            className="min-h-11 rounded-md bg-gold px-8 py-3 text-sm font-medium tracking-wide text-black transition-opacity hover:opacity-90"
          >
            {t("hero.ctaExperiences")}
          </Link>
          <Link
            href="/contact"
            className="min-h-11 rounded-md border border-white/30 px-8 py-3 text-sm tracking-wide text-white transition-colors hover:border-gold/50 hover:text-gold"
          >
            {t("hero.ctaContact")}
          </Link>
        </div>
        <HeroSocialProof label={t("hero.socialProof")} />
      </div>
    </section>
  );

  const visionSection = (
    <Section
      className="shadow-[0_-32px_64px_rgba(0,0,0,0.55)]"
      innerClassName="mx-auto max-w-3xl text-center"
    >
      <FadeIn>
        <div className="gold-line mx-auto mb-8" />
        <h2 className="font-display text-3xl font-light text-white md:text-4xl">
          {t("vision.title")}
        </h2>
        <p className="mt-8 text-lg leading-relaxed text-white/70">
          {t("vision.text")}
        </p>
      </FadeIn>
    </Section>
  );

  return (
    <div className="pb-4">
      <HomeHeroParallax hero={hero} overlap={visionSection} />

      <Section
        variant="muted"
        className={sectionSpacing}
        innerClassName="mx-auto max-w-4xl"
      >
        <FadeIn>
          <h2 className="mb-12 text-center font-display text-3xl font-light text-white">
            {t("qualities.title")}
          </h2>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {(t.raw("qualities.items") as string[]).map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/10 px-6 py-5 text-center text-sm tracking-wide text-white/80 transition-colors hover:border-gold/30 hover:text-gold"
              >
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>
      </Section>

      <Section className={sectionSpacing} innerClassName="mx-auto max-w-3xl text-center">
        <FadeIn>
          <h2 className="font-display text-3xl font-light text-white md:text-4xl">
            {t("promise.title")}
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-white/70">
            {t("promise.text")}
          </p>
          <Link
            href="/experiences"
            className="mt-10 inline-block text-sm tracking-wide text-gold underline-offset-4 hover:underline"
          >
            {t("promise.link")} →
          </Link>
        </FadeIn>
      </Section>

      <FadeIn>
        <FounderSection
          title={t("founder.title")}
          name={t("founder.name")}
          imageAlt={t("founder.imageAlt")}
          intro={t("founder.intro")}
          experience={t("founder.experience")}
          insight={t("founder.insight")}
          mission={t("founder.mission")}
        />
      </FadeIn>

      <FadeIn>
        <GoalSection
          title={t("goal.title")}
          text={t("goal.text")}
          imageAlt={t("goal.imageAlt")}
        />
      </FadeIn>

      <CollaborationsSection compact />
    </div>
  );
}
