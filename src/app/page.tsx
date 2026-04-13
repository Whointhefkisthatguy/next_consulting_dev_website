"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* ── N> Icon Mark ── */
function Monogram({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 215.1 94.2"
      fill="currentColor"
      role="img"
      aria-label="Next Consulting"
      className={className}
    >
      <polygon points="94.5,0 94.5,63.4 112.2,84.1 94.5,67.2 27.2,0 27,0.2 27,0 0,0 0,94.2 27,94.2 27,43 12.5,23 27,38 83.3,94.2 104.1,94.2 121.4,94.2 121.4,0" />
      <polyline points="193.1,23.3 169.8,0 131.6,0 176.9,45.3 128,94.2 145.3,94.2 166.2,94.2 187.8,72.6 204.5,55.7 204.1,56.3 215.1,45.3 196,26.2 196,26.2" />
    </svg>
  );
}

/* ── Geometric shapes with parallax-ready sub-elements ── */
function GeoShapes({ id }: { id: string }) {
  return (
    <div className={`geo-shapes geo-shapes-${id} absolute inset-0 pointer-events-none overflow-hidden opacity-0`}>
      {/* Diagonal construction lines — parallax slow */}
      <svg className="geo-slow absolute inset-0 w-full h-full will-change-transform" preserveAspectRatio="none">
        <line x1="0" y1="100%" x2="30%" y2="0" stroke="rgba(201,150,63,0.05)" strokeWidth="0.5" />
        <line x1="100%" y1="100%" x2="70%" y2="0" stroke="rgba(201,150,63,0.05)" strokeWidth="0.5" />
        <line x1="15%" y1="100%" x2="45%" y2="0" stroke="rgba(201,150,63,0.025)" strokeWidth="0.5" />
        <line x1="85%" y1="100%" x2="55%" y2="0" stroke="rgba(201,150,63,0.025)" strokeWidth="0.5" />
      </svg>

      {/* Corner brackets — parallax medium */}
      <div className="geo-mid will-change-transform">
        <div className="absolute top-[10%] left-[6%] w-20 h-20 sm:w-28 sm:h-28 border-l border-t border-text-faint/[0.07]" />
        <div className="absolute bottom-[10%] right-[6%] w-20 h-20 sm:w-28 sm:h-28 border-r border-b border-text-faint/[0.07]" />
        <div className="absolute top-[10%] right-[6%] w-12 h-12 sm:w-16 sm:h-16 border-r border-t border-text-faint/[0.04]" />
        <div className="absolute bottom-[10%] left-[6%] w-12 h-12 sm:w-16 sm:h-16 border-l border-b border-text-faint/[0.04]" />
      </div>

      {/* Horizontal accent rules */}
      <div className="geo-slow will-change-transform">
        <div className="absolute top-[48%] left-[4%] w-[14%] h-px bg-gradient-to-r from-amber/[0.07] to-transparent" />
        <div className="absolute top-[52%] right-[4%] w-[14%] h-px bg-gradient-to-l from-amber/[0.07] to-transparent" />
      </div>

      {/* Circle arc — parallax fast (closest to viewer) */}
      <svg className="geo-fast absolute top-[15%] right-[10%] w-36 h-36 sm:w-56 sm:h-56 will-change-transform" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(201,150,63,0.035)" strokeWidth="0.4" strokeDasharray="6 14" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(201,150,63,0.02)" strokeWidth="0.3" strokeDasharray="3 18" />
      </svg>

      {/* Grid dots */}
      <svg className="geo-mid absolute bottom-[15%] left-[8%] w-28 h-28 sm:w-40 sm:h-40 will-change-transform" viewBox="0 0 80 80">
        {[0, 16, 32, 48, 64].map((x) =>
          [0, 16, 32, 48, 64].map((dy) => (
            <circle key={`${x}-${dy}`} cx={x + 8} cy={dy + 8} r="0.6" fill="rgba(201,150,63,0.045)" />
          ))
        )}
      </svg>

      {/* Crosshair center mark */}
      <div className="geo-fast absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 will-change-transform opacity-30">
        <div className="absolute top-1/2 left-0 w-full h-px bg-text-faint/[0.06]" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-text-faint/[0.06]" />
      </div>
    </div>
  );
}

