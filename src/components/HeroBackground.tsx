import Image from "next/image";

export function HeroBackground() {
  return (
    <Image
      src="/images/hero.jpg"
      alt=""
      fill
      priority
      className="object-cover object-center"
      sizes="100vw"
      aria-hidden
    />
  );
}
