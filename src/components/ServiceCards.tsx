import Link from "next/link";

type ServiceDef = {
  name: string;
  href: string;
  tagline: string;
  highlights: string[];
};

const ALL_SERVICES: ServiceDef[] = [
  {
    name: "Websites",
    href: "/websites",
    tagline: "Revenue-generating systems engineered for conversion, built to last.",
    highlights: [
      "Custom UI/UX design informed by real customer journeys",
      "Full-stack development — frontend, backend, deployment",
      "SEO structure and performance optimization from day one",
      "Ongoing iteration, monitoring, and support after launch",
    ],
  },
  {
    name: "Graphic Design",
    href: "/graphic-design",
    tagline: "Brand identity that communicates authority before a word is read.",
    highlights: [
      "Logo and brand mark that works at every scale",
      "Complete brand identity system and style guide",
      "Marketing collateral, social templates, presentations",
      "A visual system — not a collection of one-offs",
    ],
  },
  {
    name: "Automation",
    href: "/automation",
    tagline: "Intelligent automation that removes the manual and scales the system.",
    highlights: [
      "End-to-end workflow audit and friction mapping",
      "AI-powered process automation that compounds",
      "CRM, reporting, and data pipeline integration",
      "Custom dashboards, notifications, and accountability systems",
    ],
  },
];

export default function ServiceCards({ current }: { current: string }) {
  const featured = ALL_SERVICES.find((s) => s.name === current)!;
  const secondary = ALL_SERVICES.filter((s) => s.name !== current);

  return (
    <section className="py-28 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
      <div className="max-w-[1200px] mx-auto">
        <h2
          className="font-[var(--font-display)] font-700 text-2xl mb-14"
          style={{ color: "#f0ebe3" }}
        >
          Our Services
        </h2>

        {/* ═══ FEATURED CARD — dominant, raised, full border ═══ */}
        <div
          className="p-10 sm:p-14 relative mb-8"
          style={{
            background: "#111114",
            border: "1px solid rgba(196,131,90,0.3)",
            borderTopWidth: "2px",
            borderTopColor: "#c4835a",
            boxShadow: "0 12px 50px rgba(196,131,90,0.1), 0 4px 16px rgba(0,0,0,0.4)",
            transform: "translateY(-2px)",
          }}
        >
          {/* Top copper ambient glow */}
          <div
            className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(196,131,90,0.05) 0%, transparent 100%)",
            }}
          />

          <div className="relative z-10">
            <span
              className="font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase"
              style={{ color: "#c4835a" }}
            >
              You&rsquo;re Here
            </span>
            <h3
              className="mt-4 font-[var(--font-display)] text-4xl sm:text-5xl font-800"
              style={{ color: "#f0ebe3" }}
            >
              {featured.name}
            </h3>
            <p
              className="mt-5 font-[var(--font-body)] text-base sm:text-lg leading-relaxed max-w-[600px]"
              style={{ color: "rgba(240,235,227,0.6)" }}
            >
              {featured.tagline}
            </p>

            {/* Highlights grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
              {featured.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center font-[var(--font-display)] text-[10px] font-700"
                    style={{ color: "#c4835a", border: "1px solid rgba(196,131,90,0.3)", borderRadius: "2px" }}
                  >
                    {i + 1}
                  </span>
                  <p
                    className="font-[var(--font-body)] text-sm leading-relaxed"
                    style={{ color: "rgba(240,235,227,0.55)" }}
                  >
                    {h}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href="#book"
                className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-all duration-300 hover:brightness-110"
                style={{ backgroundColor: "#c4835a", color: "#070708" }}
              >
                Get Started
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="mailto:revops@nextconsulting.dev"
                className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-all duration-300"
                style={{ border: "1px solid #c4835a", color: "#c4835a" }}
              >
                Email Us
              </a>
            </div>
          </div>
        </div>

        {/* ═══ SECONDARY CARDS — next steps, numbered, clear borders ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {secondary.map((service, idx) => (
            <Link
              key={service.name}
              href={service.href}
              className="group block p-8 sm:p-10 relative transition-all duration-300"
              style={{
                background: "#0a0a0c",
                border: "1px solid rgba(240,235,227,0.06)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(196,131,90,0.25)";
                el.style.background = "#0e0e10";
                el.style.boxShadow = "0 6px 30px rgba(196,131,90,0.08)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(240,235,227,0.06)";
                el.style.background = "#0a0a0c";
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Step number */}
              <span
                className="font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase"
                style={{ color: "rgba(196,131,90,0.4)" }}
              >
                Up Next &middot; 0{idx + 1}
              </span>

              <h3
                className="mt-3 font-[var(--font-display)] text-2xl font-700"
                style={{ color: "#f0ebe3" }}
              >
                {service.name}
              </h3>
              <p
                className="mt-3 font-[var(--font-body)] text-sm leading-relaxed"
                style={{ color: "rgba(240,235,227,0.4)" }}
              >
                {service.tagline}
              </p>

              <span
                className="inline-flex items-center gap-2 mt-6 font-[var(--font-display)] text-xs font-600 tracking-[0.1em] uppercase"
                style={{ color: "#c4835a" }}
              >
                Explore
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
