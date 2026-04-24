"use client";

import { useEffect, useState } from "react";
import CountUp from "@/components/CountUp";

const CW = 240;
const CH = 146;

// Main compound curve: exponential-ish climb from lower-left → upper-right.
// Plotted as a cubic Bezier so the area under it has a clean profile.
const CURVE_START = { x: 12, y: 112 };
const CURVE_END = { x: 228, y: 22 };
const CURVE_C1 = { x: 110, y: 110 };
const CURVE_C2 = { x: 180, y: 45 };

const CURVE_D = `M ${CURVE_START.x} ${CURVE_START.y} C ${CURVE_C1.x} ${CURVE_C1.y}, ${CURVE_C2.x} ${CURVE_C2.y}, ${CURVE_END.x} ${CURVE_END.y}`;
const AREA_D = `${CURVE_D} L ${CURVE_END.x} 122 L ${CURVE_START.x} 122 Z`;

// Five quarter checkpoints along the curve, hand-placed to sit on the Bezier.
const CHECKPOINTS = [
  { q: "Q1", x: 12, y: 112, delta: "+12%" },
  { q: "Q2", x: 66, y: 96, delta: "+29%" },
  { q: "Q3", x: 120, y: 73, delta: "+52%" },
  { q: "Q4", x: 176, y: 42, delta: "+71%" },
  { q: "Q5", x: 228, y: 22, delta: "+89%" },
];

// Decaying baseline, what happens without the architecture underneath.
const BASELINE_START = { x: 12, y: 108 };
const BASELINE_END = { x: 228, y: 114 };

type Channel = {
  label: string;
  // 4-point normalized trend (0-10)
  points: [number, number, number, number];
};

const CHANNELS: Channel[] = [
  { label: "PAID",     points: [3, 5, 6, 8] },
  { label: "SEO",      points: [2, 3, 6, 9] },
  { label: "CONTENT",  points: [1, 2, 5, 8] },
  { label: "EMAIL",    points: [4, 5, 6, 7] },
  { label: "SOCIAL",   points: [2, 4, 5, 8] },
  { label: "REFERRAL", points: [3, 4, 7, 9] },
];

