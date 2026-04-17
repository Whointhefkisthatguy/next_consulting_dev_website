"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Props = {
  index: number;
  name: string;
  href: string;
  description: string;
};

export default function ServiceCard({ index, name, href, description }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [inView, setInView] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    setIsCoarsePointer(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (!isCoarsePointer || !ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.55),
      { threshold: [0, 0.55, 0.75] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isCoarsePointer]);

  const active = inView;

  return (
    <Link
      ref={ref}
      href={href}
      data-active={active ? "true" : "false"}
      className="group relative block p-8 sm:p-10 border transition-all duration-[400ms] ease-out hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none data-[active=true]:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none motion-reduce:hover:translate-y-0 motion-reduce:data-[active=true]:translate-y-0"
      style={{
        borderColor: active ? "rgba(196, 131, 90, 0.55)" : "rgba(240, 235, 227, 0.08)",
        background: active
          ? "linear-gradient(180deg, rgba(196,131,90,0.04) 0%, rgba(196,131,90,0) 100%)"
          : "transparent",
        boxShadow: active ? "0 20px 40px -30px rgba(196,131,90,0.45)" : "none",
      }}
    >
      <span
        className="font-[var(--font-display)] text-xs tracking-[0.15em] uppercase font-600 transition-colors duration-300"
        style={{ color: active ? "#e1a27e" : "#c4835a" }}
      >
        0{index + 1}
      </span>
      <h3 className="mt-3 font-[var(--font-display)] text-2xl font-700" style={{ color: "#f0ebe3" }}>
        {name}
      </h3>
      <p className="mt-4 font-[var(--font-body)] text-sm leading-relaxed" style={{ color: "rgba(240,235,227,0.55)" }}>
        {description}
      </p>
      <span
        className="inline-flex items-center gap-2 mt-8 font-[var(--font-body)] text-sm transition-all duration-300 group-hover:gap-3 group-focus-visible:gap-3 group-data-[active=true]:gap-3"
        style={{ color: "#c4835a" }}
      >
        Learn more
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1 group-data-[active=true]:translate-x-1 motion-reduce:transition-none motion-reduce:transform-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-data-[active=true]:translate-x-0"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
