/**
 * Clearspace + pixel-bounds specimen.
 * Canvas viewBox matches the card's 16:7 aspect (160 × 70).
 * Main logo sits center; 8 ghost monograms surround it in cells sized to the
 * monogram's own aspect — "clearspace = 1 monogram on every side."
 */
const LOGO_ASPECT = 215.1 / 94.2;

export default function LogoRulesCard() {
  // canvas (matches aspect-[16/7] wrapper)
  const CW = 160;
  const CH = 70;

  // main logo (centered)
  const logoW = 52;
  const logoH = logoW / LOGO_ASPECT;
  const cx = CW / 2;
  const cy = CH / 2;
  const lx = cx - logoW / 2;
  const ly = cy - logoH / 2;

  // clearspace unit = 1/4 of main logo (ghost dimensions, same aspect)
  const ux = logoW / 4;
  const uy = logoH / 4;

  // clearspace (dashed) box: main logo + 1 unit on every side
  const bx = lx - ux;
  const by = ly - uy;
  const bw = logoW + ux * 2;
  const bh = logoH + uy * 2;

  // 8 surrounding ghost cells — tight to their monogram
  const cells = [
    { x: bx - ux,              y: by - uy },              // TL
    { x: bx + bw / 2 - ux / 2, y: by - uy },              // TM
    { x: bx + bw,              y: by - uy },              // TR
    { x: bx - ux,              y: by + bh / 2 - uy / 2 }, // ML
    { x: bx + bw,              y: by + bh / 2 - uy / 2 }, // MR
    { x: bx - ux,              y: by + bh },              // BL
    { x: bx + bw / 2 - ux / 2, y: by + bh },              // BM
    { x: bx + bw,              y: by + bh },              // BR
  ];

  return (
    <section
      className="px-6 sm:px-14 py-24"
      style={{ borderTop: "1px solid var(--divider)" }}
    >
      <div className="max-w-[1300px] mx-auto">
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

          <div className="relative aspect-[16/7] w-full">
            <svg
              viewBox={`0 0 ${CW} ${CH}`}
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 w-full h-full"
              aria-hidden
            >
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
                strokeWidth="0.22"
                strokeDasharray="1.2 1"
              />

              {/* 8 ghost cells — tight rectangles matching logo aspect */}
              {cells.map((c, i) => (
                <g key={i}>
                  <rect
                    x={c.x}
                    y={c.y}
                    width={ux}
                    height={uy}
                    fill="none"
                    stroke="#8a8480"
                    strokeOpacity="0.55"
                    strokeWidth="0.22"
                    strokeDasharray="1 0.8"
                  />
                  <use
                    href="#nc-monogram"
                    x={c.x}
                    y={c.y}
                    width={ux}
                    height={uy}
                    fill="#8a8480"
                    fillOpacity="0.4"
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

              {/* top dimension caliper — spans the clearspace box width */}
              {(() => {
                const tickY = by - uy - 2.5;
                const stubLen = 1.4;
                return (
                  <g stroke="#c4835a" strokeOpacity="0.8" strokeWidth="0.22">
                    <line x1={bx} y1={tickY - stubLen} x2={bx} y2={tickY + stubLen} />
                    <line x1={bx + bw} y1={tickY - stubLen} x2={bx + bw} y2={tickY + stubLen} />
                    <line x1={bx} y1={tickY} x2={bx + bw} y2={tickY} />
                  </g>
                );
              })()}
              <text
                x={bx + bw / 2}
                y={by - uy - 3.5}
                fontSize="2.8"
                fontFamily="var(--font-mono, ui-monospace, monospace)"
                fill="#c4835a"
                textAnchor="middle"
              >
                X
              </text>

              {/* left dimension caliper — spans the clearspace box height */}
              {(() => {
                const tickX = bx - ux - 2.5;
                const stubLen = 1.4;
                return (
                  <g stroke="#c4835a" strokeOpacity="0.8" strokeWidth="0.22">
                    <line x1={tickX - stubLen} y1={by} x2={tickX + stubLen} y2={by} />
                    <line x1={tickX - stubLen} y1={by + bh} x2={tickX + stubLen} y2={by + bh} />
                    <line x1={tickX} y1={by} x2={tickX} y2={by + bh} />
                  </g>
                );
              })()}
              <text
                x={bx - ux - 4.3}
                y={by + bh / 2 + 1}
                fontSize="2.8"
                fontFamily="var(--font-mono, ui-monospace, monospace)"
                fill="#c4835a"
                textAnchor="middle"
              >
                X
              </text>
            </svg>

            {/* corner drafting tags — hidden on mobile */}
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
