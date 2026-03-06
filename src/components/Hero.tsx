"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center bg-offwhite px-6 pt-28 pb-20 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        {/* Massive headline */}
        <h1
          className="hero-fade-up font-display text-[clamp(2.5rem,7.5vw,8rem)] leading-[1.05] font-extrabold tracking-tight text-navy uppercase"
          style={{ animationDelay: "0.2s" }}
        >
          We Build Structures
        </h1>
        <h2
          className="hero-fade-up mt-1 font-display text-[clamp(2.5rem,7.5vw,8rem)] leading-[1.05] font-extrabold tracking-tight text-gold uppercase"
          style={{ animationDelay: "0.35s" }}
        >
          That Multiply.
        </h2>

        {/* Credibility bar */}
        <div
          className="hero-fade-up mt-12 flex flex-wrap items-center gap-6"
          style={{ animationDelay: "0.55s" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-offwhite bg-navy text-[10px] font-medium text-offwhite/70"
                >
                  {["JO", "AK", "SC", "MT"][i]}
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-medium tracking-widest text-navy uppercase">
                Trusted by founders &amp; operators
              </p>
              <p className="text-xs tracking-wide text-slate-light uppercase">
                Across advisory, capital &amp; structuring
              </p>
            </div>
          </div>
        </div>

        {/* Subtext + CTAs */}
        <div
          className="hero-fade-up mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
          style={{ animationDelay: "0.7s" }}
        >
          <p className="max-w-lg text-lg leading-relaxed text-slate md:text-xl">
            Strategic advisory, operational systems, and capital architecture
            designed for long-term growth &mdash;{" "}
            <span className="font-medium text-navy">without the noise.</span>
          </p>

          <div className="flex flex-shrink-0 flex-wrap items-center gap-5">
            <Link
              href="/contact"
              className="inline-block border border-gold bg-gold px-8 py-4 text-sm tracking-widest text-navy uppercase transition-all duration-300 hover:scale-[1.03] hover:bg-gold-light"
            >
              Work With Us
            </Link>
            <Link
              href="#divisions"
              className="group inline-flex items-center gap-2 text-sm tracking-widest text-slate uppercase transition-colors duration-300 hover:text-navy"
            >
              Our Divisions
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
