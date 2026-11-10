"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PhoneMissed, MessageSquare, Reply, CalendarCheck, Star } from "lucide-react";
import { useEffect, useState, ReactNode } from "react";

/* Hero motion graphic: one missed call turning into a booked job, on a loop.
   It is an illustration of the system, and is labelled as one. */

type Step = { time: string; icon: ReactNode; color: string; title: string; body: string };

const STEPS: Step[] = [
  { time: "2:14 PM", icon: <PhoneMissed size={15} />, color: "#f87171", title: "Missed call", body: "You're on a roof. It rings out." },
  { time: "2:14 PM", icon: <MessageSquare size={15} />, color: "#60a5fa", title: "Auto-text sent", body: "“Sorry we missed you! What can we help with?”" },
  { time: "2:16 PM", icon: <Reply size={15} />, color: "#cbd5e1", title: "Homeowner replies", body: "“Hail damage. Need a quote this week.”" },
  { time: "2:17 PM", icon: <CalendarCheck size={15} />, color: "#4ade80", title: "Estimate booked", body: "Thursday, 9:00 AM — on your calendar." },
  { time: "After the job", icon: <Star size={15} />, color: "#facc15", title: "Review request sent", body: "Another 5-star review, without asking twice." },
];

const HOLD = 3; // extra ticks to rest on the finished feed before looping

export default function LeadFeed() {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(1);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setTick((t) => (t + 1) % (STEPS.length + HOLD + 1)), 1500);
    return () => clearInterval(id);
  }, [reduce]);

  const visible = reduce ? STEPS.length : Math.min(tick, STEPS.length);

  return (
    <div
      className="relative w-full max-w-sm mx-auto rounded-3xl p-5 text-left"
      style={{
        border: "1px solid rgba(255,255,255,0.09)",
        background: "linear-gradient(170deg, rgba(15,23,42,0.85), rgba(5,5,5,0.92))",
        boxShadow: "0 0 80px rgba(47,136,255,0.18), 0 30px 60px rgba(0,0,0,0.5)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div className="flex items-center justify-between mb-4 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/80">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Your lead line
        </div>
        <span
          className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ color: "#93c5fd", border: "1px solid rgba(47,136,255,0.3)", backgroundColor: "rgba(47,136,255,0.1)" }}
        >
          Example
        </span>
      </div>

      {/* fixed height so the loop never shifts the page */}
      <div className="h-[372px] overflow-hidden" aria-label="Example: a missed call is answered by text, the homeowner replies, an estimate is booked, and a review request is sent afterwards.">
        <AnimatePresence initial={false}>
          {STEPS.slice(0, visible).map((s) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-3 mb-2.5 p-3 rounded-xl"
              style={{ border: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.025)" }}
            >
              <div
                className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ color: s.color, backgroundColor: `${s.color}1f`, border: `1px solid ${s.color}40` }}
              >
                {s.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-black text-white">{s.title}</span>
                  <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: "#64748b" }}>{s.time}</span>
                </div>
                <p className="text-[11px] leading-snug font-medium mt-0.5" style={{ color: "#94a3b8" }}>{s.body}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <div className="text-[9px] font-black uppercase tracking-widest" style={{ color: "#64748b" }}>First reply</div>
          <div className="text-sm font-black text-white">Under 60 sec</div>
        </div>
        <div>
          <div className="text-[9px] font-black uppercase tracking-widest" style={{ color: "#64748b" }}>Your effort</div>
          <div className="text-sm font-black text-white">Zero</div>
        </div>
      </div>
    </div>
  );
}
