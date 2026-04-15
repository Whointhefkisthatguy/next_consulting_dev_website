import Link from "next/link";
import Monogram from "./Monogram";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Websites", href: "/websites" },
  { label: "Graphic Design", href: "/graphic-design" },
  { label: "Automation", href: "/automation" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--divider)] py-12 px-6 sm:px-14">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
        <Monogram className="h-6 w-auto text-[var(--muted)]" />

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
