"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { RollingLink } from "./RollingLink"

const menuLinks = [
  { href: "#about", label: "About" },
  { href: "#divisions", label: "Divisions" },
  { href: "/approach", label: "Approach" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOverDark, setIsOverDark] = useState(false)
  const detectBackground = useCallback(() => {
    const sections = document.querySelectorAll("section")
    const navBottom = 80

    let overDark = false
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= navBottom && rect.bottom > navBottom) {
        const bg = window.getComputedStyle(section).backgroundColor
        const match = bg.match(/\d+/g)
        if (match) {
          const [r, g, b] = match.map(Number)
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
          overDark = luminance < 0.4
        }
      }
    })
    setIsOverDark(overDark)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      detectBackground()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    const timer = setTimeout(handleScroll, 100)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [detectBackground, pathname])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const forceLightText = isScrolled || isOverDark || isMenuOpen
  const textColor = forceLightText ? "text-offwhite" : "text-navy"
  const textMuted = forceLightText
    ? "text-offwhite/70 hover:text-offwhite"
    : "text-navy/60 hover:text-navy"

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
          isMenuOpen
            ? "border-navy bg-navy shadow-lg"
            : isScrolled
              ? "border-navy bg-navy/95 shadow-lg backdrop-blur-md"
              : isOverDark
                ? "border-offwhite/10 bg-transparent"
                : "border-navy/10 bg-offwhite/80 backdrop-blur-sm"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)",
        }}
      >
        <nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12'>
          {/* Logo — left */}
          <Link
            href='/'
            className={`font-serif text-xl tracking-wide transition-colors duration-300 hover:opacity-80 ${textColor}`}
          >
            The Ark Group
          </Link>

          {/* Desktop links — visible on md+ */}
          <div className='hidden items-center gap-10 md:flex'>
            {menuLinks.map((link) => (
              <RollingLink
                key={link.label}
                href={link.href}
                label={link.label}
                className={`text-sm tracking-widest uppercase transition-colors duration-300 ${textMuted}`}
              />
            ))}
          </div>

          {/* Mobile hamburger — visible on mobile only */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className='relative z-50 flex h-12 w-12 cursor-pointer items-center justify-center md:hidden'
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <span className='sr-only'>Menu</span>
            <span
              className={`absolute h-0.5 w-6 rounded transition-all duration-300 ${forceLightText ? "bg-offwhite" : "bg-navy"} ${
                isMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 rounded transition-all duration-300 ${forceLightText ? "bg-offwhite" : "bg-navy"} ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 rounded transition-all duration-300 ${forceLightText ? "bg-offwhite" : "bg-navy"} ${
                isMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </nav>

        {/* Mobile dropdown — slides down from nav */}
        <div
          className={`overflow-hidden border-t border-offwhite/10 bg-navy transition-all duration-300 ease-out md:hidden ${
            isMenuOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className='mx-auto max-w-7xl px-6 py-8'>
            <ul className='flex flex-col gap-5'>
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <RollingLink
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    label={link.label}
                    className='text-sm tracking-widest text-offwhite/70 uppercase transition-colors duration-300 hover:text-gold'
                  />
                </li>
              ))}
            </ul>

            <div className='mt-8 border-t border-offwhite/10 pt-6'>
              <p className='font-serif text-lg text-offwhite'>
                hello@thearkgroup.com
              </p>
              <p className='mt-2 text-xs tracking-widest text-offwhite/40 uppercase'>
                We respond within 48 hours
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
