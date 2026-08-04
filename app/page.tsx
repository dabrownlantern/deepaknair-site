import Link from "next/link";
import EcosystemNetwork, {
  type ClusterLabel,
} from "@/components/EcosystemNetwork";
import NewsletterSignup from "@/components/NewsletterSignup";
import ServiceCard from "@/components/ServiceCard";
import CaseStudyCard from "@/components/CaseStudyCard";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/caseStudies";
import { getAllPosts, formatDate } from "@/lib/posts";
import { site, proof } from "@/lib/site";

// Order must match the PALETTE array in EcosystemNetwork.tsx so each
// cluster's color visually matches the case-study card of the same name.
// `href` makes a cluster clickable → navigates to the case study.
const heroClusters: ClusterLabel[] = [
  {
    name: "Roblox",
    metric: "few hundred → 3M+ creators — click to read",
    href: "/work/roblox",
  },
  {
    name: "Fortnite Creative",
    metric: "10K → 100K creators — click to read",
    href: "/work/epic",
  },
  {
    name: "Meta Horizon",
    metric: "2K → 20K creators — click to read",
    href: "/work/meta-horizon",
  },
  {
    name: "Nitrate Games",
    metric: "SDCC announce, fractional VP — click to read",
    href: "/work/nitrate-games",
  },
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* A. Hero */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow">Creator ecosystem strategy</p>
              <h1 className="mt-5 font-display text-h1 font-semibold text-paper md:text-display">
                I build creator ecosystems from{" "}
                <span className="text-signal">zero</span>.
              </h1>
              <p className="mt-6 max-w-lg text-lead text-paper/70">
                Three times, at the largest UGC platforms in the world —
                built, not theorized. Now for studios, platforms, brands, and
                media companies building the same thing.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={site.bookingUrl} className="btn-primary">
                  {site.bookingLabel}
                </a>
                <Link href="/work" className="btn-secondary">
                  See the work
                </Link>
              </div>
            </div>

            <div className="relative border border-rule bg-surface/60 p-6 md:p-8">
              <div className="relative aspect-[5/4] w-full">
                <EcosystemNetwork labels={heroClusters} />
              </div>
              <p className="mt-3 font-mono text-label uppercase tracking-[0.1em] text-paper/50">
                Hover a cluster for the metric. Click to open the case study.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* B. The problem, named */}
      <section className="rule-t bg-surface/40">
        <div className="container-x py-16 md:py-20">
          <p className="eyebrow">Where it breaks</p>
          <h2 className="mt-4 max-w-2xl font-display text-h2 text-paper">
            Most creator programs don&apos;t fail at launch. They fail three
            months later.
          </h2>
          <p className="mt-4 max-w-2xl text-lead text-paper/60">
            The pricing is on the next screen. First, the math of what
            it&apos;s worth to fix.
          </p>
          <div className="mt-12 grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services#${s.slug}`}
                className="group flex flex-col bg-ink p-6 transition-colors hover:bg-surface"
              >
                <span className="font-mono text-label uppercase tracking-[0.1em] text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-lead text-paper/85">{s.problem}</p>
                <p className="mt-4 flex-1 border-l-2 border-signal/60 pl-3 text-base text-paper/70">
                  {s.costOfAlternative}
                </p>
                <span className="mt-6 font-mono text-label uppercase tracking-[0.1em] text-paper/50 transition-colors group-hover:text-signal">
                  {s.name} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* C. Services */}
      <section className="rule-t">
        <div className="container-x py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">What you buy</p>
              <h2 className="mt-4 font-display text-h2 text-paper">
                Four products. Named, scoped, priced.
              </h2>
            </div>
            <Link href="/services" className="link-quiet font-mono text-label uppercase tracking-[0.1em]">
              All services →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* D. Proof strip */}
      <section className="rule-t bg-surface/40">
        <div className="container-x py-12">
          <p className="meta">Where I&apos;ve worked</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            {proof.map((name) => (
              <span
                key={name}
                className="font-display text-h3 font-medium text-paper/70"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* E. Selected work */}
      <section className="rule-t">
        <div className="container-x py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="mt-4 font-display text-h2 text-paper">
                Same shape, every time, on purpose.
              </h2>
            </div>
            <Link href="/work" className="link-quiet font-mono text-label uppercase tracking-[0.1em]">
              All case studies →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudies.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
        </div>
      </section>

      {/* F. Writing (only shown when posts exist) */}
      {posts.length > 0 && (
        <section className="rule-t bg-surface/40">
          <div className="container-x py-16 md:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Writing</p>
                <h2 className="mt-4 font-display text-h2 text-paper">
                  Notes on building the surfaces that survive.
                </h2>
              </div>
              <Link href="/writing" className="link-quiet font-mono text-label uppercase tracking-[0.1em]">
                All writing →
              </Link>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/writing/${p.slug}`}
                  className="group flex flex-col bg-ink p-6 transition-colors hover:bg-surface"
                >
                  <span className="meta">{formatDate(p.date)}</span>
                  <h3 className="mt-4 flex-1 font-display text-h3 leading-tight text-paper">
                    {p.title}
                  </h3>
                  <span className="mt-6 font-mono text-label uppercase tracking-[0.1em] text-signal">
                    Read →
                  </span>
                </Link>
              ))}
            </div>
            <div className="mx-auto mt-10 max-w-xl">
              <NewsletterSignup />
            </div>
          </div>
        </section>
      )}

      {/* G. Close */}
      <section className="rule-t">
        <div className="container-x py-20 text-center md:py-28">
          <p className="eyebrow">Start here</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-h1 text-paper">
            Most engagements start with a 30-minute call and a specific problem.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lead text-paper/60">
            Bring the messy version, that&apos;s the useful one.
          </p>
          <a href={site.bookingUrl} className="btn-primary mt-8">
            {site.bookingLabel}
          </a>
        </div>
      </section>
    </>
  );
}
