import StartProjectForm from "@/components/StartProjectForm";
import type { ServiceSlug, StartProjectBlock } from "@/content/squeeze/types";

type Props = {
  service: ServiceSlug;
  block: StartProjectBlock;
};

export default function StartProjectSection({ service, block }: Props) {
  return (
    <section
      id="offer"
      className="px-6 sm:px-14 py-28"
      style={{ borderTop: "1px solid var(--divider)" }}
    >
      <div
        className="max-w-[900px] mx-auto p-8 sm:p-12 md:p-14"
        style={{
          border: "1px solid var(--divider-accent)",
          background:
            "linear-gradient(180deg, rgba(196,131,90,0.03), rgba(196,131,90,0.00) 70%)",
        }}
      >
        <div className="text-xs tracking-[0.2em] uppercase text-[#c4835a] font-[var(--font-body)]">
          Start your project
        </div>
        <h2 className="mt-5 font-[var(--font-display)] font-700 text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.2] text-[#f0ebe3]">
          {block.headline}
        </h2>
        {block.subhead && (
          <p className="mt-4 font-[var(--font-body)] text-base leading-[1.7] text-[#a39d97] max-w-[640px]">
            {block.subhead}
          </p>
        )}

        <div className="mt-10">
          <StartProjectForm service={service} submitLabel={block.submitLabel} />
        </div>
      </div>
    </section>
  );
}
