"use client";

import { ScrollReveal } from "./ScrollReveal";

const truths = [
  {
    statement: "Best in class is just the tallest person in a short room.",
    accentWord: "tallest",
    metric: "92% of companies benchmarking against industry averages are optimizing the wrong targets.",
  },
  {
    statement: "Your funnel isn\u2019t leaking. It was never built to hold.",
    accentWord: "never",
    metric: "For every dollar spent acquiring customers, 58 cents is spent compensating for process failures downstream.",
  },
  {
    statement: "The revenue you report isn\u2019t the revenue you\u2019re missing.",
    accentWord: "missing",
    metric: "Most organizations don\u2019t have a revenue problem. They have 30 process problems wearing a revenue mask.",
  },
] as const;

function highlightWord(text: string, word: string) {
  const index = text.toLowerCase().indexOf(word.toLowerCase());
  if (index === -1) return <>{text}</>;
  const before = text.slice(0, index);
  const match = text.slice(index, index + word.length);
  const after = text.slice(index + word.length);
  return (
    <>
      {before}
      <span className="text-amber">{match}</span>
      {after}
    </>
  );
}

export function TruthsSection() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center px-6 py-32">
      <div className="w-full max-w-3xl space-y-24 sm:space-y-32">
        {truths.map((truth, i) => (
          <div key={i}>
            <ScrollReveal delay={i * 0.15}>
              <p className="font-display text-xl leading-relaxed tracking-tight text-text-primary sm:text-2xl md:text-3xl">
                {highlightWord(truth.statement, truth.accentWord)}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={i * 0.15 + 0.3}>
              <p className="mt-6 text-sm leading-relaxed text-text-muted sm:text-base">
                {truth.metric}
              </p>
            </ScrollReveal>
          </div>
        ))}
      </div>
    </section>
  );
}
