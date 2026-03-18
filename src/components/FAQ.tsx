"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    number: "001",
    question: "How can I determine if my business needs consulting?",
    answer:
      "If your business is experiencing stagnant growth, operational inefficiencies, or unclear strategic direction, consulting can provide the external perspective and structured frameworks needed to move forward. We typically begin with a discovery session to assess fit.",
  },
  {
    number: "002",
    question: "How do you customise your solutions for each client?",
    answer:
      "Every engagement starts with a deep audit of your existing systems, market position, and goals. From there we build a bespoke framework — no templates, no one-size-fits-all approaches. The work is always specific to your business context.",
  },
  {
    number: "003",
    question: "What is the typical process for engaging with your team?",
    answer:
      "We start with an initial conversation to understand your situation, followed by a scoping session to define scope and deliverables. From there we move into the engagement phase with clear milestones and regular check-ins throughout.",
  },
  {
    number: "004",
    question: "Do you offer ongoing support after the initial project completion?",
    answer:
      "Yes. Many of our clients retain us on an ongoing basis for strategic advisory, implementation oversight, and accountability. We structure retainers based on the level of involvement needed.",
  },
];

function FAQItem({
  item,
  isOpen,
  onToggle,
  delay,
  variant = "dark",
}: {
  item: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
  variant?: "dark" | "light";
}) {
  const answerRef = useRef<HTMLDivElement>(null);
  const light = variant === "light";

  return (
    <div
      data-reveal
      data-delay={delay}
      className={`opacity-0 translate-y-4 transition-all duration-700 ease-out border-b ${light ? "border-gray-100" : "border-white/10"}`}
    >
      <button
        onClick={onToggle}
        className="group flex w-full items-center gap-8 py-8 text-left md:py-10"
      >
        <span className={`shrink-0 text-sm font-medium md:w-16 ${light ? "text-gray-400" : "text-gray-500"}`}>
          {item.number}
        </span>
        <span className={`flex-1 font-sans text-base md:text-lg ${light ? "text-[#111]" : "text-white"}`} style={{ fontWeight: 400 }}>
          {item.question}
        </span>
        <span
          className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${light ? "border-gray-200 text-[#111] group-hover:border-gray-400" : "border-white/20 text-white group-hover:border-white/50"}`}
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease, border-color 0.3s ease" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </button>

      <div
        ref={answerRef}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: isOpen ? answerRef.current?.scrollHeight ?? 200 : 0, opacity: isOpen ? 1 : 0 }}
      >
        <p className={`pb-8 pl-0 text-sm leading-relaxed md:pl-24 md:text-base ${light ? "text-gray-500" : "text-gray-400"}`}>
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export function FAQ({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const light = variant === "light";

  useEffect(() => {
    const targets = sectionRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.transitionDelay = `${el.dataset.delay ?? 0}ms`;
            el.classList.add("opacity-100", "translate-y-0");
            el.classList.remove("opacity-0", "translate-y-4");
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
    <section ref={sectionRef} className={`${light ? "bg-white" : "bg-navy"} py-20`}>
      <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-20">
        <div
          data-reveal
          data-delay="0"
          className="opacity-0 translate-y-4 transition-all duration-700 ease-out mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className={`mb-3 text-xs font-medium uppercase tracking-[0.3em] ${light ? "text-gray-400" : "text-gray-500"}`}>
              FAQ
            </p>
            <h2 className={`font-sans text-3xl leading-tight md:text-4xl lg:text-5xl ${light ? "text-[#111]" : "text-white"}`} style={{ fontWeight: 500 }}>
              Common questions.
            </h2>
          </div>
        </div>

        <div className={`border-t ${light ? "border-gray-100" : "border-white/10"}`}>
          {faqs.map((item, i) => (
            <FAQItem
              key={item.number}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              delay={i * 80}
              variant={variant}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
