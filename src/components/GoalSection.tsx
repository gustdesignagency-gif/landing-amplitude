import { SplitImageLayout } from "@/components/SplitImageLayout";

type GoalSectionProps = {
  title: string;
  text: string;
  imageAlt: string;
};

export function GoalSection({ title, text, imageAlt }: GoalSectionProps) {
  return (
    <SplitImageLayout
      imageSrc="/images/ambition.jpg"
      imageAlt={imageAlt}
      imagePosition="right"
    >
      <div className="gold-line mb-8" />
      <h2 className="font-display text-3xl font-light text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-8 text-lg leading-relaxed text-white/70">{text}</p>
    </SplitImageLayout>
  );
}
