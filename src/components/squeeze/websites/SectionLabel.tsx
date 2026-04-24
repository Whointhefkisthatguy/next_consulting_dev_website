type Props = { number: string; label: string };

export default function SectionLabel({ number, label }: Props) {
  return (
    <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] mb-10">
      § {number} · {label}
    </div>
  );
}
