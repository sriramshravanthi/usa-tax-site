# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A USA individual tax consultancy marketing website. Goal: visually striking,
colorful, modern, and highly user-friendly — inspired by the *core structure*
of major tax consultancy sites (H&R Block, Jackson Hewitt, Liberty Tax, TaxAct,
TurboTax) but with fully original design, copy, and visuals. Never copy layout,
text, or imagery from those sites directly — only take inspiration from the
*type* of information users expect (services, pricing, tools, trust signals).

## Tech Stack
- Framework: Next.js 16 (App Router, Turbopack) + TypeScript (strict)
- Styling: Tailwind CSS v4 (via `@tailwindcss/postcss`, no `tailwind.config`)
- Components: shadcn/ui (`style: base-nova`, base color `neutral`, RSC-enabled) —
  installed components live in `src/components/ui`; add more with
  `npx shadcn@latest add <component>`
- Icons: lucide-react
- Deployment target: [Vercel / Netlify / other]

## Core Site Sections (must include)
1. Home — hero, value proposition, trust badges, CTA to start filing
2. Services — individual filing, self-employed, deductions/credits help,
   audit support, tax planning
3. Pricing — tiered packages, transparent pricing table
4. Tax Tools — refund estimator / tax calculator (interactive)
5. Find a Tax Pro — locator or "book a consultation" flow
6. Resources / Blog — tax tips, deadline reminders, guides
7. About Us — team, credentials, why trust us
8. FAQ
9. Contact — form + support channels
10. Footer — legal disclaimers, sitemap, social links

## Design Direction
- Bold, warm color palette (avoid plain corporate blue-only look) —
  aim for confident + approachable, not sterile
- Strong typography hierarchy, generous whitespace, smooth micro-animations
  on scroll/hover
- Fully responsive (mobile-first)
- Accessibility: proper contrast ratios, alt text, keyboard navigation
- Never reuse exact copy, layouts, or images from competitor sites

## Coding Conventions
- TypeScript strict mode
- Components: PascalCase, one component per file
- Content (FAQs, pricing, testimonials) lives in /src/data as JSON, not
  hardcoded in components
- Use Tailwind utility classes; no inline styles
- Commit small, working increments

## Commands
- `npm run dev` — start local dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint check

## Project Structure
- `src/app` — App Router routes. `layout.tsx` renders the persistent
  `Nav` / `ScrollProgress` / `Footer` (from `src/components/site`) around
  `{children}` — individual pages should NOT re-render those.
  - `/` (`page.tsx`) — Hero, TrustBar, Stats, ServicesGrid, Testimonials, CtaSection
  - `/pricing` — PricingGrid (3 tiers)
  - `/tools` — RefundEstimator (interactive; math lives in `src/lib/tax-estimate.ts`)
  - `/faq` — FaqAccordion (shadcn Accordion)
  - `/about` — ValuesGrid + TeamGrid
  - `/contact` — ContactForm (client-side only, no backend) + support channels
  - `/find-a-pro` — ProFinder (simulated ZIP search over static `pros.json`)
  - `/resources` — ArticlesGrid (guide/blog index, no individual post routes)
  Every sub-page opens with `PageIntro` (dark "ink" band, staggered reveal) and
  usually closes with `CtaSection`, for visual consistency.
- `src/components/ui` — shadcn/ui primitives (`base-nova` style, built on
  `@base-ui/react`, not Radix — e.g. `SheetTrigger`/`DialogTrigger` use a
  `render` prop instead of `asChild`). Generated; prefer `npx shadcn add`
  over hand-writing these.
- `src/components/site` — hand-written site sections/composition pieces
  (Nav, Hero, PageIntro, Reveal/RevealGroup/RevealItem scroll-animation
  primitives, MagneticButton, etc.)
- `src/lib/utils.ts` — shared helpers (`cn`, etc.); `src/lib/tax-estimate.ts` —
  simplified/illustrative federal refund math (real 2024 standard deductions,
  simplified bracket shape) — always keep the "not tax advice" disclaimer
  next to any UI that surfaces it.
- `src/data` — JSON content for nav, services, pricing, faqs, testimonials,
  team, values, pros, articles, contact-channels, stats, trust-badges.
- Import alias: `@/*` → `src/*`

## Animation conventions
- Motion library (`motion/react`, not `framer-motion`) is the animation
  primitive. `AnimatePresence`/`useInView`/`useScroll` etc. all come from
  there.
- When typing a `Variants` object that includes an `ease` cubic-bezier array
  (e.g. `[0.16, 1, 0.3, 1]`) in a **named `const`**, annotate it explicitly as
  `const x: Variants = {...}` (import `type Variants` from `motion/react`) —
  otherwise TS widens `ease` to `number[]` and the build's typecheck fails.
  Inline variants objects passed directly to a `variants` prop don't need
  this (they get contextual typing).
- Reuse `Reveal` / `RevealGroup` + `RevealItem` (`src/components/site/reveal.tsx`)
  for scroll-triggered fade/rise reveals instead of writing new `whileInView`
  boilerplate per section.

## What NOT to do
- Don't fabricate tax law, pricing, or legal claims — use clearly marked
  placeholder content where real data isn't provided
- Don't scrape or reproduce any competitor's actual text/images
- Don't add a real payment/filing backend without explicit instruction —
  this is a marketing/informational site unless told otherwise

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
