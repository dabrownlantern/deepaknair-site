import { site } from "@/lib/site";

// Substack's embeddable subscribe widget. It renders its own white input +
// button (Substack doesn't expose a themable, cross-origin form), so this
// is wrapped in a card that matches the site instead of trying to reskin
// the iframe's internals.
export default function NewsletterSignup() {
  return (
    <div className="border border-rule bg-surface p-6 md:p-8">
      <p className="eyebrow">Compounding — the newsletter</p>
      <h3 className="mt-3 font-display text-h3 text-paper">
        Notes on building creator programs that compound. Every 2–3 weeks.
      </h3>
      <div className="mt-5 overflow-hidden rounded">
        <iframe
          src={`${site.newsletterUrl}/embed`}
          width="100%"
          height="150"
          style={{ background: "transparent", border: "none" }}
          title="Subscribe to the newsletter"
        />
      </div>
    </div>
  );
}
