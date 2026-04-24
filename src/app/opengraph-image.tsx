import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Next Consulting · The Art of Engineered Profitability";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VOID = "#070708";
const CREAM = "#f0ebe3";
const COPPER = "#c4835a";
const MUTED = "#a39d97";
const DIVIDER = "rgba(240, 235, 227, 0.18)";

export default async function Image() {
  const interBold = await readFile(
    join(process.cwd(), "assets/og/Inter-ExtraBold.ttf"),
  );
  const interMed = await readFile(
    join(process.cwd(), "assets/og/Inter-Medium.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: VOID,
          padding: "72px 80px",
          position: "relative",
          fontFamily: "Inter",
          color: CREAM,
        }}
      >
        {/* Top corner mark */}
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
          <span>NEXT · CONSULTING</span>
          <span>PLATE 00</span>
        </div>

        {/* Center block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            paddingTop: 60,
            paddingBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: CREAM,
              maxWidth: 980,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Revenue Systems</span>
            <span>Architecture.</span>
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 28,
              fontWeight: 500,
              color: MUTED,
              maxWidth: 880,
              display: "flex",
            }}
          >
            We don&apos;t build websites. We install operating systems.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 28,
            borderTop: `1px solid ${DIVIDER}`,
            fontSize: 18,
            letterSpacing: 6,
            fontWeight: 500,
          }}
        >
          <span style={{ color: COPPER }}>
            THE ART OF ENGINEERED PROFITABILITY
          </span>
          <span style={{ color: MUTED }}>nextconsulting.dev</span>
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
