"use client";

import { motion } from "framer-motion";
import { ExternalLink, Tag } from "lucide-react";

const projects = [
    {
        title: "AI Logistics Orchestrator",
        category: "Automation",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        desc: "Enterprise-grade LLM integration streamlining cross-border logistics for a scaling provider."
    },
    {
        title: "FinTech Analytics Suite",
        category: "Platform",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        desc: "High-conviction financial dashboard delivering real-time insights to portfolio managers."
    },
    {
        title: "Predictive Content Engine",
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        desc: "Automated high-quality content generation pipeline for hospitality brands."
    }
];

export default function Portfolio() {
    return (
        <section className="py-32 px-6 bg-slate-50/50" id="portfolio">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-xl">
                        <div className="text-matrix-green font-black text-xs mb-4 uppercase tracking-widest flex items-center gap-2">
                            <Tag size={12} /> Elite Case Studies
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-[#050505]">Proving the <span className="text-matrix-green">Concept.</span></h2>
                    </div>
                    <p className="text-slate-500 max-w-sm text-sm font-medium">
                        We don&apos;t build generic applications. We engineer competitive advantages that define market leaders.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-8">
                                <div className="text-[10px] font-black text-matrix-green uppercase tracking-widest mb-3">{project.category}</div>
                                <h3 className="text-xl font-black mb-3 text-[#050505] tracking-tight">{project.title}</h3>
                                <p className="text-slate-500 text-sm mb-6 leading-relaxed font-medium">
                                    {project.desc}
                                </p>
                                <div className="flex items-center gap-2 text-xs font-black text-[#050505] group-hover:text-matrix-green transition-colors cursor-pointer">
                                    VIEW FULL CASE STUDY <ExternalLink size={14} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 p-12 rounded-2xl border border-slate-100 bg-white text-center shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <div className="w-24 h-24 bg-matrix-green rounded-full blur-3xl" />
                    </div>
                    <p className="text-xl md:text-2xl text-[#050505] font-bold italic mb-6 leading-tight max-w-3xl mx-auto">&quot;They took our fragmented manual workflow and engineered it into a cohesive, high-performance system. We saved 20+ hours a week in month one.&quot;</p>
                    <div className="text-matrix-green font-black uppercase tracking-widest text-sm">— Director of Growth, FleetScale</div>
                </div>
            </div>
        </section>
    );
}
