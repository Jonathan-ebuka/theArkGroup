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

// Spread symbols across the section — fixed positions (percent-based)
const SYMBOLS = [
  { symbol: "+", top: 8,  left: 5,   size: 3.5, speed: 0.18, opacity: 0.07 },
  { symbol: "×", top: 15, left: 88,  size: 2.5, speed: 0.25, opacity: 0.06 },
  { symbol: "+", top: 28, left: 72,  size: 4.5, speed: 0.14, opacity: 0.05 },
  { symbol: "×", top: 35, left: 18,  size: 2,   speed: 0.30, opacity: 0.08 },
  { symbol: "+", top: 50, left: 92,  size: 3,   speed: 0.20, opacity: 0.06 },
  { symbol: "×", top: 55, left: 42,  size: 5,   speed: 0.12, opacity: 0.04 },
  { symbol: "+", top: 62, left: 8,   size: 2.5, speed: 0.28, opacity: 0.07 },
  { symbol: "×", top: 70, left: 60,  size: 3.5, speed: 0.16, opacity: 0.05 },
  { symbol: "+", top: 78, left: 30,  size: 2,   speed: 0.22, opacity: 0.09 },
  { symbol: "×", top: 85, left: 80,  size: 4,   speed: 0.15, opacity: 0.06 },
  { symbol: "+", top: 92, left: 50,  size: 2.5, speed: 0.26, opacity: 0.07 },
  { symbol: "×", top: 20, left: 55,  size: 3,   speed: 0.19, opacity: 0.05 },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>(
    new Array(TOTAL_CHARS).fill(null)
  );
  const symbolRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Letter reveal
      const start = windowH * 0.75;
      const end = -windowH * 1.5;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      const litCount = Math.floor(progress * TOTAL_CHARS);

      charsRef.current.forEach((span, i) => {
        if (!span) return;
        if (i < litCount) span.classList.add("lit");
        else span.classList.remove("lit");
      });

      // Floating symbols parallax — levitate upward as user scrolls
      const sectionH = section.offsetHeight;
      const scrolled = -rect.top; // how far into section we've scrolled
      const scrollRatio = scrolled / sectionH;

      symbolRefs.current.forEach((el, i) => {
        if (!el) return;
        const { speed } = SYMBOLS[i];
        const lift = scrollRatio * speed * sectionH;
        el.style.transform = `translateY(${-lift}px)`;
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
      className="relative bg-navy px-6 py-section-sm md:py-section lg:px-12"
    >
      {/* Floating background symbols */}
      {SYMBOLS.map((s, i) => (
        <span
          key={i}
          ref={(el) => { symbolRefs.current[i] = el; }}
          aria-hidden="true"
          className="pointer-events-none absolute select-none font-display font-extrabold text-white will-change-transform"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            fontSize: `${s.size}rem`,
            opacity: s.opacity,
            lineHeight: 1,
          }}
        >
          {s.symbol}
        </span>
      ))}

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-32 md:items-start">
          {/* Left — label + headline */}
          <div className="md:sticky md:top-32 md:self-start">
            <p data-animate="slide-left" className="text-xs tracking-[0.3em] text-gold uppercase">
              About The Ark Group
            </p>
            <h2 data-animate="fade-up" className="mt-6 font-serif text-4xl leading-tight font-light text-offwhite md:text-5xl">
              Built for Structure.
              <br />
              Designed for Scale.
            </h2>
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
