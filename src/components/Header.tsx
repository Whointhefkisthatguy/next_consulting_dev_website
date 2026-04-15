"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Using actual brand monogram file from /public/brand/

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "#",
    children: [
      { label: "Websites", href: "/websites" },
      { label: "Graphic Design", href: "/graphic-design" },
      { label: "Automation", href: "/automation" },
    ],
  },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isServiceActive = () =>
    ["/websites", "/graphic-design", "/automation"].some((p) =>
      pathname.startsWith(p)
    );

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
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={`font-[var(--font-display)] text-[13px] font-500 tracking-[0.05em] uppercase transition-colors duration-300 ${
                    isServiceActive()
                      ? "text-[var(--copper)]"
                      : "text-[var(--cream)] hover:text-[var(--copper)]"
                  }`}
                >
                  {link.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`inline-block ml-1.5 transition-transform duration-300 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 py-3 px-1 bg-[var(--surface)] border border-[var(--divider)] min-w-[180px] transition-all duration-300 ${
                    servicesOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block px-5 py-2.5 font-[var(--font-body)] text-sm transition-colors duration-300 ${
                        isActive(child.href)
                          ? "text-[var(--copper)]"
                          : "text-[var(--cream)] hover:text-[var(--copper)]"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
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
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#book"
          className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 bg-copper text-void font-[var(--font-display)] text-[11px] font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-copper-hover"
        >
          Book a Call
        </a>

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
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label} className="flex flex-col items-center gap-4">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="font-[var(--font-display)] text-2xl font-600 tracking-[0.05em] uppercase text-[var(--cream)]"
                >
                  {link.label}
                </button>
                {servicesOpen &&
                  link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`font-[var(--font-body)] text-lg pl-4 ${
                        isActive(child.href)
                          ? "text-[var(--copper)]"
                          : "text-[var(--muted)]"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
              </div>
            ) : (
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
            )
          )}
          <a
            href="#book"
            className="mt-4 px-8 py-3.5 bg-[var(--copper)] text-[var(--void)] font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase"
          >
            Book a Call
          </a>
        </nav>
      </div>
    </header>
  );
}
