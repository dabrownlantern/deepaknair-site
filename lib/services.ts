export type Service = {
  slug: string;
  name: string;
  for: string;
  length: string;
  youGet: string;
  investment: string;
  // which home "problem" this service answers
  problem: string;
};

export const services: Service[] = [
  {
    slug: "ecosystem-audit",
    name: "Ecosystem Audit",
    for: "Platforms with a creator program that isn't compounding.",
    length: "2–3 weeks",
    youGet:
      "Diagnostic across discovery, onboarding, retention, and monetization. Ranked roadmap. Exec-ready readout.",
    investment: "from $15K",
    problem:
      "Your creator program isn't retaining. You launched, you got a spike, the middle class of creators never formed.",
  },
  {
    slug: "launch-gtm-strategy",
    name: "Launch & GTM Strategy",
    for: "Studios shipping a title or brands entering UGC.",
    length: "4–6 weeks",
    youGet:
      "Positioning, audience tiering, creator seeding plan, channel strategy, community architecture, and a forecast model.",
    investment: "Let's talk",
    problem:
      "You're entering UGC and don't know where to start. Roblox, Fortnite, or neither. Owned world or integration. Which creators, which studios, what budget.",
  },
  {
    slug: "game-launch-advisory",
    name: "Game Launch & Publishing Advisory",
    for: "Studios shipping to Steam or console without a publishing function in-house.",
    length: "8–12 weeks, through the launch window",
    youGet:
      "GTM one-sheeter, wishlist forecast, Next Fest strategy, creator seeding plan, and a Discord/TikTok community plan — built and run through launch, not handed off in a deck.",
    investment: "from $20K",
    problem:
      "You're weeks from a Steam or console launch with no publishing muscle. Wishlists, Next Fest, creator seeding, launch window — all still undecided this late.",
  },
  {
    slug: "fractional-creator-lead",
    name: "Fractional Creator Lead",
    for: "Teams that need the creator or community function owned, not advised.",
    length: "Ongoing, 1–2 days/week",
    youGet:
      "Own the creator and community function end to end, embedded on your team. Strategy plus execution.",
    investment: "Let's talk",
    problem:
      "You need someone accountable for the creator or community number every week — not a deck delivered once and left behind.",
  },
];
