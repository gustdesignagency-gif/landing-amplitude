import Image from "next/image";
import { type ReactNode } from "react";
import { sectionSpacing } from "@/components/Section";

type SplitImageLayoutProps = {
  imageSrc: string;
  imageAlt: string;
  id?: string;
  variant?: "default" | "muted";
  imagePosition?: "left" | "right";
  imageClassName?: string;
  className?: string;
  children: ReactNode;
};

const variantStyles = {
  default: "border border-white/10 bg-black",
  muted: "border border-white/10 bg-white/[0.02]",
};

export function SplitImageLayout({
  imageSrc,
  imageAlt,
  id,
  variant = "muted",
  imagePosition = "left",
  imageClassName = "object-cover object-center",
  className = "",
  children,
}: SplitImageLayoutProps) {
  const image = (
    <div className="relative h-72 w-full shrink-0 overflow-hidden rounded-[24px] md:h-auto md:w-[30vw]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className={imageClassName}
        sizes="(max-width: 768px) 100vw, 30vw"
      />
    </div>
  );

  const content = (
    <section
      className={`min-w-0 flex-1 rounded-[24px] px-6 py-24 ${variantStyles[variant]}`}
    >
      {children}
    </section>
  );

  return (
    <div
      id={id}
      className={`mx-4 flex scroll-mt-28 flex-col gap-4 md:flex-row md:items-stretch ${sectionSpacing} ${className}`}
    >
      {imagePosition === "left" ? (
        <>
          {image}
          {content}
        </>
      ) : (
        <>
          {content}
          {image}
        </>
      )}
    </div>
  );
}
