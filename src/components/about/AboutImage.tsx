"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function AboutImage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const img = imgRef.current;
      if (!section || !img) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const total = section.offsetHeight + windowH;
      const scrolled = windowH - rect.top;
      const clamped = Math.max(0, Math.min(1, scrolled / total));

      img.style.transform = `translateY(${(1 - clamped) * 12}%)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[70vh] overflow-hidden bg-navy">
      <div
        ref={imgRef}
        className="absolute inset-x-0 -top-[12%] bottom-0 will-change-transform"
      >
        <Image
          src="/images/mainM.png"
          alt="The Ark Group — structure is the foundation of every enduring business"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-navy/50" />
      </div>

      {/* Centred quote */}
      <div className="relative flex h-full items-center justify-center px-6 text-center">
        <p className="max-w-2xl font-serif text-2xl font-light leading-relaxed text-white/90 md:text-3xl lg:text-4xl">
          &ldquo;Structure is the foundation of every enduring business.&rdquo;
        </p>
      </div>
    </div>
  );
}
