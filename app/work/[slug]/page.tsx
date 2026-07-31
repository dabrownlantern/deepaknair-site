import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.org} — ${study.title}`,
    description: study.summary,
  };
}

const sections: { key: keyof CaseStudyText; label: string }[] = [
  { key: "context", label: "Context" },
  { key: "problem", label: "The problem" },
  { key: "whatIDid", label: "What I did" },
  { key: "outcome", label: "Outcome" },
  { key: "whatTransfers", label: "What transfers" },
];

type CaseStudyText = {
  context: string;
  problem: string;
  whatIDid: string;
  outcome: string;
  whatTransfers: string;
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <section className="container-x pt-16 pb-12 md:pt-24">
        <Link
          href="/work"
          className="link-quiet font-mono text-label uppercase tracking-[0.1em]"
        >
          ← All work
        </Link>
        <p className="eyebrow mt-8">{study.org}</p>
        <h1 className="mt-4 max-w-3xl font-display text-h1 text-paper">
          {study.title}
        </h1>
        <div className="mt-8 flex items-baseline gap-4 border-t border-rule pt-6">
          <span className="font-display text-display text-signal">
            {study.metric}
          </span>
          <span className="meta">{study.metricLabel}</span>
        </div>
      </section>

      <section className="rule-t">
        <div className="container-x max-w-3xl divide-y divide-rule">
          {sections.map((sec) => (
            <div key={sec.key} className="grid gap-3 py-10 md:grid-cols-[8rem_1fr] md:gap-8">
              <p className="meta md:pt-1">{sec.label}</p>
              <p className="text-lead text-paper/85">{study[sec.key]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rule-t">
        <div className="container-x py-16 text-center md:py-20">
          <p className="mx-auto max-w-2xl font-display text-h2 text-paper">
            Have a version of this problem? Bring the messy version.
          </p>
          <a href={site.bookingUrl} className="btn-primary mt-8">
            {site.bookingLabel}
          </a>
        </div>
      </section>
    </>
  );
}
