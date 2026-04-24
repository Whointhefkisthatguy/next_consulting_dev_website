"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS: Array<{ label: string; href: string }> = [
  { label: "Home", href: "/" },
  { label: "Architecture", href: "/revenue-systems-architecture" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Diagnostic", href: "/diagnostic" },
  { label: "Arena", href: "/arena" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--void)]/95 backdrop-blur-sm border-b border-[var(--divider)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 h-[72px] flex items-center justify-between">
        {/* Monogram */}
        <Link href="/" aria-label="Home">
          <img src="/brand/monogram.svg" alt="Next Consulting" className="h-7 w-auto brightness-0 invert opacity-90 transition-opacity duration-300 hover:opacity-100" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative font-[var(--font-display)] text-[13px] font-500 tracking-[0.05em] uppercase transition-colors duration-300 ${
                isActive(link.href)
                  ? "text-[var(--copper)]"
                  : "text-[var(--cream)] hover:text-[var(--copper)]"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--copper)]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 bg-copper text-void font-[var(--font-display)] text-[11px] font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-copper-hover"
        >
          Start a Project
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-[var(--cream)] transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-[var(--cream)] transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-[72px] bg-[var(--void)] transition-all duration-500 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-[var(--font-display)] text-2xl font-600 tracking-[0.05em] uppercase ${
                isActive(link.href)
                  ? "text-[var(--copper)]"
                  : "text-[var(--cream)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 px-8 py-3.5 bg-[var(--copper)] text-[var(--void)] font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase"
          >
            Start a Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
