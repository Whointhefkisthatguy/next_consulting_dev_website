import type { TierLabel } from "@/content/squeeze/types";

const STYLES: Record<TierLabel, string> = {
  Realized:
    "bg-[var(--copper)] text-[var(--void)] border border-[var(--copper)]",
  "In-Flight":
    "bg-transparent text-[var(--copper)] border border-[var(--copper)]",
  Thesis:
    "bg-transparent text-[var(--cream)] border border-[rgba(240,235,227,0.35)]",
};

type Props = {
  tier: 1 | 2 | 3;
  label: TierLabel;
};

export default function TierPill({ tier, label }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 font-mono text-[10px] tracking-[0.25em] uppercase ${STYLES[label]}`}
    >
      <span>Tier {tier}</span>
      <span aria-hidden="true">·</span>
      <span>{label}</span>
    </span>
  );
}
