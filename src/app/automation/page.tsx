"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useCallback } from "react";

const NeuralSwarm = dynamic(
  () => import("@/components/NeuralSwarm").then((m) => m.NeuralSwarm),
  { ssr: false }
);

function CountUp({ target, suffix = "", duration = 1500 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    const stepTime = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const capabilities = [
  {
    number: "001",
    title: "AI Accounting Automation",
    description: "Eliminate manual bookkeeping and reconciliation. We design AI-powered accounting workflows that process transactions, generate reports, and surface insights in real time.",
  },
  {
    number: "002",
    title: "Lead Generation Systems",
    description: "Build automated pipelines that identify, qualify, and nurture leads without manual intervention — so your team focuses on closing, not prospecting.",
  },
  {
    number: "003",
    title: "CRM Intelligence",
    description: "Transform your CRM from a static database into an active growth engine. AI-driven workflows surface the right opportunities at the right time.",
  },
  {
    number: "004",
    title: "Operational Workflow Automation",
    description: "Connect fragmented systems and automate repetitive processes across your entire operation — from onboarding to fulfilment to reporting.",
  },
];

const outcomes = [
  { value: 80, suffix: "%", label: "Reduction in manual admin hours" },
  { value: 3, suffix: "×", label: "Faster lead response time" },
  { value: 100, suffix: "%", label: "System visibility, no blind spots" },
];

export default function AutomationPage() {
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
      {/* Hero + Outcomes */}
      <section className="relative overflow-hidden bg-navy">
        <NeuralSwarm />
        {/* Semi-transparent overlay so text is readable */}
        <div className="absolute inset-0 z-[1] bg-navy/60" />

        <div className="relative z-10">
          {/* Hero content */}
          <div className="mx-auto max-w-360 px-6 pt-32 pb-20 md:px-12 md:pt-40 md:pb-28 lg:px-20">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
              <div
                data-reveal
                data-delay="0"
                className="opacity-0 translate-y-8 transition-all duration-700 ease-out lg:w-[60%]"
              >
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                  A Capability of Ark Advisory
                </p>
                <h1
                  className="mt-6 font-sans text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                  style={{ fontWeight: 500 }}
                >
                  Operational systems
                  <br />
                  <span className="text-white/35">that think.</span>
                </h1>
              </div>
              <div
                data-reveal
                data-delay="150"
                className="opacity-0 translate-y-8 transition-all duration-700 ease-out lg:w-[35%]"
              >
                <p className="text-base leading-relaxed text-gray-300">
                  Ark Automation designs AI-powered workflows that eliminate manual
                  operations, connect fragmented systems, and allow businesses to
                  scale without operational bottlenecks.
                </p>
              </div>
            </div>
          </div>

          {/* Outcomes bar */}
          <div className="mx-auto max-w-360 px-6 pb-16 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-3">
              {outcomes.map((o) => (
                <div key={o.label} className="bg-white/5 px-8 py-10 backdrop-blur-sm">
                  <p className="font-sans text-4xl text-white md:text-5xl" style={{ fontWeight: 500 }}>
                    <CountUp target={o.value} suffix={o.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-gray-300">{o.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities list */}
      <section className="bg-white py-8 md:py-12">
        <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-20">
          <div
            data-reveal
            data-delay="0"
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out mb-12"
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">What we build</p>
            <h2
              className="mt-4 font-sans text-3xl leading-tight text-[#111] md:text-4xl"
              style={{ fontWeight: 500 }}
            >
              Automation capabilities.
            </h2>
          </div>

          <div className="border-t border-gray-100">
            {capabilities.map((item, i) => (
              <div
                key={item.number}
                data-reveal
                data-delay={i * 100}
                className="opacity-0 translate-y-8 transition-all duration-700 ease-out grid grid-cols-1 gap-6 border-b border-gray-100 py-6 md:grid-cols-12 md:gap-8 md:py-8"
              >
                <span className="text-sm font-medium text-gray-400 md:col-span-2">{item.number}</span>
                <h3
                  className="font-sans text-xl text-[#111] md:col-span-4 md:text-2xl"
                  style={{ fontWeight: 500 }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 md:col-span-6 md:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-24 md:py-32">
        <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-20">
          <div
            data-reveal
            data-delay="0"
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">Ready to automate?</p>
              <h2
                className="mt-4 font-sans text-3xl leading-tight text-white md:text-4xl lg:text-5xl"
                style={{ fontWeight: 500 }}
              >
                Tell us where your
                <br />
                team is losing time.
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
              <p className="text-xs text-gray-500">We respond within 48 hours.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
