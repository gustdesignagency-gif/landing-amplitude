import Image from "next/image";
import { type ReactNode } from "react";

export type CollaborationLink = {
  label: string;
  href: string;
};

export type CollaborationContact = {
  email?: string;
  phone?: string;
};

type CollaborationCardProps = {
  title: string;
  subtitle?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageCrop?: "full" | "left" | "right";
  links?: CollaborationLink[];
  contact?: CollaborationContact;
  footer?: ReactNode;
};

const cropClasses = {
  full: "object-cover object-center",
  left: "object-cover object-left scale-[1.08] origin-left",
  right: "object-cover object-right scale-[1.08] origin-right",
};

export function CollaborationCard({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  imageCrop = "full",
  links,
  contact,
  footer,
}: CollaborationCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.02]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={cropClasses[imageCrop]}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="font-display text-xl font-light text-white md:text-2xl">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-xs tracking-[0.2em] text-gold uppercase">
            {subtitle}
          </p>
        )}
        <p className="mt-4 flex-1 text-sm leading-relaxed text-white/70 md:text-base">
          {description}
        </p>

        {contact && (
          <div className="mt-6 space-y-2 text-sm">
            {contact.email && (
              <p>
                <span className="mr-2 text-xs tracking-widest text-gold uppercase">
                  Email
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-white/80 transition-colors hover:text-gold"
                >
                  {contact.email}
                </a>
              </p>
            )}
            {contact.phone && (
              <p>
                <span className="mr-2 text-xs tracking-widest text-gold uppercase">
                  Tel
                </span>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="text-white/80 transition-colors hover:text-gold"
                >
                  {contact.phone}
                </a>
              </p>
            )}
          </div>
        )}

        {links && links.length > 0 && (
          <ul className="mt-6 space-y-2">
            {links.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gold transition-opacity hover:opacity-80"
                >
                  {label}
                  <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        {footer}
      </div>
    </article>
  );
}
