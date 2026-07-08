# CLAUDE.md — AI Assistant Guide for Planet-V

## Project Overview

**Planet-V** is the marketing and portfolio website for **DYNASTY LABZ**, a business offering AI automation, web development, and content maintenance services. It targets business owners making $7k–$21k+/month who want to automate workflows and scale operations.

- **Framework:** Next.js 16.1.5 (App Router)
- **Language:** TypeScript 5.9.3 (strict mode)
- **Styling:** Tailwind CSS v4 with PostCSS
- **Animations:** Framer Motion 12.x
- **Icons:** Lucide React
- **SEO:** Next.js Metadata API + next-seo
- **Deployment:** Vercel — manual, no CI/CD/GitHub-integration auto-deploy wired up. `git push origin main` updates GitHub only; you must also run `vercel --prod` to update production (planet-v.vercel.app). Repo and production were resynced 2026-07-08 (commit `9f28c63`) after months of prod-only deploys that never got pushed — keep both in sync going forward.

## Quick Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm start        # Run production server
npm run lint     # ESLint (flat config, ESLint 9)
```

## When asked to "push live" / "deploy" / "make it live"

Do BOTH, in this order — they are independent, neither triggers the other:
```bash
git push origin main   # updates GitHub (Crypto-Vidal/Planet-V)
vercel --prod           # updates the live site (planet-v.vercel.app)
```
Skipping either one silently desyncs GitHub from production again (this happened for ~6 weeks until 2026-07-08).

## Project Structure

```
Planet-V/
├── public/                        # Static assets (images, SVGs)
│   ├── *.png                      # Portfolio/site preview screenshots
│   └── *.svg                      # UI icons (arrow-right, check, etc.)
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (fonts, metadata, html/body)
│   │   ├── globals.css            # Global styles, Aurora theme tokens
│   │   ├── opengraph-image.tsx    # Generated OG image (1200×630)
│   │   ├── (main)/
│   │   │   ├── layout.tsx         # Pass-through only — homepage is self-contained
│   │   │   └── page.tsx           # Homepage: full rebuild, own header/footer, reads content.ts
│   │   └── (landing)/             # Service/offer landing pages, minimal shared layout
│   │       ├── drop-24/page.tsx       # Drop24 offer ($350) + intake/ subpage
│   │       ├── start/page.tsx         # Qualifier funnel (Calendly embed)
│   │       ├── efficiency-engine/page.tsx
│   │       ├── web-development/page.tsx
│   │       ├── content-maintenance/page.tsx
│   │       └── cat-food/page.tsx
│   ├── components/
│   │   ├── home/ui.tsx            # Homepage primitives: GlowOrb, CTAButton, GhostButton, CountUp, FAQItem, Section, animation presets
│   │   └── templates/ServiceLandingPage.tsx   # Reusable template for the 3 service landing pages
│   └── lib/
│       └── content.ts             # Single source of truth: SERVICES / OFFERS / PLANS / FAQS / BUSINESS copy — feeds both UI and JSON-LD
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs              # ESLint 9 flat config
└── postcss.config.mjs             # Tailwind CSS v4 PostCSS plugin
```

**Legacy/unused (still present, not deleted, not imported anywhere in `src/app`):** `src/components/sections/` (Hero, Services, Portfolio, CTA) and `src/components/layout/` (Navbar, Footer) are pre-6/24-merge components, dead code from before the homepage was rebuilt as a single self-contained file. Don't build on them — they're not wired into any route.

**Known live bug:** `src/components/templates/ServiceLandingPage.tsx` (used by `web-development`, `efficiency-engine`, `content-maintenance`) still references `matrix-green`/`bg-matrix-green` Tailwind classes, but that color token was removed from `globals.css` when the site moved to the Aurora theme. Those classes currently resolve to nothing (Tailwind v4 won't generate a utility for an undefined `@theme` token), so accent color/branding on those 3 pages is likely broken or missing. Not fixed here — flagging so it isn't mistaken for intentional styling if you're debugging those pages.

## Architecture & Patterns

### Route Groups

- `(main)/` — Homepage only; the page itself carries its own header/footer, no shared layout chrome.
- `(landing)/` — Offer/service pages, each self-contained or built on `ServiceLandingPage`.

### Component Types

- **Server Components** — `page.tsx` files by default (no `"use client"`).
- **Client Components** — anything interactive/animated: homepage `page.tsx`, `ServiceLandingPage`, `home/ui.tsx` primitives.

### Data Handling

Copy for the homepage (services, offers, pricing plans, FAQ) lives centrally in `src/lib/content.ts` — edit there, not inline in `page.tsx`, so the visible UI and the JSON-LD schema never drift apart. Content for the individual service landing pages is still passed as props inline per-page. No CMS, database, or API layer.

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

The homepage also exports a `BLUE = "#2f88ff"` constant from `src/components/home/ui.tsx` used directly in inline styles/gradients rather than via a Tailwind class — check there too when changing the accent color.

Only one custom utility class exists in `globals.css`: `.no-scrollbar` (hides scrollbars on horizontal strips). Older docs describing `.section-dark`, `.button-primary`, `.card-white`, `.glass-card`, etc. are stale — those classes don't exist in the current stylesheet.

### Typography

- **Fonts loaded in root layout:** Inter (`--font-inter`) and Fira Code (`--font-fira-code`) via `next/font/google`.
- **Headings:** Large, bold, tight tracking (`font-black`, `tracking-tighter`).
- **Accent labels:** Uppercase, wide tracking, small size, blue accent color.
- **Body text:** Light gray/slate on the dark background (`text-white/70` or similar), not the slate-on-white pairing from the old light theme.

## Animation Conventions

Framer Motion, consistent with the pre-merge conventions:

- **Fade-up pattern:** `{ opacity: 0, y: 24 }` → `{ opacity: 1, y: 0 }`, `duration: ~0.6`.
- **Staggered children:** incremental delay (`idx * 0.08` or similar).
- **Viewport trigger:** `viewport: { once: true }`.
- **Hover effects:** scale/translateY/color via Tailwind `hover:` utilities.
- **AnimatePresence:** used for the pricing toggle (one-time vs. monthly plans) and modals.

`fadeUp` / `stagger` presets are exported from `src/components/home/ui.tsx` — reuse them rather than redefining per component.

## Code Conventions

### Naming

- **Components:** PascalCase filenames and exports (`Hero.tsx`, `ServiceLandingPage.tsx`)
- **Directories:** lowercase, kebab-case for route segments (`efficiency-engine/`)
- **Variables/functions:** camelCase

### Imports

- Use the `@/` path alias for all `src/` imports (configured in `tsconfig.json`)
- Example: `import Hero from "@/components/sections/Hero"`

### Component Organization

- One component per file
- Type interfaces defined at the top of the file (inline, not in separate type files)
- Hardcoded data arrays placed at the top of the component or inline
- Section comment dividers using box-drawing characters for readability

### External Links

- All external links (Calendly, etc.) use `target="_blank" rel="noopener noreferrer"`
- Primary CTA URL: `https://calendly.com/vcrypto1991/30min`

