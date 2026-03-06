"use client";

import { useRef, useEffect, useState } from "react";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Start filling when section top reaches 80% of viewport,
      // fully filled when section top reaches 20% of viewport
      const start = windowH * 0.8;
      const end = windowH * 0.15;
      const progress = (start - rect.top) / (start - end);
      setFill(Math.min(1, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-offwhite py-section-sm md:py-section"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16 md:items-start">
          {/* Left — label + headline + small body */}
          <div>
            <p data-animate="slide-left" className="text-xs tracking-[0.3em] text-gold uppercase">
              About The Ark Group
            </p>
            <h2 data-animate="fade-up" className="mt-6 font-serif text-4xl leading-tight font-light text-navy md:text-5xl">
              Built for Structure.
              <br />
              Designed for Scale.
            </h2>
            <p data-animate="fade-up" className="mt-8 text-sm leading-relaxed text-slate-light">
              The Ark Group is not a single service business — it is a parent
              structure engineered to build, scale, and sustain high-value
              companies across advisory and capital.
            </p>
            <p data-animate="fade-up" className="mt-4 text-sm leading-relaxed text-slate-light">
              We operate with structure-first thinking: every decision, system,
              and partnership is designed for clarity, long-term positioning, and
              compounding growth. We don&apos;t chase trends. We build
              foundations.
            </p>
            <div data-animate="expand-width" className="mt-10 h-px w-16 bg-gold" />
          </div>

          {/* Right — scroll-fill typographic statement */}
          <div className="relative overflow-hidden">
            {/* Bottom layer: outlined / stroked text (always visible) */}
            <p
              aria-hidden="true"
              className="text-stroke-outline font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.1] font-extrabold tracking-tight uppercase"
            >
              We&rsquo;re a hands-on team of strategic advisors focused on
              helping ambitious businesses use{" "}
              <span className="text-stroke-outline-gold">
                structure and capital
              </span>{" "}
              where it matters most. We cut through the noise and implement
              systems that compound.
            </p>

            {/* Top layer: filled text, clipped by scroll progress */}
            <p
              className="text-fill-layer absolute inset-0 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.1] font-extrabold tracking-tight text-navy uppercase"
              style={{ "--fill": `${fill * 100}%` } as React.CSSProperties}
            >
              We&rsquo;re a hands-on team of strategic advisors focused on
              helping ambitious businesses use{" "}
              <span className="text-gold">structure and capital</span>{" "}
              where it matters most. We cut through the noise and implement
              systems that compound.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
