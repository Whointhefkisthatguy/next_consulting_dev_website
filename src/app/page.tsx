"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* ── Geometric shapes with parallax sub-elements ── */
function GeoShapes({ id }: { id: string }) {
  return (
    <div className={`geo-shapes geo-shapes-${id} absolute inset-0 pointer-events-none overflow-hidden opacity-0`}>
      <svg className="geo-slow absolute inset-0 w-full h-full will-change-transform" preserveAspectRatio="none">
        <line x1="0" y1="100%" x2="28%" y2="0" stroke="rgba(201,150,63,0.07)" strokeWidth="0.5" />
        <line x1="100%" y1="100%" x2="72%" y2="0" stroke="rgba(201,150,63,0.07)" strokeWidth="0.5" />
      </svg>
      <div className="geo-mid will-change-transform">
        <div className="absolute top-[8%] left-[5%] w-20 h-20 sm:w-28 sm:h-28 border-l border-t border-amber/[0.08]" />
        <div className="absolute bottom-[8%] right-[5%] w-20 h-20 sm:w-28 sm:h-28 border-r border-b border-amber/[0.08]" />
      </div>
      <div className="geo-slow will-change-transform">
        <div className="absolute top-[46%] left-[3%] w-[16%] h-px bg-gradient-to-r from-amber/[0.09] to-transparent" />
        <div className="absolute top-[54%] right-[3%] w-[16%] h-px bg-gradient-to-l from-amber/[0.09] to-transparent" />
      </div>
      <svg className="geo-fast absolute top-[12%] right-[8%] w-40 h-40 sm:w-56 sm:h-56 will-change-transform" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(201,150,63,0.05)" strokeWidth="0.4" strokeDasharray="5 15" />
      </svg>
      <svg className="geo-mid absolute bottom-[12%] left-[6%] w-32 h-32 sm:w-40 sm:h-40 will-change-transform" viewBox="0 0 80 80">
        {[0, 16, 32, 48, 64].map((x) =>
          [0, 16, 32, 48, 64].map((dy) => (
            <circle key={`${x}-${dy}`} cx={x + 8} cy={dy + 8} r="0.7" fill="rgba(201,150,63,0.06)" />
          ))
        )}
      </svg>
    </div>
  );
}

