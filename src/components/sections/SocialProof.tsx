"use client";

import { motion } from "framer-motion";
import { Quote, Star, ShieldCheck } from "lucide-react";

const testimonials = [
    {
        name: "Alex Rivera",
        role: "Agency Principal",
        content: "I was previously misinformed by 'experts' selling shallow integrations. This team delivered a cohesive AI architecture that actually fixed our core CRM bottlenecks.",
        metrics: "40% Higher Conversion"
    },
    {
        name: "Sarah Chen",
        role: "Head of Operations",
        content: "The analytics suite they engineered is lightyears ahead of anything on the market. It's clean, fast, and remarkably intuitive.",
        metrics: "Saved $12k/mo in Overhead"
    },
    {
        name: "Marcus Thorne",
        role: "Founder, PeakLogic",
        content: "They revamp systems with the precision of a high-end watchmaker. Professional, transparent, and focused on ROI.",
        metrics: "2.5x Performance Gain"
    }
];

export default function SocialProof() {
    return (
        <section className="py-32 px-6 bg-white relative overflow-hidden" id="testimonials">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex justify-center gap-1.5 mb-6"
                    >
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} size={14} className="text-matrix-green fill-matrix-green" />
                        ))}
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#050505] mb-6">
                        Architecting Success for <br /><span className="text-matrix-green">Market Leaders.</span>
                    </h2>
                    <p className="text-slate-500 font-medium">Real-world ROI for businesses demanding absolute technical excellence.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-10 rounded-2xl bg-slate-50 border border-slate-100 relative hover:shadow-xl transition-all"
                        >
                            <Quote className="absolute top-8 right-8 text-matrix-green/10" size={40} />

                            <div className="mb-8">
                                <p className="text-[#050505] leading-relaxed font-medium italic">&quot;{t.content}&quot;</p>
                            </div>

                            <div className="flex flex-col gap-1 border-t border-slate-200 pt-8">
                                <div className="font-black text-[#050505]">{t.name}</div>
                                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-4">{t.role}</div>
                                <div className="flex items-center gap-2 text-matrix-green text-xs font-black bg-matrix-green/10 px-4 py-1.5 rounded-full w-fit">
                                    <ShieldCheck size={12} />
                                    {t.metrics}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
