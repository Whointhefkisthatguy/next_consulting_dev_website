import { positioning } from "@/content/site/positioning";

export default function CategoryClaim() {
  const [lead, tail] = positioning.categoryClaim.split("—").map((s) => s.trim());
  return (
    <section
      className="py-20 px-6 sm:px-14"
      style={{ borderTop: "1px solid var(--divider)" }}
    >
      <div className="max-w-[900px] mx-auto text-center">
        <p
          className="font-[var(--font-display)] font-700 text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.25] tracking-[-0.01em]"
          style={{ color: "var(--cream)" }}
        >
          {lead}
          <span style={{ color: "var(--copper)" }}> — </span>
          <em className="italic" style={{ color: "rgba(240,235,227,0.65)" }}>
            {tail}
          </em>
        </p>
      </div>
    </section>
  );
}
