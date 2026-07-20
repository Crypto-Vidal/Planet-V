"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Menu, X, Sparkles, Code2, Megaphone, Zap,
  Check, Star, ArrowUpRight, Mail, Globe, MapPin,
} from "lucide-react";
import { useState, useRef, useEffect, ReactNode } from "react";
import {
  BLUE, fadeUp, stagger, GlowOrb, Eyebrow,
  CTAButton, GhostButton, CountUp, FAQItem, Section,
} from "@/components/home/ui";
import { SERVICES, OFFERS, PLANS, FAQS } from "@/lib/content";

/* Map content icon keys → lucide components (keeps content.ts free of JSX) */
const SERVICE_ICONS: Record<string, ReactNode> = {
  code: <Code2 size={20} />,
  sparkles: <Sparkles size={20} />,
  megaphone: <Megaphone size={20} />,
};

/* ════════════════════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════════════════════ */

const NAV = [
  { name: "Services", href: "#services" },
  { name: "Offers", href: "#offers" },
  { name: "Pricing", href: "#pricing" },
  { name: "Work", href: "#work" },
  { name: "FAQ", href: "#faq" },
];

const STATS = [
  { value: 24, suffix: "hr", label: "Website turnaround" },
  { value: 350, prefix: "$", label: "To get online" },
  { value: 24, suffix: "/7", label: "Your AI never sleeps" },
  { value: 100, suffix: "%", label: "Love it or you don't pay" },
];

const WORK = [
  {
    name: "Masona Salon",
    url: "https://masona-salon.vercel.app/",
    desc: "Luxury beauty studio — real-time booking & admin dashboard",
    tag: "Beauty & Wellness",
    image: "/drop24-previews/masona-salon-site.png",
  },
  {
    name: "Cake Jar Co.",
    url: "https://cakes-five-eta.vercel.app/",
    desc: "Bakery & custom desserts — Minneapolis storefront",
    tag: "Food & Beverage",
    image: "/drop24-previews/cake-jar-site.png",
  },
  {
    name: "The Jamaican Chef",
    url: "https://vcrypto1991.wixsite.com/jamaican",
    desc: "Caribbean restaurant & catering — bookings + menus",
    tag: "Restaurant",
    image: "/drop24-previews/jamaican-chef-site.png",
  },
  {
    name: "Dynasty Labz",
    url: "https://planet-v.vercel.app/drop-24",
    desc: "Drop 24 — our own 24-hour landing-page product",
    tag: "AI & Web",
    image: "/drop24-previews/planet-v-site.png",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery call",
    desc: "A focused 30 minutes. We map where your time goes, what's leaking revenue, and which one system would change the most — fast.",
  },
  {
    step: "02",
    title: "We design & build",
    desc: "You get back to running your business. We craft the site, copy, and automations, and bring you a working result — not a pile of mockups.",
  },
  {
    step: "03",
    title: "Launch",
    desc: "We ship it live, wire up the integrations, and make sure it performs on every device before it ever touches a customer.",
  },
  {
    step: "04",
    title: "We maintain & improve",
    desc: "On a partnership plan we keep everything running and getting better every month — so the system compounds instead of going stale.",
  },
];

