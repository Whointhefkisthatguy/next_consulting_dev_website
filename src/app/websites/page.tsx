import type { Metadata } from "next";
import Link from "next/link";
import { websitesContent } from "@/content/squeeze/websites";
import WebsitesSqueeze from "@/components/squeeze/WebsitesSqueeze";

export const metadata: Metadata = {
  title: websitesContent.meta.title,
  description: websitesContent.meta.description,
  openGraph: {
    title: websitesContent.meta.title,
    description: websitesContent.meta.description,
    images: [{ url: websitesContent.meta.ogImage, width: 1200, height: 630 }],
  },
};

export default function WebsitesPage() {
  return (
    <>
      <WebsitesSqueeze />
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
