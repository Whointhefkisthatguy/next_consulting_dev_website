import Link from "next/link";

export default function SecondaryCTA() {
  return (
    <section
      className="px-6 sm:px-14 py-16 text-center"
      style={{ borderTop: "1px solid var(--divider)" }}
    >
      <p className="font-[var(--font-body)] italic text-sm text-[#8a8480]">
        Not a fit for this service?{" "}
        <Link
          href="/contact"
          className="text-[#c4835a] hover:text-[#d4935a] not-italic tracking-wide"
        >
          Tell us what you&rsquo;re working on &rarr;
        </Link>
      </p>
    </section>
  );
}
