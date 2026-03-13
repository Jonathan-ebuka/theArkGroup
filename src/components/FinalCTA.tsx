"use client";

import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

export function FinalCTA() {
  return (
    <section className="bg-navy py-section-sm md:py-section">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-12">
        <ScrollReveal>
          <p className="mx-auto mb-16 max-w-2xl font-serif text-lg italic leading-relaxed text-offwhite/40 md:text-xl">
            &ldquo;Structure is the foundation of every enduring business.&rdquo;
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gold uppercase">
            Let&apos;s Build
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-tight font-light text-offwhite md:text-5xl lg:text-6xl">
            Build Properly.
            <br />
            Scale Intentionally.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-light">
            Ready to build something that lasts? Start a conversation with our
            team about your next strategic move.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-block border border-gold bg-gold px-10 py-4 text-sm tracking-widest text-navy uppercase transition-all duration-300 hover:scale-[1.03] hover:bg-gold-light"
            >
              Start a Conversation
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
