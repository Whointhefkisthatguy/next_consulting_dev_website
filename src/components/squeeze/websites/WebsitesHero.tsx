"use client";

import { useEffect, useState } from "react";
import CountUp from "@/components/CountUp";

type Props = { kicker?: string; headline: string; subhead?: string };

type Device = {
  label: string;
  breakpoint: string;
  /** width as a % of the cascade track */
  widthPct: number;
  /** aspect ratio, height / width */
  aspect: number;
  /** monogram width inside the frame as a % of device width */
  monoPct: number;
};

const DEVICES: Device[] = [
  { label: "DESKTOP", breakpoint: "1440", widthPct: 42, aspect: 0.625, monoPct: 10 },
  { label: "LAPTOP",  breakpoint: "1024", widthPct: 28, aspect: 0.63,  monoPct: 12 },
  { label: "TABLET",  breakpoint: "768",  widthPct: 16, aspect: 1.33,  monoPct: 20 },
  { label: "MOBILE",  breakpoint: "390",  widthPct: 9,  aspect: 2.05,  monoPct: 30 },
];

function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 215.1 94.2" fill="currentColor" className={className} aria-hidden>
      <polygon points="94.5,0 94.5,63.4 112.2,84.1 94.5,67.2 27.2,0 27,0.2 27,0 0,0 0,94.2 27,94.2 27,43 12.5,23 27,38 83.3,94.2 104.1,94.2 121.4,94.2 121.4,0" />
      <polyline points="193.1,23.3 169.8,0 131.6,0 176.9,45.3 128,94.2 145.3,94.2 166.2,94.2 187.8,72.6 204.5,55.7 204.1,56.3 215.1,45.3 196,26.2 196,26.2" />
    </svg>
  );
}

function DeviceFrame({
  device,
  index,
  mounted,
}: {
  device: Device;
  index: number;
  mounted: boolean;
}) {
  const delay = 300 + index * 140;

  return (
    <div
      className="group relative flex flex-col items-start transition-all duration-[900ms] ease-out"
      style={{
        width: `${device.widthPct}%`,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(18px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* drafting label */}
      <div className="mb-2.5 flex items-center gap-1.5 sm:gap-2 font-mono text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#8a8480] whitespace-nowrap overflow-hidden">
        <span>{device.breakpoint}</span>
        <span className="hidden sm:block h-px w-5 bg-[#8a8480]/40" />
        <span className="text-[#c4835a]/80 group-hover:text-[#c4835a] transition-colors duration-500 hidden sm:inline">
          {device.label}
        </span>
      </div>

      {/* device frame */}
      <div
        className="relative w-full border border-[#f0ebe3]/15 bg-[#0c0c0e] p-3 sm:p-4 overflow-hidden transition-all duration-500 group-hover:border-[#c4835a]/50"
        style={{ aspectRatio: `1 / ${device.aspect}` }}
      >
        {/* scan line */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c4835a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />

        {/* monogram header */}
        <div
          className="text-[#f0ebe3]/70 group-hover:text-[#c4835a] transition-colors duration-500"
          style={{ width: `${device.monoPct}%` }}
        >
          <Monogram className="w-full h-auto block" />
        </div>

        {/* content bars */}
        <div className="mt-[8%] space-y-[4%]">
          <div className="h-px bg-[#f0ebe3]/20 w-[65%]" />
          <div className="h-px bg-[#f0ebe3]/20 w-[88%]" />
          <div className="h-px bg-[#f0ebe3]/20 w-[48%]" />
        </div>

        {/* CTA chip */}
        <div
          className="mt-[10%] bg-[#c4835a]/50 group-hover:bg-[#c4835a] transition-colors duration-500"
          style={{ width: "28%", height: "6%", minHeight: 3 }}
        />

        {/* specimen grid echo */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(240,235,227,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(240,235,227,0.8) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />
      </div>
    </div>
  );
}

export default function WebsitesHero({ kicker, headline, subhead }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center px-6 sm:px-14 pt-40 pb-24 overflow-hidden">
      {/* grid overlay */}
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

      {/* crosshair ticks in corners, drafting plate feel */}
      <div aria-hidden className="absolute top-28 left-6 sm:left-14 flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase text-[#6b6560]">
        <span className="block w-3 h-px bg-[#6b6560]" />
        <span className="block w-px h-3 bg-[#6b6560]" />
        <span>PLATE 01 · RESPONSIVE SPECIMENS</span>
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-center">
        {/* text column */}
        <div>
          {kicker && (
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] mb-6">
              {kicker}
            </div>
          )}
          <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1.02] tracking-[-0.02em] text-[#f0ebe3]">
            {headline}
            <span
              className="inline-block w-[0.08em] h-[0.85em] bg-[#c4835a] ml-2 align-middle animate-[blink_1s_step-end_infinite] motion-reduce:animate-none"
              aria-hidden
            />
          </h1>
          {subhead && (
            <p className="mt-8 font-[var(--font-body)] text-base sm:text-lg leading-[1.55] text-[#f0ebe3]/70 max-w-[560px]">
              {subhead}
            </p>
          )}

          {/* spec callouts, feels like engineering drawing notes */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-[460px]">
            {[
              { k: "BREAKPOINTS", v: "4" },
              { k: "LIGHTHOUSE", v: "100" },
              { k: "TTI", v: "<1.5s" },
            ].map((spec) => (
              <div
                key={spec.k}
                className="border-t border-[#f0ebe3]/15 pt-3"
              >
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

        {/* device cascade */}
        <div className="relative overflow-hidden">
          {/* baseline rule */}
          <div
            aria-hidden
            className="absolute left-0 right-0 bottom-0 h-px bg-[#f0ebe3]/12"
          />
          <div className="flex items-end justify-between gap-1.5 sm:gap-3 md:gap-5 pb-4">
            {DEVICES.map((d, i) => (
              <DeviceFrame key={d.label} device={d} index={i} mounted={mounted} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
