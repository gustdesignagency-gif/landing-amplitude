import { SplitImageLayout } from "@/components/SplitImageLayout";

type FounderSectionProps = {
  title: string;
  name: string;
  intro: string;
  experience: string;
  insight: string;
  mission: string;
  imageAlt: string;
};

export function FounderSection({
  title,
  name,
  intro,
  experience,
  insight,
  mission,
  imageAlt,
}: FounderSectionProps) {
  return (
    <SplitImageLayout
      imageSrc="/images/founder.png"
      imageAlt={imageAlt}
      imageClassName="object-cover object-top"
    >
      <div className="gold-line mb-8" />
      <h2 className="font-display text-3xl font-light text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-2 text-gold">{name}</p>
      <div className="mt-8 space-y-6 text-lg leading-relaxed text-white/70">
        <p>{intro}</p>
        <p>{experience}</p>
        <p className="italic text-white/50">{insight}</p>
        <p>{mission}</p>
      </div>
    </SplitImageLayout>
  );
}
