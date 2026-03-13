"use client";

import { useRef, useEffect } from "react";

const LINES = [
  "THE ARK GROUP",
  "IS A STRATEGIC",
  "ARCHITECTURE",
  "FIRM.",
  "",
  "WE HELP",
  "AMBITIOUS",
  "BUSINESSES",
  "BUILD THE",
  "STRUCTURES",
  "FOR LONG-TERM",
  "GROWTH.",
  "",
  "OPERATIONAL",
  "SYSTEMS,",
  "FINANCIAL",
  "ARCHITECTURE,",
  "STRATEGIC",
  "POSITIONING.",
  "",
  "WE DON'T CHASE",
  "TRENDS.",
  "",
  "WE BUILD",
  "FOUNDATIONS.",
];

// Pre-compute a flat char matrix: CHAR_MATRIX[lineIndex] = [{char, flatIndex}, ...]
let _flat = 0;
const CHAR_MATRIX = LINES.map((line) =>
  [...line].map((char) => ({ char, flatIndex: _flat++ }))
);
const TOTAL_CHARS = _flat;

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>(
    new Array(TOTAL_CHARS).fill(null)
  );

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Start when section is 25% in view, finish after 2× viewport of scrolling
      const start = windowH * 0.75;
      const end = -windowH * 1.5;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      const litCount = Math.floor(progress * TOTAL_CHARS);

      charsRef.current.forEach((span, i) => {
        if (!span) return;
        if (i < litCount) span.classList.add("lit");
        else span.classList.remove("lit");
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-navy px-6 py-section-sm md:py-section lg:px-12"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-32 md:items-start">
          {/* Left — label + headline + small body (sticky) */}
          <div className="md:sticky md:top-32 md:self-start">
            <p data-animate="slide-left" className="text-xs tracking-[0.3em] text-gold uppercase">
              About The Ark Group
            </p>
            <h2 data-animate="fade-up" className="mt-6 font-serif text-4xl leading-tight font-light text-offwhite md:text-5xl">
              Built for Structure.
              <br />
              Designed for Scale.
            </h2>
            <p data-animate="fade-up" className="mt-8 text-sm leading-relaxed text-offwhite/60">
              The Ark Group is a strategic firm focused on helping purpose-driven
              businesses build the structures required for sustainable growth. We
              work across various areas ranging from operational systems,
              financial architecture, to branding and strategic positioning;
              ensuring every decision and framework supports long term scale.
            </p>
            <p data-animate="fade-up" className="mt-4 text-sm leading-relaxed text-offwhite/60">
              We build foundations.
            </p>
            <div data-animate="expand-width" className="mt-10 h-px w-16 bg-gold" />
          </div>

          {/* Right — scroll letter reveal */}
          <div className="relative overflow-hidden">
            <div className="font-display text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.2] font-extrabold tracking-tight">
              {LINES.map((line, li) =>
                line === "" ? (
                  <div key={`spacer-${li}`} style={{ height: "0.6em" }} />
                ) : (
                  <div key={`line-${li}`}>
                    {CHAR_MATRIX[li].map(({ char, flatIndex }) => (
                      <span
                        key={flatIndex}
                        className="scroll-letter"
                        ref={(el) => {
                          charsRef.current[flatIndex] = el;
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
