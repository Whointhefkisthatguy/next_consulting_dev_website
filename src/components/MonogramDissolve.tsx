"use client";

import { useRef, useEffect, useCallback, useState } from "react";

/*
  The monogram IS binary. No SVG. Just 1s and 0s forming the N> shape.
  On scroll, they scatter and fall.
*/

interface Particle {
  originX: number;
  originY: number;
  char: string;
  speed: number;
  driftX: number;
  size: number;
  delay: number;
}

interface Props {
  progress: number;
  width: number;
  height: number;
}

export function MonogramDissolve({ progress, width, height }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [ready, setReady] = useState(false);

  const initParticles = useCallback(() => {
    if (!width || !height) return;

    // Draw monogram to offscreen canvas for pixel sampling
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext("2d");
    if (!octx) return;

    octx.fillStyle = "white";
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

    // Sample ONLY pixels inside the shape — tight grid
    const imageData = octx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const particles: Particle[] = [];
    const step = 7; // tight enough to read as the shape

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const i = (y * width + x) * 4;
        if (pixels[i + 3] > 128) {
          particles.push({
            originX: x,
            originY: y,
            char: Math.random() > 0.5 ? "1" : "0",
            speed: 0.8 + Math.random() * 2.5,
            driftX: (Math.random() - 0.5) * 4,
            size: 7 + Math.random() * 4,
            delay: Math.random() * 0.3,
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
      const localProgress = Math.max(0, Math.min(1, (progress - p.delay) / (1 - p.delay)));

      // Position
      const fallDistance = localProgress * p.speed * 150;
      const px = p.originX + p.driftX * localProgress * 50;
      const py = p.originY + fallDistance;

      // Fade: solid white when in formation, fade as they scatter
      const alpha = localProgress < 0.05
        ? 0.85 + Math.random() * 0.15 // in formation: bright white
        : Math.max(0, 0.9 - localProgress * 1.3);

      if (alpha < 0.01 || py > height + 20) return;

      // White in formation, shift to amber as they dissolve
      const amberMix = Math.min(localProgress * 2.5, 1);
      const r = Math.round(255 + (201 - 255) * amberMix);
      const g = Math.round(255 + (150 - 255) * amberMix);
      const b = Math.round(255 + (63 - 255) * amberMix);

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.font = `${p.size}px monospace`;
      ctx.fillText(p.char, px, py);
    });
  }, [progress, width, height, ready]);

  if (!ready) return null;

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-none z-40"
    />
  );
}
