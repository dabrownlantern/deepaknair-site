import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article className="container-x max-w-3xl pt-16 pb-16 md:pt-24">
        <Link
          href="/writing"
          className="link-quiet font-mono text-label uppercase tracking-[0.1em]"
        >
          ← All writing
        </Link>
        <p className="meta mt-8">{formatDate(post.date)}</p>
        <h1 className="mt-4 font-display text-h1 text-paper">{post.title}</h1>

        <div
          className="prose-deepak mt-10"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="rule-t mt-12 pt-8">
          <p className="text-lead text-paper/85">
            I help studios and platforms build this.{" "}
            <a href={site.bookingUrl} className="text-signal underline underline-offset-4">
              Work with me →
            </a>
          </p>
        </div>
      </article>
    </>
  );
}
