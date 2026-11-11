"use client";

import { animate, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { CTAButton } from "@/components/home/ui";
import { OFFER, START } from "@/lib/content";

/* "Run the math" — the visitor's own numbers, plain arithmetic, no invented
   stats: hours a week on the task × what an hour of their time is worth. */

const WEEKS_PER_MONTH = 52 / 12;

const usd = (n: number) => `$${Math.round(n).toLocaleString()}`;

function AnimatedUSD({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (reduce) return;
    const controls = animate(mv, value, { duration: 0.5, ease: [0.16, 1, 0.3, 1], onUpdate: setShown });
    return controls.stop;
  }, [value, mv, reduce]);

  return <>{usd(reduce ? value : shown)}</>;
}

function Slider({
  label, value, display, min, max, step, onChange,
}: {
  label: string; value: number; display: string; min: number; max: number; step: number; onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#94a3b8" }}>{label}</span>
        <span className="text-xl font-black tracking-tight text-white tabular-nums">{display}</span>
      </div>
      <input
        type="range"
        className="leak-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

export default function TimeCalculator() {
  const [hours, setHours] = useState(6);
  const [rate, setRate] = useState(60);

  const weekly = hours * rate;
  const monthly = weekly * WEEKS_PER_MONTH;
  const yearly = weekly * 52;
  const weeksToPayback = Math.max(1, Math.ceil(OFFER.priceFrom / weekly));

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.015)" }}
    >
      <div className="p-7 md:p-10 space-y-10 flex flex-col justify-center">
        <Slider label="Hours a week this task takes" value={hours} display={`${hours} hrs`} min={1} max={30} step={1} onChange={setHours} />
        <Slider label="What an hour of that time is worth" value={rate} display={usd(rate)} min={15} max={300} step={5} onChange={setRate} />
      </div>

      <div
        className="relative p-7 md:p-10 flex flex-col justify-center"
        style={{ background: "linear-gradient(150deg, rgba(47,136,255,0.14), rgba(47,136,255,0.03))", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#93c5fd" }}>What that task costs you</div>
        <div className="text-5xl md:text-6xl font-black tracking-tighter text-white tabular-nums leading-none" aria-live="polite">
          <AnimatedUSD value={monthly} />
          <span className="text-lg font-bold tracking-normal" style={{ color: "#64748b" }}> / month</span>
        </div>
        <div className="mt-3 text-base font-bold tabular-nums" style={{ color: "#cbd5e1" }}>
          That&apos;s <AnimatedUSD value={yearly} /> and {(hours * 52).toLocaleString()} hours a year.
        </div>

        <p className="mt-6 text-sm leading-relaxed font-medium" style={{ color: "#94a3b8" }}>
          {OFFER.name} is <span className="text-white font-bold">{OFFER.price}, once</span>. At your numbers it pays for itself
          in <span className="text-white font-bold">{weeksToPayback} {weeksToPayback === 1 ? "week" : "weeks"}</span>.
        </p>

        <div className="mt-7">
          <CTAButton label={`${START.label} — 2 Minutes`} href={START.href} size="sm" />
        </div>
        <p className="mt-4 text-[11px] leading-relaxed" style={{ color: "#475569" }}>
          Your inputs, simple math: hours × hourly value. An estimate, not a promise.
        </p>
      </div>
    </div>
  );
}
