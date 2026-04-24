import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { loadEssays, loadEssayBySlug } from "@/lib/essays";

export const alt = "Next Consulting · Writing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VOID = "#070708";
const CREAM = "#f0ebe3";
const COPPER = "#c4835a";
const MUTED = "#a39d97";
const DIVIDER = "rgba(240, 235, 227, 0.18)";

export async function generateStaticParams() {
  const all = await loadEssays();
  return all.map((e) => ({ slug: e.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = await loadEssayBySlug(slug);

  const interBold = await readFile(
    join(process.cwd(), "assets/og/Inter-ExtraBold.ttf"),
  );
  const interMed = await readFile(
    join(process.cwd(), "assets/og/Inter-Medium.ttf"),
  );

  const title = essay?.title ?? "Writing";
  const category = essay?.category ?? "Long Form";
  const author = essay?.author ?? "Next Consulting";
  const authorTitle = essay?.authorTitle ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: VOID,
          padding: "64px 72px",
          position: "relative",
          fontFamily: "Inter",
          color: CREAM,
        }}
      >
        {/* Top: category eyebrow + NEXT wordmark */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            fontSize: 18,
            letterSpacing: 8,
            fontWeight: 500,
          }}
        >
          <span style={{ color: COPPER }}>
            {category.toUpperCase()}
          </span>
          <span style={{ color: MUTED }}>NEXT · CONSULTING</span>
        </div>

        {/* Big copper quote glyph as decorative anchor */}
        <div
          style={{
            position: "absolute",
            top: 48,
            right: 80,
            fontSize: 320,
            color: "rgba(196, 131, 90, 0.10)",
            fontWeight: 800,
            lineHeight: 1,
            display: "flex",
          }}
        >
          &ldquo;
        </div>

        {/* Title block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            paddingTop: 24,
            paddingBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: title.length > 50 ? 58 : title.length > 30 ? 72 : 86,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: -1.5,
              color: CREAM,
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer: byline left, tagline right */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: `1px solid ${DIVIDER}`,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 19,
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            <span style={{ color: CREAM, fontWeight: 800 }}>{author}</span>
            {authorTitle && (
              <span style={{ color: MUTED, marginTop: 4 }}>{authorTitle}</span>
            )}
          </div>
          <span
            style={{
              color: COPPER,
              fontSize: 16,
              letterSpacing: 6,
              fontWeight: 500,
            }}
          >
            THE ART OF ENGINEERED PROFITABILITY
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interBold, weight: 800, style: "normal" },
        { name: "Inter", data: interMed, weight: 500, style: "normal" },
      ],
    },
  );
}
