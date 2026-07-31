import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="rule-t bg-surface">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="eyebrow">The next step</p>
            <p className="mt-4 max-w-md font-display text-h3 text-paper">
              Most engagements start with a 30-minute call and a specific
              problem.
            </p>
            <a href={site.bookingUrl} className="btn-primary mt-6">
              {site.bookingLabel}
            </a>
          </div>

          <div>
            <p className="meta">Site</p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="link-quiet">
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-quiet">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="meta">Contact</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={`mailto:${site.email}`} className="link-quiet">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.bookingUrl} className="link-quiet">
                  {site.bookingLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule-t mt-12 flex flex-col justify-between gap-2 pt-6 md:flex-row">
          <p className="meta">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="meta">Creator ecosystem strategy</p>
        </div>
      </div>
    </footer>
  );
}
