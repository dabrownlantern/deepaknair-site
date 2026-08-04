import Link from "next/link";
import type { Service } from "@/lib/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group flex flex-col border border-rule bg-surface/90 p-6 transition-colors hover:border-signal/50"
    >
      <p className="eyebrow">{service.investment}</p>
      <h3 className="mt-3 font-display text-h3 text-paper">{service.name}</h3>
      <p className="mt-2 text-base text-paper/60">{service.for}</p>
      <p className="mt-4 flex-1 text-base text-paper/80">{service.youGet}</p>
      <div className="rule-t mt-6 flex items-center justify-between pt-4">
        <span className="meta">{service.length}</span>
        <span className="font-mono text-label uppercase tracking-[0.1em] text-signal transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