function ChannelSparkCard({ channel }: { channel: Channel }) {
  // Render a 4-point sparkline inside a 60×28 viewBox.
  const W = 60;
  const H = 28;
  const maxY = 10;
  const stepX = W / (channel.points.length - 1);
  const path = channel.points
    .map((p, i) => {
      const x = i * stepX;
      const y = H - (p / maxY) * (H - 6) - 3;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div
      className="flex flex-col items-start gap-1.5 p-2.5"
      style={{
        border: "1px solid rgba(240,235,227,0.1)",
        background: "#0c0c0e",
      }}
    >
      <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#8a8480]">
        {channel.label}
      </span>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-hidden>
        <path
          d={path}
          fill="none"
          stroke="#c4835a"
          strokeOpacity="0.85"
          strokeWidth="0.9"
        />
        {channel.points.map((p, i) => {
          const x = i * stepX;
          const y = H - (p / maxY) * (H - 6) - 3;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i === channel.points.length - 1 ? 1.2 : 0.7}
              fill="#c4835a"
              fillOpacity={i === channel.points.length - 1 ? 1 : 0.5}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default function ScaleHero() {
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
            "radial-gradient(ellipse at 68% 55%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 68% 55%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
        }}
      />

      {/* drafting plate tag */}
      <div
        aria-hidden
        className="absolute top-28 left-6 sm:left-14 flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase text-[#6b6560]"
      >
        <span className="block w-3 h-px bg-[#6b6560]" />
        <span className="block w-px h-3 bg-[#6b6560]" />
        <span>PLATE 04 · COMPOUND CURVE</span>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[0.85fr_1.3fr] gap-14 lg:gap-16 items-center">
        {/* text column */}
        <div>
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] mb-6">
            § Phase 03 · Scale
          </div>
          <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-[#f0ebe3]">
            The layer that compounds once Foundation and Automation are live.
          </h1>
          <p className="mt-8 font-[var(--font-body)] text-base sm:text-lg leading-[1.55] text-[#f0ebe3]/70 max-w-[560px]">
            Scale is the only phase the Marketing-Industrial Complex has ever
            actually sold. Our version runs last on purpose, so adding
            channels compounds instead of leaking.
          </p>
          {/* spec callouts */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-[460px]">
            {[
              { k: "CHANNELS", v: "6" },
              { k: "CADENCE", v: "7d" },
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

        {/* curve + channel strip */}
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
              <linearGradient id="curveFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c4835a" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#c4835a" stopOpacity="0" />
              </linearGradient>
              <marker
                id="scaleArrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b6560" />
              </marker>
            </defs>

            {/* faint inner grid */}
            <g opacity="0.12">
              {Array.from({ length: 13 }).map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={(i * CW) / 12}
                  y1={0}
                  x2={(i * CW) / 12}
                  y2={CH}
                  stroke="#8a8480"
                  strokeWidth="0.15"
                />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={`h${i}`}
                  x1={0}
                  y1={(i * CH) / 7}
                  x2={CW}
                  y2={(i * CH) / 7}
                  stroke="#8a8480"
                  strokeWidth="0.15"
                />
              ))}
            </g>

            {/* area under compound curve */}
            <path d={AREA_D} fill="url(#curveFill)" />

            {/* decaying 'without architecture' baseline */}
            <line
              x1={BASELINE_START.x}
              y1={BASELINE_START.y}
              x2={BASELINE_END.x}
              y2={BASELINE_END.y}
              stroke="#6b6560"
              strokeOpacity="0.65"
              strokeWidth="0.3"
              strokeDasharray="1.4 1"
              markerEnd="url(#scaleArrow)"
            />
            <text
              x={BASELINE_END.x - 2}
              y={BASELINE_END.y + 6}
              fontSize="2.6"
              fontFamily="var(--font-mono, ui-monospace, monospace)"
              fill="#6b6560"
              textAnchor="end"
            >
              rented
            </text>

            {/* compound curve itself */}
            <path
              d={CURVE_D}
              fill="none"
              stroke="#c4835a"
              strokeOpacity="0.95"
              strokeWidth="0.75"
            />

            {/* quarter checkpoints */}
            {CHECKPOINTS.map((cp, i) => (
              <g key={cp.q}>
                <circle
                  cx={cp.x}
                  cy={cp.y}
                  r={i === CHECKPOINTS.length - 1 ? 1.8 : 1.1}
                  fill="#c4835a"
                  fillOpacity={i === CHECKPOINTS.length - 1 ? 1 : 0.75}
                />
                <text
                  x={cp.x}
                  y={cp.y - 3.5}
                  fontSize="2.6"
                  fontFamily="var(--font-mono, ui-monospace, monospace)"
                  fill="#c4835a"
                  fillOpacity="0.85"
                  textAnchor="middle"
                >
                  {cp.q}
                </text>
              </g>
            ))}

            {/* delta callout on final point */}
            <text
              x={CURVE_END.x - 8}
              y={CURVE_END.y - 7}
              fontSize="4"
              fontFamily="var(--font-display, ui-sans-serif)"
              fontWeight="800"
              fill="#f0ebe3"
              textAnchor="end"
            >
              Δ +89%
            </text>

            {/* 'architecture' legend */}
            <g>
              <line
                x1={14}
                y1={132}
                x2={22}
                y2={132}
                stroke="#c4835a"
                strokeWidth="0.8"
              />
              <text
                x={25}
                y={133}
                fontSize="2.6"
                fontFamily="var(--font-mono, ui-monospace, monospace)"
                fill="#c4835a"
                fillOpacity="0.9"
              >
                architecture
              </text>
              <line
                x1={64}
                y1={132}
                x2={72}
                y2={132}
                stroke="#6b6560"
                strokeOpacity="0.7"
                strokeWidth="0.5"
                strokeDasharray="1.4 1"
              />
              <text
                x={75}
                y={133}
                fontSize="2.6"
                fontFamily="var(--font-mono, ui-monospace, monospace)"
                fill="#6b6560"
              >
                rented
              </text>
            </g>

            {/* caliper */}
            {(() => {
              const y = 140;
              const stub = 1.4;
              return (
                <g stroke="#c4835a" strokeOpacity="0.6" strokeWidth="0.22">
                  <line x1={12} y1={y - stub} x2={12} y2={y + stub} />
                  <line x1={228} y1={y - stub} x2={228} y2={y + stub} />
                  <line x1={12} y1={y} x2={228} y2={y} />
                </g>
              );
            })()}
            <text
              x={120}
              y={143.5}
              fontSize="3"
              fontFamily="var(--font-mono, ui-monospace, monospace)"
              fill="#c4835a"
              fillOpacity="0.75"
              textAnchor="middle"
            >
              5 QUARTERS · COMPOUND
            </text>
          </svg>

          {/* channel strip */}
          <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-2">
            {CHANNELS.map((c) => (
              <ChannelSparkCard key={c.label} channel={c} />
            ))}
          </div>
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
