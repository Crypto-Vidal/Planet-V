"use client";

import { motion } from "framer-motion";
import { Code2, Settings, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

const services = [
    {
        title: "AI Workflow Integration",
        desc: "We don't just 'install' AI; we weave it into your existing processes. Automate high-volume tasks and reclaim 20+ hours of your management time every single week.",
        icon: <Sparkles className="text-matrix-green" />,
        features: ["Process Auditing", "Custom LLM Pipelines", "Ops Orchestration"]
    },
    {
        title: "High-End Web Development",
        desc: "Clean, modern websites built to represent your business properly. We turn slow or outdated sites into fast, easy-to-use experiences your customers trust and talk about.",
        icon: <Code2 className="text-matrix-green" />,
        features: ["Modern Design", "Fast Load Times", "Simple, Clean Layouts"]
    },
    {
        title: "Content Maintenance",
        desc: "Stay consistent and visible without the stress. We manage your social media content and keep your channels fresh, handled, and professional every single day.",
        icon: <Settings className="text-matrix-green" />,
        features: ["Social Content Management", "Daily Post Updates", "Channel Maintenance"]
    }
];

export default function Services() {
    return (
        <section className="py-32 px-6 bg-white" id="services">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-matrix-green font-black text-xs uppercase tracking-widest mb-4"
                        >
                            Professional Capabilities
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-black text-[#050505] leading-tight">
                            Engineered for <span className="text-matrix-green">Efficiency.</span>
                        </h2>
                    </div>
                    <p className="text-slate-500 max-w-sm text-sm font-medium leading-relaxed">
                        Moving past generic tools. We build high-conviction AI solutions that eliminate bottlenecks for businesses making $7k - $21k a month.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group p-10 rounded-2xl bg-white border border-slate-100 hover:border-matrix-green/30 hover:shadow-2xl hover:shadow-matrix-green/5 transition-all"
                        >
                            <div className="mb-8 p-4 rounded-xl bg-matrix-green/5 w-fit group-hover:bg-matrix-green group-hover:text-white transition-all">
                                {service.icon}
                            </div>

                            <h3 className="text-2xl font-black mb-4 text-[#050505] tracking-tight">{service.title}</h3>
                            <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
                                {service.desc}
                            </p>

                            <ul className="space-y-4 mb-8">
                                {service.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-center gap-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                        <div className="w-1 h-1 rounded-full bg-matrix-green/30" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex items-center gap-2 text-xs font-black text-[#050505] group-hover:text-matrix-green transition-colors cursor-pointer">
                                LEARN MORE <ArrowRight size={14} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
