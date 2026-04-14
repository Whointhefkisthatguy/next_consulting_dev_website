"use client";

import { useRef, useEffect, useCallback, useState } from "react";

/*
  The monogram dissolves into binary:
  1. Sample the monogram shape to get particle positions
  2. At progress 0: particles are in formation (looks like the monogram)
  3. As progress increases: particles scatter, fall, and fade
  4. The white SVG monogram is hidden — the particles ARE the monogram
*/

interface Particle {
  originX: number;
  originY: number;
  char: string;
  speed: number;
  driftX: number;
  size: number;
  delay: number; // staggered dissolution
}

interface Props {
  progress: number; // 0 = in formation, 1 = fully scattered
  width: number;
  height: number;
}

export function MonogramDissolve({ progress, width, height }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [ready, setReady] = useState(false);

  const initParticles = useCallback(() => {
    if (!width || !height) return;

    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext("2d");
    if (!octx) return;

    octx.fillStyle = "white";

    // Scale and center the monogram (viewBox 0 0 215.1 94.2)
    const scale = Math.min(width / 215.1, height / 94.2) * 0.35;
    const offsetX = (width - 215.1 * scale) / 2;
    const offsetY = (height - 94.2 * scale) / 2;

    octx.save();
    octx.translate(offsetX, offsetY);
    octx.scale(scale, scale);

    // N
    octx.beginPath();
    octx.moveTo(94.5, 0); octx.lineTo(94.5, 63.4); octx.lineTo(112.2, 84.1);
    octx.lineTo(94.5, 67.2); octx.lineTo(27.2, 0); octx.lineTo(27, 0.2);
    octx.lineTo(27, 0); octx.lineTo(0, 0); octx.lineTo(0, 94.2);
    octx.lineTo(27, 94.2); octx.lineTo(27, 43); octx.lineTo(12.5, 23);
    octx.lineTo(27, 38); octx.lineTo(83.3, 94.2); octx.lineTo(104.1, 94.2);
    octx.lineTo(121.4, 94.2); octx.lineTo(121.4, 0);
    octx.closePath();
    octx.fill();

    // >
    octx.beginPath();
    octx.moveTo(193.1, 23.3); octx.lineTo(169.8, 0); octx.lineTo(131.6, 0);
    octx.lineTo(176.9, 45.3); octx.lineTo(128, 94.2); octx.lineTo(145.3, 94.2);
    octx.lineTo(166.2, 94.2); octx.lineTo(187.8, 72.6); octx.lineTo(204.5, 55.7);
    octx.lineTo(204.1, 56.3); octx.lineTo(215.1, 45.3); octx.lineTo(196, 26.2);
    octx.closePath();
    octx.fill();

    octx.restore();

    // Sample — sparse, not dense
    const imageData = octx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const particles: Particle[] = [];
    const step = 10; // much sparser sampling

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const i = (y * width + x) * 4;
        if (pixels[i + 3] > 128) {
          particles.push({
            originX: x,
            originY: y,
            char: Math.random() > 0.5 ? "1" : "0",
            speed: 0.5 + Math.random() * 2,
            driftX: (Math.random() - 0.5) * 3,
            size: 9 + Math.random() * 5,
            delay: Math.random() * 0.4, // stagger: some particles hold longer
          });
        }
      }
    }

    particlesRef.current = particles;
    setReady(true);
  }, [width, height]);

  useEffect(() => {
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ready) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    particlesRef.current.forEach((p) => {
      // Each particle's individual progress (with stagger delay)
      const localProgress = Math.max(0, Math.min(1, (progress - p.delay) / (1 - p.delay)));

      // Position: at 0 they're in formation, at 1 they've fallen away
      const fallDistance = localProgress * p.speed * 120;
      const px = p.originX + p.driftX * localProgress * 40;
      const py = p.originY + fallDistance;

      // Alpha: bright in formation, fade as they scatter
      // In formation (localProgress ~0): full brightness like the white monogram
      // Scattered: fade out
      const formationAlpha = localProgress < 0.1 ? 1.0 : Math.max(0, 1.0 - localProgress * 1.2);

      if (formationAlpha < 0.01 || py > height + 20) return;

      // Color: white in formation, transitions to amber as it dissolves
      const amberMix = Math.min(localProgress * 3, 1);
      const r = Math.round(255 + (201 - 255) * amberMix);
      const g = Math.round(255 + (150 - 255) * amberMix);
      const b = Math.round(255 + (63 - 255) * amberMix);

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${formationAlpha})`;
      ctx.font = `bold ${p.size}px monospace`;
      ctx.fillText(p.char, px, py);
    });
  }, [progress, width, height, ready]);

  if (!ready) return null;

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-none z-30"
    />
  );
}
