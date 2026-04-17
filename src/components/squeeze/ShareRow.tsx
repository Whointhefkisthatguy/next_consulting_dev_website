"use client";

import { useState } from "react";

export type ShareInput = { url: string; title: string };

export function buildShareUrls(i: ShareInput) {
  const u = encodeURIComponent(i.url);
  const t = encodeURIComponent(i.title);
  return {
    x: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
  };
}

export default function ShareRow({ url, title }: ShareInput) {
  const [copied, setCopied] = useState(false);
  const urls = buildShareUrls({ url, title });
  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex gap-4 items-center font-[var(--font-body)] text-xs tracking-[0.12em] uppercase">
      <span className="text-[#6b6560]">Share</span>
      <a href={urls.x} target="_blank" rel="noopener noreferrer" className="text-[#8a8480] hover:text-[#c4835a]">X</a>
      <a href={urls.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#8a8480] hover:text-[#c4835a]">LinkedIn</a>
      <button onClick={copy} className="text-[#8a8480] hover:text-[#c4835a]">
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
