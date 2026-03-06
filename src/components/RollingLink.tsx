"use client"

import Link from "next/link"

interface RollingLinkProps {
  href: string
  label: string
  className?: string
  onClick?: () => void
}

export function RollingLink({ href, label, className = "", onClick }: RollingLinkProps) {
  const letters = label.split("")
  const total = letters.length

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group inline-flex ${className}`}
    >
      {letters.map((letter, i) => {
        // Right-to-left stagger: last letter moves first
        const delay = (total - 1 - i) * 0.025

        return (
          <span
            key={`${letter}-${i}`}
            className="inline-block h-[1.2em] overflow-hidden"
          >
            <span
              className="inline-flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-[1.2em]"
              style={{ transitionDelay: `${delay}s` }}
            >
              {/* Current letter (visible) */}
              <span className="inline-block h-[1.2em] leading-[1.2em]">
                {letter === " " ? "\u00A0" : letter}
              </span>
              {/* Incoming letter (hidden above, rolls in from top) */}
              <span className="inline-block h-[1.2em] leading-[1.2em]">
                {letter === " " ? "\u00A0" : letter}
              </span>
            </span>
          </span>
        )
      })}
    </Link>
  )
}
