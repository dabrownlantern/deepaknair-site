export type CaseStudy = {
  slug: string;
  org: string;
  title: string;
  // one-line summary for cards
  summary: string;
  // headline metric shown on the card
  metric: string;
  metricLabel: string;
  context: string;
  problem: string;
  whatIDid: string;
  outcome: string;
  whatTransfers: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "roblox",
    org: "Roblox",
    title: "Building the creator ecosystem that made the platform",
    summary:
      "Founding DevRel hire. Built the live events system from nothing and grew the creator base from a few hundred to 3M+.",
    metric: "3M+",
    metricLabel: "creators, from a few hundred",
    context:
      "Roblox had a nascent developer community and no dedicated function to grow, support, or recognize it. The platform's future depended on whether creators could actually succeed on it.",
    problem:
      "There was no system for discovery, no live events surface, no accelerator, and no owned relationships with the top studios. Creators had nowhere to be seen and little reason to stay.",
    whatIDid:
      "As the founding developer relations hire, I owned relationships with the top developers and studios, and built the live events system from scratch — the Bloxys and the Egg Hunts among them. I ran the accelerator that graduated studios into the mainstream.",
    outcome:
      "The creator base grew from a few hundred to more than 3 million. The live events system drove 500M+ plays. The accelerator graduated Adopt Me and Flee the Facility.",
    whatTransfers:
      "Discovery and early recognition are the retention strategy. Monetization only compounds what discovery makes possible. If your program is leaking creators, look at whether they can be seen before you look at whether they can be paid.",
  },
  {
    slug: "epic",
    org: "Epic Games",
    title: "Founding a DevRel org for the platform that became UEFN",
    summary:
      "Built the entire developer relations org for Fortnite Creative from zero to a team of 10, growing creators 10x.",
    metric: "10K → 100K",
    metricLabel: "creators",
    context:
      "Fortnite Creative was scaling into what would become UEFN. There was no developer relations organization to grow the creator side of it.",
    problem:
      "Growth was going to be capped by the absence of the systems that let creators succeed — economics education, moderation, analytics — and by the assumption that you scale an ecosystem by acquiring creators one at a time.",
    whatIDid:
      "I founded the DevRel org and built it from zero to a team of 10 (20 with contractors). I built creator-economics education, moderation, and analytics, and delivered brand integrations for Disney, Nike, and the NBA.",
    outcome:
      "Creators grew from 10K to 100K. The brand integrations shipped at 100% on-time.",
    whatTransfers:
      "An ecosystem scales through creator success, not through acquiring creators one at a time. Build the systems that make each creator more likely to win, and growth becomes a consequence rather than a target.",
  },
  {
    slug: "nitrate-games",
    org: "Nitrate Games",
    title: "Publishing strategy for a licensed-IP slate",
    summary:
      "VP Growth & Publishing Strategy on a licensed-IP slate, including the SDCC announce for Jay and Silent Bob's Joint Venture.",
    metric: "Current",
    metricLabel: "the shape of a consulting engagement",
    context:
      "A studio with a licensed-IP slate needed a go-to-market and publishing muscle it didn't yet have. This is current work, and it is the most relevant case to a prospective client because it is the exact shape of a consulting engagement.",
    problem:
      "A slate needs decisions made months before launch: positioning, audience, channels, community, and a realistic wishlist forecast. Without that, a launch becomes a marketing push at the end rather than a system of decisions made early.",
    whatIDid:
      "I built the GTM one-sheeter, a two-game marketing strategy, originals slate tiering, a TikTok/Shorts strategy, a Discord community plan, and a wishlist forecast — and led the San Diego Comic-Con announce for Jay and Silent Bob's Joint Venture.",
    outcome:
      "A licensed-IP slate with a coherent publishing strategy and a public SDCC announce, executed as a fractional engagement rather than a full-time hire.",
    whatTransfers:
      "A launch is a system of decisions made months early, not a marketing push at the end. The studios that win the launch window decided how they'd win it a quarter before anyone saw a trailer.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
