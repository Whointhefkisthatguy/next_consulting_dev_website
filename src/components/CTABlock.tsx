export default function CTABlock() {
  return (
    <section className="py-32 px-6 sm:px-14 flex items-center justify-center text-center" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
      <div>
        <h2 className="font-[var(--font-display)] font-700 text-[clamp(2rem,4vw,3rem)] tracking-[-0.02em] mb-4" style={{ color: "#f0ebe3" }}>
          Ready to talk?
        </h2>
        <p className="font-[var(--font-body)] text-sm mb-12 max-w-md mx-auto" style={{ color: "#6b6560" }}>
          45 minutes. No pitch. A diagnostic or your time back.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="#book"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
            style={{ backgroundColor: "#c4835a", color: "#070708" }}
          >
            Book a Diagnostic
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="mailto:revops@nextconsulting.dev"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300"
            style={{ border: "1px solid #c4835a", color: "#c4835a" }}
          >
            Email Us
          </a>
        </div>

        <a
          href="/case-studies"
          className="inline-flex items-center gap-2 font-[var(--font-body)] text-sm transition-opacity duration-300 hover:opacity-80 mb-12"
          style={{ color: "rgba(240,235,227,0.35)" }}
        >
          Not ready to talk? See how we work first
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>

        <p className="font-[var(--font-body)] italic text-sm max-w-md mx-auto leading-relaxed" style={{ color: "#6b6560" }}>
          The question was never whether something needs to change.
          It&rsquo;s whether you&rsquo;ll be the one who changes it.
        </p>
      </div>
    </section>
  );
}
