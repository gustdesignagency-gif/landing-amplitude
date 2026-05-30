"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type HomeHeroParallaxProps = {
  hero: ReactNode;
  overlap: ReactNode;
};

export function HomeHeroParallax({ hero, overlap }: HomeHeroParallaxProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const update = () => {
      const track = trackRef.current;
      if (!track) return;

      const { top, height } = track.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      if (scrollable <= 0) return;

      const scrolled = Math.min(Math.max(-top, 0), scrollable);
      setProgress(scrolled / scrollable);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reducedMotion]);

  const heroStyle: CSSProperties = reducedMotion
    ? {}
    : {
        opacity: 1 - progress * 0.9,
        filter: `blur(${progress * 14}px)`,
        transform: `scale(${1 - progress * 0.06}) translateY(${progress * 28}px)`,
      };

  if (reducedMotion) {
    return (
      <>
        <div className="hero-parallax-track hero-parallax-track--static">
          <div className="hero-parallax-sticky">{hero}</div>
        </div>
        <div className="hero-parallax-overlap hero-parallax-overlap--static">
          {overlap}
        </div>
      </>
    );
  }

  return (
    <>
      <div ref={trackRef} className="hero-parallax-track">
        <div className="hero-parallax-sticky">
          <div className="hero-parallax-media" style={heroStyle}>
            {hero}
          </div>
        </div>
      </div>
      <div className="hero-parallax-overlap">{overlap}</div>
    </>
  );
}
