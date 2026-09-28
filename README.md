# Amberly Tax Co.

A modern, colorful marketing site for a fictional individual tax consultancy — built to demonstrate a full site experience: services, transparent pricing, an interactive tax refund estimator, a document checklist, a tax-deadline countdown, a pricing quiz, searchable resources, a tax-pro finder, and more.

**Live site:** https://sriramshravanthi.github.io/usa-tax-site/

> Amberly Tax Co. is a fictional brand built for demonstration purposes. Pricing, credentials, and statistics shown on the site are illustrative placeholders. The Refund Estimator uses real 2025 federal tax rules but is still an estimate, not tax advice.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (`base-nova` style, built on [Base UI](https://base-ui.com))
- [Motion](https://motion.dev) for scroll/hover animation

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see it.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint     # ESLint
```

## Deployment

The site is statically exported (`output: "export"`) and deployed to GitHub Pages via GitHub Actions on every push to `main` (see `.github/workflows/deploy.yml`). `next.config.ts` only applies the GitHub Pages `basePath`/`trailingSlash` settings when `GITHUB_PAGES=true` is set, so local dev and builds are unaffected.

## Project structure

See `CLAUDE.md` for the full breakdown of routes, components, and data files.
