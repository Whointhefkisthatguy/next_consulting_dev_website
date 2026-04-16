import Link from "next/link";

type Deliverable = {
  name: string;
  description: string;
};

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ═══ FEATURED CARD — raised, copper glow, detailed ═══ */}
          <div
            className="lg:col-span-2 p-8 sm:p-12 relative"
            style={{
              background: "#111114",
              borderTop: "2px solid #c4835a",
              boxShadow: "0 8px 40px rgba(196,131,90,0.12), 0 2px 12px rgba(196,131,90,0.06)",
              transform: "translateY(-4px)",
            }}
          >
            {/* Subtle copper ambient glow at top */}
            <div
              className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, rgba(196,131,90,0.04) 0%, transparent 100%)",
              }}
            />

            <div className="relative z-10">
              <span
                className="font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase"
                style={{ color: "#c4835a" }}
              >
                {current}
              </span>
              <h3
                className="mt-3 font-[var(--font-display)] text-3xl sm:text-4xl font-700"
                style={{ color: "#f0ebe3" }}
              >
                {featured.name}
              </h3>
              <p
                className="mt-4 font-[var(--font-body)] text-base leading-relaxed max-w-[520px]"
                style={{ color: "rgba(240,235,227,0.6)" }}
              >
                {featured.tagline}
              </p>

              {/* Highlights */}
              <div className="mt-8 space-y-4">
                {featured.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="shrink-0 mt-1 font-[var(--font-display)] text-[10px] font-700"
                      style={{ color: "#c4835a" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      className="font-[var(--font-body)] text-sm leading-relaxed"
                      style={{ color: "rgba(240,235,227,0.5)" }}
                    >
                      {h}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA row */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#book"
                  className="inline-flex items-center gap-2 px-7 py-3 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-all duration-300 hover:brightness-110"
                  style={{ backgroundColor: "#c4835a", color: "#070708" }}
                >
                  Get Started
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="mailto:revops@nextconsulting.dev"
                  className="inline-flex items-center gap-2 px-7 py-3 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-all duration-300"
                  style={{ border: "1px solid #c4835a", color: "#c4835a" }}
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>

          {/* ═══ SECONDARY CARDS — illuminated path ═══ */}
          <div className="flex flex-col gap-6">
            {secondary.map((service, idx) => (
              <Link
                key={service.name}
                href={service.href}
                className="group block p-6 sm:p-8 flex-1 relative overflow-hidden transition-all duration-400"
                style={{
                  background: "#0c0c0e",
                  borderTop: "1px solid rgba(240,235,227,0.08)",
                  boxShadow: "0 1px 8px rgba(240,235,227,0.02)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderTopColor = "#c4835a";
                  el.style.background = "#111114";
                  el.style.boxShadow = "0 4px 24px rgba(196,131,90,0.1)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderTopColor = "rgba(240,235,227,0.08)";
                  el.style.background = "#0c0c0e";
                  el.style.boxShadow = "0 1px 8px rgba(240,235,227,0.02)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Subtle side glow — breadcrumb illumination */}
                <div
                  className="absolute top-0 left-0 w-1 h-full"
                  style={{
                    background: "linear-gradient(to bottom, rgba(196,131,90,0.2) 0%, rgba(196,131,90,0.05) 100%)",
                  }}
                />

                {/* Step indicator */}
                <span
                  className="font-[var(--font-body)] text-[10px] tracking-[0.15em] uppercase"
                  style={{ color: "rgba(196,131,90,0.5)" }}
                >
                  Explore Next
                </span>

                <h3
                  className="mt-2 font-[var(--font-display)] text-xl font-700"
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
                  className="inline-flex items-center gap-2 mt-5 font-[var(--font-display)] text-xs font-600 tracking-[0.1em] uppercase"
                  style={{ color: "#c4835a" }}
                >
                  View Service
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
