"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ── Shared style constants ── */
const q = "font-body uppercase text-[clamp(1.4rem,3.5vw,2.6rem)] leading-[1.4] tracking-[0.3em] text-text-primary/90";
const qBig = "font-body uppercase text-[clamp(1.6rem,4.5vw,3.2rem)] leading-[1.35] tracking-[0.3em] text-text-primary/90";
const h1Style = "font-body uppercase text-[clamp(1.6rem,5vw,3.5rem)] tracking-[0.3em] text-text-primary";
const body = "font-body uppercase text-[clamp(0.75rem,1.6vw,1rem)] leading-[2] tracking-[0.3em] text-text-primary/70";
const stat = "font-body uppercase text-[clamp(0.65rem,1.3vw,0.85rem)] leading-[2] tracking-[0.3em] text-text-secondary/50";
const closing = "font-body uppercase text-[clamp(0.85rem,2vw,1.3rem)] tracking-[0.3em] text-amber/70";
const attr = "font-body uppercase text-[11px] tracking-[0.3em] text-text-muted/50";
const numeral = "font-body uppercase text-[11px] tracking-[0.3em] text-amber/50 mb-6";
const bigQuoteMark = "absolute font-body text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  /* ── Lenis ── */
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, []);

  /* ── GSAP Timeline ── */
  useGSAP(() => {
    const build = () => {
      const layers = gsap.utils.toArray<HTMLElement>(".layer");
      const orbA = pinnedRef.current?.querySelector(".orb-a") as HTMLElement;
      const orbB = pinnedRef.current?.querySelector(".orb-b") as HTMLElement;
      const orbC = pinnedRef.current?.querySelector(".orb-c") as HTMLElement;
      const progressBar = pinnedRef.current?.querySelector(".progress-bar");

      // Progress bar
      if (progressBar) {
        gsap.to(progressBar, {
          scaleX: 1, ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom bottom", scrub: 0.3 },
        });
      }

      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          pin: pinnedRef.current,
          pinSpacing: false,
        },
      });

      // ── Ambient orb parallax (continuous across full timeline) ──
      const totalDur = layers.length * 2.5; // approximate total timeline duration
      if (orbA) tl.to(orbA, { xPercent: -20, yPercent: 25, duration: totalDur, ease: "none" }, 0);
      if (orbB) tl.to(orbB, { xPercent: 15, yPercent: -20, duration: totalDur, ease: "none" }, 0);
      if (orbC) tl.to(orbC, { xPercent: -10, yPercent: -15, duration: totalDur, ease: "none" }, 0);

      // ── SplitText on quote layers ──
      const quoteIndices = [1, 3, 5, 7, 9];
      const splits: SplitText[] = [];

      layers.forEach((layer, i) => {
        const inner = layer.querySelector(".layer-inner") as HTMLElement;
        const bloom = layer.querySelector(".bloom") as HTMLElement;
        const closingQ = layer.querySelector("[data-closing]") as HTMLElement;
        const isQuote = quoteIndices.includes(i);

        if (inner) {
          gsap.set(inner, { willChange: "transform, opacity, filter" });
        }

        if (i === 0) {
          // ── MONOGRAM ──
          gsap.set(layer, { opacity: 1 });
          tl.to({}, { duration: 0.3 });
          tl.to(layer.querySelector(".mono-n"), { x: -60, opacity: 0, filter: "blur(8px)", duration: 1, ease: "none" });
          tl.to(layer.querySelector(".mono-arrow"), { x: 60, opacity: 0, filter: "blur(8px)", duration: 1, ease: "none" }, "<");
          tl.to(layer.querySelector(".mono-glow"), { opacity: 0, scale: 1.5, duration: 1, ease: "none" }, "<");

        } else if (i === layers.length - 1) {
          // ── CTA (last layer) ──
          gsap.set(layer, { opacity: 0.15 });
          if (inner) gsap.set(inner, { y: 60, scale: 0.88, filter: "blur(3px)" });

          tl.to(layer, { opacity: 1, duration: 0.5, ease: "none" });
          if (inner) tl.to(inner, { y: 0, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "none" }, "<");

        } else if (isQuote) {
          // ── QUOTE LAYERS (line-by-line reveal) ──
          gsap.set(layer, { opacity: 0.15 });

          const quoteP = layer.querySelector("[data-quote]") as HTMLElement;
          let split: SplitText | null = null;

          if (quoteP) {
            split = SplitText.create(quoteP, { type: "lines", mask: "lines" });
            splits.push(split);
            gsap.set(split.lines, { yPercent: 105, opacity: 0 });
          }

          // Enter
          tl.to(layer, { opacity: 1, duration: 0.3, ease: "none" });
          if (inner) {
            gsap.set(inner, { scale: 0.88, filter: "blur(2px)" });
            tl.to(inner, { scale: 1, filter: "blur(0px)", duration: 0.7, ease: "none" }, "<");
          }
          if (split) {
            tl.to(split.lines, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "none" }, "<0.1");
          }

          // Hold
          tl.to({}, { duration: 0.5 });

          // Exit
          if (split) {
            tl.to(split.lines, { yPercent: -105, opacity: 0, duration: 0.5, stagger: 0.05, ease: "none" });
          }
          if (inner) tl.to(inner, { scale: 0.92, filter: "blur(2px)", duration: 0.6, ease: "none" }, "<0.1");
          tl.to(layer, { opacity: 0.15, duration: 0.4, ease: "none" }, "<0.1");

        } else {
          // ── CONTENT LAYERS (scale+blur + bloom + glass + closing emphasis) ──
          gsap.set(layer, { opacity: 0.15 });
          if (inner) gsap.set(inner, { y: 60, scale: 0.88, filter: "blur(3px)" });
          if (bloom) gsap.set(bloom, { opacity: 0, scale: 0.75 });
          if (closingQ) gsap.set(closingQ, { scale: 0.95, transformOrigin: "center center" });

          // Enter: bloom first, then content scales in
          if (bloom) tl.to(bloom, { opacity: 1, scale: 1, duration: 0.7, ease: "none" });
          tl.to(layer, { opacity: 1, duration: 0.5, ease: "none" }, "<0.1");
          if (inner) tl.to(inner, { y: 0, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "none" }, "<");

          // Hold + closing question emphasis
          tl.to({}, { duration: 0.3 });
          if (closingQ) tl.to(closingQ, { scale: 1.15, duration: 0.4, ease: "none" });
          tl.to({}, { duration: 0.3 });

          // Exit
          if (closingQ) tl.to(closingQ, { scale: 0.95, opacity: 0.5, duration: 0.4, ease: "none" });
          if (bloom) tl.to(bloom, { opacity: 0, scale: 0.85, duration: 0.5, ease: "none" }, "<");
          if (inner) tl.to(inner, { y: -50, scale: 0.92, filter: "blur(2px)", duration: 0.8, ease: "none" }, "<");
          tl.to(layer, { opacity: 0, duration: 0.5, ease: "none" }, "<0.15");
        }
      });
    };

    // Guard: wait for fonts before SplitText measures
    if (document.fonts.status === "loaded") {
      build();
    } else {
      document.fonts.ready.then(() => {
        build();
        ScrollTrigger.refresh();
      });
    }
  }, { scope: containerRef });

  return (
    <>
      <div ref={containerRef} className="relative" style={{ height: "1600vh" }}>
        <div ref={pinnedRef} className="h-dvh w-full overflow-hidden relative bg-canvas">

          {/* ── Ambient Orbs (colored material for glassmorphism to blur) ── */}
          <div className="orb-a absolute -top-[20%] -right-[15%] w-[1200px] h-[800px] rounded-full pointer-events-none will-change-transform z-[1]"
            style={{ background: "radial-gradient(ellipse at center, rgba(201,150,63,0.12) 0%, rgba(201,150,63,0.03) 40%, transparent 70%)" }} />
          <div className="orb-b absolute -bottom-[25%] -left-[20%] w-[1000px] h-[1000px] rounded-full pointer-events-none will-change-transform z-[1]"
            style={{ background: "radial-gradient(ellipse at center, rgba(26,47,74,0.18) 0%, rgba(26,47,74,0.05) 40%, transparent 65%)" }} />
          <div className="orb-c absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full pointer-events-none will-change-transform z-[1] animate-breathe"
            style={{ background: "radial-gradient(circle, rgba(201,150,63,0.08) 0%, rgba(201,150,63,0.02) 40%, transparent 65%)" }} />

          {/* ── Vignette ── */}
          <div className="vignette" />

          {/* ═══ 0: Monogram ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center will-change-transform z-20">
            <div className="mono-glow absolute w-[500px] h-[500px] rounded-full" style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)",
            }} />
            <div className="relative flex items-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.4 94.2" fill="currentColor"
                className="mono-n h-28 w-auto sm:h-36 md:h-44 will-change-transform">
                <polygon points="94.5,0 94.5,63.4 112.2,84.1 94.5,67.2 27.2,0 27,0.2 27,0 0,0 0,94.2 27,94.2 27,43 12.5,23 27,38 83.3,94.2 104.1,94.2 121.4,94.2 121.4,0" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="128 0 87.1 94.2" fill="currentColor"
                className="mono-arrow h-28 w-auto sm:h-36 md:h-44 -ml-1 will-change-transform">
                <polyline points="193.1,23.3 169.8,0 131.6,0 176.9,45.3 128,94.2 145.3,94.2 166.2,94.2 187.8,72.6 204.5,55.7 204.1,56.3 215.1,45.3 196,26.2 196,26.2" />
              </svg>
            </div>
          </div>

          {/* ═══ 1: Opening Drucker Quote ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-[0.15] will-change-transform z-20">
            <div className="layer-inner will-change-transform max-w-4xl px-6 text-center relative">
              <span className={`${bigQuoteMark} -top-6 -left-2 sm:-left-6`}>&ldquo;</span>
              <span className={`${bigQuoteMark} -bottom-2 right-0 sm:-right-6`}>&rdquo;</span>
              <p data-quote className={qBig}>
                There is surely nothing quite so useless as doing with great efficiency what should not be done at all.
              </p>
              <p className={`mt-6 ${attr}`}>&mdash; Peter Drucker, 1963</p>
            </div>
          </div>

          {/* ═══ 2: H1 Transition ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-[0.15] will-change-transform z-20">
            <div className="layer-inner will-change-transform text-center px-6">
              <h1 className={h1Style}>
                The problem isn&rsquo;t scale<span className="text-amber">,</span>
                <br />
                it&rsquo;s architecture<span className="text-amber">.</span>
              </h1>
            </div>
          </div>

          {/* ═══ 3: I — Deming Quote ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-[0.15] will-change-transform z-20">
            <div className="layer-inner will-change-transform max-w-4xl px-6 text-center relative">
              <span className={`${bigQuoteMark} -top-6 -left-2 sm:-left-6`}>&ldquo;</span>
              <span className={`${bigQuoteMark} -bottom-2 right-0 sm:-right-6`}>&rdquo;</span>
              <p className={numeral}>I</p>
              <p data-quote className={q}>A system is perfectly designed to get the results it gets.</p>
              <p className={`mt-5 ${attr}`}>&mdash; W. Edwards Deming</p>
            </div>
          </div>

          {/* ═══ 4: I — Content ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-[0.15] will-change-transform z-20">
            <div className="layer-inner will-change-transform max-w-2xl px-6 text-center relative">
              {/* Gradient bloom */}
              <div className="bloom absolute -inset-16 -z-10 pointer-events-none rounded-full"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(201,150,63,0.10) 0%, transparent 70%)" }} />
              <div className="glass-panel">
                <p className={body}>
                  Where is your feedback loop &mdash; and what did it tell you last month? Without one, failure is invisible. And invisible failure is the only kind that kills companies.
                </p>
                <p className={`mt-8 ${stat}`}>
                  78% of companies that found product-market fit still fail to scale. Not because of the market. Because they tried to grow a system they never examined.
                </p>
                <p data-closing className={`mt-10 ${closing}`}>Still calling it a performance problem?</p>
              </div>
            </div>
          </div>

          {/* ═══ 5: II — Roosevelt Quote ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-[0.15] will-change-transform z-20">
            <div className="layer-inner will-change-transform max-w-4xl px-6 text-center relative">
              <span className={`${bigQuoteMark} -top-6 -left-2 sm:-left-6`}>&ldquo;</span>
              <span className={`${bigQuoteMark} -bottom-2 right-0 sm:-right-6`}>&rdquo;</span>
              <p className={numeral}>II</p>
              <p data-quote className={q}>The best executive is one who has sense enough to pick good men to do what he wants done, and self-restraint enough to keep from meddling with them while they do it.</p>
              <p className={`mt-5 ${attr}`}>&mdash; Theodore Roosevelt</p>
            </div>
          </div>

          {/* ═══ 6: II — Content ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-[0.15] will-change-transform z-20">
            <div className="layer-inner will-change-transform max-w-2xl px-6 text-center relative">
              <div className="bloom absolute -inset-16 -z-10 pointer-events-none rounded-full"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(201,150,63,0.10) 0%, transparent 70%)" }} />
              <div className="glass-panel">
                <p className={body}>
                  The creative intelligence of your workforce is free, available, and completely ignored. That&rsquo;s not a resource problem. That&rsquo;s a leadership one.
                </p>
                <p className={`mt-8 ${stat}`}>
                  85% of frontline employees share concerns only through manager meetings &mdash; a hierarchical, slow, incomplete loop where field intelligence routinely never reaches the people making decisions.
                </p>
                <p data-closing className={`mt-10 ${closing}`}>Still building strategy in rooms the people doing the work aren&rsquo;t allowed into?</p>
              </div>
            </div>
          </div>

          {/* ═══ 7: III — Drucker Quote ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-[0.15] will-change-transform z-20">
            <div className="layer-inner will-change-transform max-w-4xl px-6 text-center relative">
              <span className={`${bigQuoteMark} -top-6 -left-2 sm:-left-6`}>&ldquo;</span>
              <span className={`${bigQuoteMark} -bottom-2 right-0 sm:-right-6`}>&rdquo;</span>
              <p className={numeral}>III</p>
              <p data-quote className={q}>The most serious mistakes are not being made as a result of wrong answers. The truly dangerous thing is asking the wrong question.</p>
              <p className={`mt-5 ${attr}`}>&mdash; Peter Drucker</p>
            </div>
          </div>

          {/* ═══ 8: III — Content ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-[0.15] will-change-transform z-20">
            <div className="layer-inner will-change-transform max-w-2xl px-6 text-center relative">
              <div className="bloom absolute -inset-16 -z-10 pointer-events-none rounded-full"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(201,150,63,0.10) 0%, transparent 70%)" }} />
              <div className="glass-panel">
                <p className={body}>
                  You don&rsquo;t have a feedback loop. You have an NPS score. Those are not the same thing. One measures sentiment. The other drives decisions. You&rsquo;ve been doing one and calling it both.
                </p>
                <p data-closing className={`mt-10 ${closing}`}>Still measuring how people feel about a problem you haven&rsquo;t diagnosed?</p>
              </div>
            </div>
          </div>

          {/* ═══ 9: IV — Collins Quote ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-[0.15] will-change-transform z-20">
            <div className="layer-inner will-change-transform max-w-4xl px-6 text-center relative">
              <span className={`${bigQuoteMark} -top-6 -left-2 sm:-left-6`}>&ldquo;</span>
              <span className={`${bigQuoteMark} -bottom-2 right-0 sm:-right-6`}>&rdquo;</span>
              <p className={numeral}>IV</p>
              <p data-quote className={q}>You must maintain unwavering faith that you can and will prevail &mdash; and at the same time confront the most brutal facts of your current reality.</p>
              <p className={`mt-5 ${attr}`}>&mdash; Jim Collins</p>
            </div>
          </div>

          {/* ═══ 10: IV — Content ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-[0.15] will-change-transform z-20">
            <div className="layer-inner will-change-transform max-w-2xl px-6 text-center relative">
              <div className="bloom absolute -inset-16 -z-10 pointer-events-none rounded-full"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(201,150,63,0.10) 0%, transparent 70%)" }} />
              <div className="glass-panel">
                <p className={body}>
                  Growth does not fix a broken system. It funds it.
                </p>
                <p className={`mt-8 ${stat}`}>
                  Across 6,103 firms studied over four decades, researchers found no evidence that scaling reduces costs or improves margins. More revenue through a broken process doesn&rsquo;t compound your gains. It compounds your losses.
                </p>
                <p data-closing className={`mt-10 ${closing}`}>Still going to let next quarter look exactly like the last one and call it momentum?</p>
              </div>
            </div>
          </div>

          {/* ═══ 11: CTA ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-[0.15] will-change-transform z-20">
            <div className="layer-inner will-change-transform text-center max-w-xl px-6">
              <a
                href="mailto:inquiry@gonextconsulting.dev"
                className="group relative inline-block font-body uppercase text-[14px] tracking-[0.3em] text-text-primary/70 transition-colors duration-300 hover:text-amber"
              >
                Request a Conversation
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-amber/50 transition-all duration-500 group-hover:w-full" />
              </a>
              <p className="mt-12 font-body uppercase text-[clamp(0.65rem,1.2vw,0.8rem)] leading-[2.2] tracking-[0.3em] text-text-secondary/60">
                The question was never whether something needs to change.
                <br />
                It&rsquo;s whether you&rsquo;ll be the one who changes it.
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="absolute top-0 left-0 right-0 h-px bg-text-faint/10 z-30">
            <div className="progress-bar h-full bg-amber/25 origin-left" style={{ transform: "scaleX(0)" }} />
          </div>

        </div>
      </div>
    </>
  );
}
