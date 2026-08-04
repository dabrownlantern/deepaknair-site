import { site } from "@/lib/site";

// Substack's embeddable subscribe widget. It renders its own white input +
// button (Substack doesn't expose a themable, cross-origin form), so this
// is wrapped in a card that matches the site instead of trying to reskin
// the iframe's internals.
export default function NewsletterSignup() {
  return (
    <div className="border border-rule bg-surface/90 p-6 md:p-8">
      <p className="eyebrow">Get new posts by email</p>
      <h3 className="mt-3 font-display text-h3 text-paper">
        No spam, no drip sequence. Just the next post when it's ready.
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
