"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import type { ReactNode } from "react";

/* ─── Type Definitions ────────────────────────────────────────────── */

export interface ValueItem {
  title: string;
  description: string;
  value?: string;
}

export interface ServiceLandingPageProps {
  /* Hero / Above the fold */
  headline: ReactNode;
  subheadline: string;
  ctaLabel: string;
  ctaUrl: string;
  ctaDisclaimer?: string;

  /* Agitation */
  agitationTitle?: string;
  agitationBody: ReactNode;

  /* Solution / Positioning */
  solutionTitle?: string;
  solutionBody: ReactNode;

  /* Value Stack */
  valueStackTitle?: string;
  valueItems: ValueItem[];
  bonusItem?: ValueItem;
  totalValue: string;
  investmentPrice: string;

  /* Qualification */
  qualificationTitle?: string;
  goodFit: string[];
  notFit: string[];

  /* Guarantee / Risk Reversal */
  guaranteeTitle: string;
  guaranteeBody: ReactNode;

  /* SEO */
  pageTitle?: string;
}

/* ─── Animation Helpers ───────────────────────────────────────────── */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const stagger = (delay: number) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay },
});

/* ─── CTA Button (reused throughout) ─────────────────────────────── */

function CTAButton({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-4 px-12 py-6 bg-[#050505] text-white font-black text-lg rounded-2xl hover:bg-matrix-green transition-all shadow-2xl shadow-black/20 group"
    >
      {label}
      <ArrowRight
        size={24}
        className="group-hover:translate-x-1 transition-transform"
      />
    </a>
  );
}

/* ─── Divider ─────────────────────────────────────────────────────── */

function Divider() {
  return <div className="max-w-7xl mx-auto px-6"><hr className="border-slate-100" /></div>;
}

/* ─── Main Template Component ─────────────────────────────────────── */

export default function ServiceLandingPage({
  headline,
  subheadline,
  ctaLabel,
  ctaUrl,
  ctaDisclaimer,
  agitationTitle = "Why This Exists",
  agitationBody,
  solutionTitle = "The Solution",
  solutionBody,
  valueStackTitle = "What You Get",
  valueItems,
  bonusItem,
  totalValue,
  investmentPrice,
  qualificationTitle = "Who This Is For",
  goodFit,
  notFit,
  guaranteeTitle,
  guaranteeBody,
}: ServiceLandingPageProps) {
  return (
    <main className="bg-white min-h-screen">
      {/* ── Minimal Logo Header (non-clickable) ── */}
      <header className="py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <div className="w-10 h-10 bg-matrix-green rounded-xl flex items-center justify-center text-white font-black text-2xl italic shadow-lg shadow-matrix-green/20">
            D
          </div>
          <span className="text-2xl font-black tracking-tighter text-[#050505] uppercase">
            Dynasty <span className="text-matrix-green">Labz</span>
          </span>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — HERO / ABOVE THE FOLD
      ═══════════════════════════════════════════════════════════════ */}
      <section className="pt-16 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            {...fadeUp}
            className="text-5xl md:text-7xl font-black text-[#050505] leading-[1.05] tracking-tighter mb-8"
          >
            {headline}
          </motion.h1>

          <motion.p
            {...stagger(0.15)}
            className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto mb-12"
          >
            {subheadline}
          </motion.p>

          <motion.div {...stagger(0.3)}>
            <CTAButton label={ctaLabel} url={ctaUrl} />
          </motion.div>

          {ctaDisclaimer && (
            <motion.p
              {...stagger(0.4)}
              className="mt-6 text-sm text-slate-400 font-medium italic"
            >
              {ctaDisclaimer}
            </motion.p>
          )}
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — AGITATION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp}
            className="text-matrix-green font-black text-xs uppercase tracking-widest mb-6"
          >
            {agitationTitle}
          </motion.div>

          <motion.div
            {...stagger(0.1)}
            className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed space-y-6"
          >
            {agitationBody}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — SOLUTION / POSITIONING
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp}
            className="text-matrix-green font-black text-xs uppercase tracking-widest mb-6"
          >
            {solutionTitle}
          </motion.div>

          <motion.div
            {...stagger(0.1)}
            className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed space-y-6"
          >
            {solutionBody}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — VALUE STACK
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp}
            className="text-matrix-green font-black text-xs uppercase tracking-widest mb-12"
          >
            {valueStackTitle}
          </motion.div>

          <div className="space-y-10">
            {valueItems.map((item, idx) => (
              <motion.div
                key={idx}
                {...stagger(idx * 0.08)}
                className="group"
              >
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="text-xl md:text-2xl font-black text-[#050505] tracking-tight">
                    {item.title}
                  </h3>
                  {item.value && (
                    <span className="text-slate-400 font-black text-lg line-through whitespace-nowrap">
                      {item.value}
                    </span>
                  )}
                </div>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}

            {bonusItem && (
              <motion.div
                {...stagger(valueItems.length * 0.08)}
                className="p-8 rounded-2xl bg-matrix-green/5 border border-matrix-green/15"
              >
                <div className="text-matrix-green font-black text-xs uppercase tracking-widest mb-3">
                  Bonus
                </div>
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="text-xl md:text-2xl font-black text-[#050505] tracking-tight">
                    {bonusItem.title}
                  </h3>
                  {bonusItem.value && (
                    <span className="text-slate-400 font-black text-lg line-through whitespace-nowrap">
                      {bonusItem.value}
                    </span>
                  )}
                </div>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {bonusItem.description}
                </p>
              </motion.div>
            )}
          </div>

          {/* Pricing */}
          <motion.div
            {...stagger(0.4)}
            className="mt-16 pt-10 border-t border-slate-100"
          >
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-2">
              <span className="text-slate-400 font-black text-lg line-through">
                Total Value: {totalValue}
              </span>
            </div>
            <div className="text-4xl md:text-5xl font-black text-[#050505] tracking-tight">
              Your Investment: <span className="text-matrix-green">{investmentPrice}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — QUALIFICATION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp}
            className="text-matrix-green font-black text-xs uppercase tracking-widest mb-12"
          >
            {qualificationTitle}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Good fit */}
            <motion.div {...stagger(0.1)}>
              <h3 className="text-lg font-black text-[#050505] mb-6">
                This is a good fit if:
              </h3>
              <ul className="space-y-4">
                {goodFit.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-slate-600 font-medium"
                  >
                    <Check
                      size={18}
                      className="text-matrix-green mt-0.5 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Not a fit */}
            <motion.div {...stagger(0.2)}>
              <h3 className="text-lg font-black text-[#050505] mb-6">
                This is not a fit if:
              </h3>
              <ul className="space-y-4">
                {notFit.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-slate-400 font-medium"
                  >
                    <X size={18} className="text-slate-300 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 — GUARANTEE / RISK REVERSAL
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-3xl md:text-4xl font-black text-[#050505] tracking-tight mb-6"
          >
            {guaranteeTitle}
          </motion.h2>

          <motion.div
            {...stagger(0.1)}
            className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed space-y-6"
          >
            {guaranteeBody}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 — FINAL CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            {...fadeUp}
            className="text-lg text-slate-500 font-medium mb-10 max-w-xl mx-auto leading-relaxed"
          >
            This is a limited-capacity service. We only take on businesses we
            believe we can meaningfully improve.
          </motion.p>

          <motion.div {...stagger(0.15)}>
            <CTAButton label={ctaLabel} url={ctaUrl} />
          </motion.div>

          <motion.p
            {...stagger(0.25)}
            className="mt-6 text-sm text-slate-400 font-medium italic"
          >
            You&apos;ll be guided to a short qualification call to confirm fit.
          </motion.p>
        </div>
      </section>

      {/* ── Minimal footer ── */}
      <footer className="py-8 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-[10px] font-mono uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} DYNASTY LABZ. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </main>
  );
}
