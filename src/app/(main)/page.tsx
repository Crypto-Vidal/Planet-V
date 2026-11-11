"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  Menu, X, Zap, Check, ArrowUpRight, Mail, Globe, MapPin, Clock, ShieldCheck, Target,
  Inbox, CalendarClock, Receipt, Star, MessagesSquare, Table2,
} from "lucide-react";
import { useState, useRef, useEffect, ReactNode } from "react";
import {
  BLUE, fadeUp, stagger, GlowOrb, Eyebrow,
  CTAButton, GhostButton, CountUp, FAQItem, Section,
} from "@/components/home/ui";
import { SERVICES, OFFER, CARE, FAQS, START, WORK, LABZ, type WorkItem } from "@/lib/content";
import LeadFeed from "@/components/home/LeadFeed";
import TimeCalculator from "@/components/home/TimeCalculator";

/* Map content icon keys → lucide components (keeps content.ts free of JSX) */
const SERVICE_ICONS: Record<string, ReactNode> = {
  inbox: <Inbox size={20} />,
  calendar: <CalendarClock size={20} />,
  receipt: <Receipt size={20} />,
  star: <Star size={20} />,
  chat: <MessagesSquare size={20} />,
  table: <Table2 size={20} />,
};

/* ════════════════════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════════════════════ */

const NAV = [
  { name: "What we automate", href: "#tasks" },
  { name: "The offer", href: "#offer" },
  { name: "How it works", href: "#how" },
  { name: "Work", href: "#work" },
  { name: "FAQ", href: "#faq" },
];

const STATS = [
  { value: OFFER.days, suffix: " days", label: "From access to live" },
  { value: OFFER.priceFrom, prefix: "$", label: "Flat. No hourly meter" },
  { value: 1, suffix: " task", label: "Off your plate for good" },
  { value: 24, suffix: "/7", label: "It never clocks out" },
];

const BUSINESS_TYPES = ["Salons", "Restaurants", "Contractors", "Clinics", "Retail shops", "Agencies", "Gyms", "Bakeries", "Law offices", "Real estate"];