## ESLint Configuration

- ESLint 9 flat config format (`eslint.config.mjs`)
- Extends: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignored paths: `.next/`, `out/`, `build/`, `next-env.d.ts`
- Run with: `npm run lint`

## What This Project Does NOT Have

- No test framework (no Jest, Vitest, or test files)
- No backend / API routes / database
- No environment variables or `.env` files
- No CI/CD pipeline (GitHub Actions, etc.)
- No Prettier config (formatting via ESLint only)
- No pre-commit hooks (husky, lint-staged, etc.)
- No i18n / localization
- No authentication or user sessions

## Adding New Pages

### New main page (with Navbar/Footer)

1. Create a directory under `src/app/(main)/`
2. Add a `page.tsx` file (server component by default)
3. The `(main)/layout.tsx` automatically wraps it with Navbar and Footer

### New service landing page

1. Create a directory under `src/app/(landing)/` (e.g., `new-service/`)
2. Create `page.tsx` that imports and renders `ServiceLandingPage` with appropriate props
3. Follow the prop interface in `src/components/templates/ServiceLandingPage.tsx`

### New section component

1. Create a `.tsx` file in `src/components/sections/`
2. Add `"use client"` if it needs interactivity or Framer Motion
3. Import and place it in the relevant `page.tsx`

## Git Workflow

- Feature development happens on `claude/*` branches
- Changes are merged via pull requests
- Commit messages should be descriptive and reference the feature being added
