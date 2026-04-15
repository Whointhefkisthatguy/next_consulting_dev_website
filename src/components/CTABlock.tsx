import ScrollReveal from "./ScrollReveal";

export default function CTABlock() {
  return (
    <section className="py-32 px-6 sm:px-14 border-t border-[var(--divider)] flex items-center justify-center text-center">
      <ScrollReveal stagger>
        <h2 className="reveal font-[var(--font-display)] font-700 text-[clamp(2rem,4vw,3rem)] tracking-[-0.02em] text-cream mb-4">
          Ready to talk?
        </h2>
        <p className="reveal font-[var(--font-body)] text-sm text-muted mb-12 max-w-md mx-auto">
          45 minutes. No pitch. A diagnostic or your time back.
        </p>

        <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {/* Primary */}
          <a
            href="#book"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-copper text-void font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-copper-hover"
          >
            Book a Call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Secondary */}
          <a
            href="mailto:revops@nextconsulting.dev"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-copper text-copper font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-copper hover:text-void"
          >
            Email Us
          </a>

          {/* Tertiary */}
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-copper font-[var(--font-body)] text-sm transition-colors duration-300 hover:text-copper-hover"
          >
            Request Information
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <p className="reveal font-[var(--font-body)] italic text-sm text-muted max-w-md mx-auto leading-relaxed">
          The question was never whether something needs to change.
          It&rsquo;s whether you&rsquo;ll be the one who changes it.
        </p>
      </ScrollReveal>
    </section>
  );
}
