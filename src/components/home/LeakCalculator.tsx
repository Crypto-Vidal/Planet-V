"use client";

import { animate, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { CTAButton } from "@/components/home/ui";
import { AUDIT, OFFERS } from "@/lib/content";

/* "Run the math" — the visitor's own numbers, plain arithmetic, no invented
   stats. The close-rate slider is what keeps it honest: not every missed
   caller would have booked. */

const WEEKS_PER_MONTH = 52 / 12;
const SYSTEM = OFFERS[1]; // Never Miss a Lead — the rung this math sells

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

export default function LeakCalculator() {
  const [calls, setCalls] = useState(3);
  const [jobValue, setJobValue] = useState(4000);
  const [closeRate, setCloseRate] = useState(30);

  const monthly = calls * WEEKS_PER_MONTH * (closeRate / 100) * jobValue;
  const yearly = monthly * 12;
  const jobsToPayback = Math.max(1, Math.ceil(SYSTEM.priceFrom / jobValue));

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.015)" }}
    >
      <div className="p-7 md:p-10 space-y-9">
        <Slider label="Calls & leads you miss per week" value={calls} display={String(calls)} min={1} max={30} step={1} onChange={setCalls} />
        <Slider label="Your average job" value={jobValue} display={usd(jobValue)} min={500} max={25000} step={500} onChange={setJobValue} />
        <Slider label="Jobs you close when you do answer" value={closeRate} display={`${closeRate}%`} min={5} max={70} step={5} onChange={setCloseRate} />
      </div>

      <div
        className="relative p-7 md:p-10 flex flex-col justify-center"
        style={{ background: "linear-gradient(150deg, rgba(47,136,255,0.14), rgba(47,136,255,0.03))", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#93c5fd" }}>Walking out the door</div>
        <div className="text-5xl md:text-6xl font-black tracking-tighter text-white tabular-nums leading-none" aria-live="polite">
          <AnimatedUSD value={monthly} />
          <span className="text-lg font-bold tracking-normal" style={{ color: "#64748b" }}> / month</span>
        </div>
        <div className="mt-3 text-base font-bold tabular-nums" style={{ color: "#cbd5e1" }}>
          That&apos;s <AnimatedUSD value={yearly} /> a year.
        </div>

        <p className="mt-6 text-sm leading-relaxed font-medium" style={{ color: "#94a3b8" }}>
          {SYSTEM.name} is <span className="text-white font-bold">{SYSTEM.price}, once</span>. At your numbers it pays for itself
          with <span className="text-white font-bold">{jobsToPayback} recovered {jobsToPayback === 1 ? "job" : "jobs"}</span>.
        </p>

        <div className="mt-7">
          <CTAButton label="Find My Leaks — Free" href={AUDIT.href} size="sm" />
        </div>
        <p className="mt-4 text-[11px] leading-relaxed" style={{ color: "#475569" }}>
          Your inputs, simple math: missed leads × close rate × job value. An estimate, not a promise.
        </p>
      </div>
    </div>
  );
}
