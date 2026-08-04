import Link from "next/link";
import type { CaseStudy } from "@/lib/caseStudies";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group relative flex flex-col border border-rule bg-surface p-6 transition-colors"
      style={{ borderTopColor: study.clusterColor, borderTopWidth: "3px" }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <p
          className="font-mono text-label uppercase tracking-[0.12em]"
          style={{ color: study.clusterColor }}
        >
          {study.org}
        </p>
        <span
          className="font-mono text-label uppercase tracking-[0.1em] text-paper/40 transition-transform group-hover:translate-x-1"
          style={{ color: study.clusterColor }}
        >
          →
        </span>
      </div>
      <div className="mt-6">
        <p
          className="font-display text-h2"
          style={{ color: study.clusterColor }}
        >
          {study.metric}
        </p>
        <p className="mt-1 meta">{study.metricLabel}</p>
      </div>
      <h3 className="mt-6 font-display text-h3 leading-tight text-paper">
        {study.title}
      </h3>
      <p className="mt-3 flex-1 text-base text-paper/70">{study.summary}</p>
    </Link>
  );
}
