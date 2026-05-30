type MikelQuesadaSectionProps = {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  services: string[];
  disclaimer: string;
};

export function MikelQuesadaSection({
  label,
  title,
  subtitle,
  description,
  services,
  disclaimer,
}: MikelQuesadaSectionProps) {
  return (
    <div className="space-y-10">
      <p className="text-xs tracking-[0.25em] text-gold uppercase">{label}</p>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h3 className="font-display text-3xl font-light text-white md:text-4xl">
            {title}
          </h3>
          <p className="mt-3 text-sm tracking-[0.18em] text-gold uppercase">
            {subtitle}
          </p>
        </div>
        <p className="text-lg leading-relaxed text-white/70">{description}</p>
      </div>

      <ul className="grid grid-cols-1 divide-y divide-white/10 border border-white/10 sm:grid-cols-2 lg:grid-cols-3 sm:divide-x">
        {services.map((service) => (
          <li
            key={service}
            className="flex items-start gap-3 px-5 py-6 text-sm text-white/75"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
              aria-hidden
            />
            {service}
          </li>
        ))}
      </ul>

      <blockquote className="border-l-2 border-gold/50 pl-5 text-sm italic leading-relaxed text-white/50">
        {disclaimer}
      </blockquote>
    </div>
  );
}
