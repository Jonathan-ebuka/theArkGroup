"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    // Raw mouse in 0–1 space
    const mouse = { x: 0.5, y: 0.5 };
    // Smoothed mouse
    const smooth = { x: 0.5, y: 0.5 };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top)  / rect.height;
    };
    window.addEventListener("mousemove", onMove);

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Each orb has a parallax depth (how much it reacts to mouse)
    // positive depth = moves away from mouse (repel), negative = follows
    const orbs = [
      { x: 0.5, y: 0.42, r: 0.38, ox: 0.08, oy: 0.06, speed: 0.0004, phase: 0,   depth:  0.18, color: [212, 175, 55] as [number,number,number] },
      { x: 0.3, y: 0.55, r: 0.28, ox: 0.10, oy: 0.08, speed: 0.0003, phase: 2.1, depth: -0.14, color: [180, 130, 40] as [number,number,number] },
      { x: 0.7, y: 0.35, r: 0.22, ox: 0.07, oy: 0.10, speed: 0.0005, phase: 4.4, depth:  0.24, color: [200, 160, 60] as [number,number,number] },
    ];

    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

    const draw = () => {
      t += 1;
      const w = canvas.width;
      const h = canvas.height;

      // Smooth the mouse position
      smooth.x = lerp(smooth.x, mouse.x, 0.05);
      smooth.y = lerp(smooth.y, mouse.y, 0.05);

      // Mouse offset from center (−0.5 to 0.5)
      const mx = smooth.x - 0.5;
      const my = smooth.y - 0.5;

      ctx.clearRect(0, 0, w, h);

      for (const orb of orbs) {
        // Base drift from idle animation
        const bx = orb.x + Math.sin(t * orb.speed + orb.phase) * orb.ox;
        const by = orb.y + Math.cos(t * orb.speed * 0.7 + orb.phase) * orb.oy;

        // Parallax shift — each orb moves differently based on depth
        const cx = (bx + mx * orb.depth) * w;
        const cy = (by + my * orb.depth) * h;

        const radius = orb.r * Math.min(w, h);
        const [r, g, b] = orb.color;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0,   `rgba(${r},${g},${b},0.14)`);
        grad.addColorStop(0.3, `rgba(${r},${g},${b},0.07)`);
        grad.addColorStop(0.6, `rgba(${r},${g},${b},0.025)`);
        grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

function HeroFillText() {
  const text = "Build on Purpose.";
  const containerRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [fills, setFills] = useState<number[]>(() => new Array(text.length).fill(0));
  const RADIUS = 60; // px radius of the invisible spotlight

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetFills = new Array(text.length).fill(0);
    let currentFills = new Array(text.length).fill(0);
    let raf: number;
    const LERP_SPEED = 0.035; // lower = smoother/slower

    const animate = () => {
      let needsUpdate = false;
      const next = currentFills.map((cur, i) => {
        const target = targetFills[i];
        const diff = target - cur;
        if (Math.abs(diff) < 0.005) return target;
        needsUpdate = true;
        return cur + diff * LERP_SPEED;
      });

      if (needsUpdate || next.some((v, i) => v !== currentFills[i])) {
        currentFills = next;
        setFills([...next]);
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      const mx = e.clientX;
      const my = e.clientY;

      targetFills = letterRefs.current.map((el) => {
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
        return Math.max(0, 1 - dist / RADIUS);
      });
    };

    const onLeave = () => {
      targetFills = new Array(text.length).fill(0);
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <h2
      ref={containerRef}
      className="hero-fade-up mt-1 font-display text-[clamp(2rem,5.5vw,5.5rem)] leading-[1.05] font-extrabold tracking-tight uppercase cursor-default"
      style={{ animationDelay: "0.35s" }}
    >
      {text.split("").map((char, i) => {
        const raw = fills[i] || 0;
        // Boost by 40% so the gold is more visible
        const opacity = Math.min(1, raw * 1.4);
        const fillColor = opacity > 0.01
          ? `rgba(212,175,55,${opacity})`
          : "transparent";

        return (
          <span
            key={i}
            ref={(el) => { letterRefs.current[i] = el; }}
            className="inline-block"
            style={{
              WebkitTextStroke: "2px #D4AF37",
              WebkitTextFillColor: fillColor,
              color: fillColor,
              transition: "none",
            } as React.CSSProperties}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </h2>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center bg-navy px-6 pt-28 pb-20 lg:px-12 overflow-hidden">

      {/* Aurora orbs */}
      <AuroraCanvas />

      {/* Film grain overlay */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.09]" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="6" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="overlay" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      {/* Second coarser grain layer for depth */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain2">
          <feTurbulence type="turbulence" baseFrequency="0.40" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain2)" />
      </svg>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl">
        <h1
          className="hero-fade-up font-display text-[clamp(2rem,5.5vw,5.5rem)] leading-[1.05] font-extrabold tracking-tight text-offwhite uppercase"
          style={{ animationDelay: "0.2s" }}
        >
          Let&rsquo;s Give Structure
        </h1>
        <h1
          className="hero-fade-up font-display text-[clamp(2rem,5.5vw,5.5rem)] leading-[1.05] font-extrabold tracking-tight text-offwhite uppercase"
          style={{ animationDelay: "0.3s" }}
        >
          to Your Business.
        </h1>
        <HeroFillText />

        {/* Credibility bar */}
        <div
          className="hero-fade-up mt-12 flex flex-wrap items-center gap-6"
          style={{ animationDelay: "0.55s" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-navy-mid bg-navy-light text-[10px] font-medium text-offwhite/70"
                >
                  {["JO", "AK", "SC", "MT"][i]}
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-medium tracking-widest text-offwhite/90 uppercase">
                Trusted by founders &amp; operators
              </p>
              <p className="text-xs tracking-wide text-offwhite/50 uppercase">
                Across advisory, capital &amp; structuring
              </p>
            </div>
          </div>
        </div>

        {/* Subtext + CTAs */}
        <div
          className="hero-fade-up mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
          style={{ animationDelay: "0.7s" }}
        >
          <p className="max-w-lg text-lg leading-relaxed text-offwhite/70 md:text-xl">
            Strategic architecture for businesses built to last.
          </p>

          <div className="flex shrink-0 flex-wrap items-center gap-5">
            <Link
              href="/contact"
              className="group relative inline-block overflow-hidden border border-gold px-8 py-4 text-sm tracking-widest text-gold uppercase"
            >
              <span className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative transition-colors duration-500 group-hover:text-navy">Work With Us</span>
            </Link>
            <Link
              href="#divisions"
              className="group inline-flex items-center gap-2 text-sm tracking-widest text-offwhite/70 uppercase transition-colors duration-300 hover:text-offwhite"
            >
              Explore Our Divisions
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
