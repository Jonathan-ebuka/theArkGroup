import Link from "next/link";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#divisions", label: "Divisions" },
  { href: "/approach", label: "Approach" },
  { href: "/automation", label: "Automation" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-offwhite-dark/30 bg-navy">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
          {/* Brand */}
          <div data-animate="fade-up">
            <Link
              href="/"
              className="font-serif text-2xl tracking-wide text-offwhite"
            >
              The Ark Group
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-light">
              Strategic architecture for businesses built to last.
            </p>
          </div>

          {/* Links */}
          <ul data-animate="fade-up" className="flex flex-wrap gap-8">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm tracking-widest text-offwhite/60 uppercase transition-colors duration-300 hover:text-offwhite"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-offwhite/10 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-offwhite/40">
            &copy; {new Date().getFullYear()} The Ark Group. All rights
            reserved.
          </p>
          <p className="text-xs text-offwhite/30">
            A Cephas Group Management company.
          </p>
        </div>
      </div>
    </footer>
  );
}
