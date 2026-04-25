import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { loadInsights, loadInsightBySlug } from "@/lib/insights";

export const alt = "Next Consulting · Insights";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VOID = "#070708";
const CREAM = "#f0ebe3";
const COPPER = "#c4835a";
const MUTED = "#a39d97";
const DIVIDER = "rgba(240, 235, 227, 0.18)";

export async function generateStaticParams() {
  const all = await loadInsights();
  return all.map((i) => ({ slug: i.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = await loadInsightBySlug(slug);

  const interBold = await readFile(
    join(process.cwd(), "assets/og/Inter-ExtraBold.ttf"),
  );
  const interMed = await readFile(
    join(process.cwd(), "assets/og/Inter-Medium.ttf"),
  );

  const title = insight?.title ?? "Insight";
  const subtitle = insight?.subtitle ?? "";
  const seriesMark = insight?.series
    ? `${insight.series.name} ${insight.series.volume}`
    : insight?.classification ?? "RESEARCH";
  const hasVolume = !!insight?.series;
  const volume = insight?.series?.volume ?? "";
  const author = insight?.author ?? "Next Consulting";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: VOID,
          padding: "56px 72px",
          fontFamily: "Inter",
          color: CREAM,
        }}
      >
        {/* Top frame: NEXT wordmark + classification */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            fontSize: 16,
            letterSpacing: 8,
            fontWeight: 500,
          }}
        >
          <span style={{ color: COPPER }}>NEXT · CONSULTING CORP.</span>
          <span style={{ color: MUTED }}>{seriesMark.toUpperCase()}</span>
        </div>

        {/* Volume + content block (volume only shown for series volumes) */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            gap: hasVolume ? 48 : 0,
            paddingTop: 32,
            paddingBottom: 24,
          }}
        >
          {hasVolume && (
            <div
              style={{
                fontSize: 220,
                fontWeight: 800,
                color: COPPER,
                lineHeight: 0.85,
                letterSpacing: -8,
                display: "flex",
                alignItems: "center",
              }}
            >
              {volume}
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: hasVolume
                  ? title.length > 40 ? 52 : 64
                  : title.length > 40 ? 64 : 80,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -1.5,
                color: CREAM,
                display: "flex",
                maxWidth: hasVolume ? 720 : 1000,
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div
                style={{
                  marginTop: 20,
                  fontSize: hasVolume ? 18 : 22,
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: "rgba(240, 235, 227, 0.7)",
                  lineHeight: 1.4,
                  display: "flex",
                  maxWidth: hasVolume ? 720 : 1000,
                }}
              >
                {subtitle.length > 140 ? subtitle.slice(0, 137) + "..." : subtitle}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 20,
            borderTop: `1px solid ${DIVIDER}`,
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          <span style={{ color: CREAM }}>{author}</span>
          <span
            style={{
              color: COPPER,
              letterSpacing: 6,
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
