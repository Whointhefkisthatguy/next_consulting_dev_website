type Props = { kicker?: string; headline: string; subhead?: string; attribution?: string };

const LOGO_ASPECT = 215.1 / 94.2;

export default function GraphicDesignHero({ kicker, headline, subhead, attribution }: Props) {
  const CW = 192;
  const CH = 108;
  const logoW = 56;
  const logoH = logoW / LOGO_ASPECT;
  const cx = CW * 0.82;
  const cy = CH * 0.62;
  const lx = cx - logoW / 2;
  const ly = cy - logoH / 2;
  const ux = logoW / 4;
  const uy = logoH / 4;
  const bx = lx;
  const by = ly;
  const bw = logoW;
  const bh = logoH;

  const cells = [
    { x: bx - ux,              y: by - uy },
    { x: bx + bw / 2 - ux / 2, y: by - uy },
    { x: bx + bw,              y: by - uy },
    { x: bx - ux,              y: by + bh / 2 - uy / 2 },
    { x: bx + bw,              y: by + bh / 2 - uy / 2 },
    { x: bx - ux,              y: by + bh },
    { x: bx + bw / 2 - ux / 2, y: by + bh },
    { x: bx + bw,              y: by + bh },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center px-6 sm:px-14 pt-40 pb-24 overflow-hidden">
      {/* specimen construction, masked for text contrast */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, transparent 42%, rgba(0,0,0,0.55) 65%, black 90%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, transparent 42%, rgba(0,0,0,0.55) 65%, black 90%)",
        }}
      >
        {/* drafting grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(240,235,227,0.9) 1px, transparent 1px), linear-gradient(to bottom, rgba(240,235,227,0.9) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <svg
          viewBox={`0 0 ${CW} ${CH}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
        >
          <symbol id="hero-monogram" viewBox="0 0 215.1 94.2" preserveAspectRatio="xMidYMid meet">
            <polygon points="94.5,0 94.5,63.4 112.2,84.1 94.5,67.2 27.2,0 27,0.2 27,0 0,0 0,94.2 27,94.2 27,43 12.5,23 27,38 83.3,94.2 104.1,94.2 121.4,94.2 121.4,0" />
            <polyline points="193.1,23.3 169.8,0 131.6,0 176.9,45.3 128,94.2 145.3,94.2 166.2,94.2 187.8,72.6 204.5,55.7 204.1,56.3 215.1,45.3 196,26.2 196,26.2" />
          </symbol>

          {/* dashed clearspace box */}
          <rect
            x={bx}
            y={by}
            width={bw}
            height={bh}
            fill="none"
            stroke="#8a8480"
            strokeOpacity="0.35"
            strokeWidth="0.25"
            strokeDasharray="1.2 1"
          />

          {/* ghost cells */}
          {cells.map((c, i) => (
            <g key={i}>
              <rect
                x={c.x}
                y={c.y}
                width={ux}
                height={uy}
                fill="none"
                stroke="#8a8480"
                strokeOpacity="0.22"
                strokeWidth="0.25"
                strokeDasharray="1 0.8"
              />
              <use
                href="#hero-monogram"
                x={c.x}
                y={c.y}
                width={ux}
                height={uy}
                fill="#8a8480"
                fillOpacity="0.22"
              />
            </g>
          ))}

          {/* main logo */}
          <use
            href="#hero-monogram"
            x={lx}
            y={ly}
            width={logoW}
            height={logoH}
            fill="#f0ebe3"
            fillOpacity="0.2"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto w-full">
        {kicker && (
          <div className="font-[var(--font-body)] text-xs tracking-[0.25em] uppercase text-[#c4835a] mb-6">
            {kicker}
          </div>
        )}
        <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.02em] text-[#f0ebe3] max-w-[900px]">
          {headline}
        </h1>
        {attribution && (
          <div className="mt-5 font-[var(--font-body)] text-sm tracking-[0.1em] uppercase text-[#a39d97]/80">
            {attribution}
          </div>
        )}
        {subhead && (
          <p className="mt-10 font-[var(--font-display)] font-600 text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.2] tracking-[-0.01em] text-[#c4835a] max-w-[600px]">
            {subhead}
          </p>
        )}
        {/* color chips */}
        <div aria-hidden className="mt-14 flex gap-0">
          {["#f0ebe3", "#c4835a", "#070708", "#6b6560", "#0f0f11"].map((c, i) => (
            <div key={i} className="w-14 h-3" style={{ background: c, border: "1px solid rgba(240,235,227,0.1)" }} />
          ))}
        </div>
      </div>
    </section>
  );
}
