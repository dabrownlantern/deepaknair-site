# Deepak Nair — Consulting Site

Creator ecosystem strategy. A Next.js (App Router) site built to turn a warm
conversation into a paid engagement.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

Build for production:

```bash
npm run build
npm start
```

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS 3.4** — design tokens in `tailwind.config.ts`
- **Fonts** — Bricolage Grotesque (display), Instrument Sans (body),
  JetBrains Mono (utility), loaded via `next/font/google`
- **Writing** — markdown files in `content/writing/`, parsed with
  `gray-matter` + `marked`

## Project structure

```
app/
  layout.tsx            root layout, fonts, nav + footer
  page.tsx              home (hero + growth curves, problems, services, work)
  services/page.tsx     services + pricing
  work/page.tsx         case study index
  work/[slug]/page.tsx  case study detail
  writing/page.tsx      writing index
  writing/[slug]/page.tsx  post detail
  globals.css           base styles, component classes, article typography
components/
  Nav.tsx, Footer.tsx
  GrowthCurves.tsx      the signature three-curve animated SVG
  ServiceCard.tsx, CaseStudyCard.tsx
lib/
  site.ts               name, tagline, booking URL, nav, proof logos
  services.ts           the three products + pricing
  caseStudies.ts        the three case studies
  posts.ts              markdown loader for /writing
content/
  writing/*.md          blog posts (frontmatter: title, date, excerpt)
```

## Things to wire up before going live

1. **Booking link.** `lib/site.ts` → `bookingUrl` is a placeholder (`#book`).
   Replace it with your Cal.com link, e.g. `https://cal.com/deepaknair/30min`.
2. **Contact email.** `lib/site.ts` → `email`.
3. **Permissions.** Case 3 (Nitrate / Jay and Silent Bob's Joint Venture) and
   any client logos need written permission before this is public. All three
   case studies are currently included.
4. **Domain.** Metadata assumes `deepaknair.com` (`lib/site.ts` → `domain`).
5. **Newsletter.** `lib/site.ts` → `newsletterUrl` is a placeholder
   (`https://deepaknair.substack.com`). Replace it with your real Substack
   URL once the publication exists — until then the embed on `/writing` and
   the homepage will 404.

## Adding a writing post

Drop a new markdown file into `content/writing/`:

```markdown
---
title: "Your title"
date: "2026-08-01"
excerpt: "One or two sentences for the index and meta description."
---

Body in markdown.
```

It appears automatically on `/writing` and, if it's one of the three most
recent, on the home page.

## Editing content

- **Services + pricing** → `lib/services.ts`
- **Case studies** → `lib/caseStudies.ts`
- **Colors / type scale** → `tailwind.config.ts`
- **Nav, name, proof strip** → `lib/site.ts`
