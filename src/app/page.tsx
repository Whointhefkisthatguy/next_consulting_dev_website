"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MonogramDissolve } from "@/components/MonogramDissolve";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [dissolveProgress, setDissolveProgress] = useState(0);
  const [viewSize, setViewSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    setViewSize({ w: window.innerWidth, h: window.innerHeight });
    const onResize = () => setViewSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useGSAP(() => {
    // Monogram pin + dissolve
    const monoTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-mono",
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true,
        onUpdate: (self) => setDissolveProgress(self.progress),
      },
    });
    monoTl.to(".scroll-hint", { opacity: 0, duration: 0.1, ease: "none" });
    monoTl.to(".mono-glow", { opacity: 0, scale: 2, duration: 0.8, ease: "none" });

    // Content sections — simple fade + 24px lift. That's it. No scale. No blur.
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, { scope: mainRef });

  // Typography scale
  const h = "font-display font-semibold text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-[-0.03em] text-text-primary"; // hero
  const q = "font-display font-semibold text-[clamp(1.8rem,4.5vw,3.5rem)] leading-[1.15] tracking-[-0.02em] text-text-primary"; // quotes
  const sub = "font-body text-[11px] uppercase tracking-[0.18em] text-text-muted"; // labels
  const body = "font-body text-[17px] leading-[1.8] tracking-[0.01em] text-text-secondary max-w-[620px] mx-auto"; // body
  const stat = "font-body text-[15px] leading-[1.75] tracking-[0.01em] text-text-muted max-w-[620px] mx-auto"; // stats
  const closing = "font-display font-semibold text-[clamp(1.3rem,3vw,2rem)] leading-[1.2] tracking-[-0.02em] text-amber"; // closing Qs
  const pad = "py-[clamp(6rem,15vh,12rem)]"; // section padding

  return (
    <main ref={mainRef} className="bg-canvas text-text-primary">

      {/* ═══ MONOGRAM ═══ */}
      <section className="section-mono h-dvh flex items-center justify-center relative">
        {viewSize.w > 0 && (
          <MonogramDissolve progress={dissolveProgress} width={viewSize.w} height={viewSize.h} />
        )}
        <div className="mono-glow absolute w-[500px] h-[500px] rounded-full" style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)",
        }} />
        <div className="scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-5 h-9 rounded-full border border-white/15 flex items-start justify-center pt-2">
            <div className="w-0.5 h-2.5 bg-amber/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══ CHARACTER ═══ */}
      <section className={`${pad} text-center px-6`}>
        <p className="reveal font-body text-[17px] tracking-[0.01em] text-text-secondary">
          You built the machine. Is it what you imagined it would be?
        </p>
      </section>

      {/* ── Divider ── */}
      <div className="flex justify-center"><div className="w-12 h-px bg-amber/20" /></div>

      {/* ═══ DRUCKER QUOTE ═══ */}
      <section className={`${pad} text-center px-6 max-w-[1100px] mx-auto`}>
        <div className="reveal">
          <p className={q}>
            &ldquo;There is surely nothing quite so useless as doing with great efficiency what should not be done at all.&rdquo;
          </p>
          <p className={`mt-8 ${sub}`}>&mdash; Peter Drucker, 1963</p>
        </div>
      </section>

      {/* ═══ H1 ═══ */}
      <section className={`${pad} text-center px-6`}>
        <h1 className={`reveal ${h}`}>
          The problem isn&rsquo;t scale,<br />it&rsquo;s architecture.
        </h1>
      </section>

      <div className="flex justify-center"><div className="w-12 h-px bg-amber/20" /></div>

      {/* ═══ SECTION I ═══ */}
      <section className={`${pad} text-center px-6 max-w-[1100px] mx-auto`}>
        <p className={`reveal ${sub} text-amber/50 mb-8`}>I</p>
        <div className="reveal">
          <p className={q}>
            &ldquo;A system is perfectly designed to get the results it gets.&rdquo;
          </p>
          <p className={`mt-6 ${sub}`}>&mdash; W. Edwards Deming</p>
        </div>
      </section>

      <section className={`${pad} text-center px-6`}>
        <div className="reveal">
          <p className={body}>
            Where is your feedback loop &mdash; and what did it tell you last month? Without one, failure is invisible. And invisible failure is the only kind that kills companies.
          </p>
          <p className={`mt-10 ${stat}`}>
            78% of companies that found product-market fit still fail to scale. Not because of the market. Because they tried to grow a system they never examined.
          </p>
        </div>
      </section>

      <section className={`${pad} text-center px-6`}>
        <p className={`reveal ${closing}`}>Still calling it a performance problem?</p>
      </section>

      <div className="flex justify-center"><div className="w-12 h-px bg-amber/20" /></div>

      {/* ═══ SECTION II ═══ */}
      <section className={`${pad} text-center px-6 max-w-[1100px] mx-auto`}>
        <p className={`reveal ${sub} text-amber/50 mb-8`}>II</p>
        <div className="reveal">
          <p className={q}>
            &ldquo;The best executive is one who has sense enough to pick good men to do what he wants done, and self-restraint enough to keep from meddling with them while they do it.&rdquo;
          </p>
          <p className={`mt-6 ${sub}`}>&mdash; Theodore Roosevelt</p>
        </div>
      </section>

      <section className={`${pad} text-center px-6`}>
        <div className="reveal">
          <p className={body}>
            The creative intelligence of your workforce is free, available, and completely ignored. That&rsquo;s not a resource problem. That&rsquo;s a leadership one.
          </p>
          <p className={`mt-10 ${stat}`}>
            85% of frontline employees share concerns only through manager meetings &mdash; a hierarchical, slow, incomplete loop where field intelligence routinely never reaches the people making decisions.
          </p>
        </div>
      </section>

      <section className={`${pad} text-center px-6`}>
        <p className={`reveal ${closing}`}>Still building strategy in rooms the people doing the work aren&rsquo;t allowed into?</p>
      </section>

      <div className="flex justify-center"><div className="w-12 h-px bg-amber/20" /></div>

      {/* ═══ SECTION III ═══ */}
      <section className={`${pad} text-center px-6 max-w-[1100px] mx-auto`}>
        <p className={`reveal ${sub} text-amber/50 mb-8`}>III</p>
        <div className="reveal">
          <p className={q}>
            &ldquo;The most serious mistakes are not being made as a result of wrong answers. The truly dangerous thing is asking the wrong question.&rdquo;
          </p>
          <p className={`mt-6 ${sub}`}>&mdash; Peter Drucker</p>
        </div>
      </section>

      <section className={`${pad} text-center px-6`}>
        <div className="reveal">
          <p className={body}>
            You don&rsquo;t have a feedback loop. You have an NPS score. Those are not the same thing. One measures sentiment. The other drives decisions. You&rsquo;ve been doing one and calling it both.
          </p>
        </div>
      </section>

      <section className={`${pad} text-center px-6`}>
        <p className={`reveal ${closing}`}>Still measuring how people feel about a problem you haven&rsquo;t diagnosed?</p>
      </section>

      <div className="flex justify-center"><div className="w-12 h-px bg-amber/20" /></div>

      {/* ═══ SECTION IV ═══ */}
      <section className={`${pad} text-center px-6 max-w-[1100px] mx-auto`}>
        <p className={`reveal ${sub} text-amber/50 mb-8`}>IV</p>
        <div className="reveal">
          <p className={q}>
            &ldquo;You must maintain unwavering faith that you can and will prevail &mdash; and at the same time confront the most brutal facts of your current reality.&rdquo;
          </p>
          <p className={`mt-6 ${sub}`}>&mdash; Jim Collins</p>
        </div>
      </section>

      <section className={`${pad} text-center px-6`}>
        <div className="reveal">
          <p className={body}>
            Growth does not fix a broken system. It funds it.
          </p>
          <p className={`mt-10 ${stat}`}>
            Across 6,103 firms studied over four decades, researchers found no evidence that scaling reduces costs or improves margins. More revenue through a broken process doesn&rsquo;t compound your gains. It compounds your losses.
          </p>
        </div>
      </section>

      <section className={`${pad} text-center px-6`}>
        <p className={`reveal ${closing}`}>Still going to let next quarter look exactly like the last one and call it momentum?</p>
      </section>

      <div className="flex justify-center"><div className="w-12 h-px bg-amber/20" /></div>

      {/* ═══ CTA ═══ */}
      <section className={`${pad} text-center px-6`}>
        <div className="reveal">
          <p className={`${sub} mb-12`}>
            Next Consulting <span className="text-amber/30">&middot;</span> Revenue Architecture
          </p>
          <a
            href="mailto:inquiry@gonextconsulting.dev"
            className="group inline-block border border-amber/40 px-14 py-7 transition-all duration-300 hover:border-amber/70 hover:bg-amber/[0.04]"
          >
            <span className="font-display font-semibold uppercase text-[clamp(0.9rem,2vw,1.3rem)] tracking-[0.3em] text-amber/80 group-hover:text-amber transition-colors duration-300">
              Request a Conversation
            </span>
          </a>
          <p className="mt-5 font-body text-[12px] tracking-[0.15em] text-text-muted">
            45 minutes. No pitch. A diagnostic or your time back.
          </p>
          <p className={`mt-16 font-body text-[14px] leading-[1.9] text-text-secondary max-w-[480px] mx-auto`}>
            The question was never whether something needs to change.
            It&rsquo;s whether you&rsquo;ll be the one who changes it.
          </p>
        </div>
      </section>

      <div className="h-24" />
    </main>
  );
}
