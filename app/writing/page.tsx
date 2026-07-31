import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Points of view on creator ecosystems, UGC platforms, and what makes creators stay.",
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="container-x pt-16 pb-12 md:pt-24">
        <p className="eyebrow">Writing</p>
        <h1 className="mt-5 max-w-3xl font-display text-h1 text-paper md:text-display">
          The surfaces that survive are the ones where users create.
        </h1>
        <p className="mt-6 max-w-2xl text-lead text-paper/70">
          Notes from a decade on the side of the business that decides whether
          creators actually succeed.
        </p>
      </section>

      <section className="rule-t">
        <div className="container-x py-8 md:py-12">
          {posts.length === 0 ? (
            <p className="text-lead text-paper/50">
              First posts are on the way.
            </p>
          ) : (
            <ul className="divide-y divide-rule">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/writing/${p.slug}`}
                    className="group grid gap-2 py-8 md:grid-cols-[10rem_1fr] md:gap-8"
                  >
                    <span className="meta md:pt-2">{formatDate(p.date)}</span>
                    <div>
                      <h2 className="font-display text-h3 text-paper transition-colors group-hover:text-signal">
                        {p.title}
                      </h2>
                      <p className="mt-2 max-w-2xl text-base text-paper/65">
                        {p.excerpt}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
