/**
 * Clearspace + pixel-bounds specimen.
 * Canvas is 100 × 100 units. Main logo is centered; 8 ghost cells surround it
 * (4 corners + 4 midpoints) each containing a faded monogram — the construction
 * rule is "clearspace = 1 monogram unit on every side."
 */
export default function LogoRulesCard() {
  // geometry in canvas units (100 × 100)
  const cx = 50;
  const cy = 50;
  const logoW = 48;
  const logoH = logoW * (94.2 / 215.1);
  const X = 9; // clearspace unit (square cell)
  const lx = cx - logoW / 2;
  const ly = cy - logoH / 2;
  const bx = lx - X;
  const by = ly - X;
  const bw = logoW + X * 2;
  const bh = logoH + X * 2;

  // 8 surrounding cell positions (TL, TM, TR, ML, MR, BL, BM, BR)
  const cells: { x: number; y: number }[] = [
    { x: bx - X,            y: by - X },            // TL
    { x: bx + bw / 2 - X/2, y: by - X },            // TM
    { x: bx + bw,           y: by - X },            // TR
    { x: bx - X,            y: by + bh / 2 - X/2 }, // ML
    { x: bx + bw,           y: by + bh / 2 - X/2 }, // MR
    { x: bx - X,            y: by + bh },           // BL
    { x: bx + bw / 2 - X/2, y: by + bh },           // BM
    { x: bx + bw,           y: by + bh },           // BR
  ];

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
              {/* reusable monogram */}
              <symbol id="nc-monogram" viewBox="0 0 215.1 94.2" preserveAspectRatio="xMidYMid meet">
                <polygon points="94.5,0 94.5,63.4 112.2,84.1 94.5,67.2 27.2,0 27,0.2 27,0 0,0 0,94.2 27,94.2 27,43 12.5,23 27,38 83.3,94.2 104.1,94.2 121.4,94.2 121.4,0" />
                <polyline points="193.1,23.3 169.8,0 131.6,0 176.9,45.3 128,94.2 145.3,94.2 166.2,94.2 187.8,72.6 204.5,55.7 204.1,56.3 215.1,45.3 196,26.2 196,26.2" />
              </symbol>

              {/* clearspace outer box (dashed) */}
              <rect
                x={bx}
                y={by}
                width={bw}
                height={bh}
                fill="none"
                stroke="#8a8480"
                strokeOpacity="0.6"
                strokeWidth="0.18"
                strokeDasharray="1 0.8"
              />

              {/* 8 ghost cells */}
              {cells.map((c, i) => (
                <g key={i}>
                  <rect
                    x={c.x}
                    y={c.y}
                    width={X}
                    height={X}
                    fill="none"
                    stroke="#8a8480"
                    strokeOpacity="0.5"
                    strokeWidth="0.18"
                    strokeDasharray="0.8 0.6"
                  />
                  <use
                    href="#nc-monogram"
                    x={c.x}
                    y={c.y}
                    width={X}
                    height={X}
                    fill="#8a8480"
                    fillOpacity="0.32"
                  />
                </g>
              ))}

              {/* main logo */}
              <use
                href="#nc-monogram"
                x={lx}
                y={ly}
                width={logoW}
                height={logoH}
                fill="#f0ebe3"
              />

              {/* dimension ticks — top */}
              <g stroke="#c4835a" strokeOpacity="0.75" strokeWidth="0.18">
                <line x1={bx} y1={by - X - 2.5} x2={bx} y2={by - X - 0.5} />
                <line x1={bx + bw} y1={by - X - 2.5} x2={bx + bw} y2={by - X - 0.5} />
                <line x1={bx} y1={by - X - 1.5} x2={bx + bw} y2={by - X - 1.5} />
              </g>
              <text
                x={bx + bw / 2}
                y={by - X - 2.3}
                fontSize="2.2"
                fontFamily="var(--font-mono, ui-monospace, monospace)"
                letterSpacing="0.3"
                fill="#c4835a"
                textAnchor="middle"
              >
                X
              </text>

              {/* dimension ticks — left */}
              <g stroke="#c4835a" strokeOpacity="0.75" strokeWidth="0.18">
                <line x1={bx - X - 2.5} y1={by} x2={bx - X - 0.5} y2={by} />
                <line x1={bx - X - 2.5} y1={by + bh} x2={bx - X - 0.5} y2={by + bh} />
                <line x1={bx - X - 1.5} y1={by} x2={bx - X - 1.5} y2={by + bh} />
              </g>
              <text
                x={bx - X - 3.5}
                y={by + bh / 2 + 0.8}
                fontSize="2.2"
                fontFamily="var(--font-mono, ui-monospace, monospace)"
                letterSpacing="0.3"
                fill="#c4835a"
                textAnchor="middle"
              >
                X
              </text>
            </svg>

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
