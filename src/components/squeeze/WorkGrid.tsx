import type { WorkSample } from "@/content/squeeze/types";
import Image from "next/image";

type Props = { samples: WorkSample[]; heading: string };

export default function WorkGrid({ samples, heading }: Props) {
  return (
    <section className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)" }}>
      <div className="max-w-[1300px] mx-auto">
        <h2 className="font-[var(--font-display)] text-2xl md:text-3xl font-700 text-[#f0ebe3] mb-16">
          {heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {samples.map((s, i) => (
            <figure key={i} className="group relative overflow-hidden">
              <div className="relative aspect-[4/3] bg-[#0f0f11]" style={{ border: "1px solid var(--divider-strong)" }}>
                <Image
                  src={s.image}
                  alt={s.status === "placeholder" ? `Mock: ${s.client} ${s.title}` : `${s.client} — ${s.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                {s.status === "placeholder" && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-[#070708]/80 border border-[#c4835a]/40 text-[10px] tracking-[0.15em] uppercase text-[#c4835a]">
                    Preview
                  </div>
                )}
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <div>
                  <div className="font-[var(--font-display)] text-sm text-[#f0ebe3]">{s.title}</div>
                  <div className="font-[var(--font-body)] text-xs text-[#8a8480] mt-1">{s.client}</div>
                </div>
                <div className="text-[10px] tracking-[0.1em] uppercase text-[#6b6560]">
                  {s.tags.join(" · ")}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
