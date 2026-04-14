"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ── Matrix rain canvas — amber characters falling ── */
function MatrixRain({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "0011001101010011100101100110".split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(0).map(() => Math.random() * -50);

    let animId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(8, 8, 10, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const alpha = 0.3 + Math.random() * 0.45;
        ctx.fillStyle = `rgba(201, 150, 63, ${alpha})`;
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(char, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i] += 0.3 + Math.random() * 0.5;
      });

      animId = requestAnimationFrame(draw);
    };

    if (active) draw();
    return () => cancelAnimationFrame(animId);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-30 pointer-events-none transition-opacity duration-1000 ${active ? "opacity-100" : "opacity-0"}`}
    />
  );
}

/* ── Geometric depth — stronger opacities ── */
function GeoDepth() {
  return (
    <div className="geo-depth absolute inset-0 pointer-events-none overflow-hidden opacity-0" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <line x1="0" y1="100%" x2="25%" y2="0" stroke="rgba(201,150,63,0.05)" strokeWidth="0.5" />
        <line x1="100%" y1="100%" x2="75%" y2="0" stroke="rgba(201,150,63,0.05)" strokeWidth="0.5" />
      </svg>
      <div className="absolute top-[8%] left-[5%] w-20 h-20 sm:w-28 sm:h-28 border-l border-t border-white/[0.04]" />
      <div className="absolute bottom-[8%] right-[5%] w-20 h-20 sm:w-28 sm:h-28 border-r border-b border-white/[0.04]" />
      <div className="absolute top-1/2 left-[3%] w-[12%] h-px bg-gradient-to-r from-amber/[0.06] to-transparent" />
      <div className="absolute top-1/2 right-[3%] w-[12%] h-px bg-gradient-to-l from-amber/[0.06] to-transparent" />
      <svg className="absolute top-[15%] right-[8%] w-36 h-36 sm:w-52 sm:h-52" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(201,150,63,0.04)" strokeWidth="0.4" strokeDasharray="5 16" />
      </svg>
      <svg className="absolute bottom-[12%] left-[7%] w-28 h-28 sm:w-40 sm:h-40" viewBox="0 0 80 80">
        {[0, 16, 32, 48, 64].map((x) =>
          [0, 16, 32, 48, 64].map((y) => (
            <circle key={`${x}-${y}`} cx={x + 8} cy={y + 8} r="0.6" fill="rgba(201,150,63,0.045)" />
          ))
        )}
      </svg>
    </div>
  );
}

/* ── Section divider ── */
function Divider() {
  return (
    <div className="flex justify-center py-4">
      <div className="w-12 h-px bg-amber/10" />
    </div>
  );
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [rainActive, setRainActive] = useState(false);

  useGSAP(() => {
    // ── Monogram: pin + matrix rain dissolve ──
    const monoTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-mono",
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          // Activate rain when monogram starts fading
          setRainActive(self.progress > 0.2 && self.progress < 0.95);
        },
      },
    });
    // Hold
    monoTl.to({}, { duration: 0.3 });
    // Monogram fragments dissolve
    monoTl.to(".mono-n", { opacity: 0, scale: 0.8, filter: "blur(12px)", duration: 0.7, ease: "none" });
    monoTl.to(".mono-arrow", { opacity: 0, scale: 0.8, filter: "blur(12px)", duration: 0.7, ease: "none" }, "<0.1");
    monoTl.to(".mono-glow", { opacity: 0, scale: 2, duration: 0.7, ease: "none" }, "<");
    // Scroll indicator fades first
    monoTl.to(".scroll-hint", { opacity: 0, duration: 0.2, ease: "none" }, 0);

    // ── Content sections ──
    gsap.utils.toArray<HTMLElement>(".content-block").forEach((block) => {
      const inner = block.querySelector(".block-inner") as HTMLElement;
      const closingQ = block.querySelector("[data-closing]") as HTMLElement;
      const geo = block.querySelector(".geo-depth") as HTMLElement;

      ScrollTrigger.create({
        trigger: block,
        start: "top top",
        end: "+=100%",
        pin: true,
      });

      if (inner) {
        gsap.fromTo(inner,
          { y: 50, scale: 0.88, filter: "blur(4px)", opacity: 0 },
          {
            y: 0, scale: 1, filter: "blur(0px)", opacity: 1,
            duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 60%", toggleActions: "play none none reverse" },
          }
        );
      }

      if (geo) {
        gsap.fromTo(geo,
          { opacity: 0 },
          {
            opacity: 1, duration: 1.5, ease: "power2.out",
            scrollTrigger: { trigger: block, start: "top 70%", toggleActions: "play none none reverse" },
          }
        );
      }

      if (closingQ) {
        gsap.fromTo(closingQ,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1.15, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: closingQ, start: "top 75%", toggleActions: "play none none reverse" },
          }
        );
      }
    });
  }, { scope: mainRef });

  const disp = "font-display font-semibold";
  const txt = "font-body font-normal";
  const quoteMarks = "absolute text-[14rem] sm:text-[20rem] leading-[0.5] text-amber/[0.07] select-none pointer-events-none font-display";

  return (
    <main ref={mainRef} className="bg-canvas relative">

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -right-[15%] w-[1200px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(201,150,63,0.10) 0%, rgba(201,150,63,0.02) 40%, transparent 70%)" }} />
        <div className="absolute -bottom-[25%] -left-[20%] w-[1000px] h-[1000px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(26,47,74,0.15) 0%, rgba(26,47,74,0.04) 40%, transparent 65%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full animate-breathe"
          style={{ background: "radial-gradient(circle, rgba(201,150,63,0.06) 0%, rgba(201,150,63,0.015) 40%, transparent 65%)" }} />
      </div>

      <div className="vignette fixed" />

      {/* ═══ MONOGRAM ═══ */}
      <section className="section-mono h-dvh flex items-center justify-center relative z-10">
        <MatrixRain active={rainActive} />
        <div className="mono-glow absolute w-[600px] h-[600px] rounded-full" style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)",
        }} />
        <div className="relative z-40 flex items-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.4 94.2" fill="currentColor"
            className="mono-n h-28 w-auto sm:h-36 md:h-44 will-change-transform">
            <polygon points="94.5,0 94.5,63.4 112.2,84.1 94.5,67.2 27.2,0 27,0.2 27,0 0,0 0,94.2 27,94.2 27,43 12.5,23 27,38 83.3,94.2 104.1,94.2 121.4,94.2 121.4,0" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="128 0 87.1 94.2" fill="currentColor"
            className="mono-arrow h-28 w-auto sm:h-36 md:h-44 -ml-1 will-change-transform">
            <polyline points="193.1,23.3 169.8,0 131.6,0 176.9,45.3 128,94.2 145.3,94.2 166.2,94.2 187.8,72.6 204.5,55.7 204.1,56.3 215.1,45.3 196,26.2 196,26.2" />
          </svg>
        </div>
        <div className="scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-5 h-9 rounded-full border border-white/15 flex items-start justify-center pt-2">
            <div className="w-0.5 h-2.5 bg-amber/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══ CHARACTER ═══ */}
      <section className="content-block h-[70vh] flex items-center justify-center relative z-10 px-6">
        <div className="block-inner text-center">
          <p className={`${disp} uppercase text-[clamp(1rem,2.5vw,1.6rem)] tracking-[0.25em] text-text-primary/50`}>
            You built the machine.
            <br />
            Is it what you imagined it would be?
          </p>
        </div>
      </section>

      <Divider />

      {/* ═══ DRUCKER QUOTE ═══ */}
      <section className="content-block h-dvh flex items-center justify-center relative z-10 px-6">
        <GeoDepth />
        <div className="block-inner max-w-4xl text-center relative">
          <span className={`${quoteMarks} -top-6 -left-2 sm:-left-6`}>&ldquo;</span>
          <span className={`${quoteMarks} -bottom-2 right-0 sm:-right-6`}>&rdquo;</span>
          <p className={`${disp} uppercase text-[clamp(1.6rem,4.5vw,3.2rem)] leading-[1.35] tracking-[0.25em] text-text-primary/90`}>
            There is surely nothing quite so useless as doing with great efficiency what should not be done at all.
          </p>
          <p className={`mt-6 ${txt} uppercase text-[11px] tracking-[0.3em] text-text-muted/50`}>&mdash; Peter Drucker, 1963</p>
        </div>
      </section>

      <Divider />

      {/* ═══ H1 ═══ */}
      <section className="content-block h-dvh flex items-center justify-center relative z-10 px-6">
        <div className="block-inner text-center">
          <h1 className={`${disp} uppercase text-[clamp(1.8rem,5vw,4rem)] tracking-[0.25em] text-text-primary leading-[1.3]`}>
            The problem isn&rsquo;t scale,
            <br />
            it&rsquo;s architecture.
          </h1>
        </div>
      </section>

      <Divider />

      {/* ═══ I ═══ */}
      <section className="content-block h-dvh flex items-center justify-center relative z-10 px-6">
        <GeoDepth />
        <div className="block-inner max-w-4xl text-center relative">
          <span className={`${quoteMarks} -top-6 -left-2 sm:-left-6`}>&ldquo;</span>
          <span className={`${quoteMarks} -bottom-2 right-0 sm:-right-6`}>&rdquo;</span>
          <p className={`${txt} uppercase text-[11px] tracking-[0.3em] text-amber/50 mb-6`}>I</p>
          <p className={`${disp} uppercase text-[clamp(1.4rem,3.5vw,2.6rem)] leading-[1.4] tracking-[0.25em] text-text-primary/90`}>
            A system is perfectly designed to get the results it gets.
          </p>
          <p className={`mt-5 ${txt} uppercase text-[11px] tracking-[0.3em] text-text-muted/50`}>&mdash; W. Edwards Deming</p>
        </div>
      </section>

      <section className="content-block h-dvh flex items-center justify-center relative z-10 px-6">
        <div className="block-inner max-w-3xl text-center">
          <p className={`${txt} text-[clamp(1rem,2vw,1.3rem)] leading-[1.9] tracking-[0.08em] text-text-primary/75`}>
            Where is your feedback loop &mdash; and what did it tell you last month? Without one, failure is invisible. And invisible failure is the only kind that kills companies.
          </p>
          <p className={`mt-12 ${txt} text-[clamp(0.85rem,1.5vw,1.05rem)] leading-[1.8] tracking-[0.06em] text-text-secondary/50`}>
            78% of companies that found product-market fit still fail to scale. Not because of the market. Because they tried to grow a system they never examined.
          </p>
        </div>
      </section>

      <section className="content-block h-dvh flex items-center justify-center relative z-10 px-6">
        <div className="block-inner text-center max-w-3xl">
          <p data-closing className={`${disp} uppercase text-[clamp(1.3rem,3.5vw,2.4rem)] tracking-[0.25em] text-amber/80`}>
            Still calling it a performance problem?
          </p>
        </div>
      </section>

      <Divider />

      {/* ═══ II ═══ */}
      <section className="content-block h-dvh flex items-center justify-center relative z-10 px-6">
        <GeoDepth />
        <div className="block-inner max-w-4xl text-center relative">
          <span className={`${quoteMarks} -top-6 -left-2 sm:-left-6`}>&ldquo;</span>
          <span className={`${quoteMarks} -bottom-2 right-0 sm:-right-6`}>&rdquo;</span>
          <p className={`${txt} uppercase text-[11px] tracking-[0.3em] text-amber/50 mb-6`}>II</p>
          <p className={`${disp} uppercase text-[clamp(1.2rem,3vw,2.2rem)] leading-[1.4] tracking-[0.25em] text-text-primary/90`}>
            The best executive is one who has sense enough to pick good men to do what he wants done, and self-restraint enough to keep from meddling with them while they do it.
          </p>
          <p className={`mt-5 ${txt} uppercase text-[11px] tracking-[0.3em] text-text-muted/50`}>&mdash; Theodore Roosevelt</p>
        </div>
      </section>

      <section className="content-block h-dvh flex items-center justify-center relative z-10 px-6">
        <div className="block-inner max-w-3xl text-center">
          <p className={`${txt} text-[clamp(1rem,2vw,1.3rem)] leading-[1.9] tracking-[0.08em] text-text-primary/75`}>
            The creative intelligence of your workforce is free, available, and completely ignored. That&rsquo;s not a resource problem. That&rsquo;s a leadership one.
          </p>
          <p className={`mt-12 ${txt} text-[clamp(0.85rem,1.5vw,1.05rem)] leading-[1.8] tracking-[0.06em] text-text-secondary/50`}>
            85% of frontline employees share concerns only through manager meetings &mdash; a hierarchical, slow, incomplete loop where field intelligence routinely never reaches the people making decisions.
          </p>
        </div>
      </section>

      <section className="content-block h-dvh flex items-center justify-center relative z-10 px-6">
        <div className="block-inner text-center max-w-3xl">
          <p data-closing className={`${disp} uppercase text-[clamp(1.3rem,3.5vw,2.4rem)] tracking-[0.25em] text-amber/80`}>
            Still building strategy in rooms the people doing the work aren&rsquo;t allowed into?
          </p>
        </div>
      </section>

      <Divider />

      {/* ═══ III ═══ */}
      <section className="content-block h-dvh flex items-center justify-center relative z-10 px-6">
        <GeoDepth />
        <div className="block-inner max-w-4xl text-center relative">
          <span className={`${quoteMarks} -top-6 -left-2 sm:-left-6`}>&ldquo;</span>
          <span className={`${quoteMarks} -bottom-2 right-0 sm:-right-6`}>&rdquo;</span>
          <p className={`${txt} uppercase text-[11px] tracking-[0.3em] text-amber/50 mb-6`}>III</p>
          <p className={`${disp} uppercase text-[clamp(1.3rem,3.5vw,2.4rem)] leading-[1.4] tracking-[0.25em] text-text-primary/90`}>
            The most serious mistakes are not being made as a result of wrong answers. The truly dangerous thing is asking the wrong question.
          </p>
          <p className={`mt-5 ${txt} uppercase text-[11px] tracking-[0.3em] text-text-muted/50`}>&mdash; Peter Drucker</p>
        </div>
      </section>

      <section className="content-block h-dvh flex items-center justify-center relative z-10 px-6">
        <div className="block-inner max-w-3xl text-center">
          <p className={`${txt} text-[clamp(1rem,2vw,1.3rem)] leading-[1.9] tracking-[0.08em] text-text-primary/75`}>
            You don&rsquo;t have a feedback loop. You have an NPS score. Those are not the same thing. One measures sentiment. The other drives decisions. You&rsquo;ve been doing one and calling it both.
          </p>
        </div>
      </section>

      <section className="content-block h-dvh flex items-center justify-center relative z-10 px-6">
        <div className="block-inner text-center max-w-3xl">
          <p data-closing className={`${disp} uppercase text-[clamp(1.3rem,3.5vw,2.4rem)] tracking-[0.25em] text-amber/80`}>
            Still measuring how people feel about a problem you haven&rsquo;t diagnosed?
          </p>
        </div>
      </section>

      <Divider />

      {/* ═══ IV ═══ */}
      <section className="content-block h-dvh flex items-center justify-center relative z-10 px-6">
        <GeoDepth />
        <div className="block-inner max-w-4xl text-center relative">
          <span className={`${quoteMarks} -top-6 -left-2 sm:-left-6`}>&ldquo;</span>
          <span className={`${quoteMarks} -bottom-2 right-0 sm:-right-6`}>&rdquo;</span>
          <p className={`${txt} uppercase text-[11px] tracking-[0.3em] text-amber/50 mb-6`}>IV</p>
          <p className={`${disp} uppercase text-[clamp(1.2rem,3vw,2.2rem)] leading-[1.4] tracking-[0.25em] text-text-primary/90`}>
            You must maintain unwavering faith that you can and will prevail &mdash; and at the same time confront the most brutal facts of your current reality.
          </p>
          <p className={`mt-5 ${txt} uppercase text-[11px] tracking-[0.3em] text-text-muted/50`}>&mdash; Jim Collins</p>
        </div>
      </section>

      <section className="content-block h-dvh flex items-center justify-center relative z-10 px-6">
        <div className="block-inner max-w-3xl text-center">
          <p className={`${txt} text-[clamp(1rem,2vw,1.3rem)] leading-[1.9] tracking-[0.08em] text-text-primary/75`}>
            Growth does not fix a broken system. It funds it.
          </p>
          <p className={`mt-12 ${txt} text-[clamp(0.85rem,1.5vw,1.05rem)] leading-[1.8] tracking-[0.06em] text-text-secondary/50`}>
            Across 6,103 firms studied over four decades, researchers found no evidence that scaling reduces costs or improves margins. More revenue through a broken process doesn&rsquo;t compound your gains. It compounds your losses.
          </p>
        </div>
      </section>

      <section className="content-block h-dvh flex items-center justify-center relative z-10 px-6">
        <div className="block-inner text-center max-w-3xl">
          <p data-closing className={`${disp} uppercase text-[clamp(1.3rem,3.5vw,2.4rem)] tracking-[0.25em] text-amber/80`}>
            Still going to let next quarter look exactly like the last one and call it momentum?
          </p>
        </div>
      </section>

      <Divider />

      {/* ═══ CTA ═══ */}
      <section className="content-block h-dvh flex items-center justify-center relative z-10 px-6">
        <div className="block-inner text-center max-w-xl">
          <p className={`${txt} uppercase text-[11px] tracking-[0.3em] text-text-muted/40 mb-12`}>
            Next Consulting <span className="text-amber/30">&middot;</span> Revenue Architecture
          </p>
          <a
            href="mailto:inquiry@gonextconsulting.dev"
            className="group inline-block border-2 border-amber/60 px-12 py-6 sm:px-16 sm:py-8 transition-all duration-300 hover:border-amber hover:bg-amber/[0.06]"
          >
            <span className={`${disp} uppercase text-[clamp(1rem,2.5vw,1.5rem)] tracking-[0.3em] text-amber/90 group-hover:text-amber transition-colors duration-300`}>
              Request a Conversation
            </span>
          </a>
          <p className={`mt-6 ${txt} text-[clamp(0.6rem,1vw,0.75rem)] tracking-[0.15em] text-text-muted/40`}>
            45 minutes. No pitch. A diagnostic or your time back.
          </p>
          <p className={`mt-14 ${txt} text-[clamp(0.75rem,1.3vw,0.9rem)] leading-[2] tracking-[0.08em] text-text-secondary/55`}>
            The question was never whether something needs to change.
            <br />
            It&rsquo;s whether you&rsquo;ll be the one who changes it.
          </p>
        </div>
      </section>

    </main>
  );
}
