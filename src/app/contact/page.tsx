"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import emailjs from "@emailjs/browser";

const SYMBOLS = [
  { symbol: "+", top: 5,  left: 3,   size: 6,   speed: 0.22, color: "navy" },
  { symbol: "×", top: 10, left: 88,  size: 4,   speed: 0.30, color: "gold" },
  { symbol: "+", top: 22, left: 70,  size: 8,   speed: 0.14, color: "navy" },
  { symbol: "×", top: 30, left: 12,  size: 3.5, speed: 0.28, color: "gold" },
  { symbol: "+", top: 45, left: 92,  size: 5,   speed: 0.18, color: "navy" },
  { symbol: "×", top: 52, left: 38,  size: 9,   speed: 0.11, color: "navy" },
  { symbol: "+", top: 63, left: 6,   size: 4,   speed: 0.26, color: "gold" },
  { symbol: "×", top: 70, left: 62,  size: 5.5, speed: 0.16, color: "navy" },
  { symbol: "+", top: 80, left: 25,  size: 3,   speed: 0.24, color: "gold" },
  { symbol: "×", top: 88, left: 80,  size: 7,   speed: 0.13, color: "navy" },
  { symbol: "+", top: 15, left: 50,  size: 3.5, speed: 0.20, color: "gold" },
  { symbol: "×", top: 40, left: 20,  size: 4.5, speed: 0.17, color: "navy" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const symbolRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const section = pageRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const scrolled = -rect.top;
      const scrollRatio = scrolled / sectionH;
      symbolRefs.current.forEach((el, i) => {
        if (!el) return;
        const lift = scrollRatio * SYMBOLS[i].speed * sectionH;
        el.style.transform = `translateY(${-lift}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSubmitted(true);
      setShowPopup(true);
      formRef.current?.reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = useCallback(() => setShowPopup(false), []);

  const inputClasses =
    "w-full border-b border-gray-200 bg-transparent px-0 py-4 font-sans text-sm text-[#111] placeholder:text-gray-400 focus:border-gray-900 focus:outline-none transition-colors duration-300";

  return (
    <div ref={pageRef} className="relative overflow-hidden bg-white">
      {/* Success Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={closePopup}
        >
          <div
            className="relative mx-4 w-full max-w-md bg-white p-10 shadow-2xl animate-[fadeUp_0.4s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
              <svg className="h-7 w-7 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="font-sans text-2xl font-medium text-[#111]">Message sent</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Thank you for reaching out. Our team will review your message and get back to you within 48 hours.
            </p>
            <button
              onClick={closePopup}
              className="mt-8 w-full border border-gold py-3 text-sm font-medium tracking-wide text-gold transition-colors duration-300 hover:bg-gold hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Floating background symbols */}
      {SYMBOLS.map((s, i) => (
        <span
          key={i}
          ref={(el) => { symbolRefs.current[i] = el; }}
          aria-hidden="true"
          className="pointer-events-none absolute select-none font-sans font-bold will-change-transform"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            fontSize: `${s.size}rem`,
            lineHeight: 1,
            opacity: s.color === "gold" ? 0.06 : 0.04,
            color: s.color === "gold" ? "var(--color-gold)" : "var(--color-navy)",
          }}
        >
          {s.symbol}
        </span>
      ))}
      {/* Hero */}
      <section className="bg-white pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div
              data-reveal
              data-delay="0"
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out lg:w-[60%]"
            >
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                Get in touch
              </p>
              <h1
                className="mt-6 font-sans text-4xl leading-[1.1] tracking-tight text-[#111] sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ fontWeight: 500 }}
              >
                Let&rsquo;s start
                <br />
                <span className="text-[#111]/35">your project.</span>
              </h1>
            </div>
            <div
              data-reveal
              data-delay="150"
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out lg:w-[35%]"
            >
              <p className="text-base leading-relaxed text-gray-500">
                Fill out the form and our team will be in touch within 48 hours
                to discuss your project and next steps.
              </p>
              <div className="mt-8 space-y-3">
                <p className="text-sm font-medium text-[#111]">Enquiries@thearkgroup.ie</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Response within 48 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white pb-32">
        <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-[1fr_1.6fr]">
            {/* Left — info */}
            <div
              data-reveal
              data-delay="0"
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
            >
              <div className="border-t border-gray-100 pt-10 space-y-10">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-4">Services</p>
                  {["Strategic Advisory", "Operational Systems", "Financial Architecture", "Automation"].map((s) => (
                    <p key={s} className="py-2 text-sm text-gray-500 border-b border-gray-100">{s}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div
              data-reveal
              data-delay="100"
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out border-t border-gray-100 pt-10"
            >
              {submitted ? (
                <div>
                  <h3
                    className="font-sans text-3xl text-[#111] md:text-4xl"
                    style={{ fontWeight: 500 }}
                  >
                    Thank you.
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-gray-500">
                    We&apos;ve received your message and will be in touch within
                    48 hours.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                        Full name
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                        Company
                      </label>
                      <input
                        name="company"
                        type="text"
                        placeholder="Company name"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                        Phone
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="+353 00 000 0000"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                      How can we help?
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell us about your project, goals, or challenges..."
                      className="w-full border-b border-gray-200 bg-transparent px-0 py-4 font-sans text-sm text-[#111] placeholder:text-gray-400 focus:border-gray-900 focus:outline-none transition-colors duration-300 resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative inline-flex items-center gap-3 overflow-hidden border border-gold px-8 py-4 text-sm font-medium tracking-wide text-gold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
                      {loading ? (
                        <span className="relative flex items-center gap-2">
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          <span className="relative transition-colors duration-300 group-hover:text-white">Send message</span>
                          <svg className="relative h-4 w-4 transition-all duration-300 group-hover:text-white group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </button>
                    <p className="text-xs text-gray-400">We respond within 48 hours.</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
