"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { useState } from "react";

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

/* ─── Blue accent color ───────────────────────────────────────────── */
const BLUE = "#3b82f6";

/* ─── Divider ─────────────────────────────────────────────────────── */
function Divider() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <hr className="border-slate-100" />
    </div>
  );
}

/* ─── CTA Button ──────────────────────────────────────────────────── */
function CTAButton({ label = "Get Started" }: { label?: string }) {
  return (
    <a
      href="https://calendly.com/vcrypto1991/drop24-meeting"
      className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-black text-lg text-white transition-all shadow-xl group"
      style={{ backgroundColor: BLUE }}
    >
      {label}
      <ArrowRight
        size={20}
        className="group-hover:translate-x-1 transition-transform"
      />
    </a>
  );
}

/* ─── FAQ Item ────────────────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-none">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
      >
        <span className="text-base md:text-lg font-black text-[#050505] tracking-tight group-hover:text-blue-500 transition-colors">
          {q}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-500 font-medium leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────── */
export default function Drop24Page() {
  return (
    <main className="bg-white min-h-screen">
      {/* ── Header ── */}
      <header className="py-7 px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-xl italic shadow-md"
            style={{ backgroundColor: BLUE }}
          >
            D
          </div>
          <span className="text-xl font-black tracking-tighter text-[#050505] uppercase">Drop<span style={{ color: BLUE }}>24</span></span>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section className="pt-20 pb-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Label */}
          <motion.div
            {...fadeUp}
            className="inline-block mb-8 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border"
            style={{ color: BLUE, borderColor: "#bfdbfe", backgroundColor: "#eff6ff" }}
          >
            Drop 24
          </motion.div>

          <motion.h1
            {...stagger(0.08)}
            className="text-5xl md:text-7xl font-black text-[#050505] leading-[1.05] tracking-tighter mb-6"
          >
            Your website.{" "}
            <span style={{ color: BLUE }}>24 hours.</span>{" "}
            $350.
          </motion.h1>

          <motion.p
            {...stagger(0.18)}
            className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-xl mx-auto mb-12"
          >
            If you don&apos;t love it, you don&apos;t pay.
          </motion.p>

          <motion.div {...stagger(0.28)}>
            <CTAButton />
          </motion.div>

          <motion.p
            {...stagger(0.36)}
            className="mt-5 text-sm text-slate-400 font-medium"
          >
            No contract. No agency overhead. Just a site that works.
          </motion.p>
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — THE PROBLEM
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp}
            className="text-xs font-black uppercase tracking-widest mb-8"
            style={{ color: BLUE }}
          >
            The Problem
          </motion.div>

          <motion.div
            {...stagger(0.1)}
            className="space-y-5 text-lg md:text-xl text-slate-600 font-medium leading-relaxed"
          >
            <p>
              Most local business websites exist. They don&apos;t convert.
              They were built to look professional, not to turn visitors into
              paying customers.
            </p>
            <p>
              You got charged $1,500–$5,000 for something that sits there, does
              nothing, and slowly embarrasses you every time you hand out your
              card.
            </p>
            <p>
              The fix isn&apos;t more pages or a rebrand. It&apos;s one clear
              page that tells the right person exactly what you do and what to
              do next.
            </p>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — THE OFFER
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp}
            className="text-xs font-black uppercase tracking-widest mb-12"
            style={{ color: BLUE }}
          >
            What You Get
          </motion.div>

          <div className="space-y-8">
            {[
              {
                title: "A converting landing page",
                desc: "One focused page built around your offer, your customer, and one clear action — book, call, or buy.",
              },
              {
                title: "Live in 24 hours",
                desc: "Send us your info at noon, you&apos;ll have a live URL by noon tomorrow. No waiting weeks for a \"discovery call\" to go nowhere.",
              },
              {
                title: "Mobile-first design",
                desc: "Over 70% of local searches happen on mobile. Your page will look sharp on every screen size.",
              },
              {
                title: "Copy included",
                desc: "You don't need to write a word. We write the headline, subheadline, and call-to-action based on what works.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                {...stagger(idx * 0.08)}
                className="flex gap-5"
              >
                <div
                  className="mt-1 w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: "#eff6ff" }}
                >
                  <Check size={12} style={{ color: BLUE }} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#050505] tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p
                    className="text-slate-500 font-medium leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pricing callout */}
          <motion.div
            {...stagger(0.4)}
            className="mt-16 p-8 rounded-2xl border-2"
            style={{ borderColor: "#bfdbfe", backgroundColor: "#f0f7ff" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div
                  className="text-xs font-black uppercase tracking-widest mb-2"
                  style={{ color: BLUE }}
                >
                  The Price
                </div>
                <div className="text-4xl md:text-5xl font-black text-[#050505] tracking-tight">
                  $350{" "}
                  <span className="text-lg text-slate-400 font-medium">flat</span>
                </div>
                <p className="mt-2 text-sm text-slate-500 font-medium">
                  One-time. No monthly fees. No hidden costs.
                </p>
              </div>
              <div
                className="shrink-0 text-center px-8 py-5 rounded-xl font-black text-white text-lg leading-snug"
                style={{ backgroundColor: BLUE }}
              >
                24hr
                <br />
                <span className="text-sm font-medium opacity-80">turnaround</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — HOW IT WORKS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp}
            className="text-xs font-black uppercase tracking-widest mb-12"
            style={{ color: BLUE }}
          >
            How It Works
          </motion.div>

          <div className="space-y-10">
            {[
              {
                step: "01",
                title: "Send your info",
                desc: "Fill out a short form — your business name, what you offer, who you serve, and how people should contact you. Takes 5 minutes.",
              },
              {
                step: "02",
                title: "We build in 24 hours",
                desc: "We handle the copy, design, and launch. You don't lift a finger. No back-and-forth, no revision loops before you've even seen it.",
              },
              {
                step: "03",
                title: "You approve — or we fix it",
                desc: "If you love it, we're done. If something's off, we revise it until it's right. And if you genuinely hate it, you pay nothing.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                {...stagger(idx * 0.1)}
                className="flex gap-6"
              >
                <div
                  className="text-3xl font-black leading-none tracking-tighter pt-1 shrink-0 w-10"
                  style={{ color: "#bfdbfe" }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#050505] tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — FAQ
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp}
            className="text-xs font-black uppercase tracking-widest mb-12"
            style={{ color: BLUE }}
          >
            Common Questions
          </motion.div>

          <motion.div {...stagger(0.1)}>
            {[
              {
                q: "What if I don't like the design?",
                a: "We revise it — no questions asked. If after revisions you still don't love it, you pay nothing. That's the guarantee. We'd rather earn your trust than keep your $350.",
              },
              {
                q: "What if I need changes later?",
                a: "Minor tweaks (copy edits, updated hours, new phone number) are free within 7 days of launch. For bigger updates after that, we offer affordable one-time change packages.",
              },
              {
                q: "What's actually included for $350?",
                a: "A single-page, conversion-focused website — live on your domain or a subdomain. Includes headline, offer copy, contact/booking CTA, mobile optimization, and hosting setup. No custom web app or e-commerce store — just a page that converts.",
              },
              {
                q: "Do I need to own a domain?",
                a: "You can use your existing domain or we can set you up on a clean subdomain to start. Either way, we handle the technical side.",
              },
            ].map((item, idx) => (
              <FAQItem key={idx} q={item.q} a={item.a} />
            ))}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 — FINAL CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            {...fadeUp}
            className="text-xs font-black uppercase tracking-widest mb-6"
            style={{ color: BLUE }}
          >
            Ready to launch?
          </motion.div>

          <motion.h2
            {...stagger(0.1)}
            className="text-4xl md:text-5xl font-black text-[#050505] tracking-tighter leading-tight mb-5"
          >
            Your site could be live{" "}
            <span style={{ color: BLUE }}>tomorrow morning.</span>
          </motion.h2>

          <motion.p
            {...stagger(0.18)}
            className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl mx-auto mb-12"
          >
            Drop 24 is built for local businesses that are ready to move now —
            not next quarter. One page. One price. Zero risk.
          </motion.p>

          <motion.div {...stagger(0.26)}>
            <CTAButton label="Start My Site" />
          </motion.div>

          <motion.p
            {...stagger(0.34)}
            className="mt-5 text-sm text-slate-400 font-medium"
          >
            You&apos;ll fill out a short form — takes about 5 minutes.
          </motion.p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-7 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center text-slate-400 text-[10px] font-mono uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} DYNASTY LABZ. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </main>
  );
}
