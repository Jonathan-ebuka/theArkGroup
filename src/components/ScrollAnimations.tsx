"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollAnimations() {
  useEffect(() => {
    // Wait for DOM + Lenis to be ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // --- fade-up: elements slide up and fade in ---
        const fadeUpEls = document.querySelectorAll('[data-animate="fade-up"]');
        fadeUpEls.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // --- slide-left: elements slide in from left ---
        const slideLeftEls = document.querySelectorAll(
          '[data-animate="slide-left"]'
        );
        slideLeftEls.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, x: -40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // --- expand-width: divider lines grow from left ---
        const expandEls = document.querySelectorAll(
          '[data-animate="expand-width"]'
        );
        expandEls.forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // --- stagger-in: groups of items stagger in ---
        const staggerEls = document.querySelectorAll(
          '[data-animate="stagger-in"]'
        );
        if (staggerEls.length) {
          gsap.fromTo(
            staggerEls,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: staggerEls[0],
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // --- parallax: subtle parallax movement ---
        const parallaxEls = document.querySelectorAll(
          '[data-animate="parallax"]'
        );
        parallaxEls.forEach((el) => {
          gsap.fromTo(
            el,
            { y: 60 },
            {
              y: -60,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        });
      });

      return () => ctx.revert();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
