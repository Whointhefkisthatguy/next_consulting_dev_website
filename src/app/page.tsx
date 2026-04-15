"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Ambient warm glow — gives glass cards material to blur */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-[20%] right-[10%] w-[800px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(184,149,106,0.06) 0%, transparent 65%)" }} />
        <div className="absolute bottom-[15%] left-[5%] w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(184,149,106,0.04) 0%, transparent 60%)" }} />
      </div>

      {/* ═══ HERO / MONOGRAM ═══ */}
      <section className="relative h-dvh min-h-[700px] flex flex-col justify-center items-center overflow-hidden">
        {/* Subtle warm gradient background */}
        <div className="absolute inset-0 bg-[var(--warm-black)]" />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(184,149,106,0.04) 0%, transparent 70%)",
        }} />

        {/* Monogram */}
        <div className="relative z-10 text-[var(--cream)]" style={{ opacity: 0, animation: "fade-up 1.2s 0.3s cubic-bezier(0.25,0.1,0.25,1) forwards" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 215.1 94.2" fill="currentColor"
            className="h-20 w-auto sm:h-28 md:h-36" role="img" aria-label="Next Consulting">
            <polygon points="94.5,0 94.5,63.4 112.2,84.1 94.5,67.2 27.2,0 27,0.2 27,0 0,0 0,94.2 27,94.2 27,43 12.5,23 27,38 83.3,94.2 104.1,94.2 121.4,94.2 121.4,0" />
            <polyline points="193.1,23.3 169.8,0 131.6,0 176.9,45.3 128,94.2 145.3,94.2 166.2,94.2 187.8,72.6 204.5,55.7 204.1,56.3 215.1,45.3 196,26.2 196,26.2" />
          </svg>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 right-[3.5rem] flex flex-col items-center gap-3" style={{ opacity: 0, animation: "fade-up 1.2s 1s cubic-bezier(0.25,0.1,0.25,1) forwards" }}>
          <span className="text-[0.55rem] tracking-[0.25em] uppercase text-[var(--text-muted)]" style={{ writingMode: "vertical-rl" }}>Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--sand)] to-transparent" style={{ animation: "scroll-pulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ═══ CHARACTER ═══ */}
      <section className="py-[10rem] px-[3.5rem] border-t border-[var(--divider)] flex items-center justify-center text-center">
        <div className="max-w-[700px] reveal-stagger">
          <p className="reveal font-[var(--font-serif)] font-light italic text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.35] tracking-[-0.01em] text-[var(--sand-pale)]">
            You built the machine. Is it what you imagined it would be?
          </p>
        </div>
      </section>

      {/* ═══ DRUCKER QUOTE ═══ */}
      <section className="py-[10rem] px-[3.5rem] border-t border-[var(--divider)] flex items-center justify-center text-center">
        <div className="max-w-[800px] reveal-stagger">
          <blockquote className="reveal font-[var(--font-serif)] font-light italic text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.35] tracking-[-0.01em] text-[var(--sand-pale)]">
            &ldquo;There is surely nothing quite so useless as doing with great efficiency what should not be done at all.&rdquo;
          </blockquote>
          <cite className="reveal block mt-10 font-[var(--font-sans)] not-italic text-[0.65rem] font-normal tracking-[0.3em] uppercase text-[var(--text-muted)]">
            &mdash; Peter Drucker, 1963
          </cite>
        </div>
      </section>

      {/* ═══ H1 ═══ */}
      <section className="py-[10rem] px-[3.5rem] border-t border-[var(--divider)] flex items-center justify-center text-center">
        <h1 className="reveal font-[var(--font-serif)] font-light text-[clamp(3rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.02em] text-[var(--cream)]">
          The problem isn&rsquo;t scale,<br />it&rsquo;s <em className="italic text-[var(--sand-light)]">architecture</em>.
        </h1>
      </section>

      {/* ═══ SECTION I ═══ */}
      <section className="py-[8rem] px-[3.5rem] border-t border-[var(--divider)]">
        <p className="reveal text-[0.6rem] font-normal tracking-[0.4em] uppercase text-[var(--sand)] mb-16">Section I</p>
        <div className="flex items-center justify-center text-center">
          <div className="max-w-[800px] reveal-stagger">
            <blockquote className="reveal font-[var(--font-serif)] font-light italic text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.35] tracking-[-0.01em] text-[var(--sand-pale)]">
              &ldquo;A system is perfectly designed to get the results it gets.&rdquo;
            </blockquote>
            <cite className="reveal block mt-8 font-[var(--font-sans)] not-italic text-[0.65rem] font-normal tracking-[0.3em] uppercase text-[var(--text-muted)]">
              &mdash; W. Edwards Deming
            </cite>
          </div>
        </div>
      </section>

      <section className="py-[8rem] px-[3.5rem] flex items-center justify-center text-center">
        <div className="reveal glass-card">
          <p className="text-[0.95rem] font-extralight leading-[1.8] text-[var(--cream)] opacity-80">
            Where is your feedback loop &mdash; and what did it tell you last month? Without one, failure is invisible. And invisible failure is the only kind that kills companies.
          </p>
          <p className="mt-10 text-[0.8rem] font-extralight leading-[1.8] text-[var(--text-muted)]">
            78% of companies that found product-market fit still fail to scale. Not because of the market. Because they tried to grow a system they never examined.
          </p>
        </div>
      </section>

      <section className="py-[8rem] px-[3.5rem] flex items-center justify-center text-center">
        <p className="reveal font-[var(--font-serif)] font-light italic text-[clamp(1.3rem,2.8vw,2rem)] leading-[1.35] text-[var(--sand)]">
          Still calling it a performance problem?
        </p>
      </section>

      {/* ═══ SECTION II ═══ */}
      <section className="py-[8rem] px-[3.5rem] border-t border-[var(--divider)]">
        <p className="reveal text-[0.6rem] font-normal tracking-[0.4em] uppercase text-[var(--sand)] mb-16">Section II</p>
        <div className="flex items-center justify-center text-center">
          <div className="max-w-[800px] reveal-stagger">
            <blockquote className="reveal font-[var(--font-serif)] font-light italic text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.35] tracking-[-0.01em] text-[var(--sand-pale)]">
              &ldquo;The best executive is one who has sense enough to pick good men to do what he wants done, and self-restraint enough to keep from meddling with them while they do it.&rdquo;
            </blockquote>
            <cite className="reveal block mt-8 font-[var(--font-sans)] not-italic text-[0.65rem] font-normal tracking-[0.3em] uppercase text-[var(--text-muted)]">
              &mdash; Theodore Roosevelt
            </cite>
          </div>
        </div>
      </section>

      <section className="py-[8rem] px-[3.5rem] flex items-center justify-center text-center">
        <div className="reveal glass-card">
          <p className="text-[0.95rem] font-extralight leading-[1.8] text-[var(--cream)] opacity-80">
            The creative intelligence of your workforce is free, available, and completely ignored. That&rsquo;s not a resource problem. That&rsquo;s a leadership one.
          </p>
          <p className="mt-10 text-[0.8rem] font-extralight leading-[1.8] text-[var(--text-muted)]">
            85% of frontline employees share concerns only through manager meetings &mdash; a hierarchical, slow, incomplete loop where field intelligence routinely never reaches the people making decisions.
          </p>
        </div>
      </section>

      <section className="py-[8rem] px-[3.5rem] flex items-center justify-center text-center">
        <p className="reveal font-[var(--font-serif)] font-light italic text-[clamp(1.3rem,2.8vw,2rem)] leading-[1.35] text-[var(--sand)]">
          Still building strategy in rooms the people doing the work aren&rsquo;t allowed into?
        </p>
      </section>

      {/* ═══ SECTION III ═══ */}
      <section className="py-[8rem] px-[3.5rem] border-t border-[var(--divider)]">
        <p className="reveal text-[0.6rem] font-normal tracking-[0.4em] uppercase text-[var(--sand)] mb-16">Section III</p>
        <div className="flex items-center justify-center text-center">
          <div className="max-w-[800px] reveal-stagger">
            <blockquote className="reveal font-[var(--font-serif)] font-light italic text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.35] tracking-[-0.01em] text-[var(--sand-pale)]">
              &ldquo;The most serious mistakes are not being made as a result of wrong answers. The truly dangerous thing is asking the wrong question.&rdquo;
            </blockquote>
            <cite className="reveal block mt-8 font-[var(--font-sans)] not-italic text-[0.65rem] font-normal tracking-[0.3em] uppercase text-[var(--text-muted)]">
              &mdash; Peter Drucker
            </cite>
          </div>
        </div>
      </section>

      <section className="py-[8rem] px-[3.5rem] flex items-center justify-center text-center">
        <div className="reveal glass-card">
          <p className="text-[0.95rem] font-extralight leading-[1.8] text-[var(--cream)] opacity-80">
            You don&rsquo;t have a feedback loop. You have an NPS score. Those are not the same thing. One measures sentiment. The other drives decisions. You&rsquo;ve been doing one and calling it both.
          </p>
        </div>
      </section>

      <section className="py-[8rem] px-[3.5rem] flex items-center justify-center text-center">
        <p className="reveal font-[var(--font-serif)] font-light italic text-[clamp(1.3rem,2.8vw,2rem)] leading-[1.35] text-[var(--sand)]">
          Still measuring how people feel about a problem you haven&rsquo;t diagnosed?
        </p>
      </section>

      {/* ═══ SECTION IV ═══ */}
      <section className="py-[8rem] px-[3.5rem] border-t border-[var(--divider)]">
        <p className="reveal text-[0.6rem] font-normal tracking-[0.4em] uppercase text-[var(--sand)] mb-16">Section IV</p>
        <div className="flex items-center justify-center text-center">
          <div className="max-w-[800px] reveal-stagger">
            <blockquote className="reveal font-[var(--font-serif)] font-light italic text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.35] tracking-[-0.01em] text-[var(--sand-pale)]">
              &ldquo;You must maintain unwavering faith that you can and will prevail &mdash; and at the same time confront the most brutal facts of your current reality.&rdquo;
            </blockquote>
            <cite className="reveal block mt-8 font-[var(--font-sans)] not-italic text-[0.65rem] font-normal tracking-[0.3em] uppercase text-[var(--text-muted)]">
              &mdash; Jim Collins
            </cite>
          </div>
        </div>
      </section>

      <section className="py-[8rem] px-[3.5rem] flex items-center justify-center text-center">
        <div className="reveal glass-card">
          <p className="text-[0.95rem] font-extralight leading-[1.8] text-[var(--cream)] opacity-80">
            Growth does not fix a broken system. It funds it.
          </p>
          <p className="mt-10 text-[0.8rem] font-extralight leading-[1.8] text-[var(--text-muted)]">
            Across 6,103 firms studied over four decades, researchers found no evidence that scaling reduces costs or improves margins. More revenue through a broken process doesn&rsquo;t compound your gains. It compounds your losses.
          </p>
        </div>
      </section>

      <section className="py-[8rem] px-[3.5rem] flex items-center justify-center text-center">
        <p className="reveal font-[var(--font-serif)] font-light italic text-[clamp(1.3rem,2.8vw,2rem)] leading-[1.35] text-[var(--sand)]">
          Still going to let next quarter look exactly like the last one and call it momentum?
        </p>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-[10rem] px-[3.5rem] border-t border-[var(--divider)] flex items-center justify-center text-center">
        <div className="reveal-stagger">
          <p className="reveal text-[0.6rem] font-normal tracking-[0.4em] uppercase text-[var(--text-muted)] mb-12">
            Next Consulting &middot; Revenue Architecture
          </p>
          <a
            href="mailto:inquiry@gonextconsulting.dev"
            className="reveal group inline-flex items-center gap-3 px-[2.2rem] py-[1rem] bg-[var(--sand)] text-[var(--warm-black)] font-[var(--font-sans)] text-[0.7rem] font-medium tracking-[0.2em] uppercase no-underline transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-[var(--sand-light)] hover:pr-[2.8rem]"
          >
            Request a Conversation
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <p className="reveal mt-5 text-[0.7rem] font-light tracking-[0.1em] text-[var(--text-muted)]">
            45 minutes. No pitch. A diagnostic or your time back.
          </p>
          <p className="reveal mt-16 font-[var(--font-serif)] font-light italic text-[0.95rem] leading-[1.7] text-[var(--text-muted)] max-w-[440px] mx-auto">
            The question was never whether something needs to change.
            It&rsquo;s whether you&rsquo;ll be the one who changes it.
          </p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-12 px-[3.5rem] border-t border-[var(--divider)] flex justify-between items-center">
        <span className="font-[var(--font-serif)] text-[0.9rem] font-normal tracking-[0.15em] uppercase text-[var(--text-muted)]">
          Next Consulting
        </span>
        <span className="text-[0.65rem] font-light tracking-[0.1em] text-[var(--text-muted)]">
          &copy; {new Date().getFullYear()}
        </span>
      </footer>
    </>
  );
}
