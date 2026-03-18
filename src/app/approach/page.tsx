"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { StickyContentSwitch } from "@/components/StickyContentSwitch";

const principles = [
  {
    number: "01",
    title: "Clarity",
    description: "Every engagement begins with deep understanding of the business, market, and structural constraints. We define before we build.",
    detail: "We audit existing systems, map market positioning, and identify the structural gaps that are holding growth back. No assumptions — only precision.",
    image: "/images/approach/clarity.jpg",
  },
  {
    number: "02",
    title: "Structure",
    description: "Design operational and financial systems that support long term growth. No shortcuts. No patchwork. Architecture built to last.",
    detail: "From entity formation to capital stack design, we build frameworks that don't need to be rebuilt every 18 months. One architecture, built once, scaled forever.",
    image: "/images/approach/structure.jpg",
  },
  {
    number: "03",
    title: "Scale",
    description: "Position businesses for sustainable expansion once the correct foundation is built. Growth becomes inevitable when structure precedes it.",
    detail: "We deploy capital, activate partnerships, and optimise operations so that every dollar and every decision compounds. Growth isn't a phase — it's the system.",
    image: "/images/approach/scale.jpg",
  },
];

const process = [
  { step: "01", label: "Discovery", text: "We listen. Deep-dive into your business, market, and goals to understand the full picture before making a single recommendation." },
  { step: "02", label: "Architecture", text: "We design the structure — operational systems, financial models, and strategic positioning tailored to your specific trajectory." },
  { step: "03", label: "Execution", text: "We build alongside you. Implementation is hands-on, not handed off. Every system is stress-tested and refined in real conditions." },
  { step: "04", label: "Optimisation", text: "We measure, iterate, and compound. Ongoing advisory ensures the architecture evolves as you scale, never becoming a bottleneck." },
];

export default function ApproachPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = pageRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
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
    <div ref={pageRef}>
      {/* Hero */}
      <section className="bg-white pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div
              data-reveal
              data-delay="0"
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out lg:w-[60%]"
            >
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                Our Approach
              </p>
              <h1
                className="mt-6 font-sans text-4xl leading-[1.1] tracking-tight text-[#111] sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ fontWeight: 500 }}
              >
                Three principles.
                <br />
                <span className="text-[#111]/35">One discipline.</span>
              </h1>
            </div>
            <div
              data-reveal
              data-delay="150"
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out lg:w-[35%]"
            >
              <p className="text-base leading-relaxed text-gray-500">
                We don&rsquo;t chase trends or sell frameworks. Every engagement
                is built on three non-negotiable principles that drive everything
                we do — from first conversation to long-term growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles — sticky content switch */}
      <StickyContentSwitch principles={principles} />

      {/* Process */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-20">
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
              From discovery to
              <br />
              compound growth.
            </h2>
          </div>

          <div className="border-t border-gray-100">
            {process.map((item, i) => (
              <div
                key={item.step}
                data-reveal
                data-delay={i * 100}
                className="opacity-0 translate-y-8 transition-all duration-700 ease-out grid grid-cols-1 gap-6 border-b border-gray-100 py-10 md:grid-cols-12 md:gap-8 md:py-14"
              >
                <span className="text-sm font-medium text-gray-400 md:col-span-2">{item.step}</span>
                <h3
                  className="font-sans text-xl text-[#111] md:col-span-3 md:text-2xl"
                  style={{ fontWeight: 500 }}
                >
                  {item.label}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 md:col-span-7 md:text-base">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white pb-24 md:pb-32">
        <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-20">
          <div
            data-reveal
            data-delay="0"
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Ready to build?</p>
              <h2
                className="mt-4 font-sans text-3xl leading-tight text-[#111] md:text-4xl lg:text-5xl"
                style={{ fontWeight: 500 }}
              >
                Start with a
                <br />
                single conversation.
              </h2>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden border border-gold px-8 py-4 text-sm font-medium tracking-wide text-gold"
              >
                <span className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative transition-colors duration-300 group-hover:text-white">Start a conversation</span>
                <svg className="relative h-4 w-4 transition-all duration-300 group-hover:text-white group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="text-xs text-gray-400">We respond within 48 hours.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
