"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Principle {
  number: string;
  title: string;
  description: string;
  detail: string;
  image?: string;
}

interface StickyContentSwitchProps {
  principles: Principle[];
}

export function StickyContentSwitch({ principles }: StickyContentSwitchProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-principle-card]");

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white py-section-sm md:py-section">
      <div
        ref={containerRef}
        className="mx-auto max-w-7xl px-6 lg:px-12"
      >
        <div className="grid md:grid-cols-[1fr_1.2fr] md:gap-20">
          {/* Left — sticky heading */}
          <div className="hidden md:block">
            <div className="sticky top-0 flex h-screen items-center">
              <div className="pb-20">
                {/* Eyebrow */}
                <p className="text-xs tracking-[0.3em] text-gold uppercase">
                  Our Principles
                </p>

                {/* Active number */}
                <div className="relative mt-8 grid [grid-template-areas:'stack']">
                  {principles.map((p, i) => (
                    <span
                      key={p.number}
                      className="[grid-area:stack] font-display text-[5rem] leading-none font-extrabold text-navy/[0.06] transition-all duration-700 ease-out"
                      style={{
                        opacity: activeIndex === i ? 1 : 0,
                        transform: activeIndex === i
                          ? "translateY(0)"
                          : activeIndex > i
                            ? "translateY(-1rem)"
                            : "translateY(1rem)",
                      }}
                    >
                      {p.number}
                    </span>
                  ))}
                </div>

                {/* Active title */}
                <div className="relative mt-4 grid [grid-template-areas:'stack']">
                  {principles.map((p, i) => (
                    <h2
                      key={p.title}
                      className="[grid-area:stack] font-serif text-5xl leading-tight font-light text-navy transition-all duration-700 ease-out lg:text-6xl"
                      style={{
                        opacity: activeIndex === i ? 1 : 0,
                        transform: activeIndex === i
                          ? "translateY(0)"
                          : activeIndex > i
                            ? "translateY(-1rem)"
                            : "translateY(1rem)",
                      }}
                    >
                      {p.title}
                    </h2>
                  ))}
                </div>

                {/* Gold accent line */}

                {/* Progress dots */}
                <div className="mt-10 flex gap-3">
                  {principles.map((_, i) => (
                    <span
                      key={i}
                      className="block h-2 rounded-full transition-all duration-500"
                      style={{
                        width: activeIndex === i ? "2rem" : "0.5rem",
                        backgroundColor:
                          activeIndex === i
                            ? "var(--color-gold)"
                            : "var(--color-navy)",
                        opacity: activeIndex === i ? 1 : 0.15,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — scrolling content cards */}
          <div className="space-y-8 md:space-y-12 md:py-[40vh]">
            {principles.map((p, i) => (
              <div
                key={p.number}
                data-principle-card
                className="group relative overflow-hidden rounded-sm bg-white shadow-[0_1px_3px_rgba(10,22,40,0.04)] transition-all duration-700"
                style={{
                  opacity: activeIndex === i ? 1 : 0.35,
                  transform: activeIndex === i ? "scale(1)" : "scale(0.97)",
                }}
              >
                {/* Image */}
                {p.image && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  </div>
                )}

                {/* Card content */}
                <div className="p-8 md:p-12">
                  {/* Number + title */}
                  <div className="flex items-start gap-5">
                    <span className="font-display text-3xl font-extrabold text-gold/20 md:text-4xl">
                      {p.number}
                    </span>
                    <h3 className="font-serif text-2xl font-light text-navy md:text-3xl">
                      {p.title}
                    </h3>
                  </div>


                  {/* Description */}
                  <p className="text-lg leading-relaxed text-slate">
                    {p.description}
                  </p>

                  {/* Detail */}
                  <p className="mt-5 leading-relaxed text-slate-light">
                    {p.detail}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
