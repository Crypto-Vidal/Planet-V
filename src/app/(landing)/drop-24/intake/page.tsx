"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const BLUE = "#2f88ff";

const questions = [
  {
    id: "business",
    q: "Business name",
    sub: "What do they call themselves?",
    type: "text",
    placeholder: "HVAC Bros LLC",
  },
  {
    id: "offer",
    q: "What do they sell?",
    sub: "Product or service — one sentence",
    type: "text",
    placeholder: "Furnace repair for Minneapolis homeowners",
  },
  {
    id: "audience",
    q: "Who do they serve?",
    sub: "Be specific — geography, industry, income level",
    type: "text",
    placeholder: "Homeowners 35-65, Twin Cities metro",
  },
  {
    id: "channels",
    q: "How are people finding them now?",
    sub: "Existing site? Google? Word of mouth? Social?",
    type: "text",
    placeholder: "Facebook ads + referrals, no website",
  },
  {
    id: "goal",
    q: "What's the goal of this page?",
    sub: "One outcome — calls, leads, bookings, sales?",
    type: "text",
    placeholder: "Get quote requests from homeowners",
  },
  {
    id: "not_for",
    q: "Who is this NOT for?",
    sub: "Helps us avoid the wrong clients",
    type: "text",
    placeholder: "Commercial Properties, landlords",
  },
  {
    id: "differentiator",
    q: "Why not just use Squarespace/Wix?",
    sub: "What makes their current setup fail?",
    type: "text",
    placeholder: "Those templates don't convert — no strategy",
  },
  {
    id: "proof",
    q: "Do they have proof? Reviews, stats, case studies?",
    sub: "Social proof builds conversion",
    type: "text",
    placeholder: "4.8 Google rating, 200+ jobs completed",
  },
  {
    id: "contact",
    q: "Contact info",
    sub: "Where we send the offer",
    type: "text",
    placeholder: "hVACbros@gmail.com / (612) 555-0199",
  },
];

export default function IntakeForm() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(answers).some((v) => !v.trim())) return;
    setSubmitted(true);
  };

  const allFilled = Object.values(answers).every((v) => v.trim());

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Check className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-[#050505] mb-3">Notes captured.</h2>
          <p className="text-slate-500 font-medium">
            Send these to Edd. He&apos;ll build the offer and we&apos;ll get it in front of them within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border"
            style={{ color: BLUE, borderColor: "#bfdbfe", backgroundColor: "#eff6ff" }}>
            Drop 24 — Intake
          </div>
          <h1 className="text-4xl font-black text-[#050505] tracking-tighter mb-2">
            Client Discovery Notes
          </h1>
          <p className="text-slate-500 font-medium">
            Fill this out after the call. Every field. Then send it to Edd to build the offer.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
            >
              <label className="block mb-1.5">
                <span className="text-base font-black text-[#050505]">{q.q}</span>
                <span className="text-xs text-slate-400 font-medium ml-2">{q.sub}</span>
              </label>
              <textarea
                rows={2}
                value={answers[q.id] || ""}
                onChange={(e) => handleChange(q.id, e.target.value)}
                placeholder={q.placeholder}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-[#050505] font-medium placeholder:text-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
              />
            </motion.div>
          ))}

          <button
            type="submit"
            disabled={!allFilled}
            className="w-full py-5 rounded-xl font-black text-lg text-white transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: allFilled ? BLUE : "#9ca3af" }}
          >
            {allFilled ? "Capture Notes" : "Fill all fields to continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
