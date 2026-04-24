import type { Metadata } from "next";
import Link from "next/link";
import { graphicDesignContent } from "@/content/squeeze/graphic-design";
import GraphicDesignSqueeze from "@/components/squeeze/GraphicDesignSqueeze";

export const metadata: Metadata = {
  title: graphicDesignContent.meta.title,
  description: graphicDesignContent.meta.description,
  openGraph: {
    title: graphicDesignContent.meta.title,
    description: graphicDesignContent.meta.description,
    images: [{ url: graphicDesignContent.meta.ogImage, width: 1200, height: 630 }],
  },
};

export default function GraphicDesignPage() {
  return (
    <>
      <GraphicDesignSqueeze />
      <section
        className="px-6 sm:px-14 py-16"
        style={{ borderTop: "1px solid var(--divider)" }}
      >
        <div className="max-w-[1100px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-opacity duration-300 hover:opacity-80"
            style={{ color: "var(--copper)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Return home
          </Link>
        </div>
      </section>
    </>
  );
}
