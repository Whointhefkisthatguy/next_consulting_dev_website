"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const FILTERS = ["All", "Websites", "Graphic Design", "Automation"] as const;

const PROJECTS = [
  {
    title: "Example Website",
    service: "Websites" as const,
    image: "/images/bg-code.jpg",
  },
  {
    title: "Example Brand",
    service: "Graphic Design" as const,
    image: "/images/bg-paper.jpg",
  },
  {
    title: "Example Automation",
    service: "Automation" as const,
    image: "/images/bg-circuit.jpg",
  },
];

export default function WorkPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.service === filter);

  return (
    <>
      <section className="pt-40 pb-16 px-6 sm:px-14">
        <div className="max-w-[900px]">
          <ScrollReveal>
            <h1 className="reveal font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--cream)]">
              Our Work
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="reveal mt-6 font-[var(--font-body)] italic text-base text-[var(--muted)] max-w-lg">
              &ldquo;Quality is not an act, it is a habit.&rdquo;
              <span className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase">
                &mdash; Aristotle
              </span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-8 px-6 sm:px-14 border-t border-[var(--divider)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex gap-6 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative font-[var(--font-body)] text-sm transition-colors duration-300 pb-1 ${
                  filter === f
                    ? "text-[var(--copper)]"
                    : "text-[var(--muted)] hover:text-[var(--cream)]"
                }`}
              >
                {f}
                {filter === f && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--copper)]" />
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project, i) => (
              <ScrollReveal key={`${project.title}-${i}`}>
                <div
                  className={`reveal group relative overflow-hidden cursor-pointer ${
                    i % 3 === 0 ? "sm:row-span-2 h-[500px]" : "h-[240px]"
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[var(--void)]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                    <h3 className="font-[var(--font-display)] text-lg font-600 text-[var(--cream)]">
                      {project.title}
                    </h3>
                    <span className="mt-2 font-[var(--font-body)] text-xs text-[var(--copper)] tracking-[0.1em] uppercase">
                      {project.service}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
