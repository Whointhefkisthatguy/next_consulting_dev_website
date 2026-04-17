export default function SecondaryCTA() {
  return (
    <section className="px-6 sm:px-14 py-16 text-center" style={{ borderTop: "1px solid var(--divider)" }}>
      <p className="font-[var(--font-body)] italic text-sm text-[#8a8480]">
        Not ready to book?{" "}
        <a
          href="mailto:nextconsulting.ai@gmail.com"
          className="text-[#c4835a] hover:text-[#d4935a] not-italic tracking-wide"
        >
          Email me a question directly →
        </a>
      </p>
    </section>
  );
}
