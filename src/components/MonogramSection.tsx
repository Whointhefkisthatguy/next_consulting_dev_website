"use client";

import { motion } from "framer-motion";

export function MonogramSection() {
  return (
    <section className="relative flex h-dvh items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-amber"
      >
        {/* NEXT wordmark — extracted from Next_Consulting_RGB.svg Layer_3, coordinates normalized by subtracting min-x=73.8, min-y=99.9 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 202.2 35.7"
          fill="currentColor"
          className="h-16 w-auto sm:h-20 md:h-24"
        >
          {/* N */}
          <polygon points="35.8,0.0 35.8,24.0 42.5,31.9 35.8,25.5 10.3,0.0 10.2,0.1 10.2,0.0 0.0,0.0 0.0,35.7 10.2,35.7 10.2,16.3 4.7,8.7 10.2,14.4 31.5,35.7 39.4,35.7 46.0,35.7 46.0,0.0" />
          {/* E */}
          <polygon points="66.6,0.0 56.4,0.0 56.4,35.7 56.4,35.7 66.6,35.7 95.6,35.7 95.6,26.4 66.6,26.4 66.6,22.5 95.6,22.5 95.6,13.2 66.6,13.2 66.6,9.4 95.6,9.4 95.6,0.0 66.6,0.0" />
          {/* X upper-right */}
          <polygon points="139.0,14.2 153.2,0.0 138.7,0.0 131.5,7.2" />
          {/* X lower-right */}
          <polygon points="138.3,19.5 131.1,26.8 140.1,35.7 148.0,35.7 154.5,35.7" />
          {/* X chevron / arrow accent */}
          <polygon points="136.0,17.2 128.7,9.9 128.7,9.9 127.6,8.8 118.8,0.0 104.3,0.0 120.8,16.4 126.2,12.3 121.5,17.1 121.5,17.2 115.8,22.9 115.8,22.9 115.8,22.9 103.0,35.7 109.5,35.7 117.4,35.7 125.6,27.5 132.0,21.1 131.8,21.3" />
          {/* T */}
          <polygon points="202.2,0.0 159.5,0.0 159.5,10.2 175.8,10.2 175.8,35.7 186.0,35.7 186.0,10.2 202.2,10.2" />
        </svg>
      </motion.div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(to top, rgba(20, 20, 24, 0.6), transparent)" }}
      />
    </section>
  );
}
