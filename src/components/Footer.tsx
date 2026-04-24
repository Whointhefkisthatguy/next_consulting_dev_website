import Link from "next/link";
// Using actual brand monogram file from /public/brand/

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Diagnostic", href: "/diagnostic" },
  { label: "Arena", href: "/#arena" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--divider)] py-12 px-6 sm:px-14">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <img src="/brand/monogram.svg" alt="Next Consulting" className="h-6 w-auto brightness-0 invert opacity-50" />
          <span
            className="font-[var(--font-display)] text-[10px] font-500 tracking-[0.22em] uppercase"
            style={{ color: "var(--muted)" }}
          >
            The Art of Engineered Profitability
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[var(--font-body)] text-xs text-[var(--muted)] transition-colors duration-300 hover:text-[var(--cream)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <span className="font-[var(--font-body)] text-xs text-[var(--muted)]">
          &copy; {new Date().getFullYear()} Next Consulting
        </span>
      </div>
    </footer>
  );
}
