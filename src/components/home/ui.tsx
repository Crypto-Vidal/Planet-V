"use client";

import { motion, useInView, useMotionValue, animate, AnimatePresence, Transition } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, ReactNode } from "react";

/* ── Brand tokens ─────────────────────────────────────────────────────────── */
export const BLUE = "#2f88ff";
export const INDIGO = "#2f88ff";
export const VIOLET = "#7cb2ff";
export const CALENDLY = "https://calendly.com/vcrypto1991/drop24-meeting";

/* ── Animation presets ────────────────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: EASE } as Transition,
};

export const stagger = (delay: number) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay },
});

/* ── Glow orb ─────────────────────────────────────────────────────────────── */
export function GlowOrb({
  size = 400,
  color = "rgba(47,136,255,0.12)",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`absolute pointer-events-none rounded-full blur-3xl ${className}`}
      style={{ width: size, height: size, background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
    />
  );
}

/* ── Eyebrow label ────────────────────────────────────────────────────────── */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`text-xs font-black uppercase tracking-[0.25em] ${className}`}
      style={{ color: BLUE }}
    >
      {children}
    </div>
  );
}

/* ── CTA button ───────────────────────────────────────────────────────────── */
export function CTAButton({
  label = "Book a Discovery Call",
  href = "/start",
  size = "lg",
}: {
  label?: string;
  href?: string;
  size?: "sm" | "lg";
}) {
  const lg = size === "lg";
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative inline-flex items-center gap-3 font-black text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
        lg ? "px-9 py-4 text-base md:text-lg" : "px-6 py-3 text-sm"
      }`}
      style={{
        background: "linear-gradient(135deg, #2f88ff 0%, #2f88ff 60%, #7cb2ff 100%)",
        boxShadow: "0 0 36px rgba(47,136,255,0.35), 0 6px 20px rgba(0,0,0,0.45)",
      }}
    >
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.16), transparent 70%)" }}
      />
      <span className="relative">{label}</span>
      <ArrowRight size={lg ? 20 : 16} className="relative group-hover:translate-x-1 transition-transform duration-300" />
    </a>
  );
}

/* ── Ghost button ─────────────────────────────────────────────────────────── */
export function GhostButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-sm md:text-base text-white/80 transition-all duration-300 hover:text-white"
      style={{ border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.02)" }}
    >
      {label}
      <ArrowRight size={16} className="opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300" />
    </a>
  );
}

/* ── Count-up number (animates when scrolled into view) ───────────────────── */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return controls.stop;
  }, [inView, to, duration, mv]);

  return (
    <span ref={ref}>
      {prefix}
      {Math.round(val).toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── FAQ accordion item ───────────────────────────────────────────────────── */
export function FAQItem({ q, a }: { q: string; a: string }) {
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
          style={{ color: "rgba(47,136,255,0.7)" }}
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
            <p className="pb-6 leading-relaxed font-medium text-sm md:text-base max-w-2xl" style={{ color: "#94a3b8" }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Section wrapper with consistent rhythm ───────────────────────────────── */
export function Section({
  id,
  children,
  className = "",
  divider = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-24 md:py-28 px-6 ${className}`}
      style={divider ? { borderTop: "1px solid rgba(255,255,255,0.04)" } : undefined}
    >
      {children}
    </section>
  );
}
