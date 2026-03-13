import Link from "next/link";
import { SectionDivider } from "@/components/SectionDivider";

const divisions = [
  {
    number: "01",
    name: "Ark Advisory",
    tagline: "Strategy. Structure. Systems.",
    description:
      "Business formation, automation, and operational structure. We help founders and organisations build systems that work — and scale without breaking.",
    services: [
      "Business Formation",
      "Operational Systems",
      "Process Automation",
      "Strategic Planning",
    ],
    href: "/automation",
    cta: "Explore Ark Advisory",
  },
  {
    number: "02",
    name: "Ark Capital",
    tagline: "Deploy. Structure. Compound.",
    description:
      "Investment strategy, acquisition, and financial structuring. We deploy capital with precision, building portfolios designed for long-term, compounding returns.",
    services: [
      "Investment Strategy",
      "Acquisition Advisory",
      "Financial Structuring",
      "Portfolio Management",
    ],
    href: "/contact",
    cta: "Speak to Our Capital Team",
  },
];

export default function DivisionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-32 pb-section-sm md:pb-section">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div data-animate="slide-left" className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-gold" />
            <p className="text-xs tracking-[0.3em] text-gold uppercase">
              The Ark Framework
            </p>
          </div>

          <h1
            data-animate="fade-up"
            className="mt-10 font-display text-[clamp(2.5rem,7vw,7rem)] leading-[1.05] font-extrabold tracking-tight text-offwhite uppercase"
          >
            One Architecture.
            <br />
            <span className="text-gold">Two Divisions.</span>
          </h1>

          <p
            data-animate="fade-up"
            className="mt-10 max-w-2xl text-lg leading-relaxed text-offwhite/70 md:text-xl"
          >
            The Ark Group operates through two focused divisions — each designed
            to build and compound value across the businesses and portfolios we
            work with.
          </p>
        </div>
      </section>

      <SectionDivider variant="dark" />

      {/* Divisions — deep cards */}
      <section className="bg-navy py-section-sm md:py-section">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="space-y-px bg-offwhite/10">
            {divisions.map((division) => (
              <div
                key={division.number}
                data-animate="fade-up"
                className="group bg-navy p-10 transition-colors duration-500 hover:bg-navy-light md:p-16"
              >
                <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-20 md:items-start">
                  {/* Left */}
                  <div>
                    <span className="text-xs tracking-widest text-gold/60">
                      {division.number}
                    </span>
                    <h2 className="mt-4 font-serif text-3xl font-light text-offwhite md:text-4xl">
                      {division.name}
                    </h2>
                    <p className="mt-2 text-sm tracking-widest text-gold uppercase">
                      {division.tagline}
                    </p>
                    <div className="mt-6 h-px w-12 bg-gold/50" />
                  </div>

                  {/* Right */}
                  <div>
                    <p className="text-lg leading-relaxed text-offwhite/70">
                      {division.description}
                    </p>

                    <ul className="mt-8 space-y-3">
                      {division.services.map((service) => (
                        <li
                          key={service}
                          className="flex items-center gap-3 text-sm text-offwhite/50"
                        >
                          <span className="h-px w-4 bg-gold/40" />
                          {service}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={division.href}
                      className="mt-10 inline-block border border-offwhite/20 px-8 py-4 text-xs tracking-widest text-offwhite/60 uppercase transition-all duration-300 hover:border-gold hover:text-gold"
                    >
                      {division.cta}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="dark" />

      {/* CTA */}
      <section className="bg-navy py-section-sm md:py-section">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div data-animate="fade-up">
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] font-extrabold tracking-tight text-offwhite uppercase">
                Not Sure Where
                <br />
                <span className="text-gold">To Start?</span>
              </h2>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-offwhite/70">
                Tell us where your business is and what you&rsquo;re building
                toward — we&rsquo;ll identify which division and services are
                the right fit.
              </p>
            </div>
            <div
              data-animate="fade-up"
              className="flex flex-col items-start gap-6 md:items-end"
            >
              <Link
                href="/contact"
                className="inline-block border border-gold bg-gold px-12 py-5 text-sm tracking-widest text-navy uppercase transition-all duration-300 hover:scale-[1.03] hover:bg-gold-light"
              >
                Start a Conversation
              </Link>
              <p className="text-xs tracking-wide text-offwhite/40">
                We respond within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
