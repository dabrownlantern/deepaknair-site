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
    investment: "from $25K",
    problem:
      "You're entering UGC and don't know where to start. Roblox, Fortnite, or neither. Owned world or integration. Which creators, which studios, what budget.",
  },
  {
    slug: "fractional-creator-lead",
    name: "Fractional Creator Lead",
    for: "Teams that need the function owned, not advised.",
    length: "Ongoing, 1–2 days/week",
    youGet:
      "Own the creator and community function end to end. Strategy plus execution.",
    investment: "from $8K/month",
    problem:
      "You're shipping to Steam without a publishing muscle. Wishlists, Next Fest, creator seeding, launch window.",
  },
];
