"use client";

import { ScrollReveal } from "./ScrollReveal";
import { StaggerReveal, StaggerItem } from "./StaggerReveal";

const principles = [
  {
    number: "01",
    title: "Clarity",
    description:
      "Before we build, we define. Every engagement starts with a sharp understanding of the landscape, the opportunity, and the structural requirements for success.",
  },
  {
    number: "02",
    title: "Structure",
    description:
      "We design operational and financial systems that are built to last. No shortcuts. No patchwork. Architecture that supports growth at every stage.",
  },
  {
    number: "03",
    title: "Scale",
    description:
      "With the right foundation in place, growth becomes inevitable. We position every venture for sustainable, compounding scale — not quick wins.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="bg-offwhite py-section-sm md:py-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section header */}
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gold uppercase">
            Our Approach
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-tight font-light text-navy md:text-5xl">
            Three Principles.
            <br />
            One Discipline.
          </h2>
        </ScrollReveal>

        {/* Principles grid */}
        <StaggerReveal className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
          {principles.map((principle) => (
            <StaggerItem key={principle.number}>
              <div className="group">
                <span className="text-sm tracking-widest text-gold/70">
                  {principle.number}
                </span>
                <div className="mt-4 mb-6 h-px w-full bg-navy/10 transition-colors duration-500 group-hover:bg-gold/30" />
                <h3 className="font-serif text-2xl font-light text-navy md:text-3xl">
                  {principle.title}
                </h3>
                <p className="mt-4 leading-relaxed text-slate-light">
                  {principle.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
