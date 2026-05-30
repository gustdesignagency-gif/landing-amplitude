import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  return (
    <div className="pb-4 pt-28">
      <Section innerClassName="mx-auto max-w-xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <div className="gold-line mx-auto mb-8" />
            <h1 className="font-display text-4xl font-light text-white md:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-white/60">{t("subtitle")}</p>
          </div>
          <ContactForm />
        </FadeIn>
      </Section>
    </div>
  );
}
