import StartProjectForm from "@/components/StartProjectForm";

export const metadata = {
  title: "Contact — Next Consulting",
  description:
    "Tell us about your project. We'll reach out by email or SMS within one business day.",
};

export default function ContactPage() {
  return (
    <section className="pt-40 pb-32 px-6 sm:px-14">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <h1
            className="font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em]"
            style={{ color: "#f0ebe3" }}
          >
            Contact
          </h1>
          <p
            className="mt-6 font-[var(--font-body)] italic text-base max-w-md"
            style={{ color: "rgba(240,235,227,0.55)" }}
          >
            &ldquo;The single biggest problem in communication is the illusion that it has taken place.&rdquo;
            <span
              className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase"
              style={{ color: "#6b6560" }}
            >
              &mdash; George Bernard Shaw
            </span>
          </p>
          <p
            className="mt-10 font-[var(--font-body)] text-[15px] leading-[1.8] max-w-md"
            style={{ color: "rgba(240,235,227,0.75)" }}
          >
            Tell us about your project. We&rsquo;ll reach out by email or SMS within one business day with honest next steps — no pitch deck, no discovery theater.
          </p>
        </div>

        <div>
          <StartProjectForm service="general" submitLabel="Send it over" />
        </div>
      </div>
    </section>
  );
}
