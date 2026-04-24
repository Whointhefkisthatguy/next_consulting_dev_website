import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { loadCaseStudies, loadCaseStudyBySlug } from "@/lib/case-studies";
import type { TierLabel } from "@/content/squeeze/types";

export const alt = "Next Consulting · Case Study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VOID = "#070708";
const CREAM = "#f0ebe3";
const COPPER = "#c4835a";
const MUTED = "#a39d97";
const DIVIDER = "rgba(240, 235, 227, 0.18)";

export async function generateStaticParams() {
  const all = await loadCaseStudies();
  return all.map((s) => ({ slug: s.slug }));
}

type TierStyle = { bg: string; fg: string; border: string };
const TIER_STYLES: Record<TierLabel, TierStyle> = {
  Realized: { bg: COPPER, fg: VOID, border: COPPER },
  "In-Flight": { bg: "transparent", fg: COPPER, border: COPPER },
  Thesis: {
    bg: "transparent",
    fg: CREAM,
    border: "rgba(240, 235, 227, 0.4)",
  },
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await loadCaseStudyBySlug(slug);

  const interBold = await readFile(
    join(process.cwd(), "assets/og/Inter-ExtraBold.ttf"),
  );
  const interMed = await readFile(
    join(process.cwd(), "assets/og/Inter-Medium.ttf"),
  );

  const title = cs?.title ?? "Case Study";
  const plate = cs?.plate ?? "—";
  const tierLabel: TierLabel = cs?.tierLabel ?? "Realized";
  const tier = cs?.tier ?? 1;
  const industry = cs?.industry ?? "";
  const engagement = cs?.engagement ?? "";
  const description = cs?.description ?? cs?.thesis ?? "";

  const tierStyle = TIER_STYLES[tierLabel];

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
        {/* Drafting-plate corner: PLATE marker top-left, NEXT wordmark top-right */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            color: COPPER,
            fontSize: 18,
            letterSpacing: 8,
            fontWeight: 500,
          }}
        >
          <span>PLATE {plate} · CASE STUDY</span>
          <span style={{ color: MUTED }}>NEXT · CONSULTING</span>
        </div>

        {/* Title + meta block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            paddingTop: 40,
            paddingBottom: 32,
          }}
        >
          <div
            style={{
              fontSize: title.length > 28 ? 70 : 88,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: -2,
              color: CREAM,
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                marginTop: 28,
                fontSize: 24,
                fontWeight: 500,
                color: "rgba(240, 235, 227, 0.72)",
                maxWidth: 940,
                lineHeight: 1.35,
                display: "flex",
              }}
            >
              {description}
            </div>
          )}
        </div>

        {/* Footer: Tier pill on left, industry/engagement on right */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: `1px solid ${DIVIDER}`,
          }}
        >
          {/* Tier pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 16px",
              background: tierStyle.bg,
              color: tierStyle.fg,
              border: `1px solid ${tierStyle.border}`,
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: 6,
            }}
          >
            <span>TIER {tier}</span>
            <span>·</span>
            <span>{tierLabel.toUpperCase()}</span>
          </div>

          {/* Industry · Engagement */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              fontSize: 18,
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            <span style={{ color: CREAM }}>{industry}</span>
            <span style={{ color: MUTED, marginTop: 4 }}>{engagement}</span>
          </div>
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