/* ── Word split utility ── */
function SplitWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="word-reveal">
          <span className="split-word inline-block">{word}</span>
          {i < text.split(" ").length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

/* ── Truths Data ── */
const truths = [
  {
    statement: "Best in class is just the tallest person in a short room.",
    accent: "tallest",
    metric: "92% of companies benchmarking against industry averages are optimizing the wrong targets.",
  },
  {
    statement: "Your funnel isn\u2019t leaking. It was never built to hold.",
    accent: "never",
    metric: "For every dollar spent acquiring customers, 58 cents compensates for process failures downstream.",
  },
  {
    statement: "The revenue you report isn\u2019t the revenue you\u2019re missing.",
    accent: "missing",
    metric: "Most organizations don\u2019t have a revenue problem. They have 30 process problems wearing a revenue mask.",
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  /* ── GSAP ScrollTrigger timeline ── */
  useGSAP(() => {
    const layers = gsap.utils.toArray<HTMLElement>(".layer");
    const ambientLight = pinnedRef.current?.querySelector(".ambient-light") as HTMLElement;
    const bgShift = pinnedRef.current?.querySelector(".bg-shift") as HTMLElement;

    // Progress bar
    const progressBar = pinnedRef.current?.querySelector(".progress-bar");
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        pin: pinnedRef.current,
        pinSpacing: false,
      },
    });

    layers.forEach((layer, i) => {
      const geoShapes = pinnedRef.current?.querySelector(`.geo-shapes-${i}`);
      const geoSlow = geoShapes?.querySelectorAll(".geo-slow");
      const geoMid = geoShapes?.querySelectorAll(".geo-mid");
      const geoFast = geoShapes?.querySelectorAll(".geo-fast");
      const splitWords = layer.querySelectorAll(".split-word");

      if (i === 0) {
        // ── Monogram: visible on load, architectural split exit ──
        tl.to({}, { duration: 0.4 });

        // Shift ambient light as monogram exits
        if (ambientLight) {
          tl.to(ambientLight, {
            x: -100,
            y: -80,
            opacity: 0.5,
            duration: 1.2,
            ease: "power2.inOut",
          }, "<");
        }

        // Background warms slightly
        if (bgShift) {
          tl.to(bgShift, { opacity: 0.3, duration: 1.2, ease: "power2.inOut" }, "<");
        }

        tl.to(layer.querySelector(".mono-n"), {
          x: -40,
          opacity: 0,
          filter: "blur(4px)",
          duration: 1.2,
          ease: "power3.inOut",
        });
        tl.to(layer.querySelector(".mono-arrow"), {
          x: 40,
          opacity: 0,
          filter: "blur(4px)",
          duration: 1.2,
          ease: "power3.inOut",
        }, "<");
        tl.to(layer.querySelector(".mono-glow"), {
          opacity: 0,
          scale: 1.5,
          duration: 1.2,
          ease: "power2.out",
        }, "<0.1");

      } else if (i === layers.length - 1) {
        // ── Last layer: fade in and stay ──
        if (geoShapes) {
          tl.to(geoShapes, { opacity: 1, duration: 0.8, ease: "power2.out" });
        }
        tl.fromTo(
          layer,
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
          "<0.2"
        );
        // Ambient light centers and dims for CTA
        if (ambientLight) {
          tl.to(ambientLight, { x: 0, y: 0, opacity: 0.15, duration: 1, ease: "power2.inOut" }, "<");
        }

      } else {
        // ── Middle layers ──

        // Fade in geo shapes first, with parallax offsets
        if (geoShapes) {
          // Start geo elements offset, they'll drift during hold
          if (geoSlow) gsap.set(geoSlow, { y: 30 });
          if (geoMid) gsap.set(geoMid, { y: 20 });
          if (geoFast) gsap.set(geoFast, { y: 12 });

          tl.to(geoShapes, { opacity: 1, duration: 0.5, ease: "power2.out" });
        }

        // Fade in content
        tl.fromTo(
          layer,
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
          "<0.15"
        );

        // Word stagger entrance
        if (splitWords.length > 0) {
          tl.fromTo(
            splitWords,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.04, duration: 0.6, ease: "power3.out" },
            "<0.1"
          );
        }

        // Shift ambient light per section
        if (ambientLight) {
          const lightPositions = [
            { x: -100, y: -80 },  // quote
            { x: 80, y: -60 },    // H1
            { x: -60, y: 40 },    // truth 1
            { x: 100, y: -40 },   // truth 2
            { x: -40, y: 60 },    // truth 3
          ];
          const pos = lightPositions[i - 1] || { x: 0, y: 0 };
          tl.to(ambientLight, {
            x: pos.x,
            y: pos.y,
            duration: 1.5,
            ease: "power2.inOut",
          }, "<");
        }

        // Background temperature shift
        if (bgShift) {
          const bgOpacities = [0.3, 0.2, 0.35, 0.25, 0.4];
          tl.to(bgShift, {
            opacity: bgOpacities[i - 1] ?? 0.3,
            duration: 1,
            ease: "power2.inOut",
          }, "<");
        }

        // Hold — geo shapes drift during hold (parallax)
        const holdLabel = `hold-${i}`;
        tl.addLabel(holdLabel);
        tl.to({}, { duration: 0.6 });
        if (geoSlow) tl.to(geoSlow, { y: -15, duration: 1.6, ease: "none" }, holdLabel);
        if (geoMid) tl.to(geoMid, { y: -10, duration: 1.6, ease: "none" }, holdLabel);
        if (geoFast) tl.to(geoFast, { y: -6, duration: 1.6, ease: "none" }, holdLabel);

        // Fade out
        tl.to(layer, {
          opacity: 0,
          y: -25,
          scale: 0.98,
          duration: 0.8,
          ease: "power2.inOut",
        });
        if (geoShapes) {
          tl.to(geoShapes, { opacity: 0, duration: 0.5, ease: "power2.in" }, "<");
        }
      }
    });
  }, { scope: containerRef });

  return (
    <>
      <div ref={containerRef} className="relative" style={{ height: "700vh" }}>
        <div
          ref={pinnedRef}
          className="h-dvh w-full overflow-hidden relative bg-canvas"
        >

          {/* ── Background gradient shift (warms/cools between sections) ── */}
          <div
            className="bg-shift absolute inset-0 opacity-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(26,47,74,0.15) 0%, rgba(30,20,10,0.08) 50%, transparent 80%)",
            }}
          />

          {/* ── Ambient light source (shifts position per section) ── */}
          <div
            className="ambient-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none will-change-transform"
            style={{
              background: "radial-gradient(circle, rgba(201,150,63,0.04) 0%, rgba(201,150,63,0.01) 35%, transparent 65%)",
            }}
          />

          {/* ── Vignette ── */}
          <div className="vignette" />

          {/* ── Geometric backgrounds (one per content layer) ── */}
          <GeoShapes id="1" />
          <GeoShapes id="2" />
          <GeoShapes id="3" />
          <GeoShapes id="4" />
          <GeoShapes id="5" />
          <GeoShapes id="6" />

          {/* ═══ LAYER 0: Monogram (white, visible on load) ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center will-change-transform z-20">
            <div
              className="mono-glow absolute w-[500px] h-[500px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)",
              }}
            />
            <div className="relative flex items-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 121.4 94.2"
                fill="currentColor"
                className="mono-n h-28 w-auto sm:h-36 md:h-44 will-change-transform"
              >
                <polygon points="94.5,0 94.5,63.4 112.2,84.1 94.5,67.2 27.2,0 27,0.2 27,0 0,0 0,94.2 27,94.2 27,43 12.5,23 27,38 83.3,94.2 104.1,94.2 121.4,94.2 121.4,0" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="128 0 87.1 94.2"
                fill="currentColor"
                className="mono-arrow h-28 w-auto sm:h-36 md:h-44 -ml-1 will-change-transform"
              >
                <polyline points="193.1,23.3 169.8,0 131.6,0 176.9,45.3 128,94.2 145.3,94.2 166.2,94.2 187.8,72.6 204.5,55.7 204.1,56.3 215.1,45.3 196,26.2 196,26.2" />
              </svg>
            </div>
          </div>

          {/* ═══ LAYER 1: Drucker Quote ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-0 will-change-transform z-20">
            <div className="glass-panel max-w-2xl px-10 py-12 sm:px-14 sm:py-16 text-center">
              <blockquote>
                <p className="font-display text-[clamp(1.5rem,3.5vw,2.8rem)] leading-[1.3] font-light italic text-text-primary/90 tracking-wide">
                  <SplitWords text={"\u201CThere is surely nothing quite so useless as doing with great efficiency what should not be done at all.\u201D"} />
                </p>
                <footer className="mt-8">
                  <cite className="not-italic font-body text-[11px] uppercase tracking-[0.25em] text-text-muted">
                    Peter Drucker <span className="text-amber/40">/</span> 1963
                  </cite>
                </footer>
              </blockquote>
            </div>
          </div>

          {/* ═══ LAYER 2: H1 Transition ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-0 will-change-transform z-20">
            <div className="glass-panel max-w-2xl px-10 py-12 sm:px-14 sm:py-16 text-center">
              <h1 className="font-display text-[clamp(1.4rem,3.5vw,2.8rem)] font-light tracking-wide text-text-primary">
                <SplitWords text="The problem isn\u2019t scale," />
                <br />
                <SplitWords text="it\u2019s architecture." />
              </h1>
            </div>
          </div>

          {/* ═══ LAYER 3: Truth 1 ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-0 will-change-transform z-20">
            <div className="glass-panel max-w-2xl px-10 py-12 sm:px-14 sm:py-16 text-center">
              <p className="font-display text-[clamp(1.3rem,3vw,2.2rem)] leading-[1.35] font-light tracking-wide text-text-primary/85">
                <SplitWords text="Best in class is just the" /> <span className="text-amber split-word inline-block">tallest</span> <SplitWords text="person in a short room." />
              </p>
              <p className="mt-8 font-body text-[13px] leading-relaxed text-text-secondary/60 max-w-lg mx-auto">
                {truths[0].metric}
              </p>
            </div>
          </div>

          {/* ═══ LAYER 4: Truth 2 ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-0 will-change-transform z-20">
            <div className="glass-panel max-w-2xl px-10 py-12 sm:px-14 sm:py-16 text-center">
              <p className="font-display text-[clamp(1.3rem,3vw,2.2rem)] leading-[1.35] font-light tracking-wide text-text-primary/85">
                <SplitWords text="Your funnel isn\u2019t leaking. It was" /> <span className="text-amber split-word inline-block">never</span> <SplitWords text="built to hold." />
              </p>
              <p className="mt-8 font-body text-[13px] leading-relaxed text-text-secondary/60 max-w-lg mx-auto">
                {truths[1].metric}
              </p>
            </div>
          </div>

          {/* ═══ LAYER 5: Truth 3 ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-0 will-change-transform z-20">
            <div className="glass-panel max-w-2xl px-10 py-12 sm:px-14 sm:py-16 text-center">
              <p className="font-display text-[clamp(1.3rem,3vw,2.2rem)] leading-[1.35] font-light tracking-wide text-text-primary/85">
                <SplitWords text="The revenue you report isn\u2019t the revenue you\u2019re" /> <span className="text-amber split-word inline-block">missing</span><SplitWords text="." />
              </p>
              <p className="mt-8 font-body text-[13px] leading-relaxed text-text-secondary/60 max-w-lg mx-auto">
                {truths[2].metric}
              </p>
            </div>
          </div>

          {/* ═══ LAYER 6: Request a conversation ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-0 will-change-transform z-20">
            <div className="text-center">
              <a
                href="mailto:inquiry@gonextconsulting.dev"
                className="group relative inline-block font-body uppercase text-[12px] tracking-[0.3em] text-text-muted transition-colors duration-300 hover:text-amber"
              >
                Request a conversation
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-amber/40 transition-all duration-500 group-hover:w-full" />
              </a>
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-px bg-text-faint/10 z-30">
            <div className="progress-bar h-full bg-amber/20 origin-left" style={{ transform: "scaleX(0)" }} />
          </div>

        </div>
      </div>
    </>
  );
}
