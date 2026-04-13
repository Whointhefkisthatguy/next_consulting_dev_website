"use client";

import { ScrollReveal } from "./ScrollReveal";

export function QuoteSection() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <ScrollReveal>
          <blockquote className="font-display text-2xl leading-relaxed tracking-tight text-text-primary sm:text-3xl md:text-4xl">
            &ldquo;There is surely nothing quite so useless as doing with great
            efficiency what should not be done at all
            <span className="text-amber">.</span>&rdquo;
          </blockquote>
          <cite className="mt-8 block text-sm tracking-wide text-text-muted not-italic">
            &mdash; Peter Drucker, 1963
          </cite>
        </ScrollReveal>
        <ScrollReveal delay={0.6}>
          <h1 className="mt-32 font-display text-xl font-medium tracking-tight text-text-primary sm:text-2xl md:text-3xl">
            The problem isn&apos;t scale
            <span className="text-amber">,</span> it&apos;s architecture
            <span className="text-amber">.</span>
          </h1>
        </ScrollReveal>
      </div>
    </section>
  );
}
