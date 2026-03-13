"use client";

import { useRef, useEffect } from "react";

const SCROLL_RANGE = 520; // px of scroll to complete the animation
const INITIAL_SCALE = 9;  // how large the logo starts

export function LogoReveal() {
  const heroRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const navLogo = document.getElementById("nav-logo") as HTMLElement | null;

    // Hide nav logo initially — hero logo covers it
    if (navLogo) navLogo.style.opacity = "0";

    const update = () => {
      const p = Math.min(1, window.scrollY / SCROLL_RANGE);

      if (heroRef.current) {
        const scale = INITIAL_SCALE - p * (INITIAL_SCALE - 1); // 9 → 1
        // Fade out the hero logo in the last 20% of the animation
        const heroOpacity = p > 0.8 ? Math.max(0, 1 - (p - 0.8) / 0.2) : 1;
        heroRef.current.style.transform = `scale(${scale})`;
        heroRef.current.style.opacity = String(heroOpacity);
        heroRef.current.style.visibility = p >= 1 ? "hidden" : "visible";
      }

      // Fade in the nav logo as hero logo fades out
      if (navLogo) {
        const navOpacity = p > 0.8 ? Math.min(1, (p - 0.8) / 0.2) : 0;
        navLogo.style.opacity = String(navOpacity);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      // Restore nav logo if component unmounts
      if (navLogo) navLogo.style.opacity = "1";
    };
  }, []);

  return (
    <span
      ref={heroRef}
      aria-hidden="true"
      className="pointer-events-none fixed font-serif text-xl tracking-wide text-offwhite"
      style={{
        top: "1.25rem",   // matches nav py-5
        left: "1.5rem",  // matches nav px-6 (mobile)
        zIndex: 51,       // above nav (z-50)
        transformOrigin: "top left",
        willChange: "transform, opacity",
      }}
    >
      The Ark Group
    </span>
  );
}
