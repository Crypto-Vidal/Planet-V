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
            className="mb-6 text-xs font-black uppercase tracking-widest"
            style={{ color: BLUE }}>
            Launch Your Business Today
          </motion.div>

          <motion.h1
            {...stagger(0.08)}
            className="text-5xl md:text-7xl font-black text-[#050505] leading-[1.05] tracking-tighter mb-6">
            Get a High-Converting Website
            <span style={{ color: BLUE }}> in 24 Hours.</span>
          </motion.h1>

          <motion.p
            {...stagger(0.18)}
            className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-xl mx-auto mb-12">
            Stop losing customers to outdated sites. We deliver a modern, powerful landing page—guaranteed to convert, or you don't pay. No risks, just results.
          </motion.p>

          <motion.div {...stagger(0.28)}>
            <CTAButton label="Launch Your Site Now" />
          </motion.div>

          <motion.p
            {...stagger(0.36)}
            className="mt-5 text-sm text-slate-400 font-medium">
            Limited spots available. Secure your slot and get online fast.
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
            style={{ color: BLUE }}>
            The Challenge
          </motion.div>

          <motion.div
            {...stagger(0.1)}
            className="space-y-5 text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
            <p>
              Your business deserves a website that performs, not just exists.
              Many local businesses struggle with sites that look pretty but fail to turn visitors into valuable leads and customers.
            </p>
            <p>
              You've invested your resources, time, and trust, only to see your website become a digital placeholder—doing little to grow your bottom line.
            </p>
            <p>
              The solution isn't a complex, costly rebuild. It's a precisely crafted, conversion-focused page that clearly communicates your value and guides potential clients to their next step.
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
                title: "Conversion-Optimized Landing Page",
                desc: "A single, powerful page designed to capture leads, built around your unique offer and target audience. Clear CTAs for immediate action.",
              },
              {
                title: "Delivered in 24 Hours",
                desc: "From your information to a live URL in just one day. No endless discovery calls or design revisions—get online, fast.",
              },
              {
                title: "Flawless Mobile Experience",
                desc: "With over 70% of local searches on mobile, your page is engineered to look and perform perfectly on any device, ensuring no lost opportunities.",
              },
              {
                title: "Expertly Written Copy",
                desc: "Forget content creation. Our team crafts compelling headlines, subheadlines, and calls-to-action proven to resonate with your customers.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                {...stagger(idx * 0.08)}
                className="flex gap-5">
                <div
                  className="mt-1 w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: BLUE }}>
                  <Check size={12} className="text-white" />
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
                title: "Provide Your Business Details",
                desc: "Share key information about your business, what you offer, your unique selling proposition, and contact preferences. Our streamlined form takes only 5 minutes.",
              },
              {
                step: "02",
                title: "We Design & Launch in 24 Hours",
                desc: "Our expert team crafts compelling copy and modern design, then launches your site. No revisions until you see the live result, maximizing speed and efficiency.",
              },
              {
                step: "03",
                title: "Approve or Request Revisions",
                desc: "Review your live site. If you love it, we're done! If it needs tweaks, we refine until perfect. And if it doesn't meet your standards, you owe us nothing. Your satisfaction is our guarantee.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                {...stagger(idx * 0.1)}
                className="flex gap-6">
                <div
                  className="text-3xl font-black leading-none tracking-tighter pt-1 shrink-0 w-10"
                  style={{ color: \"#3b82f6\" }}>
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
            Frequently Asked Questions
          </motion.div>

          <motion.div {...stagger(0.1)}>
            {[
              {
                q: "What if I'm not satisfied with the design?",
                a: "Your satisfaction is our priority. We offer revisions until you're delighted with your new site. And if, even after adjustments, you're not completely happy, you don't pay a dime. Our goal is to earn your trust, not just your payment.",
              },
              {
                q: "What if I need updates or changes after launch?",
                a: "Minor content tweaks (e.g., updated hours, new contact info) are complimentary within 7 days post-launch. For more significant updates down the road, we provide transparent, affordable one-time service packages tailored to your needs.",
              },
              {
                q: "What precisely is included in the $350 package?",
                a: "You receive a high-impact, single-page website specifically engineered for conversion. This includes compelling headlines, persuasive offer copy, a clear call-to-action for bookings or inquiries, mobile-responsive design, and comprehensive hosting setup. This package focuses exclusively on generating leads, not on custom web applications or e-commerce functionalities.",
              },
              {
                q: "Do I need to already own a domain name?",
                a: "Not necessarily. You can leverage your existing domain, or we can seamlessly integrate your new site onto a clean subdomain. We manage all the technical configurations, ensuring a smooth online presence.",
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
            Don't Wait, Elevate Your Online Presence
          </motion.div>

          <motion.h2
            {...stagger(0.1)}
            className="text-4xl md:text-5xl font-black text-[#050505] tracking-tighter leading-tight mb-5"
          >
            Your new, high-converting site
            <span style={{ color: BLUE }}> could be live tomorrow morning.</span>
          </motion.h2>

          <motion.p
            {...stagger(0.18)}
            className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl mx-auto mb-12"
          >
            Drop 24 is designed for ambitious local businesses ready to act now. Get a professional, effective online presence with zero upfront risk and maximum impact.
          </motion.p>

          <motion.div {...stagger(0.26)}>
            <CTAButton label="Get Started Today" />
          </motion.div>

          <motion.p
            {...stagger(0.34)}
            className="mt-5 text-sm text-slate-400 font-medium"
          >
            Our simple onboarding form takes just 5 minutes.
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
