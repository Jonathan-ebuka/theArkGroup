"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const services = [
  {
    number: "001",
    title: "Strategy",
    description:
      "Our strategy services are designed to help businesses navigate the complexities of the modern market...",
  },
  {
    number: "002",
    title: "Operations",
    description:
      "Intensive leadership training programs that foster essential skills such as critical thinking and agility.",
  },
  {
    number: "003",
    title: "Automation",
    description:
      "Implement cutting-edge automation technologies that streamline workflows and eliminate bottlenecks.",
  },
];

export function Approach() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = sectionRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ?? "0";
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add("opacity-100", "translate-y-0");
            el.classList.remove("opacity-0", "translate-y-6");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="approach" ref={sectionRef} className="bg-white py-20">
      <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="relative mb-20 flex flex-col items-start justify-between gap-8 lg:mb-28 lg:flex-row">
          <div
            data-reveal
            data-delay="0"
            className="opacity-0 translate-y-6 transition-all duration-700 ease-out lg:w-3/4"
          >
            <h2 className="font-sans text-2xl leading-[1.1] tracking-tight text-[#111] sm:text-3xl md:text-4xl lg:text-5xl" style={{ fontWeight: 500 }}>
              Our comprehensive suite of<br />
              services are crafted to meet<br />
              the needs of our clients.
            </h2>
          </div>
          <div
            data-reveal
            data-delay="150"
            className="opacity-0 translate-y-6 transition-all duration-700 ease-out flex justify-end lg:w-1/3"
          >
            <div className="relative w-full max-w-60 overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800"
                alt="Working on laptop"
                width={800}
                height={600}
                className="aspect-4/3 w-full object-cover grayscale-20 transition-all duration-700 hover:grayscale-0"
              />
            </div>
          </div>
        </div>

        {/* Label */}
        <div
          data-reveal
          data-delay="0"
          className="opacity-0 translate-y-6 transition-all duration-700 ease-out mb-8 flex items-center gap-2"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-gray-600">
            Our services
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
            <path d="M7 7l10 10M17 7v10H7" />
          </svg>
        </div>

        {/* Services List */}
        <div className="border-t border-gray-100">
          {services.map((service, i) => (
            <div
              key={service.number}
              data-reveal
              data-delay={i * 100}
              className="opacity-0 translate-y-6 transition-all duration-700 ease-out"
            >
              <div className="block border-b border-gray-100 py-8 md:py-10">
                <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12 md:gap-4">
                  {/* Number */}
                  <div className="md:col-span-2">
                    <div className="relative h-6 overflow-hidden">
                      <span className="block text-base font-medium text-gray-400">
                        {service.number}
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="font-sans text-2xl text-[#111] md:text-3xl lg:text-4xl" style={{ fontWeight: 500 }}>
                      {service.title}
                    </h3>
                  </div>
                  <div className="md:col-span-5">
                    <p className="max-w-sm text-sm leading-relaxed text-gray-500">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
