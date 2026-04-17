type Props = { text: string; kicker?: string };

export default function Promise({ text, kicker }: Props) {
  return (
    <section className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)" }}>
      <div className="max-w-[900px]">
        {kicker && (
          <div className="text-xs tracking-[0.2em] uppercase text-[#8a8480] mb-6 font-[var(--font-body)]">
            {kicker}
          </div>
        )}
        <p className="font-[var(--font-display)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.2] tracking-[-0.01em] text-[#f0ebe3]">
          {text}
        </p>
      </div>
    </section>
  );
}
