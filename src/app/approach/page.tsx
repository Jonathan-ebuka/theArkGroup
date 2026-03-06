import Link from "next/link";
import { SectionDivider } from "@/components/SectionDivider";

const principles = [
  {
    number: "01",
    title: "Clarity",
    description:
      "Before we build, we define. Every engagement starts with a sharp understanding of the landscape, the opportunity, and the structural requirements for success.",
    detail:
      "We audit existing systems, map market positioning, and identify the structural gaps that are holding growth back. No assumptions — only precision.",
  },
  {
    number: "02",
    title: "Structure",
    description:
      "We design operational and financial systems that are built to last. No shortcuts. No patchwork. Architecture that supports growth at every stage.",
    detail:
      "From entity formation to capital stack design, we build frameworks that don't need to be rebuilt every 18 months. One architecture, built once, scaled forever.",
  },
  {
    number: "03",
    title: "Scale",
    description:
      "With the right foundation in place, growth becomes inevitable. We position every venture for sustainable, compounding scale — not quick wins.",
    detail:
      "We deploy capital, activate partnerships, and optimise operations so that every dollar and every decision compounds. Growth isn't a phase — it's the system.",
  },
];

const process = [
  {
    step: "01",
    label: "Discovery",
    text: "We listen. Deep-dive into your business, market, and goals to understand the full picture before making a single recommendation.",
  },
  {
    step: "02",
    label: "Architecture",
    text: "We design the structure — operational systems, financial models, and strategic positioning tailored to your specific trajectory.",
  },
  {
    step: "03",
    label: "Execution",
    text: "We build alongside you. Implementation is hands-on, not handed off. Every system is stress-tested and refined in real conditions.",
  },
  {
    step: "04",
    label: "Optimisation",
    text: "We measure, iterate, and compound. Ongoing advisory ensures the architecture evolves as you scale, never becoming a bottleneck.",
  },
];

export default function ApproachPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-offwhite pt-32 pb-section-sm md:pb-section">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Eyebrow */}
          <div data-animate="slide-left" className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-navy" />
            <p className="text-xs tracking-[0.3em] text-navy uppercase">
              Our Approach
            </p>
          </div>

          {/* Big headline */}
          <h1 data-animate="fade-up" className="mt-10 font-display text-[clamp(2.5rem,7vw,7rem)] leading-[1.05] font-extrabold tracking-tight text-navy uppercase">
            Three Principles.
            <br />
            <span className="text-gold">One Discipline.</span>
          </h1>

          {/* Subtext */}
          <p data-animate="fade-up" className="mt-10 max-w-2xl text-lg leading-relaxed text-slate md:text-xl">
            We don&rsquo;t chase trends or sell frameworks. Every engagement is
            built on three non-negotiable principles that drive everything we
            do&nbsp;&mdash; from first conversation to long-term growth.
          </p>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Principles — deep dive */}
      <section className="bg-offwhite py-section-sm md:py-section">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="space-y-24 md:space-y-32">
            {principles.map((p, i) => (
              <div
                key={p.number}
                className={`grid gap-10 md:grid-cols-[1fr_1.5fr] md:gap-20 ${
                  i % 2 !== 0 ? "md:direction-rtl" : ""
                }`}
              >
                {/* Left — number + title */}
                <div data-animate="fade-up" className={i % 2 !== 0 ? "md:order-2" : ""}>
                  <span className="text-sm tracking-widest text-gold/70">
                    {p.number}
                  </span>
                  <h2 className="mt-4 font-serif text-4xl leading-tight font-light text-navy md:text-5xl">
                    {p.title}
                  </h2>
                  <div data-animate="expand-width" className="mt-6 h-px w-12 bg-gold" />
                </div>

                {/* Right — description + detail */}
                <div data-animate="fade-up" className={i % 2 !== 0 ? "md:order-1" : ""}>
                  <p className="text-lg leading-relaxed text-slate">
                    {p.description}
                  </p>
                  <p className="mt-6 leading-relaxed text-slate-light">
                    {p.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="light" />

      {/* Process */}
      <section className="bg-navy py-section-sm md:py-section">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div data-animate="slide-left" className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-gold" />
            <p className="text-xs tracking-[0.3em] text-gold uppercase">
              How We Work
            </p>
          </div>

          <h2 data-animate="fade-up" className="mt-10 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.1] font-extrabold tracking-tight text-offwhite uppercase">
            From Discovery
            <br />
            <span className="text-gold">To Compound Growth.</span>
          </h2>

          {/* Process steps */}
          <div className="mt-20 grid gap-px bg-offwhite/10 md:grid-cols-4">
            {process.map((item) => (
              <div
                key={item.step}
                data-animate="stagger-in"
                className="group bg-navy p-8 transition-colors duration-500 hover:bg-navy-light md:p-10"
              >
                <span className="text-xs tracking-widest text-gold/60">
                  {item.step}
                </span>
                <h3 className="mt-4 font-serif text-xl font-light text-offwhite md:text-2xl">
                  {item.label}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-light">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="dark" />

      {/* CTA */}
      <section className="bg-offwhite py-section-sm md:py-section">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div data-animate="fade-up">
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] font-extrabold tracking-tight text-navy uppercase">
                Ready to Build
                <br />
                <span className="text-gold">With Structure?</span>
              </h2>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-slate">
                Every great outcome starts with a conversation. Tell us where
                you are and where you want to be — we&rsquo;ll show you the
                architecture to get there.
              </p>
            </div>
            <div data-animate="fade-up" className="flex flex-col items-start gap-6 md:items-end">
              <Link
                href="/contact"
                className="inline-block border border-gold bg-gold px-12 py-5 text-sm tracking-widest text-navy uppercase transition-all duration-300 hover:scale-[1.03] hover:bg-gold-light"
              >
                Start a Conversation
              </Link>
              <p className="text-xs tracking-wide text-slate-light">
                We respond within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
