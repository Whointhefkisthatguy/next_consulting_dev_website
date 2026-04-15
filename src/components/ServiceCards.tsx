import Link from "next/link";

type ServiceSummary = {
  name: string;
  href: string;
  tagline: string;
};

const ALL_SERVICES: ServiceSummary[] = [
  {
    name: "Websites",
    href: "/websites",
    tagline: "Revenue-generating systems engineered for conversion, built to last.",
  },
  {
    name: "Graphic Design",
    href: "/graphic-design",
    tagline: "Brand identity that communicates authority before a word is read.",
  },
  {
    name: "Automation",
    href: "/automation",
    tagline: "Intelligent automation that removes the manual and scales the system.",
  },
];

export default function ServiceCards({ current }: { current: string }) {
  const featured = ALL_SERVICES.find((s) => s.name === current)!;
  const secondary = ALL_SERVICES.filter((s) => s.name !== current);

  return (
    <section className="py-24 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
      <div className="max-w-[1200px] mx-auto">
        <h2
          className="font-[var(--font-display)] font-700 text-2xl mb-12"
          style={{ color: "#f0ebe3" }}
        >
          Our Services
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured card — spans 2 cols on desktop */}
          <div
            className="lg:col-span-2 p-8 sm:p-10"
            style={{
              background: "#0f0f11",
              borderTop: "2px solid #c4835a",
            }}
          >
            <span
              className="font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase"
              style={{ color: "#c4835a" }}
            >
              Currently Viewing
            </span>
            <h3
              className="mt-3 font-[var(--font-display)] text-3xl sm:text-4xl font-700"
              style={{ color: "#f0ebe3" }}
            >
              {featured.name}
            </h3>
            <p
              className="mt-4 font-[var(--font-body)] text-base leading-relaxed max-w-[500px]"
              style={{ color: "rgba(240,235,227,0.55)" }}
            >
              {featured.tagline}
            </p>
            <span
              className="inline-block mt-6 font-[var(--font-body)] text-sm"
              style={{ color: "rgba(240,235,227,0.3)" }}
            >
              Scroll up for full details
            </span>
          </div>

          {/* Secondary cards — stacked in the remaining col */}
          <div className="flex flex-col gap-6">
            {secondary.map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="group block p-6 sm:p-8 flex-1 transition-all duration-300"
                style={{
                  background: "#0a0a0c",
                  borderTop: "2px solid rgba(240,235,227,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderTopColor = "#c4835a";
                  (e.currentTarget as HTMLElement).style.background = "#0f0f11";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderTopColor = "rgba(240,235,227,0.06)";
                  (e.currentTarget as HTMLElement).style.background = "#0a0a0c";
                }}
              >
                <h3
                  className="font-[var(--font-display)] text-xl font-700 transition-colors duration-300"
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
                  className="inline-flex items-center gap-2 mt-4 font-[var(--font-body)] text-sm transition-colors duration-300"
                  style={{ color: "#c4835a" }}
                >
                  View service
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
