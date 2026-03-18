"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const divisions = [
  {
    number: "001",
    name: "Ark Advisory",
    tagline: "Strategy. Structure. Systems.",
    description:
      "Business formation, automation, and operational structure. We help founders and organisations build systems that work — and scale without breaking.",
    services: ["Business Formation", "Operational Systems", "Process Automation", "Strategic Planning"],
    href: "/automation",
    cta: "Explore Ark Advisory",
  },
  {
    number: "002",
    name: "Ark Capital",
    tagline: "Deploy. Structure. Compound.",
    description:
      "Investment strategy, acquisition, and financial structuring. We deploy capital with precision, building portfolios designed for long-term, compounding returns.",
    services: ["Investment Strategy", "Acquisition Advisory", "Financial Structuring", "Portfolio Management"],
    href: "/contact",
    cta: "Speak to Our Capital Team",
  },
];

export default function DivisionsPage() {
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
                The Ark Framework
              </p>
              <h1
                className="mt-6 font-sans text-4xl leading-[1.1] tracking-tight text-[#111] sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ fontWeight: 500 }}
              >
                One architecture.
                <br />
                <span className="text-[#111]/35">Two divisions.</span>
              </h1>
            </div>
            <div
              data-reveal
              data-delay="150"
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out lg:w-[35%]"
            >
              <p className="text-base leading-relaxed text-gray-500">
                The Ark Group operates through two focused divisions — each
                designed to build and compound value across the businesses and
                portfolios we work with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divisions list */}
      <section className="bg-white py-8 md:py-12">
        <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-20">
          <div className="border-t border-gray-100">
            {divisions.map((division, i) => (
              <div
                key={division.number}
                data-reveal
                data-delay={i * 120}
                className="opacity-0 translate-y-8 transition-all duration-700 ease-out border-b border-gray-100 py-14 md:py-20"
              >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
                  {/* Number */}
                  <div className="md:col-span-2">
                    <span className="text-sm font-medium text-gray-400">{division.number}</span>
                  </div>
                  {/* Name + tagline */}
                  <div className="md:col-span-4">
                    <h2
                      className="font-sans text-3xl text-[#111] md:text-4xl lg:text-5xl"
                      style={{ fontWeight: 500 }}
                    >
                      {division.name}
                    </h2>
                    <p className="mt-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
                      {division.tagline}
                    </p>
                  </div>
                  {/* Description + services + CTA */}
                  <div className="md:col-span-6">
                    <p className="text-base leading-relaxed text-gray-500">{division.description}</p>
                    <ul className="mt-8 space-y-2">
                      {division.services.map((s) => (
                        <li key={s} className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="h-px w-4 bg-gray-300" />
                          {s}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={division.href}
                      className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden border border-gold px-6 py-3 text-sm font-medium tracking-wide text-gold transition-colors duration-300"
                    >
                      <span className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
                      <span className="relative transition-colors duration-300 group-hover:text-white">{division.cta}</span>
                      <svg className="relative h-4 w-4 transition-all duration-300 group-hover:text-white group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-20">
          <div
            data-reveal
            data-delay="0"
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Not sure where to start?</p>
              <h2
                className="mt-4 font-sans text-3xl leading-tight text-[#111] md:text-4xl lg:text-5xl"
                style={{ fontWeight: 500 }}
              >
                Tell us where your
                <br />
                business is headed.
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
