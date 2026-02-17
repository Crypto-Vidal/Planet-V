# CLAUDE.md — AI Assistant Guide for Planet-V

## Project Overview

**Planet-V** is the marketing and portfolio website for **DYNASTY LABZ**, a business offering AI automation, web development, and content maintenance services. It targets business owners making $7k–$21k+/month who want to automate workflows and scale operations.

- **Framework:** Next.js 16.1.5 (App Router)
- **Language:** TypeScript 5.9.3 (strict mode)
- **Styling:** Tailwind CSS v4 with PostCSS
- **Animations:** Framer Motion 12.x
- **Icons:** Lucide React
- **SEO:** Next.js Metadata API + next-seo
- **Deployment:** Vercel (default Next.js deployment)

## Quick Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm start        # Run production server
npm run lint     # ESLint (flat config, ESLint 9)
```

## Project Structure

```
Planet-V/
├── public/                        # Static assets (images, SVGs)
│   ├── *.png                      # Portfolio project screenshots
│   └── *.svg                      # UI icons (arrow-right, check, etc.)
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (fonts, metadata, html/body)
│   │   ├── globals.css            # Global styles, Tailwind theme, CSS utilities
│   │   ├── (main)/                # Main site route group
│   │   │   ├── layout.tsx         # Wraps pages with Navbar + Footer
│   │   │   └── page.tsx           # Homepage (Hero, Services, Portfolio, etc.)
│   │   └── (landing)/             # Service landing pages route group
│   │       ├── layout.tsx         # Minimal layout wrapper
│   │       ├── efficiency-engine/page.tsx
│   │       ├── web-development/page.tsx
│   │       └── content-maintenance/page.tsx
│   └── components/
│       ├── layout/                # Navbar.tsx, Footer.tsx
│       ├── sections/              # Hero, Services, Portfolio, SocialProof, CTA
│       └── templates/             # ServiceLandingPage.tsx (reusable template)
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs              # ESLint 9 flat config
└── postcss.config.mjs             # Tailwind CSS v4 PostCSS plugin
```

## Architecture & Patterns

### Route Groups

Next.js route groups (parenthesized directories) separate layouts without affecting URLs:

- `(main)/` — Pages that share the full Navbar + Footer layout
- `(landing)/` — Service-specific landing pages with a minimal layout (no shared nav/footer; each uses `ServiceLandingPage` template)

### Component Types

- **Server Components** — All `page.tsx` files are server components (no `"use client"` directive)
- **Client Components** — Interactive components use `"use client"` at the top: `Navbar`, `Hero`, `Services`, `Portfolio`, `SocialProof`, `CTA`, `ServiceLandingPage`

### Reusable Template

`ServiceLandingPage.tsx` is a data-driven template used by all three landing pages. It accepts props for headline, CTA, value stack, qualification criteria, and guarantee sections. When adding a new service landing page, create a new directory under `(landing)/` and pass content via props to this template.

### Data Handling

All content (services, portfolio items, testimonials, navigation links) is hardcoded as arrays/objects directly within the component files. There is no CMS, database, or API layer.

## Styling Conventions

### Tailwind CSS v4

- Configured via `@tailwindcss/postcss` plugin in `postcss.config.mjs`
- Custom theme tokens defined in `globals.css` using `@theme { }` block
- Utility-first approach throughout all components

### Design Tokens (defined in `globals.css`)

| Token | Value | Usage |
|---|---|---|
| `--color-matrix-green` | `#10b981` | Primary brand color (emerald green) |
| `--color-matrix-dark` | `#064e3b` | Dark green accent |
| `--color-professional-black` | `#050505` | Primary text, dark backgrounds |
| `--font-sans` | Inter | Body text |
| `--font-mono` | Geist Mono | Monospace accents |

Use Tailwind classes like `text-matrix-green`, `bg-professional-black` to reference these tokens.

### Custom CSS Utility Classes

Defined in `globals.css` — use these instead of recreating the patterns:

- `.section-dark` — Dark background section
- `.button-primary` — Green CTA button with hover lift
- `.card-white` — White card with border, hover turns green
- `.hover-lift` — Subtle translateY(-4px) on hover
- `.glass-card` — Frosted glass effect (backdrop-filter blur)
- `.shadow-deep` — Heavy drop shadow
- `.text-gradient-green` — Green gradient text fill
- `.mesh-gradient` — Decorative radial gradient background

### Typography

- **Fonts loaded in root layout:** Inter (variable, `--font-inter`) and Fira Code (`--font-fira-code`) via `next/font/google`
- **Headings:** Large, bold (`text-5xl`/`text-6xl`, `font-black`, `tracking-tighter`)
- **Accent labels:** Uppercase, extra-wide tracking (`text-xs`, `uppercase`, `tracking-widest`, `font-black`, green color)
- **Body text:** Slate gray (`text-slate-500` or `text-slate-600`), `font-medium`, `leading-relaxed`

## Animation Conventions

Framer Motion is used for entrance and interaction animations:

- **Fade-up pattern:** `{ opacity: 0, y: 24 }` → `{ opacity: 1, y: 0 }` with `duration: 0.6`
- **Staggered children:** Use incremental delay (`idx * 0.08` or similar)
- **Viewport trigger:** `viewport: { once: true }` so animations play only on first scroll
- **Hover effects:** Scale, translateY, color transitions via Tailwind `hover:` utilities
- **AnimatePresence:** Used for modals and conditional UI (e.g., portfolio gallery)

When adding new animated sections, follow the `fadeUp` / `stagger` helper pattern established in `ServiceLandingPage.tsx`.

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
