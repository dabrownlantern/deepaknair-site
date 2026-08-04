import type { Metadata } from "next";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies } from "@/lib/caseStudies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies: building the creator ecosystem at Roblox, founding the DevRel org for Fortnite Creative, opening Meta Horizon's creator program, and publishing strategy for a licensed-IP slate at Nitrate Games.",
};

export default function WorkPage() {
  return (
    <>
      <section className="container-x pt-16 pb-12 md:pt-24">
        <p className="eyebrow">Selected work</p>
        <h1 className="mt-5 max-w-3xl font-display text-h1 text-paper md:text-display">
          Built creator ecosystems from zero.
        </h1>
        <p className="mt-6 max-w-2xl text-lead text-paper/70">
          Same structure each time, so they read as a body of work rather than
          anecdotes: the situation, what was actually broken, the system I
          built, the number, and how it transfers to your situation.
        </p>
      </section>

      <section className="rule-t">
        <div className="container-x py-12 md:py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudies.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