/* ── Section content ── */
const sections = [
  {
    numeral: "I",
    quote: "\u201CA system is perfectly designed to get the results it gets.\u201D",
    attribution: "W. Edwards Deming",
    body: "Where is your feedback loop \u2014 and what did it tell you last month? Without one, failure is invisible. And invisible failure is the only kind that kills companies.",
    stat: "78% of companies that found product-market fit still fail to scale. Not because of the market. Because they tried to grow a system they never examined.",
    closing: "Still calling it a performance problem?",
  },
  {
    numeral: "II",
    quote: "\u201CThe best executive is one who has sense enough to pick good men to do what he wants done, and self-restraint enough to keep from meddling with them while they do it.\u201D",
    attribution: "Theodore Roosevelt",
    body: "The creative intelligence of your workforce is free, available, and completely ignored. That\u2019s not a resource problem. That\u2019s a leadership one.",
    stat: "85% of frontline employees share concerns only through manager meetings \u2014 a hierarchical, slow, incomplete loop where field intelligence routinely never reaches the people making decisions.",
    closing: "Still building strategy in rooms the people doing the work aren\u2019t allowed into?",
  },
  {
    numeral: "III",
    quote: "\u201CThe most serious mistakes are not being made as a result of wrong answers. The truly dangerous thing is asking the wrong question.\u201D",
    attribution: "Peter Drucker",
    body: "You don\u2019t have a feedback loop. You have an NPS score. Those are not the same thing. One measures sentiment. The other drives decisions. You\u2019ve been doing one and calling it both.",
    stat: null,
    closing: "Still measuring how people feel about a problem you haven\u2019t diagnosed?",
  },
  {
    numeral: "IV",
    quote: "\u201CYou must maintain unwavering faith that you can and will prevail \u2014 and at the same time confront the most brutal facts of your current reality.\u201D",
    attribution: "Jim Collins",
    body: "Growth does not fix a broken system. It funds it.",
    stat: "Across 6,103 firms studied over four decades, researchers found no evidence that scaling reduces costs or improves margins. More revenue through a broken process doesn\u2019t compound your gains. It compounds your losses.",
    closing: "Still going to let next quarter look exactly like the last one and call it momentum?",
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, []);

  /* ── GSAP ScrollTrigger ── */
  useGSAP(() => {
    const layers = gsap.utils.toArray<HTMLElement>(".layer");
    const ambientLight = pinnedRef.current?.querySelector(".ambient-light") as HTMLElement;
    const bgShift = pinnedRef.current?.querySelector(".bg-shift") as HTMLElement;
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
        scrub: 1.2,
        pin: pinnedRef.current,
        pinSpacing: false,
      },
    });

    const lightPositions = [
      { x: 0, y: 0 },      // monogram
      { x: -120, y: -60 },  // I
      { x: 100, y: -40 },   // II
      { x: -80, y: 50 },    // III
      { x: 60, y: -70 },    // IV
      { x: 0, y: 0 },       // CTA
    ];

    const bgOpacities = [0, 0.35, 0.25, 0.4, 0.3, 0.15];

    layers.forEach((layer, i) => {
      const geoShapes = pinnedRef.current?.querySelector(`.geo-shapes-${i}`);
      const geoSlow = geoShapes?.querySelectorAll(".geo-slow");
      const geoMid = geoShapes?.querySelectorAll(".geo-mid");
      const geoFast = geoShapes?.querySelectorAll(".geo-fast");

      // Sub-elements for staggered reveal
      const quote = layer.querySelector(".sect-quote");
      const body = layer.querySelector(".sect-body");
      const stat = layer.querySelector(".sect-stat");
      const closing = layer.querySelector(".sect-closing");

      if (i === 0) {
        // ── Monogram ──
        tl.to({}, { duration: 0.3 });
        tl.to(layer.querySelector(".mono-n"), { x: -50, opacity: 0, filter: "blur(6px)", duration: 1.2, ease: "power3.inOut" });
        tl.to(layer.querySelector(".mono-arrow"), { x: 50, opacity: 0, filter: "blur(6px)", duration: 1.2, ease: "power3.inOut" }, "<");
        tl.to(layer.querySelector(".mono-glow"), { opacity: 0, scale: 1.5, duration: 1.2, ease: "power2.out" }, "<0.1");
        if (ambientLight) tl.to(ambientLight, { ...lightPositions[1], opacity: 0.6, duration: 1.2, ease: "power2.inOut" }, "<");
        if (bgShift) tl.to(bgShift, { opacity: bgOpacities[1], duration: 1.2, ease: "power2.inOut" }, "<");

      } else if (i === layers.length - 1) {
        // ── CTA ──
        if (geoShapes) tl.to(geoShapes, { opacity: 1, duration: 0.6, ease: "power2.out" });
        tl.fromTo(layer, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "<0.2");
        if (ambientLight) tl.to(ambientLight, { ...lightPositions[i], opacity: 0.2, duration: 1, ease: "power2.inOut" }, "<");
        if (bgShift) tl.to(bgShift, { opacity: bgOpacities[i], duration: 1, ease: "power2.inOut" }, "<");

      } else {
        // ── Content sections: staggered sub-element reveal ──

        // Geo shapes enter
        if (geoShapes) {
          if (geoSlow) gsap.set(geoSlow, { y: 25 });
          if (geoMid) gsap.set(geoMid, { y: 15 });
          if (geoFast) gsap.set(geoFast, { y: 8 });
          tl.to(geoShapes, { opacity: 1, duration: 0.5, ease: "power2.out" });
        }

        // Ambient light shifts
        if (ambientLight) tl.to(ambientLight, { ...lightPositions[i], duration: 1.5, ease: "power2.inOut" }, "<");
        if (bgShift) tl.to(bgShift, { opacity: bgOpacities[i], duration: 1, ease: "power2.inOut" }, "<");

        // Layer fades in
        tl.fromTo(layer, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }, "<0.2");

        // Staggered sub-elements: quote → body → stat → closing
        if (quote) tl.fromTo(quote, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "<0.1");
        if (body) tl.fromTo(body, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");
        if (stat) tl.fromTo(stat, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3");
        if (closing) tl.fromTo(closing, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.2");

        // Hold — geo parallax drift
        const holdLabel = `hold-${i}`;
        tl.addLabel(holdLabel);
        tl.to({}, { duration: 0.8 });
        if (geoSlow) tl.to(geoSlow, { y: -12, duration: 2, ease: "none" }, holdLabel);
        if (geoMid) tl.to(geoMid, { y: -8, duration: 2, ease: "none" }, holdLabel);
        if (geoFast) tl.to(geoFast, { y: -5, duration: 2, ease: "none" }, holdLabel);

        // Exit
        tl.to(layer, { opacity: 0, y: -20, duration: 0.8, ease: "power2.inOut" });
        if (geoShapes) tl.to(geoShapes, { opacity: 0, duration: 0.5, ease: "power2.in" }, "<");
      }
    });
  }, { scope: containerRef });

  return (
    <>
      <div ref={containerRef} className="relative" style={{ height: "900vh" }}>
        <div ref={pinnedRef} className="h-dvh w-full overflow-hidden relative bg-canvas">

          {/* ── Background gradient shift ── */}
          <div className="bg-shift absolute inset-0 opacity-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(26,47,74,0.18) 0%, rgba(40,25,12,0.1) 50%, transparent 80%)",
          }} />

          {/* ── Ambient light ── */}
          <div className="ambient-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none will-change-transform opacity-40" style={{
            background: "radial-gradient(circle, rgba(201,150,63,0.06) 0%, rgba(201,150,63,0.015) 40%, transparent 65%)",
          }} />

          {/* ── Vignette ── */}
          <div className="vignette" />

          {/* ── Geo shapes (one per content layer) ── */}
          {[1, 2, 3, 4, 5].map((id) => <GeoShapes key={id} id={String(id)} />)}

          {/* ═══ LAYER 0: Monogram ═══ */}
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

          {/* ═══ LAYERS 1-4: Content Sections ═══ */}
          {sections.map((s, i) => (
            <div key={s.numeral} className="layer absolute inset-0 flex items-center justify-center opacity-0 will-change-transform z-20">
              <div className="glass-panel max-w-2xl w-full mx-6 px-8 py-10 sm:px-12 sm:py-14">

                {/* Numeral */}
                <div className="font-body text-[11px] uppercase tracking-[0.3em] text-amber/50 mb-8">
                  {s.numeral}
                </div>

                {/* Quote */}
                <div className="sect-quote opacity-0">
                  <p className="font-display text-[clamp(1.1rem,2.2vw,1.6rem)] leading-[1.4] font-light italic text-text-primary/80 tracking-wide">
                    {s.quote}
                  </p>
                  <p className="mt-3 font-body text-[11px] uppercase tracking-[0.2em] text-text-muted/60">
                    &mdash; {s.attribution}
                  </p>
                </div>

                {/* Thin rule */}
                <div className="my-8 h-px w-12 bg-amber/15" />

                {/* Body */}
                <div className="sect-body opacity-0">
                  <p className="font-body text-[15px] leading-[1.75] font-light text-text-primary/75 tracking-wide">
                    {s.body}
                  </p>
                </div>

                {/* Stat */}
                {s.stat && (
                  <div className="sect-stat opacity-0 mt-6">
                    <p className="font-body text-[13px] leading-[1.7] text-text-secondary/55 tracking-wide">
                      {s.stat}
                    </p>
                  </div>
                )}

                {/* Closing question */}
                <div className="sect-closing opacity-0 mt-8">
                  <p className="font-display text-[clamp(1rem,1.8vw,1.3rem)] italic text-amber/70 tracking-wide">
                    {s.closing}
                  </p>
                </div>

              </div>
            </div>
          ))}

          {/* ═══ LAYER 5: CTA ═══ */}
          <div className="layer absolute inset-0 flex items-center justify-center opacity-0 will-change-transform z-20">
            <div className="text-center max-w-lg px-6">
              <a
                href="mailto:inquiry@gonextconsulting.dev"
                className="group relative inline-block font-body uppercase text-[13px] tracking-[0.3em] text-text-primary/60 transition-colors duration-300 hover:text-amber"
              >
                Request a Conversation
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-amber/50 transition-all duration-500 group-hover:w-full" />
              </a>
              <p className="mt-10 font-display text-[clamp(0.95rem,1.5vw,1.15rem)] leading-[1.6] italic text-text-muted/50 tracking-wide">
                The question was never whether something needs to change.
                <br />
                It&rsquo;s whether you&rsquo;ll be the one who changes it.
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-px bg-text-faint/10 z-30">
            <div className="progress-bar h-full bg-amber/25 origin-left" style={{ transform: "scaleX(0)" }} />
          </div>

        </div>
      </div>
    </>
  );
}
