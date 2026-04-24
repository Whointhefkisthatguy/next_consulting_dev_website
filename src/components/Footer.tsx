import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  description: string;
};

type FooterSection = {
  heading: string;
  links: FooterLink[];
};

const SECTIONS: FooterSection[] = [
  {
    heading: "What We Build",
    links: [
      {
        label: "Websites",
        href: "/websites",
        description: "Revenue-grade sites, owned by you.",
      },
      {
        label: "Graphic Design",
        href: "/graphic-design",
        description: "Brand systems that earn trust in 50 milliseconds.",
      },
      {
        label: "Automation",
        href: "/automation",
        description: "The manual work your team shouldn't still be doing.",
      },
      {
        label: "Scale",
        href: "/scale",
        description: "Ongoing iteration, new channels, reporting.",
      },
      {
        label: "Pricing",
        href: "/pricing",
        description: "Published on the site, not hidden behind intake calls.",
      },
    ],
  },
  {
    heading: "Platform",
    links: [
      {
        label: "Revenue Systems Architecture",
        href: "/revenue-systems-architecture",
        description: "The thesis. The five layers. Why every road ends here.",
      },
      {
        label: "Manifesto",
        href: "/manifesto",
        description: "The Marketing-Industrial Complex is lying to your business.",
      },
      {
        label: "Diagnostic",
        href: "/diagnostic",
        description: "Free System Score audit, sent inside 24 hours.",
      },
      {
        label: "Arena",
        href: "/arena",
        description: "Don't believe us. Pay the crowd.",
      },
      {
        label: "Case Studies",
        href: "/case-studies",
        description: "Real work with real numbers.",
      },
    ],
  },
  {
    heading: "Company",
    links: [
      {
        label: "About",
        href: "/about",
        description: "Who we are and why we built this.",
      },
      {
        label: "Our Work",
        href: "/work",
        description: "Selected projects across the practice.",
      },
      {
        label: "Contact",
        href: "/contact",
        description: "Start a project. Ask a question.",
      },
    ],
  },
];

const LEGAL_LINKS: Array<{ label: string; href: string }> = [
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[var(--divider)] px-6 sm:px-14"
      style={{ paddingTop: "80px", paddingBottom: "40px" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Top grid: Brand | What We Build | Platform | Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* ═══ BRAND COLUMN ═══ */}
          <div className="max-w-[320px]">
            <img
              src="/brand/logo-white-full-tight.png"
              alt="Next Consulting"
              className="h-12 w-auto opacity-90"
            />
            <p
              className="mt-4 font-[var(--font-display)] text-[11px] font-600 tracking-[0.22em] uppercase"
              style={{ color: "var(--copper)" }}
            >
              The Art of Engineered Profitability
            </p>
            <p
              className="mt-6 font-[var(--font-body)] text-sm leading-relaxed"
              style={{ color: "rgba(240,235,227,0.55)" }}
            >
              Next Consulting installs operating systems for businesses tired
              of marketing vendors. Three phases, Foundation,
              Automation, Scale. Transparent pricing. You own the code, the
              data, and the domain from day one.
            </p>
          </div>

          {/* ═══ SECTION COLUMNS ═══ */}
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h3
                className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
                style={{ color: "var(--copper)" }}
              >
                § {section.heading}
              </h3>
              <ul className="mt-6 space-y-5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group block"
                    >
                      <span
                        className="font-[var(--font-display)] text-[15px] font-600 tracking-[-0.005em] transition-colors duration-300 group-hover:text-[var(--copper)]"
                        style={{ color: "var(--cream)" }}
                      >
                        {link.label}
                      </span>
                      <span
                        className="mt-1 block font-[var(--font-body)] text-[13px] leading-[1.5]"
                        style={{ color: "rgba(240,235,227,0.5)" }}
                      >
                        {link.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ═══ LEGAL BOTTOM BAR ═══ */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--divider)" }}
        >
          <span
            className="font-[var(--font-body)] text-xs"
            style={{ color: "var(--muted)" }}
          >
            &copy; {year} Next Consulting Corp. All work delivered is owned
            by the client outright.
          </span>
          <nav className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-[var(--font-body)] text-xs transition-colors duration-300 hover:text-[var(--cream)]"
                style={{ color: "var(--muted)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
