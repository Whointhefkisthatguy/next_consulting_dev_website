"use client";

import { useEffect, useState } from "react";
import CountUp from "@/components/CountUp";

type Props = { kicker?: string; headline: string; subhead?: string };

type Node = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub: string;
  port: string;
};

const CW = 240;
const CH = 146;

const NODES: Node[] = [
  { id: "trigger",  x: 4,   y: 50, w: 40, h: 26, label: "TRIGGER",  sub: "Lead in",    port: "01" },
  { id: "enrich",   x: 52,  y: 50, w: 40, h: 26, label: "ENRICH",   sub: "Stamp data", port: "02" },
  { id: "send",     x: 100, y: 50, w: 40, h: 26, label: "SEND",     sub: "SMS + mail", port: "03" },
  { id: "qualify",  x: 148, y: 50, w: 40, h: 26, label: "QUALIFY",  sub: "Book call",  port: "04" },
  { id: "handoff",  x: 196, y: 50, w: 40, h: 26, label: "HANDOFF",  sub: "Human",      port: "05" },
];

// fallback branch — drops off "SEND" if no reply
const BRANCH = { x: 100, y: 104, w: 40, h: 26, label: "FALLBACK", sub: "Voicemail", port: "03a" };

const EDGE_LABELS = [
  { x: 48,  y: 46, text: "+2m" },
  { x: 96,  y: 46, text: "+1h" },
  { x: 144, y: 46, text: "+24h" },
  { x: 192, y: 46, text: "✓" },
];

function NodeBox({ n, highlight = false }: { n: Node | typeof BRANCH; highlight?: boolean }) {
  const stroke = highlight ? "#c4835a" : "#8a8480";
  return (
    <g>
      <rect
        x={n.x}
        y={n.y}
        width={n.w}
        height={n.h}
        fill="#0c0c0e"
        stroke={stroke}
        strokeOpacity="0.8"
        strokeWidth="0.3"
      />
      {/* port tag */}
      <text
        x={n.x + 1.5}
        y={n.y + 3.6}
        fontSize="2.2"
        fontFamily="var(--font-mono, ui-monospace, monospace)"
        fill="#c4835a"
        fillOpacity="0.8"
      >
        {"port" in n ? n.port : ""}
      </text>
      <text
        x={n.x + n.w / 2}
        y={n.y + n.h / 2 - 0.2}
        fontSize="4"
        fontFamily="var(--font-display, ui-sans-serif)"
        fontWeight="800"
        fill="#f0ebe3"
        textAnchor="middle"
      >
        {n.label}
      </text>
      <text
        x={n.x + n.w / 2}
        y={n.y + n.h / 2 + 5.2}
        fontSize="2.8"
        fontFamily="var(--font-mono, ui-monospace, monospace)"
        fill="#8a8480"
        textAnchor="middle"
      >
        {n.sub}
      </text>
    </g>
  );
}

