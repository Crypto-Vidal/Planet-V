"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Check, Scissors, UtensilsCrossed, Wrench, HeartPulse,
  ShoppingBag, Briefcase, Sparkles, Globe2, MessageSquareText, CalendarClock,
  Megaphone, Bot, HelpCircle, Clock, TrendingDown, Flame, Lock, Cpu, Zap,
  Phone, ShoppingCart, MapPin, FileText, Palette, Image as ImageIcon, Type, Link2,
} from "lucide-react";
import { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import { BLUE, CALENDLY, GlowOrb } from "@/components/home/ui";

/* ════════════════════════════════════════════════════════════════════════
   STEP TYPES
   ════════════════════════════════════════════════════════════════════════ */
type Opt = { label: string; icon: ReactNode };
type FieldDef = { id: string; label: string; placeholder: string; optional?: boolean };
type Step =
  | { type: "single"; id: string; q: string; sub?: string; options: Opt[]; optional?: boolean }
  | { type: "multi"; id: string; q: string; sub?: string; options: Opt[] }
  | { type: "fields"; id: string; q: string; sub?: string; fields: FieldDef[] }
  | { type: "contact"; links?: boolean }
  | { type: "booking" }
  | { type: "submit" };

type Mode = "select" | "consult" | "drop24";

/* ════════════════════════════════════════════════════════════════════════
   CONSULT QUALIFIER (≥ $997 — ends in a booked call)
   ════════════════════════════════════════════════════════════════════════ */
const CONSULT_STEPS: Step[] = [
  {
    type: "single", id: "businessType", q: "First — what kind of business do you run?", sub: "So we talk in your language, not tech jargon.",
    options: [
      { label: "Salon, Spa & Beauty", icon: <Scissors size={20} /> },
      { label: "Restaurant & Food", icon: <UtensilsCrossed size={20} /> },
      { label: "Home & Trade Services", icon: <Wrench size={20} /> },
      { label: "Health & Wellness", icon: <HeartPulse size={20} /> },
      { label: "Retail & E-commerce", icon: <ShoppingBag size={20} /> },
      { label: "Professional Services", icon: <Briefcase size={20} /> },
      { label: "Something else", icon: <HelpCircle size={20} /> },
    ],
  },
  {
    type: "multi", id: "painNow", q: "What's slowing you down right now?", sub: "Pick all that sting — this is what we fix first.",
    options: [
      { label: "My website's outdated, slow, or just not there", icon: <Globe2 size={20} /> },
      { label: "I miss calls & leads while I'm working", icon: <MessageSquareText size={20} /> },
      { label: "Leads come in but never get followed up", icon: <TrendingDown size={20} /> },
      { label: "Booking & scheduling is a headache", icon: <CalendarClock size={20} /> },
      { label: "No time for marketing or social", icon: <Megaphone size={20} /> },
      { label: "I'm doing way too much by hand", icon: <Clock size={20} /> },
    ],
  },
  {
    type: "single", id: "painLater", q: "If nothing changes, what worries you most 6 months out?", sub: "The quiet cost of staying still.",
    options: [
      { label: "Competitors pulling ahead of me online", icon: <TrendingDown size={20} /> },
      { label: "Money left on the table every month", icon: <Flame size={20} /> },
      { label: "Burning out doing everything myself", icon: <Flame size={20} /> },
      { label: "Stuck — can't grow without hiring", icon: <Lock size={20} /> },
      { label: "Falling behind while everyone adopts AI", icon: <Cpu size={20} /> },
    ],
  },
  {
    type: "single", id: "build", q: "What should we build for you first?", sub: "Don't overthink it — we'll sharpen it on the call.",
    options: [
      { label: "A website that actually books customers", icon: <Globe2 size={20} /> },
      { label: "AI that answers & follows up my leads", icon: <Sparkles size={20} /> },
      { label: "Automatic booking & reminders", icon: <CalendarClock size={20} /> },
      { label: "Social content, done for me", icon: <Megaphone size={20} /> },
      { label: "A full AI system / digital employee", icon: <Bot size={20} /> },
      { label: "Not sure yet — help me figure it out", icon: <HelpCircle size={20} /> },
    ],
  },
  {
    type: "single", id: "timeline", q: "How soon are you looking to move?",
    options: [
      { label: "ASAP — yesterday, ideally", icon: <Zap size={20} /> },
      { label: "In the next 1–2 months", icon: <CalendarClock size={20} /> },
      { label: "Just exploring for now", icon: <HelpCircle size={20} /> },
    ],
  },
  {
    type: "single", id: "revenue", q: "Roughly, what's your monthly revenue?", sub: "So we point you to the right starting tier — never to oversell.", optional: true,
    options: [
      { label: "Under $7k / mo", icon: <Briefcase size={20} /> },
      { label: "$7k – $21k / mo", icon: <Briefcase size={20} /> },
      { label: "$21k – $50k / mo", icon: <Briefcase size={20} /> },
      { label: "$50k+ / mo", icon: <Briefcase size={20} /> },
      { label: "Rather not say", icon: <Lock size={20} /> },
    ],
  },
  { type: "contact" },
  { type: "booking" },
];

/* ════════════════════════════════════════════════════════════════════════
   DROP 24 BUILD INTAKE ($350 — self-serve, no call)
   ════════════════════════════════════════════════════════════════════════ */
const DROP24_STEPS: Step[] = [
  {
    type: "single", id: "businessType", q: "What kind of business is it?", sub: "Sets the tone and design direction.",
    options: [
      { label: "Salon, Spa & Beauty", icon: <Scissors size={20} /> },
      { label: "Restaurant & Food", icon: <UtensilsCrossed size={20} /> },
      { label: "Home & Trade Services", icon: <Wrench size={20} /> },
      { label: "Health & Wellness", icon: <HeartPulse size={20} /> },
      { label: "Retail & E-commerce", icon: <ShoppingBag size={20} /> },
      { label: "Professional Services", icon: <Briefcase size={20} /> },
      { label: "Something else", icon: <HelpCircle size={20} /> },
    ],
  },
  {
    type: "single", id: "goal", q: "What should the page get you, mostly?", sub: "We design the whole thing around this one action.",
    options: [
      { label: "Phone calls", icon: <Phone size={20} /> },
      { label: "Booked appointments", icon: <CalendarClock size={20} /> },
      { label: "Quote / estimate requests", icon: <FileText size={20} /> },
      { label: "Online orders or sales", icon: <ShoppingCart size={20} /> },
      { label: "Lead form-fills", icon: <MessageSquareText size={20} /> },
      { label: "More foot traffic", icon: <MapPin size={20} /> },
    ],
  },
  {
    type: "single", id: "vibe", q: "Pick the vibe you want.", sub: "How it should feel the second they land.",
    options: [
      { label: "Bold & modern", icon: <Zap size={20} /> },
      { label: "Clean & minimal", icon: <Palette size={20} /> },
      { label: "Warm & friendly", icon: <HeartPulse size={20} /> },
      { label: "Luxe & premium", icon: <Sparkles size={20} /> },
      { label: "Bright & playful", icon: <Palette size={20} /> },
    ],
  },
  {
    type: "fields", id: "essentials", q: "Tell us the essentials.", sub: "Short answers are perfect — we'll polish the words.",
    fields: [
      { id: "sell", label: "What do you sell?", placeholder: "Hot yoga classes & memberships" },
      { id: "serve", label: "Who do you serve?", placeholder: "Beginners & busy pros in Minneapolis" },
      { id: "edge", label: "What makes you the obvious choice?", placeholder: "4.9★, 8 years, first class free" },
    ],
  },
  {
    type: "multi", id: "haves", q: "What do you already have?", sub: "Whatever you don't have, we'll handle.",
    options: [
      { label: "A logo", icon: <ImageIcon size={20} /> },
      { label: "Brand colors", icon: <Palette size={20} /> },
      { label: "Photos of your work", icon: <ImageIcon size={20} /> },
      { label: "Written content / copy", icon: <Type size={20} /> },
      { label: "A domain name", icon: <Globe2 size={20} /> },
      { label: "A current website", icon: <Link2 size={20} /> },
    ],
  },
  { type: "contact", links: true },
  { type: "submit" },
];

const SOURCES = ["Google search", "Referral / word of mouth", "Instagram or Facebook", "Saw your work somewhere", "Other"];

/* ════════════════════════════════════════════════════════════════════════
   Calendly inline embed
   ════════════════════════════════════════════════════════════════════════ */
function CalendlyEmbed({ prefill }: { prefill: { name?: string; email?: string; customAnswers?: Record<string, string> } }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const url = `${CALENDLY}?hide_gdpr_banner=1&background_color=050505&text_color=f8fafc&primary_color=6366f1`;
    const init = () => {
      // @ts-expect-error — Calendly injected by widget.js
      if (window.Calendly && el) {
        el.innerHTML = "";
        // @ts-expect-error — Calendly global
        window.Calendly.initInlineWidget({ url, parentElement: el, prefill });
      }
    };
    const cssId = "calendly-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId; link.rel = "stylesheet"; link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }
    const jsId = "calendly-js";
    const existing = document.getElementById(jsId) as HTMLScriptElement | null;
    // @ts-expect-error — Calendly global
    if (existing && window.Calendly) init();
    else if (!existing) {
      const s = document.createElement("script");
      s.id = jsId; s.src = "https://assets.calendly.com/assets/external/widget.js"; s.async = true; s.onload = init;
      document.body.appendChild(s);
    } else existing.addEventListener("load", init);
  }, [prefill]);
  return (
    <div ref={ref} style={{ minWidth: 320, height: 700 }} className="rounded-2xl overflow-hidden flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-sm font-medium" style={{ color: "#64748b" }}>
        <div className="w-6 h-6 rounded-full animate-spin" style={{ border: "2px solid rgba(255,255,255,0.12)", borderTopColor: BLUE }} />
        Loading available times…
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════════════ */
type Contact = { name: string; businessName: string; email: string; phone: string; source: string; links: string };

export default function StartPage() {
  const [mode, setMode] = useState<Mode>("select");
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [contact, setContact] = useState<Contact>({ name: "", businessName: "", email: "", phone: "", source: "", links: "" });
  const [selectedOffer, setSelectedOffer] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    const offer = params.get("offer");
    const selected = plan || offer;
    if (!selected) return;
    const timer = window.setTimeout(() => {
      setSelectedOffer(selected);
      setMode(offer === "drop24" ? "drop24" : "consult");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const steps = mode === "consult" ? CONSULT_STEPS : mode === "drop24" ? DROP24_STEPS : [];
  const step = steps[i];
  const lastIsTerminal = step && (step.type === "booking" || step.type === "submit");
  const progress = steps.length ? Math.round((i / (steps.length - 1)) * 100) : 0;

  const go = (delta: number) => {
    if (delta < 0 && i === 0) { setMode("select"); setDir(-1); return; }
    setDir(delta);
    setI((v) => Math.min(Math.max(v + delta, 0), steps.length - 1));
  };

  const choose = (m: Mode) => { setMode(m); setI(0); setDir(1); setAnswers({}); };

  const pickSingle = (id: string, label: string) => {
    setAnswers((p) => ({ ...p, [id]: label }));
    setTimeout(() => go(1), 220);
  };
  const toggleMulti = (id: string, label: string) => {
    setAnswers((p) => {
      const cur = (p[id] as string[]) || [];
      return { ...p, [id]: cur.includes(label) ? cur.filter((x) => x !== label) : [...cur, label] };
    });
  };
  const setField = (id: string, v: string) => setAnswers((p) => ({ ...p, [id]: v }));

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email);
  const contactOk = contact.name.trim() && contact.businessName.trim() && emailOk;
  const fieldsOk = (s: Extract<Step, { type: "fields" }>) => s.fields.every((f) => f.optional || (answers[f.id] as string)?.trim());

  const canContinue =
    !step ? false :
    step.type === "multi" ? ((answers[step.id] as string[])?.length ?? 0) > 0 :
    step.type === "fields" ? fieldsOk(step) :
    step.type === "contact" ? !!contactOk :
    true;

  const summary = (() => {
    const a = answers, parts: string[] = [];
    if (contact.businessName) parts.push(`Business: ${contact.businessName}${a.businessType ? ` (${a.businessType})` : ""}`);
    if (selectedOffer) parts.push(`Requested offer: ${selectedOffer}`);
    if (a.goal) parts.push(`Main goal: ${a.goal}`);
    if (a.vibe) parts.push(`Vibe: ${a.vibe}`);
    if (a.sell) parts.push(`Sells: ${a.sell}`);
    if (a.serve) parts.push(`Serves: ${a.serve}`);
    if (a.edge) parts.push(`Edge: ${a.edge}`);
    if (a.haves) parts.push(`Already has: ${(a.haves as string[]).join("; ")}`);
    if (a.build) parts.push(`Wants built: ${a.build}`);
    if (a.painNow) parts.push(`Pain now: ${(a.painNow as string[]).join("; ")}`);
    if (a.painLater) parts.push(`6-mo worry: ${a.painLater}`);
    if (a.timeline) parts.push(`Timeline: ${a.timeline}`);
    if (a.revenue) parts.push(`Revenue: ${a.revenue}`);
    if (contact.phone) parts.push(`Phone: ${contact.phone}`);
    if (contact.links) parts.push(`Links: ${contact.links}`);
    if (contact.source) parts.push(`Heard via: ${contact.source}`);
    return parts.join("\n");
  })();

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  const stepKey = mode === "select" ? "select" : `${mode}-${i}`;

  return (
    <main style={{ backgroundColor: "#050505", color: "#f8fafc" }} className="min-h-screen relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 25%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 25%, transparent 75%)",
      }} />
      <GlowOrb size={620} color="rgba(47,136,255,0.10)" className="-top-40 left-1/2 -translate-x-1/2" />
      <GlowOrb size={360} color="rgba(47,136,255,0.09)" className="top-1/3 -left-28" />
      <GlowOrb size={300} color="rgba(47,136,255,0.08)" className="bottom-10 -right-16" />

      {/* Top bar */}
      <header className="relative z-20 max-w-3xl mx-auto px-6 pt-7 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-base italic" style={{ background: "linear-gradient(135deg, #2f88ff, #7cb2ff)" }}>D</div>
          <span className="text-base font-black tracking-tighter text-white uppercase">Dynasty <span style={{ color: BLUE }}>Labz</span></span>
        </Link>
        {mode !== "select" && !lastIsTerminal && (
          <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: "#475569" }}>
            Step {i + 1} <span style={{ color: "#1e293b" }}>/ {steps.length - 1}</span>
          </span>
        )}
      </header>

      {/* Progress bar (hidden on selector) */}
      {mode !== "select" && (
        <div className="relative z-20 max-w-3xl mx-auto px-6 mt-5">
          <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #2f88ff, #2f88ff, #7cb2ff)" }}
              animate={{ width: `${progress}%` }} transition={{ type: "spring", stiffness: 120, damping: 22 }} />
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 md:py-16">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={stepKey} custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}>

            {mode === "select" && <Selector onChoose={choose} />}

            {mode !== "select" && step && (step.type === "single" || step.type === "multi") && (
              <Question step={step} answers={answers} onSingle={pickSingle} onToggle={toggleMulti} />
            )}

            {mode !== "select" && step && step.type === "fields" && (
              <FieldsStep step={step} answers={answers} onChange={setField} />
            )}

            {mode !== "select" && step && step.type === "contact" && (
              <ContactStep contact={contact} setContact={setContact} sources={SOURCES} emailOk={emailOk} showLinks={!!step.links} drop24={mode === "drop24"} />
            )}

            {mode !== "select" && step && step.type === "booking" && (
              <BookingStep name={contact.name} build={answers.build as string} offer={selectedOffer || "AI automation consultation"} answers={answers} contact={contact} summary={summary} prefill={{ name: contact.name, email: contact.email, customAnswers: { a1: summary } }} />
            )}

            {mode !== "select" && step && step.type === "submit" && (
              <SubmitStep name={contact.name} email={contact.email} offer={selectedOffer || "Drop 24"} answers={answers} contact={contact} summary={summary} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer nav */}
        {mode !== "select" && step && !lastIsTerminal && (
          <div className="flex items-center justify-between mt-10">
            <button onClick={() => go(-1)} className="inline-flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white transition-colors">
              <ArrowLeft size={16} /> Back
            </button>
            <div className="flex items-center gap-4">
              {step.type === "single" && step.optional && (
                <button onClick={() => go(1)} className="text-sm font-bold text-white/40 hover:text-white/70 transition-colors">Skip</button>
              )}
              {step.type !== "single" && (
                <button onClick={() => go(1)} disabled={!canContinue}
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-black text-white text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #2f88ff, #2f88ff, #7cb2ff)", boxShadow: canContinue ? "0 0 28px rgba(47,136,255,0.35)" : "none" }}>
                  {step.type === "contact" && mode === "drop24" ? "Send my project" : "Continue"}
                  <ArrowRight size={16} className="group-enabled:group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SELECTOR (front door)
   ════════════════════════════════════════════════════════════════════════ */
function Selector({ onChoose }: { onChoose: (m: Mode) => void }) {
  const cards = [
    {
      mode: "drop24" as Mode, icon: <Zap size={24} />, title: "I need a website — fast",
      tag: "$350 · live in 24 hours", desc: "Answer a few quick questions and we build your high-converting site. No call needed.",
    },
    {
      mode: "consult" as Mode, icon: <Bot size={24} />, title: "AI, automation & growth",
      tag: "Custom systems from $997 · book a call", desc: "Tell us what's slowing you down and we'll map the fastest win on a quick discovery call.",
    },
  ];
  return (
    <div className="text-center pt-6">
      <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest" style={{ border: "1px solid rgba(47,136,255,0.3)", backgroundColor: "rgba(47,136,255,0.08)", color: "#60a5fa" }}>
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" /> Let&apos;s get you started
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.02] mb-4">
        What brings you in
        <span className="block" style={{ background: "linear-gradient(120deg, #93c5fd, #2f88ff 45%, #7cb2ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>today?</span>
      </h1>
      <p className="text-lg leading-relaxed max-w-lg mx-auto mb-10 font-medium" style={{ color: "#94a3b8" }}>
        Two quick paths — pick the one that fits. Takes about 90 seconds either way.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 text-left">
        {cards.map((c) => (
          <button key={c.mode} onClick={() => onChoose(c.mode)}
            className="group relative p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1.5"
            style={{ border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.015)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ border: "1px solid rgba(47,136,255,0.4)", backgroundColor: "rgba(47,136,255,0.12)", color: "#93c5fd" }}>{c.icon}</div>
            <h3 className="text-xl font-black text-white tracking-tight mb-1.5">{c.title}</h3>
            <div className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: BLUE }}>{c.tag}</div>
            <p className="text-sm leading-relaxed font-medium mb-5" style={{ color: "#94a3b8" }}>{c.desc}</p>
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-blue-400 transition-colors">
              Start here <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        ))}
      </div>
      <button onClick={() => onChoose("consult")} className="mt-7 text-sm font-medium hover:text-white transition-colors" style={{ color: "#475569" }}>
        Not sure which? Start with a discovery call →
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   QUESTION (single / multi)
   ════════════════════════════════════════════════════════════════════════ */
function Question({ step, answers, onSingle, onToggle }: {
  step: Extract<Step, { type: "single" | "multi" }>;
  answers: Record<string, string | string[]>;
  onSingle: (id: string, label: string) => void;
  onToggle: (id: string, label: string) => void;
}) {
  const isMulti = step.type === "multi";
  const selected = answers[step.id];
  const isOn = (label: string) => isMulti ? (selected as string[])?.includes(label) : selected === label;
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter leading-tight mb-3">{step.q}</h2>
      {step.sub && <p className="text-base font-medium mb-8" style={{ color: "#64748b" }}>{step.sub}</p>}
      {isMulti && <p className="text-[11px] font-black uppercase tracking-widest mb-5" style={{ color: BLUE }}>Select all that apply</p>}
      <div className={`grid gap-3 ${step.options.length > 4 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
        {step.options.map((opt) => {
          const on = isOn(opt.label);
          return (
            <button key={opt.label} onClick={() => (isMulti ? onToggle(step.id, opt.label) : onSingle(step.id, opt.label))}
              className="group relative flex items-center gap-4 p-4 sm:p-5 rounded-2xl text-left transition-all duration-200"
              style={{ border: on ? "1px solid rgba(47,136,255,0.6)" : "1px solid rgba(255,255,255,0.08)", backgroundColor: on ? "rgba(47,136,255,0.10)" : "rgba(255,255,255,0.015)", boxShadow: on ? "0 0 24px rgba(47,136,255,0.18)" : "none" }}>
              <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200"
                style={{ border: on ? "1px solid rgba(47,136,255,0.5)" : "1px solid rgba(255,255,255,0.08)", backgroundColor: on ? "rgba(47,136,255,0.15)" : "rgba(255,255,255,0.03)", color: on ? "#93c5fd" : "#64748b" }}>
                {opt.icon}
              </div>
              <span className={`flex-1 font-bold text-sm sm:text-base ${on ? "text-white" : "text-white/75"}`}>{opt.label}</span>
              <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ border: on ? "none" : "1.5px solid rgba(255,255,255,0.12)", background: on ? "linear-gradient(135deg, #2f88ff, #7cb2ff)" : "transparent" }}>
                {on && <Check size={14} className="text-white" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   FIELD primitives + steps
   ════════════════════════════════════════════════════════════════════════ */
function Field({ label, value, onChange, placeholder, type = "text", optional = false, autoFocus = false }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string; optional?: boolean; autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#94a3b8" }}>
        {label} {optional && <span style={{ color: "#475569" }}>· optional</span>}
      </span>
      <input type={type} value={value} autoFocus={autoFocus} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="mt-2 w-full rounded-xl px-4 py-3.5 font-medium text-white placeholder:text-white/25 focus:outline-none transition-all"
        style={{ border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.03)" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(47,136,255,0.6)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")} />
    </label>
  );
}

function FieldsStep({ step, answers, onChange }: { step: Extract<Step, { type: "fields" }>; answers: Record<string, string | string[]>; onChange: (id: string, v: string) => void; }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter leading-tight mb-3">{step.q}</h2>
      {step.sub && <p className="text-base font-medium mb-8" style={{ color: "#64748b" }}>{step.sub}</p>}
      <div className="space-y-5">
        {step.fields.map((f, idx) => (
          <Field key={f.id} label={f.label} value={(answers[f.id] as string) || ""} onChange={(v) => onChange(f.id, v)} placeholder={f.placeholder} optional={f.optional} autoFocus={idx === 0} />
        ))}
      </div>
    </div>
  );
}

function ContactStep({ contact, setContact, sources, emailOk, showLinks, drop24 }: {
  contact: Contact; setContact: React.Dispatch<React.SetStateAction<Contact>>; sources: string[]; emailOk: boolean; showLinks: boolean; drop24: boolean;
}) {
  const set = (k: keyof Contact) => (v: string) => setContact((p) => ({ ...p, [k]: v }));
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter leading-tight mb-3">
        {drop24 ? "Last step — where do we send your site?" : "Almost there — where do we send your plan?"}
      </h2>
      <p className="text-base font-medium mb-8" style={{ color: "#64748b" }}>
        {drop24 ? "We'll have a first draft in your inbox within 24 hours." : "So we can confirm your call and prep before we meet."}
      </p>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Your name" value={contact.name} onChange={set("name")} placeholder="Jordan Rivera" autoFocus />
        <Field label="Business name" value={contact.businessName} onChange={set("businessName")} placeholder="Rivera Auto Detailing" />
        <Field label="Email" type="email" value={contact.email} onChange={set("email")} placeholder="you@business.com" />
        <Field label="Phone" type="tel" value={contact.phone} onChange={set("phone")} placeholder="(612) 555-0199" optional />
      </div>
      {contact.email.length > 3 && !emailOk && <p className="mt-3 text-xs font-bold" style={{ color: "#f87171" }}>That email looks off — mind double-checking?</p>}
      {showLinks && (
        <div className="mt-5">
          <Field label="Current website or social links" value={contact.links} onChange={set("links")} placeholder="instagram.com/yourshop, yoursite.com" optional />
        </div>
      )}
      <div className="mt-6">
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#94a3b8" }}>How&apos;d you hear about us? <span style={{ color: "#475569" }}>· optional</span></span>
        <div className="flex flex-wrap gap-2 mt-3">
          {sources.map((s) => {
            const on = contact.source === s;
            return (
              <button key={s} onClick={() => setContact((p) => ({ ...p, source: on ? "" : s }))} className="px-4 py-2 rounded-full text-xs font-bold transition-all"
                style={{ border: on ? "1px solid rgba(47,136,255,0.6)" : "1px solid rgba(255,255,255,0.1)", backgroundColor: on ? "rgba(47,136,255,0.12)" : "rgba(255,255,255,0.02)", color: on ? "#bfdbfe" : "#94a3b8" }}>
                {s}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   BOOKING (consult) + SUBMIT (drop24)
   ════════════════════════════════════════════════════════════════════════ */
function BookingStep({ name, build, offer, answers, contact, summary, prefill }: {
  name: string; build?: string; offer: string; answers: Record<string, string | string[]>; contact: Contact; summary: string;
  prefill: { name?: string; email?: string; customAnswers?: Record<string, string> };
}) {
  const first = name.trim().split(" ")[0];
  const [delivery, setDelivery] = useState<"sending" | "done" | "error">("sending");
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    sendLead("consult", offer, answers, contact, summary)
      .then(() => setDelivery("done"))
      .catch(() => setDelivery("error"));
  }, [answers, contact, offer, summary]);

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "linear-gradient(135deg, #2f88ff, #7cb2ff)", boxShadow: "0 0 30px rgba(47,136,255,0.4)" }}>
          <Check size={28} className="text-white" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-3">{first ? `Perfect, ${first}.` : "Perfect."} Pick your time.</h2>
        <p className="text-base font-medium max-w-lg mx-auto" style={{ color: "#94a3b8" }}>
          {build ? <>We&apos;ll come ready to talk through <span className="text-white font-bold">{build.toLowerCase()}</span> and the fastest path to get you there.</> : "We'll come ready with the fastest path for your business."} Grab a slot below — your details are already filled in.
        </p>
        {delivery === "sending" && <p className="mt-3 text-xs font-bold text-blue-300">Saving your details…</p>}
        {delivery === "error" && <p className="mt-3 text-xs font-bold text-red-400">Your details did not save. Go back and press Continue to retry before booking.</p>}
      </div>
      {delivery !== "error" && <div className="rounded-2xl p-1.5" style={{ border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.015)" }}>
        <CalendlyEmbed prefill={prefill} />
      </div>}
    </div>
  );
}

function SubmitStep({ name, email, offer, answers, contact, summary }: {
  name: string; email: string; offer: string; answers: Record<string, string | string[]>; contact: Contact; summary: string;
}) {
  const [status, setStatus] = useState<"sending" | "done" | "error">("sending");
  const first = name.trim().split(" ")[0];
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    sendLead("drop24", offer, answers, contact, summary)
      .then(() => setStatus("done"))
      .catch(() => setStatus("error"));
  }, [answers, contact, offer, summary]);

  return (
    <div className="text-center pt-6">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: "linear-gradient(135deg, #2f88ff, #7cb2ff)", boxShadow: "0 0 36px rgba(47,136,255,0.4)" }}>
        {status === "sending" ? <div className="w-7 h-7 rounded-full animate-spin" style={{ border: "3px solid rgba(255,255,255,0.4)", borderTopColor: "#fff" }} /> : status === "done" ? <Check size={32} className="text-white" /> : <HelpCircle size={32} className="text-white" />}
      </div>
      <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-4">
        {status === "sending" ? "Sending your project…" : status === "error" ? "That didn't send." : first ? `You're all set, ${first}.` : "You're all set."}
      </h2>
      {status === "done" && (
        <p className="text-lg font-medium max-w-lg mx-auto mb-8" style={{ color: "#94a3b8" }}>
          We&apos;ve got your details. Your first draft lands in your inbox at <span className="text-white font-bold">{email}</span> within <span className="text-white font-bold">24 hours</span> — and you don&apos;t pay a cent until you love it.
        </p>
      )}
      {status === "error" && (
        <div className="max-w-md mx-auto">
          <p className="text-sm font-medium mb-4" style={{ color: "#64748b" }}>Your details are still here. Retry the secure send:</p>
          <button onClick={() => { setStatus("sending"); sendLead("drop24", offer, answers, contact, summary).then(() => setStatus("done")).catch(() => setStatus("error")); }} className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-black text-white text-sm transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #2f88ff, #2f88ff, #7cb2ff)", boxShadow: "0 0 28px rgba(47,136,255,0.35)" }}>
            Retry send <ArrowRight size={16} />
          </button>
        </div>
      )}
      {status === "done" && (
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors">Back to home</Link>
      )}
    </div>
  );
}

async function sendLead(mode: string, offer: string, answers: Record<string, string | string[]>, contact: Contact, summary: string) {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode, offer, answers, contact, summary, website: "" }),
  });
  if (!response.ok) throw new Error("Lead delivery failed");
}
