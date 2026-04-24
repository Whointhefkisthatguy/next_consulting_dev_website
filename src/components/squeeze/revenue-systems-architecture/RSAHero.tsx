"use client";

import { useEffect, useState } from "react";
import CountUp from "@/components/CountUp";

const CW = 240;
const CH = 200;

type Layer = {
  n: string;
  name: string;
  question: string;
};

// Ordered top-to-bottom visually; compounding flows upward from Brand.
const LAYERS: Layer[] = [
  { n: "04", name: "Feedback",   question: "How do you know it's working?" },
  { n: "03", name: "Automation", question: "What runs without you?" },
  { n: "02", name: "Capture",    question: "What happens when they say yes?" },
  { n: "01", name: "Website",    question: "Where does the stranger land?" },
  { n: "00", name: "Brand",      question: "Who are you?" },
];

// Layer band geometry
const BAND_TOP = 24;
const BAND_BOTTOM = 170;
const BAND_GAP = 3;
const BAND_COUNT = LAYERS.length;
const BAND_HEIGHT =
  (BAND_BOTTOM - BAND_TOP - BAND_GAP * (BAND_COUNT - 1)) / BAND_COUNT;
const BAND_X = 58;
const BAND_W = 152;

function bandY(i: number) {
  return BAND_TOP + i * (BAND_HEIGHT + BAND_GAP);
}

