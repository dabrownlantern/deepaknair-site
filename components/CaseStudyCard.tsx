import Link from "next/link";
import type { CaseStudy } from "@/lib/caseStudies";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group flex flex-col border border-rule bg-surface/90 p-6 transition-colors hover:border-signal/50"
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow">{study.org}</p>
        <span className="font-mono text-label uppercase tracking-[0.1em] text-paper/40 transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
      <div className="mt-6">
        <p className="font-display text-h2 text-signal">{study.metric}</p>
        <p className="mt-1 meta">{study.metricLabel}</p>
      </div>
      <h3 className="mt-6 font-display text-h3 leading-tight text-paper">
        {study.title}
      </h3>
      <p className="mt-3 flex-1 text-base text-paper/70">{study.summary}</p>
    </Link>
  );
}
