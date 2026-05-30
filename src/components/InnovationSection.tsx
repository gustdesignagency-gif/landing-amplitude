import { BulletList } from "@/components/BulletList";
import { SplitImageLayout } from "@/components/SplitImageLayout";

type InnovationSectionProps = {
  title: string;
  imageAlt: string;
  intro: string;
  principle: string;
  featuresTitle: string;
  features: string[];
  goalsTitle: string;
  goals: string[];
  note: string;
};

export function InnovationSection({
  title,
  imageAlt,
  intro,
  principle,
  featuresTitle,
  features,
  goalsTitle,
  goals,
  note,
}: InnovationSectionProps) {
  return (
    <SplitImageLayout
      id="innovation"
      imageSrc="/images/innovation.jpg"
      imageAlt={imageAlt}
      variant="muted"
    >
      <div className="gold-line mb-8" />
      <h2 className="font-display text-3xl font-light text-white md:text-4xl">
        {title}
      </h2>
      <div className="mt-8 space-y-6 text-lg leading-relaxed text-white/70">
        <p>{intro}</p>
        <p>{principle}</p>
        <p className="font-medium text-white/90">{featuresTitle}</p>
        <BulletList items={features} />
        <p className="font-medium text-white/90">{goalsTitle}</p>
        <BulletList items={goals} />
        <p className="italic text-white/50">{note}</p>
      </div>
    </SplitImageLayout>
  );
}
