import Link from "next/link";
import type { Service } from "@/lib/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group flex flex-col border border-rule bg-surface p-6 transition-colors hover:border-signal/50"
    >
      <p className="eyebrow">{service.length}</p>
      <h3 className="mt-3 font-display text-h3 text-paper">{service.name}</h3>
      <p className="mt-2 text-base text-paper/60">{service.for}</p>
      <p className="mt-5 flex-1 border-l-2 border-signal/60 pl-3 text-base text-paper/85">
        {service.value}
      </p>
      <div className="rule-t mt-6 flex items-center justify-between pt-4">
        <span className="meta">{service.youGet.split(".")[0]}.</span>
        <span className="font-mono text-label uppercase tracking-[0.1em] text-signal transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
