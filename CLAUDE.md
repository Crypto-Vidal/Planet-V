# CLAUDE.md — AI Assistant Guide for Planet-V

## Project Overview

**Planet-V** is the marketing and portfolio website for **DYNASTY LABZ**, a business offering AI automation, web development, and content maintenance services. It targets business owners making $7k–$21k+/month who want to automate workflows and scale operations.

- **Framework:** Next.js 16.2.x (App Router)
- **Language:** TypeScript 5.9.3 (strict mode)
- **Styling:** Tailwind CSS v4 with PostCSS
- **Animations:** Framer Motion 12.x
- **Icons:** Lucide React
- **Email:** Resend (transactional lead notifications)
- **Analytics:** `@vercel/analytics`
- **SEO:** Next.js Metadata API + a static `public/sitemap.xml` and `public/robots.txt`
- **Deployment:** Vercel, **connected to GitHub** (`Crypto-Vidal/Planet-V`). A push to `main` auto-deploys production (planet-v.vercel.app). See the deploy section below.

## Quick Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm start        # Run production server
npm run lint     # ESLint (flat config, ESLint 9)
```

## When asked to "push live" / "deploy" / "make it live"

The Vercel project is connected to the GitHub repo, so **`git push origin main` auto-deploys to production** — no separate CLI step is required anymore.

```bash
git push origin main   # updates GitHub AND triggers the Vercel production deploy
```

`vercel --prod` still works as a manual override (e.g. to deploy uncommitted local work without pushing), but it is no longer required for a normal deploy. Prefer pushing to keep GitHub and production in sync automatically.

> History: from ~2026-05 until 2026-07-08 this repo deployed via `vercel --prod` only and GitHub sat stale. The repo was resynced (commit `9f28c63`) and the GitHub↔Vercel integration is now wired, closing that gap.

## Project Structure

```
Planet-V/
├── public/                        # Static assets
│   ├── drop24-previews/*.webp     # Portfolio site preview screenshots (WebP)
│   ├── og-drop-24.svg             # OG image for the Drop-24 page
│   ├── robots.txt                 # AEO-friendly crawl rules
│   └── sitemap.xml                # Static sitemap (4 public URLs)
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (fonts, metadata, JSON-LD, <Analytics/>)
│   │   ├── globals.css            # Global styles, Aurora theme tokens
│   │   ├── opengraph-image.tsx    # Generated OG image (1200×630)
│   │   ├── api/
│   │   │   └── leads/route.ts     # POST endpoint — validates, saves to Google Sheets, emails via Resend
│   │   ├── (main)/
│   │   │   ├── layout.tsx         # Pass-through only — homepage is self-contained
│   │   │   └── page.tsx           # Homepage: full build, own header/footer, reads content.ts
│   │   └── (landing)/             # Service/offer landing pages, minimal shared layout
│   │       ├── layout.tsx
│   │       ├── drop-24/           # Drop24 offer landing (layout.tsx + page.tsx)
│   │       ├── start/             # Qualifier funnel — POSTs the brief to /api/leads
│   │       ├── efficiency-engine/page.tsx     # built on ServiceLandingPage
│   │       └── content-maintenance/page.tsx   # built on ServiceLandingPage
│   ├── components/
│   │   ├── home/ui.tsx            # Homepage primitives: GlowOrb, CTAButton, GhostButton, CountUp, FAQItem, Section, animation presets
│   │   └── templates/ServiceLandingPage.tsx   # Reusable template for the service landing pages
│   └── lib/
│       └── content.ts             # Single source of truth: SERVICES / OFFERS / PLANS / FAQS / BUSINESS copy — feeds both UI and JSON-LD
├── package.json                   # name: "planet-v"
├── tsconfig.json
├── next.config.ts                 # Turbopack root config
├── eslint.config.mjs              # ESLint 9 flat config
└── postcss.config.mjs             # Tailwind CSS v4 PostCSS plugin
```

## Backend — Lead Capture API

`src/app/api/leads/route.ts` (`runtime = "nodejs"`) is the site's only backend. It handles `POST` requests from the `/start` funnel:

1. Rejects non-JSON, oversized (>50KB), or malformed requests.
2. **Honeypot:** if the `website` field is filled, it silently returns `{ ok: true }` without saving (bot trap).
3. **Validation:** requires `name`, `businessName`, a valid `email`, and a phone with ≥10 digits.
4. **Storage:** POSTs the lead to a Google Sheets webhook (`saveLeadToGoogleSheet`). If storage fails, the whole request fails with a `502` so no lead is silently lost.
5. **Notification:** sends an email via Resend. If only the email fails, the lead is still saved and the response includes a `warning`.

### Required environment variables (set in the Vercel project settings)

| Variable | Purpose | Required |
|---|---|---|
| `RESEND_API_KEY` | Resend API key for lead notification emails | Yes — without it the route returns `503` |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Apps Script / webhook URL that appends the lead row | Yes — without it the route returns `502` |
| `GOOGLE_SHEETS_WEBHOOK_SECRET` | Shared secret sent in the webhook body | Yes |
| `LEAD_NOTIFICATION_EMAIL` | Where lead emails are sent | Optional — defaults to `cryptov1991@gmail.com` |

There is no `.env` file committed. These live in Vercel env vars; pull them with `vercel env pull` for local testing. **If any required var is unset in production, real leads bounce with a 5xx — verify with one live end-to-end submission after any change to the lead flow.**

## Architecture & Patterns

### Route Groups

- `(main)/` — Homepage only; the page carries its own header/footer, no shared layout chrome.
- `(landing)/` — Offer/service pages, each self-contained or built on `ServiceLandingPage`.

### Component Types

- **Server Components** — `page.tsx` files by default (no `"use client"`).
- **Client Components** — anything interactive/animated: homepage `page.tsx`, the `/start` funnel, `ServiceLandingPage`, `home/ui.tsx` primitives.

### Data Handling

Homepage copy (services, offers, pricing plans, FAQ) lives centrally in `src/lib/content.ts` — edit there, not inline in `page.tsx`, so the visible UI and the JSON-LD schema never drift apart. Service landing pages pass their content as inline props per-page. Lead data flows through `/api/leads` to Google Sheets + Resend; there is no database.

## Styling Conventions

### Tailwind CSS v4

- Configured via `@tailwindcss/postcss` plugin in `postcss.config.mjs`.
- Theme tokens defined in `globals.css` via `@theme { }`.
- Utility-first throughout.

### Design Tokens (defined in `globals.css`, "Aurora" theme)

| Token | Value | Usage |
|---|---|---|
| `--color-aurora-blue` / `--color-aurora-indigo` | `#2f88ff` | Primary accent (buttons, links, highlights) |
| `--color-aurora-violet` / `--color-aurora-sky` | `#7cb2ff` / `#60a5fa` | Secondary accent, gradients |
| `--color-professional-black` | `#050505` | Page background |
| `--font-sans` | Inter | Body text |
| `--font-mono` | Geist Mono | Monospace accents |

The homepage also exports a `BLUE = "#2f88ff"` constant from `src/components/home/ui.tsx` used directly in inline styles/gradients rather than via a Tailwind class — check there too when changing the accent color. `ServiceLandingPage` uses the `aurora-blue` token for its accent (the old `matrix-green` token bug was removed when the site moved to the Aurora theme).

Only one custom utility class exists in `globals.css`: `.no-scrollbar` (hides scrollbars on horizontal strips).

### Typography

- **Fonts loaded in root layout** via `next/font/google`.
- **Headings:** Large, bold, tight tracking (`font-black`, `tracking-tighter`).
- **Accent labels:** Uppercase, wide tracking, small size, blue accent color.
- **Body text:** Light gray/slate on the dark background.

## Animation Conventions

Framer Motion:

- **Fade-up pattern:** `{ opacity: 0, y: 24 }` → `{ opacity: 1, y: 0 }`, `duration: ~0.6`.
- **Staggered children:** incremental delay (`idx * 0.08` or similar).
- **Viewport trigger:** `viewport: { once: true }`.
- **Hover effects:** scale/translateY/color via Tailwind `hover:` utilities.
- **AnimatePresence:** used for the pricing toggle and the multi-step `/start` funnel.

`fadeUp` / `stagger` presets are exported from `src/components/home/ui.tsx` — reuse them rather than redefining per component.

## Code Conventions

### Naming

- **Components:** PascalCase filenames and exports.
- **Directories:** lowercase, kebab-case for route segments (`efficiency-engine/`).
- **Variables/functions:** camelCase.

### Imports

- Use the `@/` path alias for all `src/` imports (configured in `tsconfig.json`).
- Example: `import { CTAButton, fadeUp } from "@/components/home/ui"`.

### Component Organization

- One component per file.
- Type interfaces defined at the top of the file (inline).
- Hardcoded data arrays placed at the top of the component or inline.

### External Links

- All external links use `target="_blank" rel="noopener noreferrer"`.
- Primary CTA URL: `https://calendly.com/vcrypto1991/30min`.

## Images

Portfolio preview screenshots live in `public/drop24-previews/` as **WebP** (converted from PNG on 2026-07-21 for an ~93% size cut). They are rendered as CSS `background-image` on the homepage and `/drop-24`. If you add a new preview, convert it to WebP first (`cwebp -q 80 in.png -o out.webp`) and reference the `.webp` path.

## ESLint Configuration

- ESLint 9 flat config format (`eslint.config.mjs`).
- Extends: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- Run with: `npm run lint`.

## What This Project Does NOT Have

- No test framework (no Jest, Vitest, or test files)
- No database (leads go to Google Sheets via webhook)
- No CMS
- No CI/CD workflow files (deploys run through Vercel's GitHub integration, not GitHub Actions)
- No Prettier config (formatting via ESLint only)
- No pre-commit hooks (husky, lint-staged, etc.)
- No i18n / localization
- No authentication or user sessions

## Adding New Pages

### New landing page on the shared template

1. Create a directory under `src/app/(landing)/` (e.g. `new-service/`).
2. Create `page.tsx` that imports and renders `ServiceLandingPage` with the appropriate props.
3. Follow the prop interface at the top of `src/components/templates/ServiceLandingPage.tsx`.

### New homepage-style page

1. Create a directory under `src/app/(main)/` with a `page.tsx`.
2. Reuse primitives and animation presets from `src/components/home/ui.tsx`.

## Git Workflow

- `main` is the production branch — pushing it deploys.
- Feature work on `claude/*` branches, merged via PR when practical.
- Keep `AGENTS.md` (Codex guide) in sync with this file when the architecture changes.
