"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, []);

  useGSAP(() => {
    const build = () => {
      const layers = gsap.utils.toArray<HTMLElement>(".layer");
      const orbA = pinnedRef.current?.querySelector(".orb-a") as HTMLElement;
      const orbB = pinnedRef.current?.querySelector(".orb-b") as HTMLElement;
      const orbC = pinnedRef.current?.querySelector(".orb-c") as HTMLElement;
      const progressBar = pinnedRef.current?.querySelector(".progress-bar");

      if (progressBar) {
        gsap.to(progressBar, {
          scaleX: 1, ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom bottom", scrub: 0.3 },
        });
      }

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

      // Orb parallax across full timeline
      const totalDur = layers.length * 3;
      if (orbA) tl.to(orbA, { xPercent: -25, yPercent: 30, duration: totalDur, ease: "none" }, 0);
      if (orbB) tl.to(orbB, { xPercent: 18, yPercent: -22, duration: totalDur, ease: "none" }, 0);
      if (orbC) tl.to(orbC, { xPercent: -12, yPercent: -18, duration: totalDur, ease: "none" }, 0);

      layers.forEach((layer, i) => {
        const inner = layer.querySelector(".layer-inner") as HTMLElement;
        const bloom = layer.querySelector(".bloom") as HTMLElement;
        const isQuote = layer.hasAttribute("data-layer-quote");
        const isClosing = layer.hasAttribute("data-layer-closing");

        if (inner) gsap.set(inner, { willChange: "transform, opacity, filter" });

        if (i === 0) {
          // ── MONOGRAM ──
          gsap.set(layer, { opacity: 1 });
          tl.to({}, { duration: 0.4 }); // Hold on load
          tl.to(layer.querySelector(".mono-n"), { x: -60, opacity: 0, filter: "blur(8px)", duration: 1, ease: "none" });
          tl.to(layer.querySelector(".mono-arrow"), { x: 60, opacity: 0, filter: "blur(8px)", duration: 1, ease: "none" }, "<");
          tl.to(layer.querySelector(".mono-glow"), { opacity: 0, scale: 1.5, duration: 1, ease: "none" }, "<");

        } else if (i === layers.length - 1) {
          // ── CTA ──
          gsap.set(layer, { opacity: 0 });
          if (inner) gsap.set(inner, { y: 50, scale: 0.9, filter: "blur(3px)" });
          tl.to(layer, { opacity: 1, duration: 0.5, ease: "none" });
          if (inner) tl.to(inner, { y: 0, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "none" }, "<");

        } else if (isQuote) {
          // ── QUOTE LAYERS: line-by-line reveal ──
          gsap.set(layer, { opacity: 0 });
          const quoteP = layer.querySelector("[data-quote]") as HTMLElement;
          let split: SplitText | null = null;

          if (quoteP) {
            split = SplitText.create(quoteP, { type: "lines", mask: "lines" });
            gsap.set(split.lines, { yPercent: 110, opacity: 0 });
          }

          if (inner) gsap.set(inner, { scale: 0.9, filter: "blur(2px)" });

          // Enter
          tl.to(layer, { opacity: 1, duration: 0.4, ease: "none" });
          if (inner) tl.to(inner, { scale: 1, filter: "blur(0px)", duration: 0.7, ease: "none" }, "<");
          if (split) tl.to(split.lines, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "none" }, "<0.1");

          // Hold
          tl.to({}, { duration: 0.8 });

          // Exit
          if (split) tl.to(split.lines, { yPercent: -110, opacity: 0, duration: 0.5, stagger: 0.06, ease: "none" });
          if (inner) tl.to(inner, { scale: 0.93, filter: "blur(2px)", duration: 0.6, ease: "none" }, "<0.1");
          tl.to(layer, { opacity: 0, duration: 0.4, ease: "none" }, "<0.1");

        } else if (isClosing) {
          // ── CLOSING QUESTION: scales UP as focal punch ──
          gsap.set(layer, { opacity: 0 });
          if (inner) gsap.set(inner, { y: 40, scale: 0.85, filter: "blur(4px)" });

          // Enter small
          tl.to(layer, { opacity: 1, duration: 0.4, ease: "none" });
          if (inner) tl.to(inner, { y: 0, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "none" }, "<");

          // ZOOM to 1.3 — the punch
          if (inner) tl.to(inner, { scale: 1.25, duration: 0.6, ease: "none" });

          // Hold at zoom
          tl.to({}, { duration: 0.8 });

          // Exit: scale back and out
          if (inner) tl.to(inner, { scale: 0.9, y: -40, filter: "blur(3px)", duration: 0.7, ease: "none" });
          tl.to(layer, { opacity: 0, duration: 0.5, ease: "none" }, "<0.1");

        } else {
          // ── CONTENT LAYERS: body + stat with glass + bloom ──
          gsap.set(layer, { opacity: 0 });
          if (inner) gsap.set(inner, { y: 60, scale: 0.88, filter: "blur(3px)" });
          if (bloom) gsap.set(bloom, { opacity: 0, scale: 0.75 });

          // Enter
          if (bloom) tl.to(bloom, { opacity: 1, scale: 1, duration: 0.7, ease: "none" });
          tl.to(layer, { opacity: 1, duration: 0.5, ease: "none" }, "<0.1");
          if (inner) tl.to(inner, { y: 0, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "none" }, "<");

          // Hold
          tl.to({}, { duration: 0.8 });

          // Exit
          if (bloom) tl.to(bloom, { opacity: 0, scale: 0.85, duration: 0.5, ease: "none" });
          if (inner) tl.to(inner, { y: -50, scale: 0.92, filter: "blur(2px)", duration: 0.8, ease: "none" }, "<");
          tl.to(layer, { opacity: 0, duration: 0.5, ease: "none" }, "<0.15");
        }
      });
    };

    if (document.fonts.status === "loaded") { build(); }
    else { document.fonts.ready.then(() => { build(); ScrollTrigger.refresh(); }); }
  }, { scope: containerRef });

  // Style constants — Barlow Semi Condensed display, Barlow body
  const disp = "font-display font-semibold"; // 600 weight
  const txt = "font-body font-normal"; // 400 weight

  return (
    <>
      <div ref={containerRef} className="relative" style={{ height: "2200vh" }}>
        <div ref={pinnedRef} className="h-dvh w-full overflow-hidden relative bg-canvas">

          {/* Orbs */}
          <div className="orb-a absolute -top-[20%] -right-[15%] w-[1200px] h-[800px] rounded-full pointer-events-none will-change-transform z-[1]"
            style={{ background: "radial-gradient(ellipse at center, rgba(201,150,63,0.12) 0%, rgba(201,150,63,0.03) 40%, transparent 70%)" }} />
          <div className="orb-b absolute -bottom-[25%] -left-[20%] w-[1000px] h-[1000px] rounded-full pointer-events-none will-change-transform z-[1]"
            style={{ background: "radial-gradient(ellipse at center, rgba(26,47,74,0.18) 0%, rgba(26,47,74,0.05) 40%, transparent 65%)" }} />
          <div className="orb-c absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full pointer-events-none will-change-transform z-[1] animate-breathe"
            style={{ background: "radial-gradient(circle, rgba(201,150,63,0.08) 0%, rgba(201,150,63,0.02) 40%, transparent 65%)" }} />

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
          <div className="layer opacity-0 absolute inset-0 flex items-center justify-center will-change-transform z-20" data-layer-quote>
            <div className="layer-inner will-change-transform max-w-4xl px-6 text-center relative">
              <span className="absolute -top-6 -left-2 sm:-left-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&ldquo;</span>
              <span className="absolute -bottom-2 right-0 sm:-right-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&rdquo;</span>
              <p data-quote className={`${disp} uppercase text-[clamp(1.6rem,4.5vw,3.2rem)] leading-[1.35] tracking-[0.25em] text-text-primary/90`}>
                There is surely nothing quite so useless as doing with great efficiency what should not be done at all.
              </p>
              <p className={`mt-6 ${txt} uppercase text-[11px] tracking-[0.3em] text-text-muted/50`}>&mdash; Peter Drucker, 1963</p>
            </div>
          </div>

          {/* ═══ 2: H1 ═══ */}
          <div className="layer opacity-0 absolute inset-0 flex items-center justify-center will-change-transform z-20" data-layer-quote>
            <div className="layer-inner will-change-transform text-center px-6">
              <h1 className={`${disp} uppercase text-[clamp(1.8rem,5vw,4rem)] tracking-[0.25em] text-text-primary leading-[1.3]`}>
                The problem isn&rsquo;t scale<span className="text-amber">,</span>
                <br />
                it&rsquo;s architecture<span className="text-amber">.</span>
              </h1>
            </div>
          </div>

          {/* ═══ SECTION I ═══ */}
          {/* 3: Quote */}
          <div className="layer opacity-0 absolute inset-0 flex items-center justify-center will-change-transform z-20" data-layer-quote>
            <div className="layer-inner will-change-transform max-w-4xl px-6 text-center relative">
              <span className="absolute -top-6 -left-2 sm:-left-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&ldquo;</span>
              <span className="absolute -bottom-2 right-0 sm:-right-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&rdquo;</span>
              <p className={`${txt} uppercase text-[11px] tracking-[0.3em] text-amber/50 mb-6`}>I</p>
              <p data-quote className={`${disp} uppercase text-[clamp(1.4rem,3.5vw,2.6rem)] leading-[1.4] tracking-[0.25em] text-text-primary/90`}>
                A system is perfectly designed to get the results it gets.
              </p>
              <p className={`mt-5 ${txt} uppercase text-[11px] tracking-[0.3em] text-text-muted/50`}>&mdash; W. Edwards Deming</p>
            </div>
          </div>

          {/* 4: Body + Stat */}
          <div className="layer opacity-0 absolute inset-0 flex items-center justify-center will-change-transform z-20">
            <div className="layer-inner will-change-transform max-w-2xl px-6 text-center relative">
              <div className="bloom absolute -inset-16 -z-10 pointer-events-none rounded-full"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(201,150,63,0.10) 0%, transparent 70%)" }} />
              <div className="glass-panel">
                <p className={`${txt} text-[clamp(0.85rem,1.8vw,1.1rem)] leading-[1.9] tracking-[0.08em] text-text-primary/75`}>
                  Where is your feedback loop &mdash; and what did it tell you last month? Without one, failure is invisible. And invisible failure is the only kind that kills companies.
                </p>
                <p className={`mt-8 ${txt} text-[clamp(0.75rem,1.4vw,0.9rem)] leading-[1.8] tracking-[0.06em] text-text-secondary/50`}>
                  78% of companies that found product-market fit still fail to scale. Not because of the market. Because they tried to grow a system they never examined.
                </p>
              </div>
            </div>
          </div>

          {/* 5: Closing */}
          <div className="layer opacity-0 absolute inset-0 flex items-center justify-center will-change-transform z-20" data-layer-closing>
            <div className="layer-inner will-change-transform text-center px-6">
              <p className={`${disp} uppercase text-[clamp(1.2rem,3vw,2.2rem)] tracking-[0.25em] text-amber/80`}>
                Still calling it a performance problem?
              </p>
            </div>
          </div>

          {/* ═══ SECTION II ═══ */}
          {/* 6: Quote */}
          <div className="layer opacity-0 absolute inset-0 flex items-center justify-center will-change-transform z-20" data-layer-quote>
            <div className="layer-inner will-change-transform max-w-4xl px-6 text-center relative">
              <span className="absolute -top-6 -left-2 sm:-left-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&ldquo;</span>
              <span className="absolute -bottom-2 right-0 sm:-right-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&rdquo;</span>
              <p className={`${txt} uppercase text-[11px] tracking-[0.3em] text-amber/50 mb-6`}>II</p>
              <p data-quote className={`${disp} uppercase text-[clamp(1.2rem,3vw,2.2rem)] leading-[1.4] tracking-[0.25em] text-text-primary/90`}>
                The best executive is one who has sense enough to pick good men to do what he wants done, and self-restraint enough to keep from meddling with them while they do it.
              </p>
              <p className={`mt-5 ${txt} uppercase text-[11px] tracking-[0.3em] text-text-muted/50`}>&mdash; Theodore Roosevelt</p>
            </div>
          </div>

          {/* 7: Body + Stat */}
          <div className="layer opacity-0 absolute inset-0 flex items-center justify-center will-change-transform z-20">
            <div className="layer-inner will-change-transform max-w-2xl px-6 text-center relative">
              <div className="bloom absolute -inset-16 -z-10 pointer-events-none rounded-full"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(201,150,63,0.10) 0%, transparent 70%)" }} />
              <div className="glass-panel">
                <p className={`${txt} text-[clamp(0.85rem,1.8vw,1.1rem)] leading-[1.9] tracking-[0.08em] text-text-primary/75`}>
                  The creative intelligence of your workforce is free, available, and completely ignored. That&rsquo;s not a resource problem. That&rsquo;s a leadership one.
                </p>
                <p className={`mt-8 ${txt} text-[clamp(0.75rem,1.4vw,0.9rem)] leading-[1.8] tracking-[0.06em] text-text-secondary/50`}>
                  85% of frontline employees share concerns only through manager meetings &mdash; a hierarchical, slow, incomplete loop where field intelligence routinely never reaches the people making decisions.
                </p>
              </div>
            </div>
          </div>

          {/* 8: Closing */}
          <div className="layer opacity-0 absolute inset-0 flex items-center justify-center will-change-transform z-20" data-layer-closing>
            <div className="layer-inner will-change-transform text-center px-6">
              <p className={`${disp} uppercase text-[clamp(1.2rem,3vw,2.2rem)] tracking-[0.25em] text-amber/80`}>
                Still building strategy in rooms the people doing the work aren&rsquo;t allowed into?
              </p>
            </div>
          </div>

          {/* ═══ SECTION III ═══ */}
          {/* 9: Quote */}
          <div className="layer opacity-0 absolute inset-0 flex items-center justify-center will-change-transform z-20" data-layer-quote>
            <div className="layer-inner will-change-transform max-w-4xl px-6 text-center relative">
              <span className="absolute -top-6 -left-2 sm:-left-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&ldquo;</span>
              <span className="absolute -bottom-2 right-0 sm:-right-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&rdquo;</span>
              <p className={`${txt} uppercase text-[11px] tracking-[0.3em] text-amber/50 mb-6`}>III</p>
              <p data-quote className={`${disp} uppercase text-[clamp(1.3rem,3.5vw,2.4rem)] leading-[1.4] tracking-[0.25em] text-text-primary/90`}>
                The most serious mistakes are not being made as a result of wrong answers. The truly dangerous thing is asking the wrong question.
              </p>
              <p className={`mt-5 ${txt} uppercase text-[11px] tracking-[0.3em] text-text-muted/50`}>&mdash; Peter Drucker</p>
            </div>
          </div>

          {/* 10: Body */}
          <div className="layer opacity-0 absolute inset-0 flex items-center justify-center will-change-transform z-20">
            <div className="layer-inner will-change-transform max-w-2xl px-6 text-center relative">
              <div className="bloom absolute -inset-16 -z-10 pointer-events-none rounded-full"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(201,150,63,0.10) 0%, transparent 70%)" }} />
              <div className="glass-panel">
                <p className={`${txt} text-[clamp(0.85rem,1.8vw,1.1rem)] leading-[1.9] tracking-[0.08em] text-text-primary/75`}>
                  You don&rsquo;t have a feedback loop. You have an NPS score. Those are not the same thing. One measures sentiment. The other drives decisions. You&rsquo;ve been doing one and calling it both.
                </p>
              </div>
            </div>
          </div>

          {/* 11: Closing */}
          <div className="layer opacity-0 absolute inset-0 flex items-center justify-center will-change-transform z-20" data-layer-closing>
            <div className="layer-inner will-change-transform text-center px-6">
              <p className={`${disp} uppercase text-[clamp(1.2rem,3vw,2.2rem)] tracking-[0.25em] text-amber/80`}>
                Still measuring how people feel about a problem you haven&rsquo;t diagnosed?
              </p>
            </div>
          </div>

          {/* ═══ SECTION IV ═══ */}
          {/* 12: Quote */}
          <div className="layer opacity-0 absolute inset-0 flex items-center justify-center will-change-transform z-20" data-layer-quote>
            <div className="layer-inner will-change-transform max-w-4xl px-6 text-center relative">
              <span className="absolute -top-6 -left-2 sm:-left-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&ldquo;</span>
              <span className="absolute -bottom-2 right-0 sm:-right-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&rdquo;</span>
              <p className={`${txt} uppercase text-[11px] tracking-[0.3em] text-amber/50 mb-6`}>IV</p>
              <p data-quote className={`${disp} uppercase text-[clamp(1.2rem,3vw,2.2rem)] leading-[1.4] tracking-[0.25em] text-text-primary/90`}>
                You must maintain unwavering faith that you can and will prevail &mdash; and at the same time confront the most brutal facts of your current reality.
              </p>
              <p className={`mt-5 ${txt} uppercase text-[11px] tracking-[0.3em] text-text-muted/50`}>&mdash; Jim Collins</p>
            </div>
          </div>

          {/* 13: Body + Stat */}
          <div className="layer opacity-0 absolute inset-0 flex items-center justify-center will-change-transform z-20">
            <div className="layer-inner will-change-transform max-w-2xl px-6 text-center relative">
              <div className="bloom absolute -inset-16 -z-10 pointer-events-none rounded-full"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(201,150,63,0.10) 0%, transparent 70%)" }} />
              <div className="glass-panel">
                <p className={`${txt} text-[clamp(0.85rem,1.8vw,1.1rem)] leading-[1.9] tracking-[0.08em] text-text-primary/75`}>
                  Growth does not fix a broken system. It funds it.
                </p>
                <p className={`mt-8 ${txt} text-[clamp(0.75rem,1.4vw,0.9rem)] leading-[1.8] tracking-[0.06em] text-text-secondary/50`}>
                  Across 6,103 firms studied over four decades, researchers found no evidence that scaling reduces costs or improves margins. More revenue through a broken process doesn&rsquo;t compound your gains. It compounds your losses.
                </p>
              </div>
            </div>
          </div>

          {/* 14: Closing */}
          <div className="layer opacity-0 absolute inset-0 flex items-center justify-center will-change-transform z-20" data-layer-closing>
            <div className="layer-inner will-change-transform text-center px-6">
              <p className={`${disp} uppercase text-[clamp(1.2rem,3vw,2.2rem)] tracking-[0.25em] text-amber/80`}>
                Still going to let next quarter look exactly like the last one and call it momentum?
              </p>
            </div>
          </div>

          {/* ═══ 15: CTA ═══ */}
          <div className="layer opacity-0 absolute inset-0 flex items-center justify-center will-change-transform z-20">
            <div className="layer-inner will-change-transform text-center max-w-xl px-6">
              <a
                href="mailto:inquiry@gonextconsulting.dev"
                className={`group relative inline-block ${disp} uppercase text-[14px] tracking-[0.3em] text-text-primary/70 transition-colors duration-300 hover:text-amber`}
              >
                Request a Conversation
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-amber/50 transition-all duration-500 group-hover:w-full" />
              </a>
              <p className={`mt-12 ${txt} text-[clamp(0.7rem,1.2vw,0.85rem)] leading-[2] tracking-[0.08em] text-text-secondary/55`}>
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
