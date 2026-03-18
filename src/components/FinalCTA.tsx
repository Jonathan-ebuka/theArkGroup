"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ScrollReveal } from "./ScrollReveal";

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    let raf: number;

    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const windowH = window.innerHeight;
        // 0 when section top hits viewport bottom, 1 when section bottom leaves viewport top
        const progress = (windowH - rect.top) / (windowH + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        // Move image upward by up to 38% of its height as section scrolls through
        bg.style.transform = `translateY(${(1 - clamped) * 38}%)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-section-sm md:py-section overflow-hidden"
    >
      {/* Parallax image — taller than section, translates up on scroll */}
      <div
        ref={bgRef}
        className="absolute inset-x-0 -top-[38%] bottom-0 will-change-transform"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "url('/images/mainM.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy/72" />

      {/* Grain */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <filter id="cta-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cta-grain)" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-12">
        <ScrollReveal>
          <p className="mx-auto mb-16 max-w-2xl font-serif text-lg italic leading-relaxed text-offwhite/50 md:text-xl">
            &ldquo;Structure is the foundation of every enduring business.&rdquo;
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gold uppercase">
            Let&apos;s Build
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-tight font-light text-offwhite md:text-5xl lg:text-6xl">
            Build Properly.
            <br />
            Scale Intentionally.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-offwhite/60">
            Ready to build something that lasts? Start a conversation with our
            team about your next strategic move.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-12">
            <Link
              href="/contact"
              className="group relative inline-block overflow-hidden border border-gold px-10 py-4 text-sm tracking-widest text-gold uppercase"
            >
              <span className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative transition-colors duration-500 group-hover:text-navy">Start a Conversation</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
