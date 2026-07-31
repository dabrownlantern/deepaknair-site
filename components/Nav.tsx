import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-ink/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-tight text-paper">
            {site.name}
          </span>
          <span className="mt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper/45">
            {site.role}
          </span>
        </Link>

        <nav className="flex items-center gap-6 md:gap-8">
          <ul className="hidden items-center gap-6 md:flex md:gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-quiet font-mono text-label uppercase tracking-[0.1em]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={site.bookingUrl} className="btn-primary">
            {site.bookingLabel}
          </a>
        </nav>
      </div>
    </header>
  );
}
