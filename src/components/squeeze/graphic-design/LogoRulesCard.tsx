function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 215.1 94.2" fill="currentColor" className={className} aria-hidden>
      <polygon points="94.5,0 94.5,63.4 112.2,84.1 94.5,67.2 27.2,0 27,0.2 27,0 0,0 0,94.2 27,94.2 27,43 12.5,23 27,38 83.3,94.2 104.1,94.2 121.4,94.2 121.4,0" />
      <polyline points="193.1,23.3 169.8,0 131.6,0 176.9,45.3 128,94.2 145.3,94.2 166.2,94.2 187.8,72.6 204.5,55.7 204.1,56.3 215.1,45.3 196,26.2 196,26.2" />
    </svg>
  );
}

/**
 * Clearspace + pixel-bounds specimen.
 * Canvas is 100 × 100 units. Logo spans 30 units wide, X = clearspace unit = 6u.
 */
export default function LogoRulesCard() {
  // geometry in canvas units (100 × 100)
  const cx = 50;
  const cy = 50;
  const logoW = 48;
  const logoH = logoW * (94.2 / 215.1); // preserve aspect
  const X = 8; // clearspace unit
  const lx = cx - logoW / 2;
  const ly = cy - logoH / 2;
  const bx = lx - X;
  const by = ly - X;
  const bw = logoW + X * 2;
  const bh = logoH + X * 2;

  return (
    <section
      className="px-6 sm:px-14 py-24"
      style={{ borderTop: "1px solid var(--divider)" }}
    >
      <div className="max-w-[1300px] mx-auto">
        {/* section label */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-y-3">
          <div className="font-[var(--font-body)] text-xs tracking-[0.25em] uppercase text-[#8a8480]">
            Specimen · Logo rules · Clearspace
          </div>
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6b6560]">
            Plate 02 · Construction
          </div>
        </div>

        <div className="relative border border-[#f0ebe3]/15 bg-[#0c0c0e] overflow-hidden">
          {/* faint grid backdrop */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(240,235,227,0.9) 1px, transparent 1px), linear-gradient(to bottom, rgba(240,235,227,0.9) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* construction canvas */}
          <div className="relative aspect-[16/7] w-full">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 w-full h-full"
              aria-hidden
            >
              {/* clearspace outer box (dashed) */}
              <rect
                x={bx}
                y={by}
                width={bw}
                height={bh}
                fill="none"
                stroke="#8a8480"
                strokeOpacity="0.55"
                strokeWidth="0.18"
                strokeDasharray="1 0.8"
              />

              {/* corner pixel outlines — top-left, top-right, bottom-left, bottom-right */}
              {[
                [bx - X, by - X],
                [bx + bw, by - X],
                [bx - X, by + bh],
                [bx + bw, by + bh],
              ].map(([x, y], i) => (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={X}
                  height={X}
                  fill="none"
                  stroke="#8a8480"
                  strokeOpacity="0.45"
                  strokeWidth="0.18"
                  strokeDasharray="0.8 0.6"
                />
              ))}

              {/* inner X markers at clearspace midpoints */}
              {[
                { x: bx + bw / 2 - X / 2, y: by - X },
                { x: bx + bw / 2 - X / 2, y: by + bh },
                { x: bx - X, y: by + bh / 2 - X / 2 },
                { x: bx + bw, y: by + bh / 2 - X / 2 },
              ].map((p, i) => (
                <rect
                  key={`m${i}`}
                  x={p.x}
                  y={p.y}
                  width={X}
                  height={X}
                  fill="none"
                  stroke="#8a8480"
                  strokeOpacity="0.3"
                  strokeWidth="0.15"
                  strokeDasharray="0.6 0.5"
                />
              ))}

              {/* dimension ticks — top */}
              <g stroke="#c4835a" strokeOpacity="0.7" strokeWidth="0.15">
                <line x1={bx} y1={by - X - 2} x2={bx} y2={by - X - 0.5} />
                <line x1={bx + bw} y1={by - X - 2} x2={bx + bw} y2={by - X - 0.5} />
                <line x1={bx} y1={by - X - 1.25} x2={bx + bw} y2={by - X - 1.25} />
              </g>

              {/* dimension ticks — left */}
              <g stroke="#c4835a" strokeOpacity="0.7" strokeWidth="0.15">
                <line x1={bx - X - 2} y1={by} x2={bx - X - 0.5} y2={by} />
                <line x1={bx - X - 2} y1={by + bh} x2={bx - X - 0.5} y2={by + bh} />
                <line x1={bx - X - 1.25} y1={by} x2={bx - X - 1.25} y2={by + bh} />
              </g>
            </svg>

            {/* logo — rendered in DOM so it scales crisply with currentColor */}
            <div
              className="absolute text-[#f0ebe3]"
              style={{
                left: `${lx}%`,
                top: `${ly}%`,
                width: `${logoW}%`,
                height: `${logoH}%`,
              }}
            >
              <Monogram className="w-full h-full block" />
            </div>

            {/* "X" clearspace unit callouts */}
            <div
              className="absolute font-mono text-[10px] tracking-[0.2em] uppercase text-[#c4835a]"
              style={{ left: `${bx + bw / 2}%`, top: `${by - X - 4}%`, transform: "translate(-50%, -50%)" }}
            >
              X
            </div>
            <div
              className="absolute font-mono text-[10px] tracking-[0.2em] uppercase text-[#c4835a]"
              style={{ left: `${bx - X - 4}%`, top: `${by + bh / 2}%`, transform: "translate(-50%, -50%)" }}
            >
              X
            </div>

            {/* corner drafting tags — hidden on mobile to avoid overlap */}
            <div className="hidden sm:block absolute top-3 left-3 font-mono text-[9px] tracking-[0.25em] uppercase text-[#6b6560]">
              <span className="text-[#c4835a]/80">01</span> · Clearspace = 1X
            </div>
            <div className="hidden sm:block absolute top-3 right-3 font-mono text-[9px] tracking-[0.25em] uppercase text-[#6b6560]">
              Bounds · 215.1 × 94.2
            </div>
            <div className="hidden sm:block absolute bottom-3 left-3 font-mono text-[9px] tracking-[0.25em] uppercase text-[#6b6560]">
              Minimum · 24 px height
            </div>
            <div className="hidden sm:block absolute bottom-3 right-3 font-mono text-[9px] tracking-[0.25em] uppercase text-[#6b6560]">
              <span className="text-[#c4835a]/80">Ø</span> do not modify
            </div>
          </div>
        </div>

        {/* caption row */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-[760px]">
          {[
            { k: "X", v: "Clearspace unit" },
            { k: "1X", v: "Min. margin (all sides)" },
            { k: "24px", v: "Min. rendered height" },
            { k: "1 color", v: "Mono only · no fills" },
          ].map((spec) => (
            <div key={spec.k} className="border-t border-[#f0ebe3]/15 pt-3">
              <div className="font-[var(--font-display)] font-800 text-lg tracking-tight text-[#c4835a]">
                {spec.k}
              </div>
              <div className="mt-1 font-mono text-[9px] tracking-[0.2em] uppercase text-[#6b6560]">
                {spec.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
