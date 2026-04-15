"use client";

export default function ContactPage() {
  return (
    <section className="pt-40 pb-32 px-6 sm:px-14">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <h1
            className="font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em]"
            style={{ color: "#f0ebe3" }}
          >
            Contact
          </h1>
          <p
            className="mt-6 font-[var(--font-body)] italic text-base max-w-md"
            style={{ color: "rgba(240,235,227,0.55)" }}
          >
            &ldquo;The single biggest problem in communication is the illusion that it has taken place.&rdquo;
            <span className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase" style={{ color: "#6b6560" }}>
              &mdash; George Bernard Shaw
            </span>
          </p>
          <p
            className="mt-10 font-[var(--font-body)] text-[15px] leading-[1.8] max-w-md"
            style={{ color: "rgba(240,235,227,0.75)" }}
          >
            45 minutes. No pitch. A diagnostic or your time back. If you&rsquo;re ready to talk about what&rsquo;s actually going on in your business, we&rsquo;re ready to listen.
          </p>

          <div className="mt-12 space-y-4">
            <a
              href="mailto:revops@nextconsulting.dev"
              className="block font-[var(--font-body)] text-sm transition-opacity duration-300 hover:opacity-80"
              style={{ color: "#c4835a" }}
            >
              revops@nextconsulting.dev
            </a>
            <a
              href="#book"
              className="block font-[var(--font-body)] text-sm transition-opacity duration-300 hover:opacity-80"
              style={{ color: "#c4835a" }}
            >
              Book a call &rarr;
            </a>
          </div>
        </div>

        <div>
          <form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="block font-[var(--font-body)] text-xs tracking-[0.1em] uppercase mb-2" style={{ color: "#6b6560" }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full bg-transparent py-3 font-[var(--font-body)] text-sm outline-none transition-colors duration-300"
                style={{ color: "#f0ebe3", borderBottom: "1px solid rgba(240,235,227,0.1)" }}
                onFocus={(e) => e.currentTarget.style.borderBottomColor = "#c4835a"}
                onBlur={(e) => e.currentTarget.style.borderBottomColor = "rgba(240,235,227,0.1)"}
              />
            </div>
            <div>
              <label className="block font-[var(--font-body)] text-xs tracking-[0.1em] uppercase mb-2" style={{ color: "#6b6560" }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-transparent py-3 font-[var(--font-body)] text-sm outline-none transition-colors duration-300"
                style={{ color: "#f0ebe3", borderBottom: "1px solid rgba(240,235,227,0.1)" }}
                onFocus={(e) => e.currentTarget.style.borderBottomColor = "#c4835a"}
                onBlur={(e) => e.currentTarget.style.borderBottomColor = "rgba(240,235,227,0.1)"}
              />
            </div>
            <div>
              <label className="block font-[var(--font-body)] text-xs tracking-[0.1em] uppercase mb-2" style={{ color: "#6b6560" }}>
                Company
              </label>
              <input
                type="text"
                name="company"
                className="w-full bg-transparent py-3 font-[var(--font-body)] text-sm outline-none transition-colors duration-300"
                style={{ color: "#f0ebe3", borderBottom: "1px solid rgba(240,235,227,0.1)" }}
                onFocus={(e) => e.currentTarget.style.borderBottomColor = "#c4835a"}
                onBlur={(e) => e.currentTarget.style.borderBottomColor = "rgba(240,235,227,0.1)"}
              />
            </div>
            <div>
              <label className="block font-[var(--font-body)] text-xs tracking-[0.1em] uppercase mb-2" style={{ color: "#6b6560" }}>
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full bg-transparent py-3 font-[var(--font-body)] text-sm outline-none transition-colors duration-300 resize-none"
                style={{ color: "#f0ebe3", borderBottom: "1px solid rgba(240,235,227,0.1)" }}
                onFocus={(e) => e.currentTarget.style.borderBottomColor = "#c4835a"}
                onBlur={(e) => e.currentTarget.style.borderBottomColor = "rgba(240,235,227,0.1)"}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
              style={{ backgroundColor: "#c4835a", color: "#070708" }}
            >
              Send Message
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
