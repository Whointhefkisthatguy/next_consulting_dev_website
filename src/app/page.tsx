"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

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

/* ── Scroll-driven layer ── */
function Layer({
  children,
  scrollProgress,
  enterStart,
  enterEnd,
  exitStart,
  exitEnd,
  className,
}: {
  children: React.ReactNode;
  scrollProgress: MotionValue<number>;
  enterStart: number;
  enterEnd: number;
  exitStart: number;
  exitEnd: number;
  className?: string;
}) {
  const opacity = useTransform(
    scrollProgress,
    [enterStart, enterEnd, exitStart, exitEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollProgress,
    [enterStart, enterEnd, exitStart, exitEnd],
    [30, 0, 0, -20]
  );
  const scale = useTransform(
    scrollProgress,
    [enterStart, enterEnd, exitStart, exitEnd],
    [0.97, 1, 1, 0.98]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={`fixed inset-0 flex items-center justify-center pointer-events-none z-20 ${className ?? ""}`}
    >
      <div className="pointer-events-auto max-w-2xl px-6 sm:px-8 w-full">
        {children}
      </div>
    </motion.div>
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

function highlightWord(text: string, word: string) {
  const idx = text.toLowerCase().indexOf(word.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-amber">{text.slice(idx, idx + word.length)}</span>
      {text.slice(idx + word.length)}
    </>
  );
}

/*
  Scroll map (0 → 1 over the full scroll height):

  0.00 - 0.02  monogram fades in (initial load)
  0.02 - 0.12  monogram visible
  0.12 - 0.17  monogram fades out / quote fades in
  0.17 - 0.27  quote visible
  0.27 - 0.32  quote fades out / H1 fades in
  0.32 - 0.42  H1 visible
  0.42 - 0.47  H1 fades out / truth 1 fades in
  0.47 - 0.55  truth 1 visible
  0.55 - 0.60  truth 1 fades out / truth 2 fades in
  0.60 - 0.68  truth 2 visible
  0.68 - 0.73  truth 2 fades out / truth 3 fades in
  0.73 - 0.81  truth 3 visible
  0.81 - 0.86  truth 3 fades out / inquiry fades in
  0.86 - 1.00  inquiry visible (stays)
*/

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Ambient glow
  const glowOpacity = useTransform(scrollYProgress, [0, 0.12, 0.17], [0.5, 0.5, 0]);

  // Vertical accent line
  const lineOpacity = useTransform(scrollYProgress, [0.12, 0.2], [0, 1]);

  // Progress indicator
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* Scroll runway — this creates the scroll distance, content is fixed */}
      <div ref={containerRef} className="relative h-[800vh]">

        {/* ── Fixed canvas ── */}
        <div className="fixed inset-0 bg-canvas overflow-hidden">

          {/* Ambient glow */}
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="w-[600px] h-[600px] rounded-full animate-breathe"
              style={{
                background: "radial-gradient(circle, rgba(201,150,63,0.08) 0%, rgba(201,150,63,0.02) 40%, transparent 70%)",
              }}
            />
          </motion.div>

          {/* Vertical accent line */}
          <motion.div
            style={{ opacity: lineOpacity }}
            className="absolute left-[clamp(1.5rem,4vw,4rem)] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber/12 to-transparent z-10 pointer-events-none"
          />

          {/* Progress bar at top */}
          <motion.div
            style={{ width: progressWidth }}
            className="absolute top-0 left-0 h-px bg-amber/20 z-50"
          />

          {/* ═══ LAYER 0: Monogram ═══ */}
          <Layer
            scrollProgress={scrollYProgress}
            enterStart={0}
            enterEnd={0.02}
            exitStart={0.10}
            exitEnd={0.16}
          >
            <div className="flex justify-center">
              <div className="text-amber">
                <Monogram className="h-28 w-auto sm:h-36 md:h-44" />
              </div>
            </div>
          </Layer>

          {/* ═══ LAYER 1: Drucker Quote ═══ */}
          <Layer
            scrollProgress={scrollYProgress}
            enterStart={0.12}
            enterEnd={0.18}
            exitStart={0.26}
            exitEnd={0.32}
          >
            <blockquote className="text-center">
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
          </Layer>

          {/* ═══ LAYER 2: H1 Transition ═══ */}
          <Layer
            scrollProgress={scrollYProgress}
            enterStart={0.28}
            enterEnd={0.34}
            exitStart={0.40}
            exitEnd={0.46}
          >
            <div className="text-center">
              <h1 className="font-display text-[clamp(1.4rem,3.5vw,2.8rem)] font-light tracking-wide text-text-primary">
                The problem isn&rsquo;t scale<span className="text-amber">,</span>
                <br />
                it&rsquo;s architecture<span className="text-amber">.</span>
              </h1>
            </div>
          </Layer>

          {/* ═══ LAYER 3: Truth 1 ═══ */}
          <Layer
            scrollProgress={scrollYProgress}
            enterStart={0.42}
            enterEnd={0.48}
            exitStart={0.53}
            exitEnd={0.58}
          >
            <div className="text-center">
              <p className="font-display text-[clamp(1.3rem,3vw,2.2rem)] leading-[1.35] font-light tracking-wide text-text-primary/85">
                {highlightWord(truths[0].statement, truths[0].accent)}
              </p>
              <p className="mt-8 font-body text-[13px] leading-relaxed text-text-secondary/60 max-w-lg mx-auto">
                {truths[0].metric}
              </p>
            </div>
          </Layer>

          {/* ═══ LAYER 4: Truth 2 ═══ */}
          <Layer
            scrollProgress={scrollYProgress}
            enterStart={0.55}
            enterEnd={0.61}
            exitStart={0.66}
            exitEnd={0.71}
          >
            <div className="text-center">
              <p className="font-display text-[clamp(1.3rem,3vw,2.2rem)] leading-[1.35] font-light tracking-wide text-text-primary/85">
                {highlightWord(truths[1].statement, truths[1].accent)}
              </p>
              <p className="mt-8 font-body text-[13px] leading-relaxed text-text-secondary/60 max-w-lg mx-auto">
                {truths[1].metric}
              </p>
            </div>
          </Layer>

          {/* ═══ LAYER 5: Truth 3 ═══ */}
          <Layer
            scrollProgress={scrollYProgress}
            enterStart={0.68}
            enterEnd={0.74}
            exitStart={0.79}
            exitEnd={0.84}
          >
            <div className="text-center">
              <p className="font-display text-[clamp(1.3rem,3vw,2.2rem)] leading-[1.35] font-light tracking-wide text-text-primary/85">
                {highlightWord(truths[2].statement, truths[2].accent)}
              </p>
              <p className="mt-8 font-body text-[13px] leading-relaxed text-text-secondary/60 max-w-lg mx-auto">
                {truths[2].metric}
              </p>
            </div>
          </Layer>

          {/* ═══ LAYER 6: Request a conversation ═══ */}
          <Layer
            scrollProgress={scrollYProgress}
            enterStart={0.82}
            enterEnd={0.88}
            exitStart={1}
            exitEnd={1}
          >
            <div className="text-center">
              <a
                href="mailto:inquiry@gonextconsulting.dev"
                className="group relative inline-block font-body uppercase text-[12px] tracking-[0.3em] text-text-muted transition-colors duration-300 hover:text-amber"
              >
                Request a conversation
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-amber/40 transition-all duration-500 group-hover:w-full" />
              </a>
            </div>
          </Layer>

        </div>
      </div>
    </>
  );
}
