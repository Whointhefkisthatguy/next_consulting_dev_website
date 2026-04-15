"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  return (
    <section className="pt-40 pb-32 px-6 sm:px-14">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <ScrollReveal>
            <h1 className="reveal font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--cream)]">
              Contact
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="reveal mt-6 font-[var(--font-body)] italic text-base text-[var(--muted)] max-w-md">
              &ldquo;The single biggest problem in communication is the illusion that it has taken place.&rdquo;
              <span className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase">
                &mdash; George Bernard Shaw
              </span>
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <p className="reveal mt-10 font-[var(--font-body)] text-[15px] text-[var(--cream)] opacity-80 leading-[1.8] max-w-md">
              45 minutes. No pitch. A diagnostic or your time back. If you&rsquo;re ready to talk about what&rsquo;s actually going on in your business, we&rsquo;re ready to listen.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="reveal mt-12 space-y-4">
              <a
                href="mailto:revops@nextconsulting.dev"
                className="block font-[var(--font-body)] text-sm text-[var(--copper)] transition-colors duration-300 hover:text-[var(--copper-hover)]"
              >
                revops@nextconsulting.dev
              </a>
              <a
                href="#book"
                className="block font-[var(--font-body)] text-sm text-[var(--copper)] transition-colors duration-300 hover:text-[var(--copper-hover)]"
              >
                Book a call &rarr;
              </a>
            </div>
          </ScrollReveal>
        </div>

        <div>
          <ScrollReveal>
            <form
              className="reveal space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="block font-[var(--font-body)] text-xs text-[var(--muted)] tracking-[0.1em] uppercase mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-transparent border-b border-[var(--divider)] py-3 font-[var(--font-body)] text-sm text-[var(--cream)] outline-none transition-colors duration-300 focus:border-[var(--copper)]"
                />
              </div>
              <div>
                <label className="block font-[var(--font-body)] text-xs text-[var(--muted)] tracking-[0.1em] uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-[var(--divider)] py-3 font-[var(--font-body)] text-sm text-[var(--cream)] outline-none transition-colors duration-300 focus:border-[var(--copper)]"
                />
              </div>
              <div>
                <label className="block font-[var(--font-body)] text-xs text-[var(--muted)] tracking-[0.1em] uppercase mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  className="w-full bg-transparent border-b border-[var(--divider)] py-3 font-[var(--font-body)] text-sm text-[var(--cream)] outline-none transition-colors duration-300 focus:border-[var(--copper)]"
                />
              </div>
              <div>
                <label className="block font-[var(--font-body)] text-xs text-[var(--muted)] tracking-[0.1em] uppercase mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-transparent border-b border-[var(--divider)] py-3 font-[var(--font-body)] text-sm text-[var(--cream)] outline-none transition-colors duration-300 focus:border-[var(--copper)] resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--copper)] text-[var(--void)] font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-[var(--copper-hover)]"
              >
                Send Message
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
