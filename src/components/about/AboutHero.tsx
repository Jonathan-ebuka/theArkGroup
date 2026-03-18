"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lines = section.querySelectorAll<HTMLElement>("[data-line]");
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.style.transform = "translateY(0)";
        line.style.opacity = "1";
      }, 200 + i * 120);
    });

    const reveals = section.querySelectorAll<HTMLElement>("[data-reveal]");
    reveals.forEach((el) => {
      const delay = parseInt(el.dataset.delay ?? "0");
      setTimeout(() => {
        el.classList.add("opacity-100", "translate-y-0", "scale-100", "blur-0");
        el.classList.remove("opacity-0", "translate-y-8", "scale-95", "blur-sm");
      }, delay);
    });

    const img = section.querySelector<HTMLElement>("[data-img-reveal]");
    if (img) {
      setTimeout(() => {
        img.style.clipPath = "inset(0 0 0 0)";
        img.style.transform = "scale(1)";
        img.style.opacity = "1";
      }, 400);
    }
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:justify-between">
          {/* Left — founder image + name + quote */}
          <div className="order-last lg:order-first lg:w-[40%] lg:self-stretch flex flex-col">
            <div
              data-img-reveal
              className="overflow-hidden rounded-sm max-w-xs flex-1 shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_4px_8px_rgba(0,0,0,0.04),0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-1000 ease-out"
              style={{
                clipPath: "inset(100% 0 0 0)",
                transform: "scale(1.05)",
                opacity: 0,
              }}
            >
              <Image
                src="/images/founder.png"
                alt="Israel — Founder, The Ark Group"
                width={400}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>

            <div
              data-reveal
              data-delay="800"
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out mt-6"
            >
              <p className="font-sans text-lg text-[#111]" style={{ fontWeight: 600 }}>
                Israel
              </p>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Founder & Principal
              </p>
              <blockquote className="mt-4 border-l-2 border-gold pl-4">
                <p className="text-sm leading-relaxed text-gray-500 italic">
                  &ldquo;We don&apos;t build for speed — we build for permanence. Every structure we design is meant to outlast the cycle that inspired it.&rdquo;
                </p>
              </blockquote>
            </div>
          </div>

          {/* Right — heading + CTA */}
          <div className="lg:w-[55%] text-center flex flex-col items-center justify-center">
            <h1 className="font-sans text-4xl leading-[1.1] tracking-tight text-[#111] sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontWeight: 500 }}>
              <span className="block overflow-hidden">
                <span
                  data-line
                  className="block transition-all duration-700 ease-out"
                  style={{ transform: "translateY(100%)", opacity: 0 }}
                >
                  Strategic goals
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  data-line
                  className="block text-[#111]/40 transition-all duration-700 ease-out"
                  style={{ transform: "translateY(100%)", opacity: 0 }}
                >
                  for lasting growth.
                </span>
              </span>
            </h1>

            <div
              data-reveal
              data-delay="600"
              className="opacity-0 translate-y-8 blur-sm scale-95 transition-all duration-1000 ease-out mt-16 max-w-sm"
            >
              <p className="font-sans text-sm font-semibold text-[#111]">
                We&apos;re your partners in growth
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Dedicated to building the operational, financial, and strategic
                foundations that make long-term scale inevitable.
              </p>
              <Link
                href="/contact"
                className="group relative mt-6 inline-flex items-center gap-3 overflow-hidden border border-gold px-6 py-3 text-sm font-medium tracking-wide text-gold transition-colors duration-300"
              >
                <span className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative transition-colors duration-300 group-hover:text-white">
                  Start a conversation
                </span>
                <svg
                  className="relative h-4 w-4 transition-all duration-300 group-hover:text-white group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
