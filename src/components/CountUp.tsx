"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  durationMs?: number;
  className?: string;
};

const NUMERIC = /^([^\d.]*?)(\d+(?:\.\d+)?)(.*)$/;

function parse(value: string): { prefix: string; num: number; suffix: string; decimals: number } | null {
  const m = value.match(NUMERIC);
  if (!m) return null;
  const [, prefix, rawNum, suffix] = m;
  const num = parseFloat(rawNum);
  if (Number.isNaN(num)) return null;
  const dot = rawNum.indexOf(".");
  const decimals = dot === -1 ? 0 : rawNum.length - dot - 1;
  return { prefix, num, suffix, decimals };
}

function format(n: number, decimals: number): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function CountUp({ value, durationMs = 1800, className }: Props) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState<string>(
    parsed ? `${parsed.prefix}${format(0, parsed.decimals)}${parsed.suffix}` : value,
  );
  const started = useRef(false);

  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setDisplay(`${parsed.prefix}${format(parsed.num, parsed.decimals)}${parsed.suffix}`);
      return;
    }

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const { prefix, num, suffix, decimals } = parsed;

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = num * eased;
        setDisplay(`${prefix}${format(current, decimals)}${suffix}`);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            run();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [parsed, durationMs]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}
