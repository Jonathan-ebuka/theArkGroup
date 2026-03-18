"use client";

import { useEffect, useRef } from "react";

const values = [
  {
    number: "001",
    title: "Integrity",
    description: "We maintain the highest ethical standards in every engagement.",
  },
  {
    number: "002",
    title: "Client-Centric",
    description: "We tailor our solutions to meet each client's unique needs.",
  },
  {
    number: "003",
    title: "Collaboration",
    description: "We believe in the power of teamwork with our clients.",
  },
  {
    number: "004",
    title: "Excellence",
    description: "Dedicated to delivering high-quality, compounding outcomes.",
  },
];

export function AboutContent() {
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
    <section ref={sectionRef} className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-20">
        {/* Top — two column header */}
        <div className="flex flex-col gap-12 md:flex-row md:gap-24 lg:gap-32">
          {/* Left label */}
          <div
            data-reveal
            data-delay="0"
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out md:w-[30%]"
          >
            <p className="font-sans text-base leading-snug text-[#111]" style={{ fontWeight: 500 }}>
              Customized to meet
              <br />
              bold challenges
            </p>
          </div>

          {/* Right body + CTA */}
          <div
            data-reveal
            data-delay="120"
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out md:w-[70%]"
          >
            <p className="font-sans text-3xl leading-snug tracking-tight text-[#111] md:text-4xl lg:text-5xl" style={{ fontWeight: 500 }}>
              Our comprehensive suite of services are crafted to meet the needs of our clients.
            </p>
          </div>
        </div>

        {/* Bottom — values grid */}
        <div className="mt-14 md:mt-20">
          {/* Label */}
          <div
            data-reveal
            data-delay="0"
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out mb-8 flex items-center gap-2"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-gray-600">
              Our values
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <path d="M7 7l10 10M17 7v10H7" />
            </svg>
          </div>

          {/* 4-column grid */}
          <div className="grid grid-cols-1 border-t border-gray-100 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <div
                key={value.number}
                data-reveal
                data-delay={i * 80}
                className="opacity-0 translate-y-8 transition-all duration-700 ease-out border-l border-gray-100 px-6 py-12 first:border-l-0 sm:odd:border-l-0 lg:odd:border-l lg:first:border-l-0"
              >
                <span className="text-sm font-medium text-gray-400">{value.number}</span>
                <h3 className="mt-10 font-sans text-lg text-[#111]" style={{ fontWeight: 600 }}>
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
