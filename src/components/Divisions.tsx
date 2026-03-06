"use client";

import { StaggerReveal, StaggerItem } from "./StaggerReveal";
import { ScrollReveal } from "./ScrollReveal";

const divisions = [
  {
    name: "Ark Advisory",
    description:
      "Business formation, automation, and operational structure. We help founders and organisations build systems that work — and scale without breaking.",
    services: [
      "Business Formation",
      "Operational Systems",
      "Process Automation",
      "Strategic Planning",
    ],
  },
  {
    name: "Ark Capital",
    description:
      "Investment strategy, acquisition, and financial structuring. We deploy capital with precision, building portfolios designed for long-term, compounding returns.",
    services: [
      "Investment Strategy",
      "Acquisition Advisory",
      "Financial Structuring",
      "Portfolio Management",
    ],
  },
];

export function Divisions() {
  return (
    <section id="divisions" className="bg-navy py-section-sm md:py-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section header */}
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gold uppercase">
            Our Divisions
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-tight font-light text-offwhite md:text-5xl">
            Two Pillars.
            <br />
            One Architecture.
          </h2>
        </ScrollReveal>

        {/* Division cards */}
        <StaggerReveal className="mt-20 grid gap-8 md:grid-cols-2">
          {divisions.map((division) => (
            <StaggerItem key={division.name}>
              <div className="group rounded-sm border border-offwhite/8 bg-navy-light p-10 transition-all duration-500 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5 md:p-14">
                <h3 className="font-serif text-2xl font-light text-offwhite md:text-3xl">
                  {division.name}
                </h3>
                <p className="mt-6 leading-relaxed text-slate-light">
                  {division.description}
                </p>
                <ul className="mt-8 space-y-3">
                  {division.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-3 text-sm text-offwhite/60"
                    >
                      <span className="h-px w-4 bg-gold/50" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
