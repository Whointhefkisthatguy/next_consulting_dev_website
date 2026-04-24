type Props = { numeral: string; label: string };

export default function RomanSection({ numeral, label }: Props) {
  return (
    <h2 className="font-mono text-xs tracking-[0.25em] uppercase text-[#c4835a] mb-12">
      <span className="mr-3 text-[#f0ebe3]">{numeral}.</span>
      {label}
    </h2>
  );
}
