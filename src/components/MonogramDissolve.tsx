"use client";

import { useRef, useEffect, useCallback } from "react";

/*
  Monogram dissolve: the N> mark fragments into falling binary 1s and 0s.
  The particles originate from where the monogram pixels are, not the whole screen.

  How it works:
  1. The monogram SVG is drawn to an offscreen canvas
  2. We sample pixel positions where the mark exists (non-transparent pixels)
  3. Each sampled pixel becomes a "1" or "0" particle
  4. On trigger, particles drift downward with gravity + slight horizontal scatter
*/

interface Props {
  progress: number; // 0 = monogram solid, 1 = fully dissolved
  width: number;
  height: number;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  char: string;
  speed: number;
  drift: number;
  alpha: number;
  size: number;
}

export function MonogramDissolve({ progress, width, height }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const initedRef = useRef(false);

  const initParticles = useCallback(() => {
    if (initedRef.current || !width || !height) return;
    initedRef.current = true;

    // Draw the monogram to an offscreen canvas to sample pixels
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext("2d");
    if (!octx) return;

    // Draw the N and > shapes
    octx.fillStyle = "white";

    // Scale factor: the monogram viewBox is 215.1 x 94.2
    // Center it in the canvas
    const scale = Math.min(width / 215.1, height / 94.2) * 0.4;
    const offsetX = (width - 215.1 * scale) / 2;
    const offsetY = (height - 94.2 * scale) / 2;

    octx.save();
    octx.translate(offsetX, offsetY);
    octx.scale(scale, scale);

    // N
    const nPath = new Path2D();
    nPath.moveTo(94.5, 0); nPath.lineTo(94.5, 63.4); nPath.lineTo(112.2, 84.1);
    nPath.lineTo(94.5, 67.2); nPath.lineTo(27.2, 0); nPath.lineTo(27, 0.2);
    nPath.lineTo(27, 0); nPath.lineTo(0, 0); nPath.lineTo(0, 94.2);
    nPath.lineTo(27, 94.2); nPath.lineTo(27, 43); nPath.lineTo(12.5, 23);
    nPath.lineTo(27, 38); nPath.lineTo(83.3, 94.2); nPath.lineTo(104.1, 94.2);
    nPath.lineTo(121.4, 94.2); nPath.lineTo(121.4, 0); nPath.closePath();
    octx.fill(nPath);

    // > arrow
    const aPath = new Path2D();
    aPath.moveTo(193.1, 23.3); aPath.lineTo(169.8, 0); aPath.lineTo(131.6, 0);
    aPath.lineTo(176.9, 45.3); aPath.lineTo(128, 94.2); aPath.lineTo(145.3, 94.2);
    aPath.lineTo(166.2, 94.2); aPath.lineTo(187.8, 72.6); aPath.lineTo(204.5, 55.7);
    aPath.lineTo(204.1, 56.3); aPath.lineTo(215.1, 45.3); aPath.lineTo(196, 26.2);
    aPath.closePath();
    octx.fill(aPath);

    octx.restore();

    // Sample pixels where the monogram exists
    const imageData = octx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const particles: Particle[] = [];
    const step = 4; // sample every 4th pixel for performance

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const i = (y * width + x) * 4;
        if (pixels[i + 3] > 128) { // non-transparent
          particles.push({
            x,
            y,
            originX: x,
            originY: y,
            char: Math.random() > 0.5 ? "1" : "0",
            speed: 1 + Math.random() * 3,
            drift: (Math.random() - 0.5) * 2,
            alpha: 0.5 + Math.random() * 0.5,
            size: 8 + Math.random() * 6,
          });
        }
      }
    }

    particlesRef.current = particles;
  }, [width, height]);

  useEffect(() => {
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !particlesRef.current.length) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    if (progress <= 0.05) return; // monogram still solid, don't render particles

    const p = Math.min(progress * 1.5, 1); // accelerate dissolution

    particlesRef.current.forEach((particle) => {
      // How far this particle has moved from origin
      const displacement = p * particle.speed * 80;
      const px = particle.originX + particle.drift * displacement * 0.3;
      const py = particle.originY + displacement;

      // Fade out as particles fall further
      const fadeOut = Math.max(0, 1 - (displacement / (height * 0.8)));
      const alpha = particle.alpha * fadeOut * Math.min(p * 4, 1);

      if (alpha < 0.01) return;

      ctx.fillStyle = `rgba(201, 150, 63, ${alpha})`;
      ctx.font = `${particle.size}px monospace`;
      ctx.fillText(particle.char, px, py);
    });
  }, [progress, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-none z-30"
      style={{ opacity: progress > 0.05 ? 1 : 0 }}
    />
  );
}
