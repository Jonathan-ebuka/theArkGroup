"use client";

import { useRef, useEffect } from "react";

const REVEAL_TEXT =
  "The Ark Group is a strategic architecture firm focused on helping ambitious businesses build the structures required for long-term growth. We work across operational systems, financial architecture, and strategic positioning — ensuring every decision, framework, and partnership supports sustainable scale. We don't chase trends. We build foundations.";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const container = textContainerRef.current;
    if (!container) return;

    // Build character spans
    container.innerHTML = "";
    charsRef.current = [];

    for (const char of REVEAL_TEXT) {
      const span = document.createElement("span");
      span.classList.add("scroll-letter");
      span.textContent = char === " " ? "\u00A0" : char;
      container.appendChild(span);
      charsRef.current.push(span);
    }

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Reveal starts when section top enters viewport, finishes halfway through
      const start = windowH * 0.9;
      const end = -section.offsetHeight * 0.3;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));

      const litCount = Math.floor(progress * charsRef.current.length);
      charsRef.current.forEach((span, i) => {
        if (i < litCount) {
          span.classList.add("lit");
        } else {
          span.classList.remove("lit");
        }
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
      className="bg-navy py-section-sm md:py-section"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16 md:items-start">
          {/* Left — label + headline + small body */}
          <div>
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
            <div
              ref={textContainerRef}
              className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.2] font-extrabold tracking-tight uppercase break-words"
              style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
