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

/* ── Architectural geometric shapes for depth ── */
function GeoShapes({ id }: { id: string }) {
  return (
    <div className={`geo-shapes geo-shapes-${id} absolute inset-0 pointer-events-none overflow-hidden opacity-0`}>
      {/* Thin diagonal lines */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <line x1="0" y1="100%" x2="35%" y2="0" stroke="rgba(201,150,63,0.04)" strokeWidth="1" />
        <line x1="100%" y1="100%" x2="65%" y2="0" stroke="rgba(201,150,63,0.04)" strokeWidth="1" />
      </svg>
      {/* Corner bracket top-left */}
      <div className="absolute top-[12%] left-[8%] w-16 h-16 sm:w-24 sm:h-24 border-l border-t border-text-faint/[0.06]" />
      {/* Corner bracket bottom-right */}
      <div className="absolute bottom-[12%] right-[8%] w-16 h-16 sm:w-24 sm:h-24 border-r border-b border-text-faint/[0.06]" />
      {/* Horizontal rule accent */}
      <div className="absolute top-1/2 left-[5%] w-[12%] h-px bg-gradient-to-r from-amber/[0.06] to-transparent" />
      <div className="absolute top-1/2 right-[5%] w-[12%] h-px bg-gradient-to-l from-amber/[0.06] to-transparent" />
      {/* Circle arc */}
      <svg className="absolute top-[20%] right-[12%] w-32 h-32 sm:w-48 sm:h-48 opacity-50" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(201,150,63,0.03)" strokeWidth="0.5" strokeDasharray="8 12" />
      </svg>
      {/* Grid dots */}
      <svg className="absolute bottom-[18%] left-[10%] w-24 h-24 sm:w-32 sm:h-32 opacity-50" viewBox="0 0 60 60">
        {[0, 15, 30, 45].map((x) =>
          [0, 15, 30, 45].map((dy) => (
            <circle key={`${x}-${dy}`} cx={x + 7.5} cy={dy + 7.5} r="0.8" fill="rgba(201,150,63,0.05)" />
          ))
        )}
      </svg>
    </div>
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
      // Get geo shapes for this layer
      const geoShapes = pinnedRef.current?.querySelector(`.geo-shapes-${i}`);

      if (i === 0) {
        // ── Monogram: visible on load, architectural exit ──
        // Hold for a beat
        tl.to({}, { duration: 0.4 });
        // Split exit: N and > separate, fade, scale
        tl.to(layer.querySelector(".mono-n"), {
          x: -30,
          opacity: 0,
          duration: 1,
          ease: "power3.inOut",
        });
        tl.to(layer.querySelector(".mono-arrow"), {
          x: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.inOut",
        }, "<");
        // Also fade the glow
        tl.to(layer.querySelector(".mono-glow"), {
          opacity: 0,
          scale: 1.3,
          duration: 1,
          ease: "power2.out",
        }, "<0.1");

      } else if (i === layers.length - 1) {
        // ── Last layer: fade in and stay ──
        if (geoShapes) {
          tl.to(geoShapes, { opacity: 1, duration: 0.8, ease: "power2.out" }, "<");
        }
        tl.fromTo(
          layer,
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
        );

      } else {
        // ── Middle layers: fade in with geo shapes, hold, fade out ──
        tl.fromTo(
          layer,
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
        );
        if (geoShapes) {
          tl.to(geoShapes, { opacity: 1, duration: 0.6, ease: "power2.out" }, "<0.3");
        }
        tl.to({}, { duration: 0.6 }); // Hold
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
          className="h-dvh w-full overflow-hidden relative"
        >

          {/* ── Geometric backgrounds (one per content layer) ── */}
          <GeoShapes id="1" />
          <GeoShapes id="2" />
          <GeoShapes id="3" />
          <GeoShapes id="4" />
          <GeoShapes id="5" />
          <GeoShapes id="6" />

          {/* ═══ LAYER 0: Monogram (white, visible on load) ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center will-change-transform">
            {/* Subtle glow behind mark */}
            <div
              className="mono-glow absolute w-[500px] h-[500px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)",
              }}
            />
            <div className="relative flex items-center text-white">
              {/* N letterform */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 121.4 94.2"
                fill="currentColor"
                className="mono-n h-28 w-auto sm:h-36 md:h-44 will-change-transform"
              >
                <polygon points="94.5,0 94.5,63.4 112.2,84.1 94.5,67.2 27.2,0 27,0.2 27,0 0,0 0,94.2 27,94.2 27,43 12.5,23 27,38 83.3,94.2 104.1,94.2 121.4,94.2 121.4,0" />
              </svg>
              {/* > chevron arrow */}
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
          <div className="layer absolute inset-0 flex items-center justify-center opacity-0 will-change-transform">
            <div className="max-w-2xl px-6 sm:px-8 text-center">
              <blockquote>
                <p className="font-display text-[clamp(1.5rem,3.5vw,2.8rem)] leading-[1.3] font-light italic text-text-primary/90 tracking-wide">
                  &ldquo;There is surely nothing quite so useless as doing with great
                  efficiency what should not be done at all.&rdquo;
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
          <div className="layer absolute inset-0 flex items-center justify-center opacity-0 will-change-transform">
            <div className="max-w-2xl px-6 sm:px-8 text-center">
              <h1 className="font-display text-[clamp(1.4rem,3.5vw,2.8rem)] font-light tracking-wide text-text-primary">
                The problem isn&rsquo;t scale<span className="text-amber">,</span>
                <br />
                it&rsquo;s architecture<span className="text-amber">.</span>
              </h1>
            </div>
          </div>

          {/* ═══ LAYER 3: Truth 1 ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-0 will-change-transform">
            <div className="max-w-2xl px-6 sm:px-8 text-center">
              <p className="font-display text-[clamp(1.3rem,3vw,2.2rem)] leading-[1.35] font-light tracking-wide text-text-primary/85">
                Best in class is just the <span className="text-amber">tallest</span> person in a short room.
              </p>
              <p className="mt-8 font-body text-[13px] leading-relaxed text-text-secondary/60 max-w-lg mx-auto">
                {truths[0].metric}
              </p>
            </div>
          </div>

          {/* ═══ LAYER 4: Truth 2 ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-0 will-change-transform">
            <div className="max-w-2xl px-6 sm:px-8 text-center">
              <p className="font-display text-[clamp(1.3rem,3vw,2.2rem)] leading-[1.35] font-light tracking-wide text-text-primary/85">
                Your funnel isn&rsquo;t leaking. It was <span className="text-amber">never</span> built to hold.
              </p>
              <p className="mt-8 font-body text-[13px] leading-relaxed text-text-secondary/60 max-w-lg mx-auto">
                {truths[1].metric}
              </p>
            </div>
          </div>

          {/* ═══ LAYER 5: Truth 3 ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-0 will-change-transform">
            <div className="max-w-2xl px-6 sm:px-8 text-center">
              <p className="font-display text-[clamp(1.3rem,3vw,2.2rem)] leading-[1.35] font-light tracking-wide text-text-primary/85">
                The revenue you report isn&rsquo;t the revenue you&rsquo;re <span className="text-amber">missing</span>.
              </p>
              <p className="mt-8 font-body text-[13px] leading-relaxed text-text-secondary/60 max-w-lg mx-auto">
                {truths[2].metric}
              </p>
            </div>
          </div>

          {/* ═══ LAYER 6: Request a conversation ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-0 will-change-transform">
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
          <div className="absolute top-0 left-0 right-0 h-px bg-text-faint/10">
            <div className="progress-bar h-full bg-amber/20 origin-left" style={{ transform: "scaleX(0)" }} />
          </div>

        </div>
      </div>
    </>
  );
}
