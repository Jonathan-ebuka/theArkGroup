import Link from "next/link";
import { SectionDivider } from "@/components/SectionDivider";

const capabilities = [
  {
    number: "01",
    title: "AI Accounting Automation",
    description:
      "Eliminate manual bookkeeping and reconciliation. We design AI-powered accounting workflows that process transactions, generate reports, and surface insights in real time.",
  },
  {
    number: "02",
    title: "Lead Generation Systems",
    description:
      "Build automated pipelines that identify, qualify, and nurture leads without manual intervention — so your team focuses on closing, not prospecting.",
  },
  {
    number: "03",
    title: "CRM Intelligence",
    description:
      "Transform your CRM from a static database into an active growth engine. AI-driven workflows surface the right opportunities at the right time.",
  },
  {
    number: "04",
    title: "Operational Workflow Automation",
    description:
      "Connect fragmented systems and automate repetitive processes across your entire operation — from onboarding to fulfilment to reporting.",
  },
];

export default function AutomationPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-32 pb-section-sm md:pb-section">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Eyebrow */}
          <div data-animate="slide-left" className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-gold" />
            <p className="text-xs tracking-[0.3em] text-gold uppercase">
              A Capability of Ark Advisory
            </p>
          </div>

          {/* Big headline */}
          <h1
            data-animate="fade-up"
            className="mt-10 font-display text-[clamp(2.5rem,7vw,7rem)] leading-[1.05] font-extrabold tracking-tight text-offwhite uppercase"
          >
            Operational Systems
            <br />
            <span className="text-gold">That Think.</span>
          </h1>

          {/* Subtext */}
          <p
            data-animate="fade-up"
            className="mt-10 max-w-2xl text-lg leading-relaxed text-offwhite/70 md:text-xl"
          >
            Ark Automation designs AI-powered workflows that eliminate manual
            operations, connect fragmented systems, and allow businesses to scale
            without operational bottlenecks.
          </p>
        </div>
      </section>

      <SectionDivider variant="dark" />

      {/* Capabilities */}
      <section className="bg-navy py-section-sm md:py-section">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div data-animate="slide-left" className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-gold" />
            <p className="text-xs tracking-[0.3em] text-gold uppercase">
              What We Build
            </p>
          </div>

          <h2
            data-animate="fade-up"
            className="mt-10 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.1] font-extrabold tracking-tight text-offwhite uppercase"
          >
            Automation
            <br />
            <span className="text-gold">Capabilities.</span>
          </h2>

          <div className="mt-20 grid gap-px bg-offwhite/10 md:grid-cols-2">
            {capabilities.map((item) => (
              <div
                key={item.number}
                data-animate="stagger-in"
                className="group bg-navy p-8 transition-colors duration-500 hover:bg-navy-light md:p-12"
              >
                <span className="text-xs tracking-widest text-gold/60">
                  {item.number}
                </span>
                <h3 className="mt-4 font-serif text-xl font-light text-offwhite md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-light">
                  {item.description}
                </p>
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
                Ready to Automate
                <br />
                <span className="text-gold">Your Operations?</span>
              </h2>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-offwhite/70">
                Tell us where your team is losing time and we&rsquo;ll design
                systems that give it back — permanently.
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
