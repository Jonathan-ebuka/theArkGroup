"use client";

import { useEffect, useRef } from "react";

export function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lines = section.querySelectorAll<HTMLElement>("[data-line]");
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.style.transform = "translateY(0)";
        line.style.opacity = "1";
      }, 200 + i * 120);
    });

    const reveals = section.querySelectorAll<HTMLElement>("[data-reveal]");
    reveals.forEach((el) => {
      const delay = parseInt(el.dataset.delay ?? "0");
      setTimeout(() => {
        el.classList.add("opacity-100", "translate-y-0");
        el.classList.remove("opacity-0", "translate-y-8");
      }, delay);
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-navy pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-20">
        {/* Page label */}
        <div className="overflow-hidden">
          <span
            data-line
            className="block text-xs font-medium uppercase tracking-[0.3em] text-offwhite/40 transition-all duration-700 ease-out"
            style={{ transform: "translateY(100%)", opacity: 0 }}
          >
            About The Ark Group
          </span>
        </div>

        {/* Heading */}
        <h1 className="mt-8 font-sans text-4xl leading-[1.1] tracking-tight text-offwhite sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontWeight: 500 }}>
          <span className="block overflow-hidden">
            <span
              data-line
              className="block transition-all duration-700 ease-out"
              style={{ transform: "translateY(100%)", opacity: 0 }}
            >
              Purpose-driven.
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-line
              className="block text-offwhite/40 transition-all duration-700 ease-out"
              style={{ transform: "translateY(100%)", opacity: 0 }}
            >
              Built to endure.
            </span>
          </span>
        </h1>

        {/* Mission & Vision */}
        <div className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Mission */}
            <div
              data-reveal
              data-delay="500"
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out border-t border-offwhite/10 py-12 lg:pr-16"
            >
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
                Mission
              </span>
              <h3 className="mt-5 font-sans text-2xl leading-snug text-offwhite md:text-3xl" style={{ fontWeight: 500 }}>
                Turning potential into performance.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-offwhite/50 max-w-lg">
                We give vision-led entrepreneurs the tools, strategy, and support to bring structure, clarity, and traction to their businesses.
              </p>
            </div>

            {/* Vision */}
            <div
              data-reveal
              data-delay="700"
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out border-t border-offwhite/10 py-12 lg:pl-16 lg:border-l"
            >
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
                Vision
              </span>
              <h3 className="mt-5 font-sans text-2xl leading-snug text-offwhite md:text-3xl" style={{ fontWeight: 500 }}>
                A vessel for growth, globally.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-offwhite/50 max-w-lg">
                To be the Ark—known for bringing vision to life and transforming ideas into structured, scalable businesses across the globe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
