import type { Metadata } from "next";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four products: Ecosystem Audit, Launch & GTM Strategy, Game Launch & Publishing Advisory, and Fractional Creator Lead. Named, scoped, and priced.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="container-x pt-16 pb-12 md:pt-24">
        <p className="eyebrow">Services</p>
        <h1 className="mt-5 max-w-3xl font-display text-h1 text-paper md:text-display">
          What you buy, and how the work runs.
        </h1>
        <p className="mt-6 max-w-2xl text-lead text-paper/70">
          Most creator programs don&apos;t fail at launch. They fail three
          months later, when the middle class of creators never forms and the
          top ten do all the volume. That&apos;s a systems problem, and it&apos;s
          the one I solve.
        </p>
      </section>

      {/* Detailed service blocks */}
      <section className="rule-t">
        <div className="container-x divide-y divide-rule">
          {services.map((s, i) => (
            <div
              key={s.slug}
              id={s.slug}
              className="grid scroll-mt-24 gap-8 py-12 md:grid-cols-[0.9fr_1.1fr] md:py-16"
            >
              <div>
                <span className="font-mono text-label uppercase tracking-[0.1em] text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 font-display text-h2 text-paper">
                  {s.name}
                </h2>
                <p className="mt-3 text-lead text-paper/70">{s.for}</p>
              </div>

              <div className="grid gap-6">
                <div className="grid grid-cols-[8rem_1fr] gap-4 border-t border-rule pt-4">
                  <span className="meta">Length</span>
                  <span className="text-base text-paper/85">{s.length}</span>
                </div>
                <div className="grid grid-cols-[8rem_1fr] gap-4 border-t border-rule pt-4">
                  <span className="meta">You get</span>
                  <span className="text-base text-paper/85">{s.youGet}</span>
                </div>
                <div className="grid grid-cols-[8rem_1fr] gap-4 border-t border-rule pt-4">
                  <span className="meta">Investment</span>
                  <span className="font-display text-h3 text-signal">
                    {s.investment}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Price anchoring line */}
      <section className="rule-t bg-surface/40">
        <div className="container-x py-16 md:py-20">
          <p className="mx-auto max-w-3xl text-center font-display text-h2 text-paper">
            Engagements start at $15K. If your problem is smaller than that, tell
            me anyway and I&apos;ll point you somewhere useful.
          </p>
          <div className="mt-10 flex justify-center">
            <a href={site.bookingUrl} className="btn-primary">
              {site.bookingLabel}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
