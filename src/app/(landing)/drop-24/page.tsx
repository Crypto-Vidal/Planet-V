"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Zap, Clock, Smartphone, Pen } from "lucide-react";
import { useState, useRef } from "react";

/* ─── Constants ─────────────────────────────────────────────────────────── */
const BLUE = "#3b82f6";

/* ─── Animation Presets ─────────────────────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const stagger = (delay: number) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay },
});

/* ─── Glow Orb ──────────────────────────────────────────────────────────── */
function GlowOrb({ size = 400, color = "rgba(59,130,246,0.12)", className = "" }: {
  size?: number; color?: string; className?: string;
}) {
  return (
    <div
      className={`absolute pointer-events-none rounded-full blur-3xl ${className}`}
      style={{ width: size, height: size, background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
    />
  );
}

/* ─── CTA Button ────────────────────────────────────────────────────────── */
function CTAButton({ label = "Get Started", size = "lg" }: { label?: string; size?: "sm" | "lg" }) {
  const lg = size === "lg";
  return (
    <a
      href="https://calendly.com/vcrypto1991/drop24-meeting"
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center gap-3 font-black text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
        lg ? "px-10 py-5 text-lg" : "px-6 py-3.5 text-sm"
      }`}
      style={{
        background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
        boxShadow: "0 0 32px rgba(59,130,246,0.35), 0 4px 16px rgba(0,0,0,0.4)",
      }}
    >
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.12), transparent 70%)" }}
      />
      <span className="relative">{label}</span>
      <ArrowRight size={lg ? 20 : 16} className="relative group-hover:translate-x-1 transition-transform duration-300" />
    </a>
  );
}

/* ─── FAQ Item ──────────────────────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }} className="last:border-none">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
      >
        <span className="text-base md:text-lg font-bold text-white/90 tracking-tight group-hover:text-blue-400 transition-colors duration-200">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ color: "rgba(59,130,246,0.6)" }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 leading-relaxed font-medium text-sm" style={{ color: "#64748b" }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Recent Work Data ──────────────────────────────────────────────────── */
const recentWork = [
  { name: "Cake Jar Co.", url: "https://cakes-five-eta.vercel.app/", desc: "Bakery & custom desserts — Minneapolis", tag: "Food & Beverage" },
  { name: "The Jamaican Chef", url: "https://vcrypto1991.wixsite.com/jamaican", desc: "Caribbean restaurant & catering", tag: "Restaurant" },
  { name: "Masona Salon", url: "https://masona-salon.vercel.app/", desc: "Luxury beauty studio — Twin Cities", tag: "Beauty & Wellness" },
  { name: "Dynasty Labz", url: "https://planet-v.vercel.app/", desc: "AI & web development agency", tag: "Technology" },
];

/* ─── Work Card ─────────────────────────────────────────────────────────── */
function WorkCard({ item, delay }: { item: typeof recentWork[0]; delay: number }) {
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      {...stagger(delay)}
      className="group block p-6 rounded-2xl transition-all duration-300"
      style={{ border: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.02)" }}
      whileHover={{ borderColor: "rgba(59,130,246,0.35)", backgroundColor: "rgba(59,130,246,0.05)", y: -4 }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{ backgroundColor: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}
        >
          {item.tag}
        </span>
        <ArrowRight size={14} className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" style={{ color: "#60a5fa" }} />
      </div>
      <h3 className="text-lg font-black text-white tracking-tight mb-1">{item.name}</h3>
      <p className="text-sm font-medium" style={{ color: "#64748b" }}>{item.desc}</p>
      <div className="mt-4 text-[10px] font-mono uppercase tracking-widest group-hover:text-blue-400 transition-colors duration-300" style={{ color: "#334155" }}>
        View live site →
      </div>
    </motion.a>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function Drop24Page() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <main style={{ backgroundColor: "#050505", color: "#f8fafc" }} className="min-h-screen">

      {/* SEO */}
      <meta name="description" content="Stop losing customers to outdated sites. We deliver a modern, powerful landing page—guaranteed to convert, or you don't pay. Get a High-Converting Website in 24 Hours." />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Dynasty Labz",
            "@id": "https://planet-v.vercel.app/drop-24",
            url: "https://planet-v.vercel.app/drop-24",
            priceRange: "$350",
          }),
        }}
      />

      {/* ── Sticky Header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 py-4 px-6"
        style={{
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(5,5,5,0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-base italic"
              style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", boxShadow: "0 0 12px rgba(59,130,246,0.5)" }}
            >
              D
            </div>
            <span className="text-base font-black tracking-tighter text-white uppercase">
              Drop<span style={{ color: BLUE }}>24</span>
            </span>
          </div>
          <CTAButton label="Book a Call" size="sm" />
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-32 px-6 overflow-hidden">
        <GlowOrb size={700} color="rgba(59,130,246,0.1)" className="-top-40 left-1/2 -translate-x-1/2" />
        <GlowOrb size={350} color="rgba(99,102,241,0.08)" className="top-1/3 -left-24" />
        <GlowOrb size={280} color="rgba(59,130,246,0.07)" className="bottom-24 -right-16" />

        {/* Subtle noise */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            {...fadeUp}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest"
            style={{ border: "1px solid rgba(59,130,246,0.3)", backgroundColor: "rgba(59,130,246,0.08)", color: "#60a5fa" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Launch Your Business Today
          </motion.div>

          <motion.h1
            {...stagger(0.08)}
            className="text-5xl sm:text-6xl md:text-8xl font-black leading-[1.0] tracking-tighter mb-8"
          >
            Get a
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #93c5fd 0%, #3b82f6 45%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              High-Converting
            </span>
            Website in{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #3b82f6, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              24 Hours.
            </span>
          </motion.h1>

          <motion.p
            {...stagger(0.18)}
            className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-12 font-medium"
            style={{ color: "#94a3b8" }}
          >
            Minneapolis &amp; Twin Cities businesses — stop losing customers to outdated sites. We deliver a modern, powerful landing page—guaranteed to convert,{" "}
            <span className="text-white font-bold">or you don&apos;t pay.</span>{" "}
            No risks, just results.
          </motion.p>

          <motion.div {...stagger(0.28)} className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <CTAButton label="Launch Your Site Now" />
            <a
              href="#recent-work"
              className="text-sm font-medium underline-offset-2 hover:underline transition-colors duration-200"
              style={{ color: "#475569" }}
            >
              See proof first ↓
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div
            className="w-6 h-10 rounded-full border flex items-start justify-center pt-2"
            style={{ borderColor: "rgba(255,255,255,0.12)" }}
          >
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full"
              style={{ backgroundColor: BLUE }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }} className="py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 divide-x" style={{ divideColor: "rgba(255,255,255,0.06)" } as React.CSSProperties}>
          {[
            { value: "24hr", label: "Turnaround" },
            { value: "$350", label: "Flat Rate" },
            { value: "100%", label: "Money-Back" },
          ].map((stat, idx) => (
            <motion.div key={idx} {...stagger(idx * 0.1)} className="text-center px-6">
              <div
                className="text-3xl md:text-4xl font-black tracking-tighter mb-1"
                style={{
                  background: "linear-gradient(135deg, #f8fafc, #94a3b8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#64748b" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          RECENT WORK
      ═══════════════════════════════════════════════════════════════ */}
      <section id="recent-work" className="py-28 px-6 relative overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <GlowOrb size={500} color="rgba(59,130,246,0.07)" className="top-0 right-0 -translate-y-1/2 translate-x-1/4" />

        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: BLUE }}>
            Recent Work
          </motion.div>

          <motion.h2 {...stagger(0.08)} className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-4">
            Sites we&apos;ve built for real businesses.
          </motion.h2>

          <motion.p {...stagger(0.14)} className="text-base font-medium max-w-xl mb-14" style={{ color: "#64748b" }}>
            Every site below is live, built with the same Drop 24 process. Click to see them.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentWork.map((item, idx) => (
              <WorkCard key={item.url} item={item} delay={idx * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THE PROBLEM
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 relative overflow-hidden">
        <GlowOrb size={400} color="rgba(239,68,68,0.04)" className="top-0 right-0" />

        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-xs font-black uppercase tracking-widest mb-10" style={{ color: BLUE }}>
            The Challenge
          </motion.div>

          <div className="space-y-6">
            {[
              { text: "Your business deserves a website that performs, not just exists. Many local businesses struggle with sites that look pretty but fail to turn visitors into valuable leads and customers.", bright: true },
              { text: "You've invested your resources, time, and trust, only to see your website become a digital placeholder—doing little to grow your bottom line.", bright: false },
              { text: "The solution isn't a complex, costly rebuild. It's a precisely crafted, conversion-focused page that clearly communicates your value and guides potential clients to their next step.", bright: false },
            ].map((item, idx) => (
              <motion.p
                key={idx}
                {...stagger(idx * 0.1)}
                className="text-lg md:text-xl leading-relaxed font-medium"
                style={{ color: item.bright ? "#e2e8f0" : "#64748b" }}
              >
                {item.text}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHAT YOU GET
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 relative overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <GlowOrb size={500} color="rgba(59,130,246,0.06)" className="-left-40 top-1/2 -translate-y-1/2" />

        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-xs font-black uppercase tracking-widest mb-14" style={{ color: BLUE }}>
            What You Get
          </motion.div>

          <div className="space-y-3">
            {[
              {
                icon: <Zap size={17} />,
                title: "Conversion-Optimized Landing Page",
                desc: "A single, powerful page designed to capture leads, built around your unique offer and target audience. Clear CTAs for immediate action.",
              },
              {
                icon: <Clock size={17} />,
                title: "Delivered in 24 Hours",
                desc: "From your information to a live URL in just one day. No endless discovery calls or design revisions—get online, fast.",
              },
              {
                icon: <Smartphone size={17} />,
                title: "Flawless Mobile Experience",
                desc: "With over 70% of local searches on mobile, your page is engineered to look and perform perfectly on any device, ensuring no lost opportunities.",
              },
              {
                icon: <Pen size={17} />,
                title: "Expertly Written Copy",
                desc: "Forget content creation. Our team crafts compelling headlines, subheadlines, and calls-to-action proven to resonate with your customers.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                {...stagger(idx * 0.08)}
                className="group flex gap-5 p-5 rounded-2xl transition-all duration-300 cursor-default"
                style={{ border: "1px solid rgba(255,255,255,0.05)", backgroundColor: "rgba(255,255,255,0.02)" }}
                whileHover={{ borderColor: "rgba(59,130,246,0.28)", backgroundColor: "rgba(59,130,246,0.04)" }}
              >
                <div
                  className="shrink-0 mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ border: "1px solid rgba(59,130,246,0.3)", backgroundColor: "rgba(59,130,246,0.1)", color: "#60a5fa" }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-black text-white tracking-tight mb-1.5">{item.title}</h3>
                  <p className="text-sm leading-relaxed font-medium" style={{ color: "#64748b" }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pricing callout */}
          <motion.div
            {...stagger(0.4)}
            className="mt-12 p-8 rounded-2xl relative overflow-hidden"
            style={{
              border: "1px solid rgba(59,130,246,0.2)",
              background: "linear-gradient(135deg, rgba(59,130,246,0.07) 0%, rgba(99,102,241,0.04) 100%)",
            }}
          >
            <GlowOrb size={280} color="rgba(59,130,246,0.1)" className="-right-16 -top-16" />
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: BLUE }}>The Price</div>
                <div className="text-5xl md:text-6xl font-black tracking-tighter text-white">
                  $350{" "}
                  <span className="text-xl font-medium" style={{ color: "#334155" }}>flat</span>
                </div>
                <p className="mt-2 text-sm font-medium" style={{ color: "#475569" }}>One-time. No monthly fees. No hidden costs.</p>
              </div>
              <div
                className="shrink-0 text-center px-8 py-5 rounded-2xl font-black text-white text-lg leading-snug"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  boxShadow: "0 0 40px rgba(59,130,246,0.3)",
                }}
              >
                24hr
                <br />
                <span className="text-sm font-medium opacity-75">turnaround</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 relative overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <GlowOrb size={400} color="rgba(99,102,241,0.06)" className="-right-32 top-1/2 -translate-y-1/2" />

        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-xs font-black uppercase tracking-widest mb-14" style={{ color: BLUE }}>
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
                desc: "Review your live site. If you love it, we're done! If it needs tweaks, we refine until perfect. And if it doesn't meet your standards, you owe us nothing.",
              },
            ].map((item, idx) => (
              <motion.div key={idx} {...stagger(idx * 0.1)} className="flex gap-6 relative">
                {idx < 2 && (
                  <div
                    className="absolute left-[17px] top-11 w-px h-12"
                    style={{ background: "linear-gradient(to bottom, rgba(59,130,246,0.25), transparent)" }}
                  />
                )}
                <div
                  className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black"
                  style={{ border: "1px solid rgba(59,130,246,0.35)", backgroundColor: "rgba(59,130,246,0.08)", color: "#60a5fa" }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-black text-white tracking-tight mb-2">{item.title}</h3>
                  <p className="leading-relaxed font-medium text-sm md:text-base" style={{ color: "#64748b" }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-xs font-black uppercase tracking-widest mb-14" style={{ color: BLUE }}>
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
                a: "You receive a high-impact, single-page website specifically engineered for conversion. This includes compelling headlines, persuasive offer copy, a clear call-to-action for bookings or inquiries, mobile-responsive design, and comprehensive hosting setup.",
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

      {/* ═══════════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 relative overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <GlowOrb size={700} color="rgba(59,130,246,0.09)" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <GlowOrb size={320} color="rgba(99,102,241,0.08)" className="-bottom-20 -left-16" />
        <GlowOrb size={250} color="rgba(59,130,246,0.06)" className="-top-10 right-10" />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            {...fadeUp}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest"
            style={{ border: "1px solid rgba(59,130,246,0.3)", backgroundColor: "rgba(59,130,246,0.08)", color: "#60a5fa" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Don&apos;t Wait, Elevate
          </motion.div>

          <motion.h2
            {...stagger(0.1)}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-6 text-white"
          >
            Your new site could be
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #93c5fd 0%, #3b82f6 50%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              live tomorrow morning.
            </span>
          </motion.h2>

          <motion.p
            {...stagger(0.18)}
            className="text-lg leading-relaxed max-w-xl mx-auto mb-12 font-medium"
            style={{ color: "#94a3b8" }}
          >
            Drop 24 is built for Minneapolis and Twin Cities businesses ready to act now. Zero upfront risk. Maximum impact.
          </motion.p>

          <motion.div {...stagger(0.26)}>
            <CTAButton label="Get Started Today" />
          </motion.div>

          <motion.p {...stagger(0.34)} className="mt-5 text-sm font-medium" style={{ color: "#334155" }}>
            Our simple onboarding form takes just 5 minutes.
          </motion.p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-7 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto text-center space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: "#334155" }}>
            DYNASTY LABZ · MINNEAPOLIS, MN
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: "#1e293b" }}>
            &copy; {new Date().getFullYear()} DYNASTY LABZ. ALL RIGHTS RESERVED.
          </div>
          <div className="text-[10px] font-mono" style={{ color: "#1e293b" }}>
            <a href="/drop-24/intake" className="hover:text-blue-400 transition-colors duration-200">
              Start your project →
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
