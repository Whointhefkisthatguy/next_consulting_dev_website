import type { ProcessStep } from "@/content/squeeze/types";

type Props = { steps: ProcessStep[]; heading?: string };

export default function Process({ steps, heading = "Process" }: Props) {
  return (
    <section className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)" }}>
      <div className="max-w-[1100px] mx-auto">
        {heading && (
          <h2 className="font-[var(--font-display)] text-2xl md:text-3xl font-700 text-[#f0ebe3] mb-16">
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map((step, i) => (
            <div key={i}>
              <span className="font-[var(--font-display)] text-sm font-700 text-[#c4835a]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-[var(--font-display)] text-base font-600 text-[#f0ebe3]">{step.title}</h3>
              <p className="mt-2 font-[var(--font-body)] text-sm leading-[1.7] text-[#8a8480]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
