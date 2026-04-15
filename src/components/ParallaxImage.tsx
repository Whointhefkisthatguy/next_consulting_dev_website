"use client";

import { useEffect, useRef } from "react";

type AspectRatio = "ultrawide" | "tall" | "square";

const aspectClasses: Record<AspectRatio, string> = {
  ultrawide: "w-[60vw] max-w-[900px] h-[25vw] max-h-[350px]",
  tall: "w-[20vw] max-w-[300px] h-[50vw] max-h-[600px]",
  square: "w-[30vw] max-w-[400px] h-[30vw] max-h-[400px]",
};

export default function ParallaxImage({
  src,
  aspect = "ultrawide",
  className = "",
  opacity = 0.2,
}: {
  src: string;
  aspect?: AspectRatio;
  className?: string;
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const offset = (progress - 0.5) * 40;
        el.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute pointer-events-none overflow-hidden ${aspectClasses[aspect]} ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover grayscale-[65%]"
        loading="lazy"
      />
    </div>
  );
}
