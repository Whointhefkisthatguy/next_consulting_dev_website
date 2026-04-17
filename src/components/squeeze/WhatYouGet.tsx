import type { Deliverable } from "@/content/squeeze/types";

type Props = { deliverables: Deliverable[]; heading?: string };

export default function WhatYouGet({ deliverables, heading = "What you get" }: Props) {
  return (
    <section className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)", background: "#0c0c0e" }}>
      <div className="max-w-[900px]">
        {heading && (
          <h2 className="font-[var(--font-display)] text-2xl md:text-3xl font-700 text-[#f0ebe3] mb-16">
            {heading}
          </h2>
        )}
        <div className="space-y-12">
          {deliverables.map((d, i) => (
            <div key={i} className="flex items-start gap-6">
              <span className="shrink-0 font-[var(--font-display)] text-sm font-700 mt-1 text-[#c4835a]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-[var(--font-display)] text-lg font-600 text-[#f0ebe3]">{d.name}</h3>
                <p className="mt-2 font-[var(--font-body)] text-sm leading-[1.7] text-[#8a8480]">
                  {d.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
