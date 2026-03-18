"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { RollingLink } from "./RollingLink"

const menuLinks = [
  { href: "/about", label: "About" },
  { href: "/automation", label: "Automation" },
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

  const isDarkNavPage = pathname === "/about" || pathname === "/contact"
  const forceLightText = isScrolled || isOverDark || isMenuOpen || isDarkNavPage
  const textColor = forceLightText ? "text-offwhite" : "text-navy"
  const textMuted = forceLightText
    ? "text-offwhite/70 hover:text-offwhite"
    : "text-navy/60 hover:text-navy"

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isMenuOpen
            ? "bg-navy shadow-lg"
            : isScrolled
              ? "bg-navy/95 shadow-lg backdrop-blur-md"
              : isDarkNavPage
                ? "bg-navy"
                : isOverDark
                  ? "bg-transparent"
                  : "bg-white/80 backdrop-blur-sm"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)",
        }}
      >
        <nav className='relative mx-auto flex max-w-7xl items-center justify-between px-4 py-5 lg:px-4'>
          {/* Logo — left */}
          <Link
            href='/'
            className={`font-sans text-lg font-semibold tracking-tight transition-colors duration-300 hover:opacity-80 ${textColor}`}
          >
            The Ark Group
          </Link>

          {/* Desktop links + Contact button — right */}
          <div className='hidden items-center gap-6 md:flex'>
            {menuLinks.map((link) => {
              const isActive = pathname === link.href
              const activeColor = forceLightText ? "text-white font-bold text-[13px]" : "text-[#111] font-bold text-[13px]"
              return (
                <RollingLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  className={`tracking-wider uppercase transition-colors duration-300 ${isActive ? activeColor : `text-xs ${textMuted}`}`}
                />
              )
            })}
            <Link
              href="/contact"
              className="group relative isolate inline-block overflow-hidden border border-gold px-5 py-2 text-xs font-medium uppercase tracking-wider text-gold transition-colors duration-300"
            >
              <span className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative transition-colors duration-300 group-hover:text-white">Contact</span>
            </Link>
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
          className={`overflow-hidden bg-navy transition-all duration-300 ease-out md:hidden ${
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

            <div className='mt-8 pt-6'>
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