/* ════════════════════════════════════════════════════════════════════════
   HEADER
   ════════════════════════════════════════════════════════════════════════ */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? "blur(20px)" : "none",
        backgroundColor: scrolled ? "rgba(5,5,5,0.82)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        paddingTop: scrolled ? 14 : 22,
        paddingBottom: scrolled ? 14 : 22,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-lg italic"
            style={{ background: "linear-gradient(135deg, #2f88ff, #7cb2ff)", boxShadow: "0 0 14px rgba(47,136,255,0.5)" }}
          >
            D
          </div>
          <span className="text-lg font-black tracking-tighter text-white uppercase">
            Dynasty <span style={{ color: BLUE }}>Labz</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className="text-xs font-black uppercase tracking-[0.18em] text-white/55 hover:text-white transition-colors duration-200"
            >
              {l.name}
            </a>
          ))}
          <CTAButton label="Book a Call" size="sm" />
        </nav>

        <button className="md:hidden text-white p-1" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ backgroundColor: "rgba(5,5,5,0.97)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex flex-col p-6 gap-5">
              {NAV.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-bold text-white/80 hover:text-blue-400 transition-colors"
                >
                  {l.name}
                </a>
              ))}
              <CTAButton label="Book a Discovery Call" size="sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Mouse-follow glow
  const [pos, setPos] = useState({ x: 0.5, y: 0.4 });
  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-28 px-6 overflow-hidden"
    >
      {/* aurora grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 35%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 35%, black 30%, transparent 75%)",
        }}
      />
      <GlowOrb size={760} color="rgba(47,136,255,0.12)" className="-top-48 left-1/2 -translate-x-1/2" />
      <GlowOrb size={420} color="rgba(47,136,255,0.10)" className="top-1/4 -left-32" />
      <GlowOrb size={340} color="rgba(47,136,255,0.10)" className="bottom-24 -right-20" />
      {/* mouse glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(420px circle at ${pos.x * 100}% ${pos.y * 100}%, rgba(47,136,255,0.10), transparent 70%)`,
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          {...fadeUp}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest"
          style={{ border: "1px solid rgba(47,136,255,0.3)", backgroundColor: "rgba(47,136,255,0.08)", color: "#60a5fa" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Minneapolis Web Design + AI Automation
        </motion.div>

        <motion.h1
          {...stagger(0.08)}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.98] tracking-tighter mb-8"
        >
          Win more customers
          <span
            className="block"
            style={{
              background: "linear-gradient(120deg, #ffffff 0%, #2f88ff 40%, #7cb2ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            without working more hours.
          </span>
        </motion.h1>

        <motion.p
          {...stagger(0.18)}
          className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-11 font-medium"
          style={{ color: "#94a3b8" }}
        >
          We build modern websites that turn visitors into booked customers — and set up AI to handle
          the follow-ups, scheduling, and busywork behind the scenes. For Minneapolis businesses{" "}
          <span className="text-white font-bold">ready to grow without burning out.</span>
        </motion.p>

        <motion.div {...stagger(0.28)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTAButton label="Book a Free Discovery Call" />
          <GhostButton label="See our work" href="#work" />
        </motion.div>

        <motion.p {...stagger(0.38)} className="mt-7 text-xs font-medium" style={{ color: "#475569" }}>
          Websites from $350, live in 24 hours. If you don&apos;t love it, you don&apos;t pay.
        </motion.p>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border flex items-start justify-center pt-2" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full"
            style={{ backgroundColor: BLUE }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STATS
   ════════════════════════════════════════════════════════════════════════ */
function Stats() {
  return (
    <section
      className="py-12 px-6"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-10">
        {STATS.map((s, i) => (
          <motion.div key={i} {...stagger(i * 0.08)} className="text-center px-4 md:border-r md:last:border-r-0" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <div
              className="text-3xl md:text-4xl font-black tracking-tighter mb-1"
              style={{ background: "linear-gradient(135deg, #f8fafc, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              <CountUp to={s.value} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#64748b" }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PROBLEM
   ════════════════════════════════════════════════════════════════════════ */
function Problem() {
  const lines = [
    { t: "You're great at what you do. But the website is slow, the phone rings while you're with a customer, and half your leads never hear back.", bright: true },
    { t: "Every missed call and every lead that goes cold is money walking out the door — and you can't be in two places at once.", bright: false },
    { t: "We fix that. A website that books customers for you, and AI that replies and follows up the moment someone's interested — so nothing slips through the cracks.", bright: false },
  ];
  return (
    <Section>
      <GlowOrb size={420} color="rgba(47,136,255,0.06)" className="top-0 right-0" />
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeUp}>
          <Eyebrow className="mb-10">Sound familiar?</Eyebrow>
        </motion.div>
        <div className="space-y-6">
          {lines.map((l, i) => (
            <motion.p
              key={i}
              {...stagger(i * 0.1)}
              className="text-xl md:text-2xl leading-relaxed font-medium"
              style={{ color: l.bright ? "#e2e8f0" : "#64748b" }}
            >
              {l.t}
            </motion.p>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SERVICES
   ════════════════════════════════════════════════════════════════════════ */
function Services() {
  return (
    <Section id="services">
      <GlowOrb size={500} color="rgba(47,136,255,0.06)" className="-left-40 top-1/3" />
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp}>
          <Eyebrow className="mb-4">What we do</Eyebrow>
        </motion.div>
        <motion.h2 {...stagger(0.06)} className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4 max-w-2xl">
          Get more customers. Do less of the busywork.
        </motion.h2>
        <motion.p {...stagger(0.12)} className="text-base md:text-lg font-medium max-w-xl mb-14" style={{ color: "#64748b" }}>
          Start with one. Most owners add the others once they see the calls and bookings come in.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <motion.a
              key={s.title}
              href={s.href}
              {...stagger(i * 0.1)}
              whileHover={{ y: -6, borderColor: "rgba(47,136,255,0.35)" }}
              className="group p-8 rounded-2xl transition-colors duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.015)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ border: "1px solid rgba(47,136,255,0.3)", backgroundColor: "rgba(47,136,255,0.1)", color: "#60a5fa" }}
              >
                {SERVICE_ICONS[s.icon]}
              </div>
              <h3 className="text-xl font-black text-white tracking-tight mb-3">{s.title}</h3>
              <p className="text-sm leading-relaxed font-medium mb-7" style={{ color: "#94a3b8" }}>
                {s.desc}
              </p>
              <ul className="space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest" style={{ color: "#64748b" }}>
                    <Check size={13} style={{ color: BLUE }} />
                    {p}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-400">See details <ArrowRight size={14} /></span>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   OFFER LADDER
   ════════════════════════════════════════════════════════════════════════ */
function Offers() {
  return (
    <Section id="offers">
      <GlowOrb size={520} color="rgba(47,136,255,0.07)" className="top-0 right-0 translate-x-1/4" />
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp}>
          <Eyebrow className="mb-4">Packages</Eyebrow>
        </motion.div>
        <motion.h2 {...stagger(0.06)} className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4 max-w-2xl">
          Start small. Scale when it pays for itself.
        </motion.h2>
        <motion.p {...stagger(0.12)} className="text-base md:text-lg font-medium max-w-xl mb-14" style={{ color: "#64748b" }}>
          Clear packages, priced in plain English. Start where it makes sense today — move up when you&apos;re ready.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {OFFERS.map((o, i) => (
            <motion.div
              key={o.n}
              {...stagger(i * 0.08)}
              whileHover={{ y: -6 }}
              className="group relative p-8 rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                border: o.best ? "1px solid rgba(47,136,255,0.4)" : "1px solid rgba(255,255,255,0.07)",
                background: o.best
                  ? "linear-gradient(135deg, rgba(47,136,255,0.10), rgba(47,136,255,0.05))"
                  : "rgba(255,255,255,0.015)",
              }}
            >
              {o.best && <GlowOrb size={260} color="rgba(47,136,255,0.16)" className="-right-12 -top-12" />}
              {o.best && (
                <div
                  className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                  style={{ backgroundColor: "rgba(47,136,255,0.18)", color: "#93c5fd", border: "1px solid rgba(47,136,255,0.35)" }}
                >
                  <Star size={11} /> Most popular
                </div>
              )}
              <div className="relative">
                <div className="text-5xl font-black tracking-tighter mb-5" style={{ color: "rgba(255,255,255,0.10)" }}>{o.n}</div>
                <h3 className="text-2xl font-black text-white tracking-tight mb-2">{o.name}</h3>
                <div
                  className="text-lg font-black mb-4"
                  style={{ background: "linear-gradient(90deg, #60a5fa, #7cb2ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  {o.price}
                </div>
                <p className="text-sm leading-relaxed font-medium mb-7 max-w-md" style={{ color: "#94a3b8" }}>
                  {o.blurb}
                </p>
                <a
                  href={o.href}
                  {...(o.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-blue-400 transition-colors"
                >
                  {o.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PRICING (monthly partnerships, with toggle)
   ════════════════════════════════════════════════════════════════════════ */
function Pricing() {
  const [mode, setMode] = useState<"project" | "monthly">("monthly");

  return (
    <Section id="pricing">
      <GlowOrb size={620} color="rgba(47,136,255,0.07)" className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.div {...fadeUp}>
            <Eyebrow className="mb-4">Pricing</Eyebrow>
          </motion.div>
          <motion.h2 {...stagger(0.06)} className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-6">
            Pay once, or partner monthly.
          </motion.h2>

          {/* toggle */}
          <motion.div {...stagger(0.12)} className="inline-flex p-1 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.03)" }}>
            {(["project", "monthly"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="relative px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-colors duration-300"
                style={{ color: mode === m ? "#fff" : "#64748b" }}
              >
                {mode === m && (
                  <motion.span
                    layoutId="toggle-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(135deg, #2f88ff, #7cb2ff)", boxShadow: "0 0 24px rgba(47,136,255,0.4)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{m === "project" ? "One-time projects" : "Monthly partnership"}</span>
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {mode === "monthly" ? (
            <div>
            <motion.div
              key="monthly"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {PLANS.map((p) => (
                <div
                  key={p.name}
                  className="relative p-7 rounded-2xl flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1.5"
                  style={{
                    border: p.best ? "1px solid rgba(47,136,255,0.45)" : "1px solid rgba(255,255,255,0.07)",
                    background: p.best ? "linear-gradient(160deg, rgba(47,136,255,0.12), rgba(47,136,255,0.05))" : "rgba(255,255,255,0.015)",
                  }}
                >
                  {p.best && <GlowOrb size={240} color="rgba(47,136,255,0.18)" className="-right-10 -top-10" />}
                  {p.tag && (
                    <div className="relative inline-flex self-start items-center gap-1.5 mb-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" style={{ backgroundColor: "rgba(47,136,255,0.18)", color: "#93c5fd", border: "1px solid rgba(47,136,255,0.35)" }}>
                      <Star size={10} /> {p.tag}
                    </div>
                  )}
                  <h3 className="relative text-sm font-black uppercase tracking-wide text-white mb-3 leading-snug min-h-[2.5rem]">{p.name}</h3>
                  <div className="relative flex items-end gap-1 mb-4">
                    <span className="text-4xl font-black tracking-tighter text-white">{p.price}</span>
                    <span className="text-sm font-bold mb-1" style={{ color: "#475569" }}>{p.cadence}</span>
                  </div>
                  <p className="relative text-xs leading-relaxed font-medium mb-6" style={{ color: "#94a3b8" }}>{p.blurb}</p>
                  <ul className="relative space-y-2.5 mb-7 flex-1">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-xs font-medium" style={{ color: "#cbd5e1" }}>
                        <Check size={14} className="shrink-0 mt-0.5" style={{ color: BLUE }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`/start?plan=${p.slug}`}
                    className="relative text-center py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300"
                    style={
                      p.best
                        ? { background: "linear-gradient(135deg, #2f88ff, #7cb2ff)", color: "#fff", boxShadow: "0 0 24px rgba(47,136,255,0.3)" }
                        : { border: "1px solid rgba(255,255,255,0.12)", color: "#e2e8f0", backgroundColor: "rgba(255,255,255,0.02)" }
                    }
                  >
                    Get started
                  </a>
                </div>
              ))}
            </motion.div>
            <p className="mt-6 text-center text-xs leading-relaxed" style={{ color: "#64748b" }}>
              Month-to-month. Cancel before renewal. Unused time does not roll over. Third-party software and new custom builds are billed separately.
            </p>
            </div>
          ) : (
            <motion.div
              key="project"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {OFFERS.map((o) => (
                <div
                  key={o.n}
                  className="relative p-7 rounded-2xl flex flex-col transition-transform duration-300 hover:-translate-y-1.5"
                  style={{ border: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.015)" }}
                >
                  <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#475569" }}>{o.n}</div>
                  <h3 className="text-base font-black text-white mb-3 leading-snug min-h-[2.5rem]">{o.name}</h3>
                  <div className="text-2xl font-black tracking-tighter mb-4" style={{ background: "linear-gradient(90deg, #60a5fa, #7cb2ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {o.price}
                  </div>
                  <p className="text-xs leading-relaxed font-medium mb-7 flex-1" style={{ color: "#94a3b8" }}>{o.blurb}</p>
                  <a
                    href={o.href}
                    {...(o.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-center py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300"
                    style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#e2e8f0", backgroundColor: "rgba(255,255,255,0.02)" }}
                  >
                    {o.cta}
                  </a>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center mt-10 text-xs font-medium" style={{ color: "#475569" }}>
          Not sure which fits? A 30-minute call sorts it in plain English — no pressure, no jargon.
        </p>
      </div>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   WORK
   ════════════════════════════════════════════════════════════════════════ */
function WorkCard({ item, delay }: { item: typeof WORK[number]; delay: number }) {
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      {...stagger(delay)}
      whileHover={{ y: -6 }}
      className="group block p-5 rounded-2xl transition-colors duration-300"
      style={{ border: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.015)" }}
    >
      <div
        className="relative aspect-video rounded-xl overflow-hidden mb-5"
        style={{ border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(2,6,23,0.95))" }}
      >
        <div
          role="img"
          aria-label={`${item.name} website preview`}
          className="absolute inset-0 bg-cover bg-top transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-white/5" />
        <div className="absolute top-3 left-3 right-3 h-5 rounded-full bg-black/55 backdrop-blur-md border border-white/10 flex items-center gap-1.5 px-3">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="ml-2 text-[8px] font-mono uppercase tracking-widest truncate" style={{ color: "#94a3b8" }}>Live Preview</span>
        </div>
      </div>
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(47,136,255,0.12)", color: "#60a5fa", border: "1px solid rgba(47,136,255,0.2)" }}>
          {item.tag}
        </span>
        <ArrowUpRight size={15} className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ color: "#60a5fa" }} />
      </div>
      <h3 className="text-lg font-black text-white tracking-tight mb-1">{item.name}</h3>
      <p className="text-sm font-medium" style={{ color: "#64748b" }}>{item.desc}</p>
    </motion.a>
  );
}

function Work() {
  return (
    <Section id="work">
      <GlowOrb size={500} color="rgba(47,136,255,0.06)" className="top-0 right-0 -translate-y-1/3 translate-x-1/4" />
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp}>
          <Eyebrow className="mb-4">Recent work</Eyebrow>
        </motion.div>
        <motion.h2 {...stagger(0.06)} className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4 max-w-2xl">
          Real sites, live for real businesses.
        </motion.h2>
        <motion.p {...stagger(0.12)} className="text-base md:text-lg font-medium max-w-xl mb-14" style={{ color: "#64748b" }}>
          Every site below is shipped and running. Click any one to see it live.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {WORK.map((item, i) => (
            <WorkCard key={item.url} item={item} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PROCESS
   ════════════════════════════════════════════════════════════════════════ */
function Process() {
  return (
    <Section>
      <GlowOrb size={420} color="rgba(47,136,255,0.06)" className="-right-32 top-1/2" />
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeUp}>
          <Eyebrow className="mb-4">How it works</Eyebrow>
        </motion.div>
        <motion.h2 {...stagger(0.06)} className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-14">
          Four steps. Then it runs.
        </motion.h2>
        <div className="space-y-10">
          {PROCESS.map((p, i) => (
            <motion.div key={p.step} {...stagger(i * 0.08)} className="flex gap-6 relative">
              {i < PROCESS.length - 1 && (
                <div className="absolute left-[17px] top-11 w-px h-[calc(100%+0.5rem)]" style={{ background: "linear-gradient(to bottom, rgba(47,136,255,0.3), transparent)" }} />
              )}
              <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black" style={{ border: "1px solid rgba(47,136,255,0.35)", backgroundColor: "rgba(47,136,255,0.08)", color: "#60a5fa" }}>
                {p.step}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-white tracking-tight mb-2">{p.title}</h3>
                <p className="leading-relaxed font-medium text-sm md:text-base" style={{ color: "#94a3b8" }}>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   FAQ
   ════════════════════════════════════════════════════════════════════════ */
function FAQ() {
  return (
    <Section id="faq">
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeUp}>
          <Eyebrow className="mb-4">FAQ</Eyebrow>
        </motion.div>
        <motion.h2 {...stagger(0.06)} className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-12">
          Questions business owners ask.
        </motion.h2>
        <motion.div {...stagger(0.1)}>
          {FAQS.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   FINAL CTA
   ════════════════════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <Section className="py-32">
      <GlowOrb size={760} color="rgba(47,136,255,0.1)" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <GlowOrb size={340} color="rgba(47,136,255,0.09)" className="-bottom-20 -left-16" />
      <GlowOrb size={280} color="rgba(47,136,255,0.07)" className="-top-10 right-10" />
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          {...fadeUp}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest"
          style={{ border: "1px solid rgba(47,136,255,0.3)", backgroundColor: "rgba(47,136,255,0.08)", color: "#60a5fa" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Limited intake this quarter
        </motion.div>
        <motion.h2 {...stagger(0.08)} className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-6 text-white">
          Let&apos;s find the one system
          <span
            className="block"
            style={{ background: "linear-gradient(120deg, #ffffff 0%, #2f88ff 50%, #7cb2ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            that buys back your week.
          </span>
        </motion.h2>
        <motion.p {...stagger(0.16)} className="text-lg leading-relaxed max-w-xl mx-auto mb-11 font-medium" style={{ color: "#94a3b8" }}>
          Thirty focused minutes. We map your bottleneck and the fastest path to fix it — whether or not we end up working together.
        </motion.p>
        <motion.div {...stagger(0.24)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTAButton label="Book a Discovery Call" />
          <GhostButton label="Get online in 24 hours" href="/drop-24" />
        </motion.div>
      </div>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-14 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-base italic" style={{ background: "linear-gradient(135deg, #2f88ff, #7cb2ff)" }}>D</div>
              <span className="text-lg font-black tracking-tighter text-white uppercase">Dynasty <span style={{ color: BLUE }}>Labz</span></span>
            </div>
            <p className="text-sm font-medium max-w-sm leading-relaxed mb-5" style={{ color: "#64748b" }}>
              Custom AI automation, high-converting websites, and digital employees for businesses ready to grow without working more hours.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium" style={{ color: "#475569" }}>
              <MapPin size={13} style={{ color: BLUE }} /> Minneapolis &amp; Twin Cities, MN
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-white/80 mb-5">Explore</h4>
            <ul className="space-y-3 text-sm font-medium" style={{ color: "#64748b" }}>
              {NAV.map((l) => (
                <li key={l.name}><a href={l.href} className="hover:text-blue-400 transition-colors">{l.name}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-white/80 mb-5">Start</h4>
            <ul className="space-y-3 text-sm font-medium" style={{ color: "#64748b" }}>
              <li><a href="/start" className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"><Mail size={13} /> Book a discovery call</a></li>
              <li><a href="/drop-24" className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"><Zap size={13} /> Get online in 24 hours</a></li>
              <li><a href="#work" className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"><Globe size={13} /> See recent work</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: "#334155" }}>
            &copy; {new Date().getFullYear()} Dynasty Labz · Minneapolis, MN
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: "#334155" }}>
            Built to grow · Not just to exist
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SCROLL PROGRESS
   ════════════════════════════════════════════════════════════════════════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg, #2f88ff, #2f88ff, #7cb2ff)" }}
    />
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main id="top" style={{ backgroundColor: "#050505", color: "#f8fafc" }} className="min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Header />
      <Hero />
      <Stats />
      <Problem />
      <Services />
      <Offers />
      <Pricing />
      <Work />
      <Process />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