export default function RSAHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center px-6 sm:px-14 pt-40 pb-24 overflow-hidden">
      {/* drafting grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(240,235,227,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(240,235,227,0.035) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at 70% 50%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 70% 50%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
        }}
      />

      {/* drafting plate tag */}
      <div
        aria-hidden
        className="absolute top-28 left-6 sm:left-14 flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase text-[#6b6560]"
      >
        <span className="block w-3 h-px bg-[#6b6560]" />
        <span className="block w-px h-3 bg-[#6b6560]" />
        <span>PLATE 00 · SECTION VIEW</span>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[0.95fr_1.2fr] gap-14 lg:gap-16 items-center">
        {/* text column */}
        <div>
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] mb-6">
            § The Thesis
          </div>
          <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.04] tracking-[-0.02em] text-[#f0ebe3]">
            Revenue doesn&rsquo;t leak from marketing.
            <br />
            It leaks from{" "}
            <span className="text-[#c4835a]">the seams between vendors.</span>
          </h1>
          <p className="mt-8 font-[var(--font-body)] text-base sm:text-lg leading-[1.55] text-[#f0ebe3]/70 max-w-[560px]">
            Revenue Systems Architecture is the discipline of installing the
            whole stack, brand, website, capture, automation,
            reporting, as one owned system instead of five rented
            pieces.
          </p>

          {/* spec callouts */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-[460px]">
            {[
              { k: "LAYERS", v: "5" },
              { k: "OWNED", v: "100%" },
              { k: "COMPOUND", v: "Yes" },
            ].map((spec) => (
              <div key={spec.k} className="border-t border-[#f0ebe3]/15 pt-3">
                <CountUp
                  value={spec.v}
                  className="block font-[var(--font-display)] font-800 text-2xl tracking-tight text-[#c4835a]"
                />
                <div className="mt-1 font-mono text-[9px] tracking-[0.2em] uppercase text-[#6b6560]">
                  {spec.k}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* architectural section view */}
        <div
          className="relative transition-all duration-[900ms] ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(18px)",
            transitionDelay: "200ms",
          }}
        >
          <svg
            viewBox={`0 0 ${CW} ${CH}`}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-auto"
            aria-hidden
          >
            <defs>
              <marker
                id="rsaUpArrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#c4835a" />
              </marker>
            </defs>

            {/* top "compound" marker */}
            <g>
              <line
                x1={CW / 2}
                y1={4}
                x2={CW / 2}
                y2={18}
                stroke="#c4835a"
                strokeOpacity="0.7"
                strokeWidth="0.4"
                markerStart="url(#rsaUpArrow)"
              />
              <text
                x={CW / 2 + 4}
                y={10}
                fontSize="3"
                fontFamily="var(--font-mono, ui-monospace, monospace)"
                fill="#c4835a"
                fillOpacity="0.85"
              >
                COMPOUND
              </text>
            </g>

            {/* left dimension rail */}
            <line
              x1={BAND_X - 38}
              y1={BAND_TOP}
              x2={BAND_X - 38}
              y2={BAND_BOTTOM}
              stroke="#8a8480"
              strokeOpacity="0.4"
              strokeWidth="0.3"
            />

            {/* layer bands */}
            {LAYERS.map((layer, i) => {
              const y = bandY(i);
              const isBottom = i === LAYERS.length - 1;
              const cy = y + BAND_HEIGHT / 2;
              return (
                <g key={layer.n}>
                  {/* dimension tick on rail */}
                  <line
                    x1={BAND_X - 40}
                    y1={y}
                    x2={BAND_X - 36}
                    y2={y}
                    stroke="#8a8480"
                    strokeOpacity="0.6"
                    strokeWidth="0.3"
                  />
                  <line
                    x1={BAND_X - 40}
                    y1={y + BAND_HEIGHT}
                    x2={BAND_X - 36}
                    y2={y + BAND_HEIGHT}
                    stroke="#8a8480"
                    strokeOpacity="0.6"
                    strokeWidth="0.3"
                  />
                  {/* layer number */}
                  <text
                    x={BAND_X - 42}
                    y={cy + 1.4}
                    fontSize="3.6"
                    fontFamily="var(--font-mono, ui-monospace, monospace)"
                    fill="#c4835a"
                    fillOpacity="0.9"
                    textAnchor="end"
                  >
                    {layer.n}
                  </text>

                  {/* tiny 'layer' label under number */}
                  <text
                    x={BAND_X - 42}
                    y={cy + 5.5}
                    fontSize="2.2"
                    fontFamily="var(--font-mono, ui-monospace, monospace)"
                    fill="#6b6560"
                    textAnchor="end"
                  >
                    LAYER
                  </text>

                  {/* layer band rectangle */}
                  <rect
                    x={BAND_X}
                    y={y}
                    width={BAND_W}
                    height={BAND_HEIGHT}
                    fill={isBottom ? "rgba(196,131,90,0.06)" : "#0c0c0e"}
                    stroke={isBottom ? "#c4835a" : "#8a8480"}
                    strokeOpacity={isBottom ? "0.6" : "0.5"}
                    strokeWidth="0.35"
                  />

                  {/* layer name (display font) */}
                  <text
                    x={BAND_X + 6}
                    y={cy - 0.2}
                    fontSize="5.2"
                    fontFamily="var(--font-display, ui-sans-serif)"
                    fontWeight="800"
                    fill="#f0ebe3"
                  >
                    {layer.name}
                  </text>

                  {/* question (italic mono) */}
                  <text
                    x={BAND_X + 6}
                    y={cy + 5.4}
                    fontSize="2.6"
                    fontFamily="var(--font-mono, ui-monospace, monospace)"
                    fill="#8a8480"
                    fontStyle="italic"
                  >
                    {layer.question}
                  </text>

                  {/* right-side port marker */}
                  <g>
                    <line
                      x1={BAND_X + BAND_W}
                      y1={cy}
                      x2={BAND_X + BAND_W + 6}
                      y2={cy}
                      stroke="#8a8480"
                      strokeOpacity="0.55"
                      strokeWidth="0.3"
                    />
                    <circle
                      cx={BAND_X + BAND_W + 7.5}
                      cy={cy}
                      r="0.9"
                      fill="#c4835a"
                      fillOpacity="0.8"
                    />
                  </g>

                  {/* inter-layer data-flow thread (skip below bottom layer) */}
                  {i < LAYERS.length - 1 && (
                    <g>
                      <line
                        x1={BAND_X + 28}
                        y1={y + BAND_HEIGHT}
                        x2={BAND_X + 28}
                        y2={y + BAND_HEIGHT + BAND_GAP}
                        stroke="#c4835a"
                        strokeOpacity="0.4"
                        strokeWidth="0.35"
                      />
                      <line
                        x1={BAND_X + BAND_W - 28}
                        y1={y + BAND_HEIGHT}
                        x2={BAND_X + BAND_W - 28}
                        y2={y + BAND_HEIGHT + BAND_GAP}
                        stroke="#c4835a"
                        strokeOpacity="0.4"
                        strokeWidth="0.35"
                      />
                    </g>
                  )}
                </g>
              );
            })}

            {/* bedrock, hatched */}
            <g>
              {(() => {
                const y = BAND_BOTTOM + 4;
                const lines = [];
                for (let x = BAND_X - 6; x < BAND_X + BAND_W + 8; x += 4) {
                  lines.push(
                    <line
                      key={x}
                      x1={x}
                      y1={y}
                      x2={x + 4}
                      y2={y + 4}
                      stroke="#c4835a"
                      strokeOpacity="0.5"
                      strokeWidth="0.3"
                    />
                  );
                }
                return lines;
              })()}
              <line
                x1={BAND_X - 6}
                y1={BAND_BOTTOM + 4}
                x2={BAND_X + BAND_W + 8}
                y2={BAND_BOTTOM + 4}
                stroke="#c4835a"
                strokeOpacity="0.75"
                strokeWidth="0.45"
              />
              <text
                x={BAND_X + BAND_W / 2}
                y={BAND_BOTTOM + 14}
                fontSize="3"
                fontFamily="var(--font-mono, ui-monospace, monospace)"
                fill="#c4835a"
                fillOpacity="0.85"
                textAnchor="middle"
              >
                BEDROCK · OWNERSHIP
              </text>
            </g>

            {/* overall caliper (right side) */}
            {(() => {
              const x = BAND_X + BAND_W + 16;
              const stub = 1.4;
              return (
                <g stroke="#c4835a" strokeOpacity="0.6" strokeWidth="0.25">
                  <line x1={x - stub} y1={BAND_TOP} x2={x + stub} y2={BAND_TOP} />
                  <line
                    x1={x - stub}
                    y1={BAND_BOTTOM}
                    x2={x + stub}
                    y2={BAND_BOTTOM}
                  />
                  <line x1={x} y1={BAND_TOP} x2={x} y2={BAND_BOTTOM} />
                </g>
              );
            })()}
            <text
              x={BAND_X + BAND_W + 20}
              y={(BAND_TOP + BAND_BOTTOM) / 2}
              fontSize="3"
              fontFamily="var(--font-mono, ui-monospace, monospace)"
              fill="#c4835a"
              fillOpacity="0.7"
              transform={`rotate(-90 ${BAND_X + BAND_W + 20} ${(BAND_TOP + BAND_BOTTOM) / 2})`}
              textAnchor="middle"
            >
              5 LAYERS · ONE SYSTEM
            </text>
          </svg>
        </div>
      </div>

      {/* bottom 'continue' marker */}
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-6 sm:left-14 z-10 font-mono text-[10px] tracking-[0.25em] uppercase text-[#a39d97] flex items-center gap-3"
      >
        <span>Continue</span>
        <span className="h-px w-10 bg-[#a39d97]" />
      </div>
    </section>
  );
}
