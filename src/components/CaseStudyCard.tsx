import Link from "next/link";

type CaseStudyCardProps = {
  slug: string;
  title: string;
  service: string;
  result: string;
  image: string;
};

export default function CaseStudyCard({
  slug,
  title,
  service,
  result,
  image,
}: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${slug}`}
      className="group block bg-[var(--surface)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(196,131,90,0.08)]"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6 border-t-2 border-transparent transition-colors duration-300 group-hover:border-[var(--copper)]">
        <span className="font-[var(--font-body)] text-xs text-[var(--copper)] tracking-[0.1em] uppercase">
          {service}
        </span>
        <h3 className="mt-2 font-[var(--font-display)] text-lg font-600 text-[var(--cream)]">
          {title}
        </h3>
        <p className="mt-2 font-[var(--font-body)] text-sm text-[var(--muted)]">
          {result}
        </p>
      </div>
    </Link>
  );
}
