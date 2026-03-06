"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClasses =
    "flex-1 border-b border-navy/15 bg-offwhite-dark/50 px-4 py-4 text-navy font-sans text-sm tracking-wide placeholder:text-slate-light/50 focus:border-gold focus:outline-none transition-colors duration-300";

  return (
    <section className="min-h-screen bg-offwhite pt-32 pb-section-sm md:pb-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 md:grid-cols-[0.4fr_1fr] md:gap-12 md:items-start">
          {/* Left — eyebrow intro */}
          <div data-animate="fade-up" className="md:sticky md:top-32">
            <div className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-full bg-navy" />
              <p className="text-xs tracking-[0.3em] text-navy uppercase">
                Start With a Simple Step
              </p>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-slate-light">
              Fill out the form and our team will get back to you within 48
              hours to discuss your project.
            </p>
            <div className="mt-6 h-px w-12 bg-gold" />
          </div>

          {/* Right — headline + form */}
          <div>
            {/* Big headline */}
            <h1 data-animate="fade-up" className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[1.05] font-extrabold tracking-tight text-navy uppercase">
              Let&rsquo;s Start
              <br />
              <span className="text-gold">Your Project</span>
            </h1>

            {/* Conversational form */}
            {submitted ? (
              <div className="hero-fade-up mt-20">
                <h3 className="font-display text-3xl font-extrabold tracking-tight text-navy uppercase">
                  Thank You.
                </h3>
                <p className="mt-6 max-w-md text-lg text-slate">
                  We&apos;ve received your message and will be in touch within
                  48 hours.
                </p>
              </div>
            ) : (
              <form data-animate="fade-up" onSubmit={handleSubmit} className="mt-16">
                {/* Greeting */}
                <p className="font-display text-lg font-extrabold tracking-tight text-navy uppercase md:text-xl">
                  Hi, Ark Group Team!
                </p>

                {/* Row 1: Name + Company */}
                <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:gap-4">
                  <span className="shrink-0 text-sm font-medium tracking-widest text-navy uppercase">
                    My Name Is
                  </span>
                  <div className="flex-1">
                    <label htmlFor="name" className="sr-only">Your Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your Name"
                      className={inputClasses}
                    />
                  </div>
                  <span className="shrink-0 text-sm font-medium tracking-widest text-navy uppercase">
                    From
                  </span>
                  <div className="flex-1">
                    <label htmlFor="company" className="sr-only">Company Name</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Company Name / Optional"
                      className={inputClasses}
                    />
                  </div>
                  <span className="hidden text-navy md:block">.</span>
                </div>

                {/* Row 2: Email + Phone */}
                <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:gap-4">
                  <span className="shrink-0 text-sm font-medium tracking-widest text-navy uppercase">
                    Reach Me At
                  </span>
                  <div className="flex-1">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Email Address"
                      className={inputClasses}
                    />
                  </div>
                  <span className="shrink-0 text-sm font-medium tracking-widest text-navy uppercase">
                    Or
                  </span>
                  <div className="flex-1">
                    <label htmlFor="phone" className="sr-only">Phone (optional)</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone (Optional)"
                      className={inputClasses}
                    />
                  </div>
                  <span className="hidden text-navy md:block">.</span>
                </div>

                {/* Row 3: Brief Description */}
                <div className="mt-10">
                  <span className="shrink-0 text-sm font-medium tracking-widest text-navy uppercase">
                    I Need Help With
                  </span>
                  <div className="mt-4">
                    <label htmlFor="message" className="sr-only">Brief Description</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={3}
                      placeholder="Brief description of your project or goals"
                      className="w-full border-b border-navy/15 bg-offwhite-dark/50 px-4 py-4 text-navy font-sans text-sm tracking-wide placeholder:text-slate-light/50 focus:border-gold focus:outline-none transition-colors duration-300 resize-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="mt-16">
                  <button
                    type="submit"
                    className="inline-block border border-gold bg-gold px-12 py-5 text-sm tracking-widest text-navy uppercase transition-all duration-300 hover:scale-[1.03] hover:bg-gold-light"
                  >
                    Send Message
                  </button>
                  <p className="mt-4 text-xs tracking-wide text-slate-light">
                    We respond within 48 hours.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
