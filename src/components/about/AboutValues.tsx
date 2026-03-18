"use client";

import { useEffect, useRef } from "react";

const values = [
  {
    number: "01",
    title: "Precision over pace",
    body: "We move deliberately. Every recommendation is backed by analysis, every framework by evidence. Speed without structure creates problems we then have to solve.",
  },
  {
    number: "02",
    title: "Long-term architecture",
    body: "We build for what your business will be in five years, not what it needs this quarter. The work we do today should never need to be undone.",
  },
  {
    number: "03",
    title: "Radical honesty",
    body: "We tell clients what they need to hear, not what they want to. Our value is in our objectivity — an outside perspective unclouded by internal politics.",
  },
];

export function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = sectionRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.transitionDelay = `${el.dataset.delay ?? "0"}ms`;
            el.classList.add("opacity-100", "translate-y-0");
            el.classList.remove("opacity-0", "translate-y-8");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div
          data-reveal
          data-delay="0"
          className="opacity-0 translate-y-8 transition-all duration-700 ease-out mb-16"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
            How we work
          </p>
          <h2
            className="mt-4 font-sans text-3xl leading-tight text-[#111] md:text-4xl lg:text-5xl"
            style={{ fontWeight: 500 }}
          >
            Our operating values.
          </h2>
        </div>

        {/* Values list */}
        <div className="border-t border-gray-100">
          {values.map((v, i) => (
            <div
              key={v.number}
              data-reveal
              data-delay={i * 100}
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out grid grid-cols-1 gap-6 border-b border-gray-100 py-10 md:grid-cols-12 md:gap-8 md:py-14"
            >
              <span className="text-sm font-medium text-gray-400 md:col-span-2">
                {v.number}
              </span>
              <h3
                className="font-sans text-xl text-[#111] md:col-span-4 md:text-2xl"
                style={{ fontWeight: 500 }}
              >
                {v.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500 md:col-span-6 md:text-base">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
