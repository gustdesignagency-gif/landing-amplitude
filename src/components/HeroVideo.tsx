"use client";

import { useEffect, useRef } from "react";

const VIDEO_SRC = "/videos/hero-catering.mp4";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    video.play().catch(() => {
      // Autoplay blocked by browser
    });
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
    >
      <source src={VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
