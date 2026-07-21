# AGENTS.md — Planet-V

**Planet-V** is the marketing site for **Dynasty Labz** (AI automation / web dev / content maintenance agency). Next.js 16 App Router, TypeScript strict, Tailwind CSS v4, Framer Motion, Resend (lead emails). Live at **planet-v.vercel.app**, GitHub repo `Crypto-Vidal/Planet-V` (`main` branch).

## Deploy — read this before pushing anything

The Vercel project is **connected to GitHub**, so pushing `main` auto-deploys production:

```bash
git push origin main   # updates GitHub AND triggers the Vercel production deploy
```

`vercel --prod` still works as a manual override for uncommitted local work, but it is no longer required for a normal deploy. Prefer pushing so GitHub and production stay in sync automatically. (History: they desynced for ~6 weeks until the 2026-07-08 resync at commit `9f28c63`; the GitHub↔Vercel integration now prevents that.)

## Key files

- `src/app/(main)/page.tsx` — homepage (single self-contained component, own header/footer)
- `src/app/(landing)/drop-24/page.tsx` — Drop-24 landing page ($350 offer)
- `src/app/(landing)/start/page.tsx` — qualifier funnel; POSTs the brief to `/api/leads`
- `src/app/api/leads/route.ts` — **backend lead endpoint** (Node runtime): validates, honeypot spam trap, saves to Google Sheets webhook, emails via Resend
- `src/lib/content.ts` — **single source of truth** for services/offers/pricing plans/FAQ copy. Both the visible UI and the JSON-LD schema read from here — edit prices/copy here, not inline in page components.
- `src/app/globals.css` — theme tokens. Current theme is "Aurora" (blue/indigo `#2f88ff` / violet/sky `#7cb2ff` on near-black `#050505`).
- `src/components/home/ui.tsx` — shared UI primitives for the homepage (GlowOrb, CTAButton, CountUp, FAQItem, etc.)
- `src/components/templates/ServiceLandingPage.tsx` — template for `/efficiency-engine` and `/content-maintenance`

## Environment variables (set in Vercel, no committed .env)

`RESEND_API_KEY` (required), `GOOGLE_SHEETS_WEBHOOK_URL` (required), `GOOGLE_SHEETS_WEBHOOK_SECRET` (required), `LEAD_NOTIFICATION_EMAIL` (optional, defaults to `cryptov1991@gmail.com`). If a required var is unset in production, real leads bounce with a 5xx — verify the lead flow with one live submission after touching it.

## Commands

```bash
npm run dev      # localhost:3000
npm run build
npm run lint
```

## Notes

- No test framework, no database (leads → Google Sheets), no CMS, no CI/CD workflow files.
- Homepage/offer copy is centralized in `src/lib/content.ts`; service landing pages pass content inline.
- Portfolio previews in `public/drop24-previews/` are WebP — convert new ones with `cwebp -q 80` before referencing.
