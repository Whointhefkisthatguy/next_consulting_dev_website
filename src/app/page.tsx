"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Monogram split exit on scroll
    const monoTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-mono",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });
    monoTl.to(".mono-n", { x: -60, opacity: 0, filter: "blur(8px)", duration: 1, ease: "none" });
    monoTl.to(".mono-arrow", { x: 60, opacity: 0, filter: "blur(8px)", duration: 1, ease: "none" }, "<");
    monoTl.to(".mono-glow", { opacity: 0, scale: 1.5, duration: 1, ease: "none" }, "<");

    // All content sections: enter with scale+blur+y, closing questions zoom
    gsap.utils.toArray<HTMLElement>(".content-block").forEach((block) => {
      const inner = block.querySelector(".block-inner") as HTMLElement;
      const bloom = block.querySelector(".bloom") as HTMLElement;
      const closingQ = block.querySelector("[data-closing]") as HTMLElement;

      if (inner) {
        gsap.fromTo(inner,
          { y: 60, scale: 0.88, filter: "blur(4px)", opacity: 0 },
          {
            y: 0, scale: 1, filter: "blur(0px)", opacity: 1,
            duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (bloom) {
        gsap.fromTo(bloom,
          { opacity: 0, scale: 0.75 },
          {
            opacity: 1, scale: 1,
            duration: 1.2, ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (closingQ) {
        gsap.fromTo(closingQ,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1.15, opacity: 1,
            duration: 0.8, ease: "power2.out",
            scrollTrigger: {
              trigger: closingQ,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, { scope: mainRef });

  const disp = "font-display font-semibold";
  const txt = "font-body font-normal";

  return (
    <main ref={mainRef} className="bg-canvas relative">

      {/* Ambient orbs — fixed behind everything */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -right-[15%] w-[1200px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(201,150,63,0.10) 0%, rgba(201,150,63,0.02) 40%, transparent 70%)" }} />
        <div className="absolute -bottom-[25%] -left-[20%] w-[1000px] h-[1000px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(26,47,74,0.15) 0%, rgba(26,47,74,0.04) 40%, transparent 65%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full animate-breathe"
          style={{ background: "radial-gradient(circle, rgba(201,150,63,0.06) 0%, rgba(201,150,63,0.015) 40%, transparent 65%)" }} />
      </div>

      {/* Vignette */}
      <div className="vignette fixed" />

      {/* ═══ MONOGRAM ═══ */}
      <section className="section-mono h-dvh flex items-center justify-center relative z-10">
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
      </section>

      {/* ═══ DRUCKER QUOTE ═══ */}
      <section className="content-block min-h-dvh flex items-center justify-center relative z-10 px-6">
        <div className="block-inner max-w-4xl text-center relative">
          <span className="absolute -top-6 -left-2 sm:-left-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&ldquo;</span>
          <span className="absolute -bottom-2 right-0 sm:-right-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&rdquo;</span>
          <p className={`${disp} uppercase text-[clamp(1.6rem,4.5vw,3.2rem)] leading-[1.35] tracking-[0.25em] text-text-primary/90`}>
            There is surely nothing quite so useless as doing with great efficiency what should not be done at all.
          </p>
          <p className={`mt-6 ${txt} uppercase text-[11px] tracking-[0.3em] text-text-muted/50`}>&mdash; Peter Drucker, 1963</p>
        </div>
      </section>

      {/* ═══ H1 ═══ */}
      <section className="content-block min-h-[70vh] flex items-center justify-center relative z-10 px-6">
        <div className="block-inner text-center">
          <h1 className={`${disp} uppercase text-[clamp(1.8rem,5vw,4rem)] tracking-[0.25em] text-text-primary leading-[1.3]`}>
            The problem isn&rsquo;t scale,
            <br />
            it&rsquo;s architecture.
          </h1>
        </div>
      </section>

      {/* ═══ SECTION I ═══ */}
      <section className="content-block min-h-dvh flex items-center justify-center relative z-10 px-6">
        <div className="block-inner max-w-4xl text-center relative">
          <span className="absolute -top-6 -left-2 sm:-left-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&ldquo;</span>
          <span className="absolute -bottom-2 right-0 sm:-right-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&rdquo;</span>
          <p className={`${txt} uppercase text-[11px] tracking-[0.3em] text-amber/50 mb-6`}>I</p>
          <p className={`${disp} uppercase text-[clamp(1.4rem,3.5vw,2.6rem)] leading-[1.4] tracking-[0.25em] text-text-primary/90`}>
            A system is perfectly designed to get the results it gets.
          </p>
          <p className={`mt-5 ${txt} uppercase text-[11px] tracking-[0.3em] text-text-muted/50`}>&mdash; W. Edwards Deming</p>
        </div>
      </section>

      <section className="content-block min-h-[80vh] flex items-center justify-center relative z-10 px-6">
        <div className="block-inner max-w-2xl text-center relative">
          <div className="bloom absolute -inset-20 -z-10 pointer-events-none rounded-full"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(201,150,63,0.10) 0%, transparent 70%)" }} />
          <div className="glass-panel">
            <p className={`${txt} text-[clamp(0.85rem,1.8vw,1.1rem)] leading-[1.9] tracking-[0.08em] text-text-primary/80`}>
              Where is your feedback loop &mdash; and what did it tell you last month? Without one, failure is invisible. And invisible failure is the only kind that kills companies.
            </p>
            <p className={`mt-8 ${txt} text-[clamp(0.75rem,1.4vw,0.9rem)] leading-[1.8] tracking-[0.06em] text-text-secondary/55`}>
              78% of companies that found product-market fit still fail to scale. Not because of the market. Because they tried to grow a system they never examined.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block min-h-[60vh] flex items-center justify-center relative z-10 px-6">
        <div className="block-inner text-center max-w-3xl">
          <p data-closing className={`${disp} uppercase text-[clamp(1.2rem,3vw,2.2rem)] tracking-[0.25em] text-amber/80`}>
            Still calling it a performance problem?
          </p>
        </div>
      </section>

      {/* ═══ SECTION II ═══ */}
      <section className="content-block min-h-dvh flex items-center justify-center relative z-10 px-6">
        <div className="block-inner max-w-4xl text-center relative">
          <span className="absolute -top-6 -left-2 sm:-left-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&ldquo;</span>
          <span className="absolute -bottom-2 right-0 sm:-right-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&rdquo;</span>
          <p className={`${txt} uppercase text-[11px] tracking-[0.3em] text-amber/50 mb-6`}>II</p>
          <p className={`${disp} uppercase text-[clamp(1.2rem,3vw,2.2rem)] leading-[1.4] tracking-[0.25em] text-text-primary/90`}>
            The best executive is one who has sense enough to pick good men to do what he wants done, and self-restraint enough to keep from meddling with them while they do it.
          </p>
          <p className={`mt-5 ${txt} uppercase text-[11px] tracking-[0.3em] text-text-muted/50`}>&mdash; Theodore Roosevelt</p>
        </div>
      </section>

      <section className="content-block min-h-[80vh] flex items-center justify-center relative z-10 px-6">
        <div className="block-inner max-w-2xl text-center relative">
          <div className="bloom absolute -inset-20 -z-10 pointer-events-none rounded-full"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(201,150,63,0.10) 0%, transparent 70%)" }} />
          <div className="glass-panel">
            <p className={`${txt} text-[clamp(0.85rem,1.8vw,1.1rem)] leading-[1.9] tracking-[0.08em] text-text-primary/80`}>
              The creative intelligence of your workforce is free, available, and completely ignored. That&rsquo;s not a resource problem. That&rsquo;s a leadership one.
            </p>
            <p className={`mt-8 ${txt} text-[clamp(0.75rem,1.4vw,0.9rem)] leading-[1.8] tracking-[0.06em] text-text-secondary/55`}>
              85% of frontline employees share concerns only through manager meetings &mdash; a hierarchical, slow, incomplete loop where field intelligence routinely never reaches the people making decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block min-h-[60vh] flex items-center justify-center relative z-10 px-6">
        <div className="block-inner text-center max-w-3xl">
          <p data-closing className={`${disp} uppercase text-[clamp(1.2rem,3vw,2.2rem)] tracking-[0.25em] text-amber/80`}>
            Still building strategy in rooms the people doing the work aren&rsquo;t allowed into?
          </p>
        </div>
      </section>

      {/* ═══ SECTION III ═══ */}
      <section className="content-block min-h-dvh flex items-center justify-center relative z-10 px-6">
        <div className="block-inner max-w-4xl text-center relative">
          <span className="absolute -top-6 -left-2 sm:-left-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&ldquo;</span>
          <span className="absolute -bottom-2 right-0 sm:-right-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&rdquo;</span>
          <p className={`${txt} uppercase text-[11px] tracking-[0.3em] text-amber/50 mb-6`}>III</p>
          <p className={`${disp} uppercase text-[clamp(1.3rem,3.5vw,2.4rem)] leading-[1.4] tracking-[0.25em] text-text-primary/90`}>
            The most serious mistakes are not being made as a result of wrong answers. The truly dangerous thing is asking the wrong question.
          </p>
          <p className={`mt-5 ${txt} uppercase text-[11px] tracking-[0.3em] text-text-muted/50`}>&mdash; Peter Drucker</p>
        </div>
      </section>

      <section className="content-block min-h-[80vh] flex items-center justify-center relative z-10 px-6">
        <div className="block-inner max-w-2xl text-center relative">
          <div className="bloom absolute -inset-20 -z-10 pointer-events-none rounded-full"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(201,150,63,0.10) 0%, transparent 70%)" }} />
          <div className="glass-panel">
            <p className={`${txt} text-[clamp(0.85rem,1.8vw,1.1rem)] leading-[1.9] tracking-[0.08em] text-text-primary/80`}>
              You don&rsquo;t have a feedback loop. You have an NPS score. Those are not the same thing. One measures sentiment. The other drives decisions. You&rsquo;ve been doing one and calling it both.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block min-h-[60vh] flex items-center justify-center relative z-10 px-6">
        <div className="block-inner text-center max-w-3xl">
          <p data-closing className={`${disp} uppercase text-[clamp(1.2rem,3vw,2.2rem)] tracking-[0.25em] text-amber/80`}>
            Still measuring how people feel about a problem you haven&rsquo;t diagnosed?
          </p>
        </div>
      </section>

      {/* ═══ SECTION IV ═══ */}
      <section className="content-block min-h-dvh flex items-center justify-center relative z-10 px-6">
        <div className="block-inner max-w-4xl text-center relative">
          <span className="absolute -top-6 -left-2 sm:-left-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&ldquo;</span>
          <span className="absolute -bottom-2 right-0 sm:-right-6 text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display">&rdquo;</span>
          <p className={`${txt} uppercase text-[11px] tracking-[0.3em] text-amber/50 mb-6`}>IV</p>
          <p className={`${disp} uppercase text-[clamp(1.2rem,3vw,2.2rem)] leading-[1.4] tracking-[0.25em] text-text-primary/90`}>
            You must maintain unwavering faith that you can and will prevail &mdash; and at the same time confront the most brutal facts of your current reality.
          </p>
          <p className={`mt-5 ${txt} uppercase text-[11px] tracking-[0.3em] text-text-muted/50`}>&mdash; Jim Collins</p>
        </div>
      </section>

      <section className="content-block min-h-[80vh] flex items-center justify-center relative z-10 px-6">
        <div className="block-inner max-w-2xl text-center relative">
          <div className="bloom absolute -inset-20 -z-10 pointer-events-none rounded-full"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(201,150,63,0.10) 0%, transparent 70%)" }} />
          <div className="glass-panel">
            <p className={`${txt} text-[clamp(0.85rem,1.8vw,1.1rem)] leading-[1.9] tracking-[0.08em] text-text-primary/80`}>
              Growth does not fix a broken system. It funds it.
            </p>
            <p className={`mt-8 ${txt} text-[clamp(0.75rem,1.4vw,0.9rem)] leading-[1.8] tracking-[0.06em] text-text-secondary/55`}>
              Across 6,103 firms studied over four decades, researchers found no evidence that scaling reduces costs or improves margins. More revenue through a broken process doesn&rsquo;t compound your gains. It compounds your losses.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block min-h-[60vh] flex items-center justify-center relative z-10 px-6">
        <div className="block-inner text-center max-w-3xl">
          <p data-closing className={`${disp} uppercase text-[clamp(1.2rem,3vw,2.2rem)] tracking-[0.25em] text-amber/80`}>
            Still going to let next quarter look exactly like the last one and call it momentum?
          </p>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="content-block min-h-[70vh] flex items-center justify-center relative z-10 px-6">
        <div className="block-inner text-center max-w-xl">
          <a
            href="mailto:inquiry@gonextconsulting.dev"
            className={`group relative inline-block ${disp} uppercase text-[14px] tracking-[0.3em] text-text-primary/70 transition-colors duration-300 hover:text-amber`}
          >
            Request a Conversation
            <span className="absolute -bottom-2 left-0 h-px w-0 bg-amber/50 transition-all duration-500 group-hover:w-full" />
          </a>
          <p className={`mt-12 ${txt} text-[clamp(0.7rem,1.2vw,0.85rem)] leading-[2] tracking-[0.08em] text-text-secondary/60`}>
            The question was never whether something needs to change.
            <br />
            It&rsquo;s whether you&rsquo;ll be the one who changes it.
          </p>
        </div>
      </section>

    </main>
  );
}
