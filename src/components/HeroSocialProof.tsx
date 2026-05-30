import Image from "next/image";

const AVATARS = [
  { src: "/images/avatars/1.jpg", alt: "" },
  { src: "/images/avatars/2.jpg", alt: "" },
  { src: "/images/avatars/3.jpg", alt: "" },
  { src: "/images/avatars/4.jpg", alt: "" },
];

type HeroSocialProofProps = {
  label: string;
};

export function HeroSocialProof({ label }: HeroSocialProofProps) {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
      <div className="flex justify-center" role="img" aria-label={label}>
        <div className="inline-flex items-center pr-2.5">
          {AVATARS.map(({ src, alt }, i) => (
            <div
              key={src}
              className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-black ring-1 ring-gold/30 ${i > 0 ? "-ml-2.5" : ""}`}
              style={{ zIndex: AVATARS.length - i }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-sm tracking-wide text-white/70">{label}</p>
    </div>
  );
}
