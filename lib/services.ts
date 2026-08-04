export type Service = {
  slug: string;
  name: string;
  for: string;
  length: string;
  youGet: string;
  // The outcome/savings framing shown prominently on both the home service
  // card and the /services detail page. Answers "what does this save me"
  // rather than "what does this cost me" — matches how Naavik / Deconstructor
  // of Fun / GameDiscoverCo position their consulting.
  value: string;
  // which home "problem" this service answers
  problem: string;
  // The "cost of the alternative" line shown under the problem on the home page,
  // paired with the value line for a "what you avoid | what you get" story.
  costOfAlternative: string;
};

export const services: Service[] = [
  {
    slug: "ecosystem-audit",
    name: "Ecosystem Audit",
    for: "Platforms with a creator program that isn't compounding.",
    length: "2–3 weeks",
    youGet:
      "Diagnostic across discovery, onboarding, retention, and monetization. Ranked roadmap. Exec-ready readout.",
    value:
      "Know what's actually broken before you spend a year — and a VP hire — trying to fix it.",
    problem:
      "Your creator program isn't retaining. You launched, you got a spike, the middle class of creators never formed.",
    costOfAlternative:
      "A wrong VP Creator hire runs $300K salary + 9 months to detect. An audit takes 3 weeks.",
  },
  {
    slug: "launch-gtm-strategy",
    name: "Launch & GTM Strategy",
    for: "Studios shipping a title or brands entering UGC.",
    length: "4–6 weeks",
    youGet:
      "Positioning, audience tiering, creator seeding plan, channel strategy, community architecture, and a forecast model.",
    value:
      "Enter the right platform, with the right creators, and a budget that has a defensible forecast behind it.",
    problem:
      "You're entering UGC and don't know where to start. Roblox, Fortnite, or neither. Owned world or integration. Which creators, which studios, what budget.",
    costOfAlternative:
      "A wrong platform bet burns $500K+ in build time before you know it's wrong.",
  },
  {
    slug: "game-launch-advisory",
    name: "Game Launch & Publishing Advisory",
    for: "Studios shipping to Steam or console without a publishing function in-house.",
    length: "8–12 weeks, through the launch window",
    youGet:
      "GTM one-sheeter, wishlist forecast, Next Fest strategy, creator seeding plan, and a Discord/TikTok community plan — built and run through launch, not handed off in a deck.",
    value:
      "Ship into a launch window that actually converts wishlists — instead of watching it pass because nobody owned the plan.",
    problem:
      "You're weeks from a Steam or console launch with no publishing muscle. Wishlists, Next Fest, creator seeding, launch window — all still undecided this late.",
    costOfAlternative:
      "The median indie makes 80%+ of lifetime revenue in the first 30 days. Miss that window, you don't get it back.",
  },
  {
    slug: "fractional-creator-lead",
    name: "Fractional Creator Lead",
    for: "Teams that need the creator or community function owned, not advised.",
    length: "Ongoing, 1–2 days/week",
    youGet:
      "Own the creator and community function end to end, embedded on your team. Strategy plus execution.",
    value:
      "Exec-level ownership of the creator function from week one — no ramp, no learning-curve tax, no headcount commitment.",
    problem:
      "You need someone accountable for the creator or community number every week — not a deck delivered once and left behind.",
    costOfAlternative:
      "A full-time creator lead is $200K+ salary and equity, plus 6 months to ramp. Fractional starts producing week one.",
  },
];