export default function AutomationHero({ kicker, headline, subhead }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // mainline path — center-to-center across nodes
  const mainPath = NODES.reduce((acc, n, i) => {
    const cx = n.x + n.w / 2;
    const cy = n.y + n.h / 2;
    return acc + (i === 0 ? `M ${cx} ${cy}` : ` L ${cx} ${cy}`);
  }, "");

  // connection segments that sit outside the nodes (for visible wires)
  const wires = NODES.slice(0, -1).map((a, i) => {
    const b = NODES[i + 1];
    return {
      x1: a.x + a.w,
      y1: a.y + a.h / 2,
      x2: b.x,
      y2: b.y + b.h / 2,
    };
  });

  // fallback branch wire: from SEND bottom to FALLBACK top
  const send = NODES[2];
  const branchWire = {
    x1: send.x + send.w / 2,
    y1: send.y + send.h,
    x2: BRANCH.x + BRANCH.w / 2,
    y2: BRANCH.y,
  };

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
            "radial-gradient(ellipse at 70% 55%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 70% 55%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
        }}
      />

      {/* drafting plate tag */}
      <div
        aria-hidden
        className="absolute top-28 left-6 sm:left-14 flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase text-[#6b6560]"
      >
        <span className="block w-3 h-px bg-[#6b6560]" />
        <span className="block w-px h-3 bg-[#6b6560]" />
        <span>PLATE 03 · FLOW DIAGRAM</span>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[0.85fr_1.5fr] gap-14 lg:gap-16 items-center">
        {/* text column */}
        <div>
          {kicker && (
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] mb-6">
              {kicker}
            </div>
          )}
          <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-[#f0ebe3]">
            {headline}
          </h1>
          {subhead && (
            <p className="mt-8 font-mono text-[11px] sm:text-xs leading-[1.6] text-[#8a8480] max-w-[560px]">
              <sup className="text-[#c4835a] mr-1">1</sup>
              {subhead}
            </p>
          )}
          {/* spec callouts */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-[460px]">
            {[
              { k: "NODES", v: "5" },
              { k: "LATENCY", v: "<2m" },
              { k: "UPTIME", v: "99.9" },
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

        {/* node graph */}
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
                id="arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#8a8480" />
              </marker>
              <marker
                id="arrow-dashed"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b6560" />
              </marker>
            </defs>

            {/* faint drafting grid inside plate */}
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

            {/* mainline wires */}
            {wires.map((w, i) => (
              <line
                key={i}
                x1={w.x1}
                y1={w.y1}
                x2={w.x2}
                y2={w.y2}
                stroke="#8a8480"
                strokeOpacity="0.75"
                strokeWidth="0.35"
                markerEnd="url(#arrow)"
              />
            ))}

            {/* edge timing labels */}
            {EDGE_LABELS.map((e, i) => (
              <text
                key={i}
                x={e.x}
                y={e.y}
                fontSize="3"
                fontFamily="var(--font-mono, ui-monospace, monospace)"
                fill="#c4835a"
                textAnchor="middle"
              >
                {e.text}
              </text>
            ))}

            {/* fallback branch (dashed) */}
            <line
              x1={branchWire.x1}
              y1={branchWire.y1}
              x2={branchWire.x2}
              y2={branchWire.y2}
              stroke="#6b6560"
              strokeOpacity="0.8"
              strokeWidth="0.3"
              strokeDasharray="1.2 1"
              markerEnd="url(#arrow-dashed)"
            />
            <text
              x={branchWire.x1 + 2}
              y={branchWire.y1 + 6}
              fontSize="2.2"
              fontFamily="var(--font-mono, ui-monospace, monospace)"
              fill="#6b6560"
            >
              no reply
            </text>

            {/* branch node */}
            <NodeBox n={BRANCH} />

            {/* mainline nodes */}
            {NODES.map((n, i) => (
              <NodeBox key={n.id} n={n} highlight={i === 0 || i === NODES.length - 1} />
            ))}

            {/* token (flowing lead) */}
            <circle r="1.4" fill="#c4835a">
              <animateMotion
                dur="5.2s"
                repeatCount="indefinite"
                path={mainPath}
                rotate="auto"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;1;1;1;1;1;0"
                keyTimes="0;0.02;0.2;0.4;0.6;0.8;0.95;0.98;1"
                dur="5.2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* overall bounds caliper — bottom */}
            {(() => {
              const y = 136;
              const stub = 1.4;
              return (
                <g stroke="#c4835a" strokeOpacity="0.6" strokeWidth="0.22">
                  <line x1={4} y1={y - stub} x2={4} y2={y + stub} />
                  <line x1={236} y1={y - stub} x2={236} y2={y + stub} />
                  <line x1={4} y1={y} x2={236} y2={y} />
                </g>
              );
            })()}
            <text
              x={120}
              y={139.5}
              fontSize="3"
              fontFamily="var(--font-mono, ui-monospace, monospace)"
              fill="#c4835a"
              fillOpacity="0.7"
              textAnchor="middle"
            >
              END-TO-END · &lt; 24h
            </text>
          </svg>
        </div>
      </div>

      {/* bottom "continue" marker */}
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
