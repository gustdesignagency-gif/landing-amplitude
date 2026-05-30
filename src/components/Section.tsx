import { type ReactNode } from "react";

type SectionVariant = "default" | "muted";

const variantStyles: Record<SectionVariant, string> = {
  default: "border border-white/10 bg-black",
  muted: "border border-white/10 bg-white/[0.02]",
};

type SectionProps = {
  children: ReactNode;
  id?: string;
  variant?: SectionVariant;
  className?: string;
  innerClassName?: string;
};

export function Section({
  children,
  id,
  variant = "default",
  className = "",
  innerClassName = "mx-auto max-w-3xl",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`mx-4 rounded-[24px] px-6 py-24 ${variantStyles[variant]} ${className}`}
    >
      <div className={innerClassName}>{children}</div>
    </section>
  );
}

export const sectionSpacing = "mt-4";