const PROCESS = [
  {
    step: "01",
    title: "Answer 5 questions",
    desc: "Two minutes. Tell me what kind of business you run and which task is eating your week.",
  },
  {
    step: "02",
    title: "20-minute call",
    desc: "We pick the one task, map exactly how you do it today, and you hand over access to the tools it runs on. That starts the clock.",
  },
  {
    step: "03",
    title: "I build it in 7 days",
    desc: "You keep running your business. I build the automation, test it on your real work, and walk you through what it does.",
  },
  {
    step: "04",
    title: "It runs itself",
    desc: "The task is off your plate. You get 30 days of fixes and tune-ups, and the option to have it monitored after that.",
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

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className="text-xs font-black uppercase tracking-[0.18em] text-white/55 hover:text-white transition-colors duration-200"
            >
              {l.name}
            </a>
          ))}
          <CTAButton label={START.label} href={START.href} size="sm" />
        </nav>

        <button className="lg:hidden text-white p-1" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
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
              <CTAButton label={START.label} href={START.href} size="sm" />
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

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-center gap-14 lg:gap-10">
        <div className="text-center lg:text-left">
        <motion.div
          {...fadeUp}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest"
          style={{ border: "1px solid rgba(47,136,255,0.3)", backgroundColor: "rgba(47,136,255,0.08)", color: "#60a5fa" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Minneapolis · AI for small business
        </motion.div>

        <motion.h1
          {...stagger(0.08)}
          className="text-5xl sm:text-6xl md:text-6xl lg:text-[3.25rem] xl:text-6xl font-black leading-[1] tracking-tighter mb-8"
        >
          Tell me the task that eats your week.
          <span
            className="block"
            style={{
              background: "linear-gradient(120deg, #ffffff 0%, #2f88ff 40%, #7cb2ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            In 7 days it runs itself.
          </span>
        </motion.h1>

        <motion.p
          {...stagger(0.18)}
          className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-11 font-medium"
          style={{ color: "#94a3b8" }}
        >
          <span className="text-white font-bold">Or you don&apos;t pay.</span> One task, automated with AI, for one
          flat price of {OFFER.price}. No jargon, no new software to learn, nothing for you to manage.
        </motion.p>

        <motion.div {...stagger(0.28)} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <CTAButton label={`${START.label} — 2 Minutes`} href={START.href} />
          <GhostButton label="See how it works" href="#how" />
        </motion.div>

        <motion.p {...stagger(0.38)} className="mt-7 text-xs font-medium" style={{ color: "#475569" }}>
          {START.terms}. Never touched AI before? That&apos;s who this is for.
        </motion.p>
        </div>
        <motion.div {...stagger(0.34)}>
          <LeadFeed />
        </motion.div>
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
      <div
        className="max-w-5xl mx-auto mt-12 overflow-hidden"
        aria-label={`Built for: ${BUSINESS_TYPES.join(", ")}`}
        style={{ maskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)" }}
      >
        <div className="marquee-track" aria-hidden>
          {[...BUSINESS_TYPES, ...BUSINESS_TYPES].map((t, i) => (
            <span key={i} className="flex items-center gap-8 pr-8 text-xs font-black uppercase tracking-[0.25em] whitespace-nowrap" style={{ color: "#475569" }}>
              {t} <span className="w-1 h-1 rounded-full" style={{ backgroundColor: BLUE }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   RUN THE MATH
   ════════════════════════════════════════════════════════════════════════ */
function TheMath() {
  return (
    <Section>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp}>
          <Eyebrow className="mb-4">Run the math</Eyebrow>
        </motion.div>
        <motion.h2 {...stagger(0.06)} className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4 max-w-2xl">
          What is that one task costing you?
        </motion.h2>
        <motion.p {...stagger(0.12)} className="text-base md:text-lg font-medium max-w-xl mb-12" style={{ color: "#64748b" }}>
          Drag the sliders to your real numbers. Be conservative — it still adds up.
        </motion.p>
        <motion.div {...stagger(0.18)}>
          <TimeCalculator />
        </motion.div>
      </div>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PROBLEM
   ════════════════════════════════════════════════════════════════════════ */
function Problem() {
  const lines = [
    { t: "Everyone keeps telling you AI will change your business. Nobody tells you where to start — so you don't.", bright: true },
    { t: "Meanwhile you're still replying to the same messages, chasing the same quotes, and copying the same info between the same apps, every single week.", bright: false },
    { t: "You don't need an AI strategy. You need one task gone. Start there, see it work, then decide what's next.", bright: false },
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
   THE MENU — tasks we automate
   ════════════════════════════════════════════════════════════════════════ */
function Services() {
  return (
    <Section id="tasks">
      <GlowOrb size={500} color="rgba(47,136,255,0.06)" className="-left-40 top-1/3" />
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp}>
          <Eyebrow className="mb-4">Where to start</Eyebrow>
        </motion.div>
        <motion.h2 {...stagger(0.06)} className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4 max-w-2xl">
          Pick the one that makes you groan.
        </motion.h2>
        <motion.p {...stagger(0.12)} className="text-base md:text-lg font-medium max-w-xl mb-14" style={{ color: "#64748b" }}>
          These are the tasks small businesses hand over most. Yours not on the list? Tell me on the call.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              {...stagger(i * 0.07)}
              whileHover={{ y: -6, borderColor: "rgba(47,136,255,0.35)" }}
              className="p-7 rounded-2xl transition-colors duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.07)", backgroundColor: "rgba(255,255,255,0.015)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ border: "1px solid rgba(47,136,255,0.3)", backgroundColor: "rgba(47,136,255,0.1)", color: "#60a5fa" }}
              >
                {SERVICE_ICONS[s.icon]}
              </div>
              <h3 className="text-lg font-black text-white tracking-tight mb-2">{s.title}</h3>
              <p className="text-sm leading-relaxed font-medium" style={{ color: "#94a3b8" }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   THE OFFER — one task, one price, one deadline, one guarantee
   ════════════════════════════════════════════════════════════════════════ */
function Offer() {
  return (
    <Section id="offer">
      <GlowOrb size={620} color="rgba(47,136,255,0.08)" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.div {...fadeUp}>
            <Eyebrow className="mb-4">The offer</Eyebrow>
          </motion.div>
          <motion.h2 {...stagger(0.06)} className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4">
            One task. One price. Seven days.
          </motion.h2>
          <motion.p {...stagger(0.12)} className="text-base md:text-lg font-medium max-w-xl mx-auto" style={{ color: "#64748b" }}>
            No packages to compare and no monthly contract. This is the whole deal.
          </motion.p>
        </div>

        <motion.div
          {...stagger(0.16)}
          className="glow-edge grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] rounded-3xl"
          style={{ border: "1px solid rgba(47,136,255,0.25)", background: "linear-gradient(135deg, rgba(47,136,255,0.10), rgba(5,5,5,0.6))" }}
        >
          {/* what you get */}
          <div className="p-7 md:p-10">
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">{OFFER.name}</h3>
            <p className="text-sm md:text-base leading-relaxed font-medium mb-7 max-w-md" style={{ color: "#94a3b8" }}>{OFFER.blurb}</p>
            <div className="text-[11px] font-black uppercase tracking-widest mb-4" style={{ color: "#93c5fd" }}>What you get</div>
            <ul className="space-y-3">
              {OFFER.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm font-medium" style={{ color: "#e2e8f0" }}>
                  <Check size={16} className="mt-0.5 shrink-0" style={{ color: BLUE }} />
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-7 text-xs leading-relaxed" style={{ color: "#64748b" }}>{OFFER.scope}</p>
          </div>

          {/* price + guarantee + CTA */}
          <div className="p-7 md:p-10 flex flex-col rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl border-t lg:border-t-0 lg:border-l border-white/[0.06]" style={{ backgroundColor: "rgba(5,5,5,0.45)" }}>
            <div className="flex flex-wrap items-end gap-x-4 gap-y-2 mb-2">
              <div
                className="text-6xl md:text-7xl font-black tracking-tighter leading-none"
                style={{ background: "linear-gradient(90deg, #ffffff, #7cb2ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                {OFFER.price}
              </div>
              <span className="text-sm font-bold mb-1.5" style={{ color: "#64748b" }}>one time</span>
            </div>
            <div
              className="inline-flex self-start items-center gap-1.5 mb-6 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
              style={{ color: "#93c5fd", backgroundColor: "rgba(47,136,255,0.10)", border: "1px solid rgba(47,136,255,0.25)" }}
            >
              <Clock size={11} /> {OFFER.timeline}
            </div>

            <div className="p-4 rounded-2xl mb-6" style={{ backgroundColor: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.22)" }}>
              <div className="flex items-center gap-2 text-sm font-black mb-1.5" style={{ color: "#86efac" }}>
                <ShieldCheck size={17} /> {OFFER.guarantee}
              </div>
              <p className="text-xs leading-relaxed font-medium" style={{ color: "#a7c9b4" }}>{OFFER.guaranteeDetail}</p>
            </div>

            <CTAButton label={OFFER.cta} href={OFFER.href} />
            <p className="mt-3 text-[11px] font-medium" style={{ color: "#64748b" }}>{START.terms}</p>

            <div className="mt-auto pt-7">
              <div className="pt-5 text-xs leading-relaxed font-medium" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "#94a3b8" }}>
                <span className="text-white font-bold">Afterwards, if you want it:</span> {CARE.name}, {CARE.price}{CARE.cadence}.{" "}
                {CARE.points.join(", ")}. Optional and month-to-month.
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p {...stagger(0.24)} className="flex items-center justify-center gap-2 text-center mt-8 text-xs font-medium" style={{ color: "#64748b" }}>
          <Target size={13} style={{ color: BLUE }} /> One builder, so build slots each month are limited.
        </motion.p>
      </div>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   WORK
   ════════════════════════════════════════════════════════════════════════ */
function WorkCard({ item, delay }: { item: WorkItem; delay: number }) {
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

        <motion.div {...fadeUp} className="mt-20 mb-10 max-w-2xl">
          <Eyebrow className="mb-4">Built in the Labz</Eyebrow>
          <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-white mb-3">
            We don&apos;t just build sites. We ship our own software.
          </h3>
          <p className="text-base font-medium" style={{ color: "#64748b" }}>
            Products we designed, built, and run ourselves — the same hands that build your custom system.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LABZ.map((item, i) => (
            <WorkCard key={item.url} item={item} delay={i * 0.08} />
          ))}
        </div>
        <motion.div {...fadeUp} className="mt-12 text-center">
          <GhostButton label="See the full portfolio" href="/work" />
        </motion.div>
      </div>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PROCESS
   ════════════════════════════════════════════════════════════════════════ */
function Process() {
  return (
    <Section id="how">
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
          Straight answers.
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
          One builder · limited build slots each month
        </motion.div>
        <motion.h2 {...stagger(0.08)} className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-6 text-white">
          One task, gone
          <span
            className="block"
            style={{ background: "linear-gradient(120deg, #ffffff 0%, #2f88ff 50%, #7cb2ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            by this time next week.
          </span>
        </motion.h2>
        <motion.p {...stagger(0.16)} className="text-lg leading-relaxed max-w-xl mx-auto mb-11 font-medium" style={{ color: "#94a3b8" }}>
          Five questions, then a 20-minute call. If I can&apos;t have it automated and running in 7 days, you don&apos;t pay.
        </motion.p>
        <motion.div {...stagger(0.24)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTAButton label={`${START.label} — 2 Minutes`} href={START.href} />
          <GhostButton label="See the work" href="/work" />
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
              AI for small businesses that don&apos;t know where to start. One task, automated in 7 days, or you don&apos;t pay.
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
              <li><a href={START.href} className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"><Mail size={13} /> {START.label}</a></li>
              <li><a href="/work" className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"><Globe size={13} /> Full portfolio</a></li>
              <li><a href="/drop-24" className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"><Zap size={13} /> Need a website? Drop 24</a></li>
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
      <TheMath />
      <Offer />
      <Process />
      <Work />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
