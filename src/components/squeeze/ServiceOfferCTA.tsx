import type { ServiceOffer } from "@/content/squeeze/types";

type Props = { offer: ServiceOffer };

export default function ServiceOfferCTA({ offer }: Props) {
  return (
    <section id="offer" className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)" }}>
      <div
        className="max-w-[900px] mx-auto p-10 md:p-14"
        style={{
          border: "1px solid var(--divider-accent)",
          background: "linear-gradient(180deg, rgba(196,131,90,0.03), rgba(196,131,90,0.00) 70%)",
        }}
      >
        <div className="text-xs tracking-[0.2em] uppercase text-[#c4835a] font-[var(--font-body)]">
          {offer.name}
        </div>
        <p className="mt-5 font-[var(--font-display)] text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.25] text-[#f0ebe3]">
          {offer.durationMinutes}-minute call. I&rsquo;ll walk through your situation against the same checklist I use for clients.
        </p>
        <div className="mt-8 text-sm tracking-[0.08em] uppercase text-[#8a8480] font-[var(--font-body)]">
          You&rsquo;ll leave with
        </div>
        <ul className="mt-4 space-y-3">
          {offer.bullets.map((b, i) => (
            <li key={i} className="flex gap-4 text-[15px] leading-[1.6] text-[#f0ebe3]/90 font-[var(--font-body)]">
              <span className="text-[#c4835a] shrink-0">→</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <a
          href={offer.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block px-8 py-4 bg-[#c4835a] hover:bg-[#d4935a] text-[#070708] font-[var(--font-body)] text-sm tracking-[0.15em] uppercase transition-colors"
        >
          {offer.buttonLabel}
        </a>
      </div>
    </section>
  );
}
