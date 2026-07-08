# AGENTS.md — Planet-V

**Planet-V** is the marketing site for **Dynasty Labz** (AI automation / web dev / content maintenance agency). Next.js 16 App Router, TypeScript strict, Tailwind CSS v4, Framer Motion. Live at **planet-v.vercel.app**, GitHub repo `Crypto-Vidal/Planet-V` (`main` branch).

## Deploy — read this before pushing anything

`git push` and `vercel --prod` are independent; neither triggers the other. When asked to "push live" / "deploy" / "make it live," run BOTH:

```bash
git push origin main   # updates GitHub
vercel --prod           # updates the live site (planet-v.vercel.app)
```

Skipping either one silently desyncs GitHub from production (happened for ~6 weeks until 2026-07-08, when both were resynced at commit `9f28c63`). No CI/CD is wired up — deploys are always manual.

## Key files

- `src/app/(main)/page.tsx` — homepage (single self-contained component, own header/footer)
- `src/app/(landing)/drop-24/page.tsx` — Drop-24 landing page ($350 offer)
- `src/lib/content.ts` — **single source of truth** for services/offers/pricing plans/FAQ copy. Both the visible UI and the JSON-LD schema read from here — edit prices/copy here, not inline in page components.
- `src/app/globals.css` — theme tokens. Current theme is "Aurora" (blue `#3b82f6` / indigo `#6366f1` / violet `#8b5cf6` on near-black `#050505`), NOT the older matrix-green tokens still described in `CLAUDE.md` (that file is stale post-merge — verify against the actual file before trusting its styling section).
- `src/components/home/ui.tsx` — shared UI primitives for the homepage (GlowOrb, CTAButton, CountUp, FAQItem, etc.)

## Commands

```bash
npm run dev      # localhost:3000
npm run build
npm run lint
```

## Notes

- No test framework, no backend/API routes, no env vars, no CI/CD.
- All content is hardcoded (mostly centralized in `src/lib/content.ts` post-merge).
