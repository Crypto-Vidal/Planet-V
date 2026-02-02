"use client";

import { motion } from "framer-motion";
import { ArrowRight, Target, Zap, CheckCircle2, Cpu, Globe, Rocket } from "lucide-react";

const techLogos = [
    { name: "OpenAI", icon: Cpu },
    { name: "Claude", icon: Globe },
    { name: "Zapier", icon: Zap },
    { name: "Make", icon: Rocket },
    { name: "Vercel", icon: Target },
];

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden bg-white">
            {/* Mesh Gradient Background Depth */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-matrix-green/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-matrix-green/10 text-matrix-green text-sm font-black tracking-widest mb-10 border-2 border-matrix-green/20 animate-subtle-glow">
                        <Target size={16} className="text-matrix-green" />
                        <span className="uppercase">Strategic AI Workflows</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-[#050505] leading-[0.95] mb-10 tracking-tighter">
                        Scale Smarter. <br />
                        <span className="text-gradient-green">Automate with Purpose.</span>
                    </h1>

                    <p className="text-2xl text-slate-500 mb-12 max-w-xl leading-relaxed font-medium">
                        Stop losing 20+ hours a week to manual grunt work. We help growth-focused businesses making $7k–$21k/mo plug custom AI directly into their core operations.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 mb-16">
                        <a
                            href="https://calendly.com/vcrypto1991/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-12 py-6 bg-[#050505] text-white font-black text-lg rounded-2xl hover:bg-matrix-green transition-all shadow-2xl shadow-black/20 flex items-center justify-center gap-4 group"
                        >
                            BOOK A DISCOVERY CALL
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <button className="px-12 py-6 bg-white text-[#050505] font-black text-lg rounded-2xl border-2 border-slate-100 hover:border-matrix-green transition-all flex items-center justify-center gap-4">
                            OUR PROCESS
                        </button>
                    </div>

                    {/* Authority Logo Row */}
                    <div className="pt-10 border-t border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Engineered with Elite Tech</p>
                        <div className="flex flex-wrap gap-8 items-center opacity-40 grayscale group-hover:grayscale-0 transition-all">
                            {techLogos.map((tech) => (
                                <div key={tech.name} className="flex items-center gap-2">
                                    <tech.icon size={18} className="text-slate-900" />
                                    <span className="text-xs font-black text-slate-900 uppercase tracking-widest">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Command Center Visual */}
                <div className="relative">
                    {/* Layer 1: Desktop Monitor (Workflow Node Builder) */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="relative z-10 p-4"
                    >
                        <div className="glass-card rounded-[2.5rem] shadow-deep p-8 border border-white/20 aspect-video relative overflow-hidden">
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-3 h-3 rounded-full bg-red-400/40" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400/40" />
                                <div className="w-3 h-3 rounded-full bg-green-400/40" />
                                <div className="ml-4 px-3 py-1 bg-matrix-green/10 rounded-full text-[10px] font-black text-matrix-green uppercase tracking-widest">Enterprise Workflow Builder</div>
                            </div>

                            {/* Node Builder Mockup */}
                            <div className="grid grid-cols-3 gap-6 relative">
                                {/* Flow Lines SVG */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
                                    <path d="M 100 50 L 200 100 L 300 50" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
                                    <path d="M 200 100 L 350 150" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
                                </svg>

                                <div className="col-span-1 p-4 rounded-2xl bg-white/50 border border-slate-100 shadow-sm">
                                    <div className="w-8 h-8 rounded-lg bg-matrix-green/10 flex items-center justify-center mb-3">
                                        <Mail size={16} className="text-matrix-green" />
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded mb-2" />
                                    <div className="h-2 w-2/3 bg-slate-100 rounded" />
                                </div>

                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="col-span-1 mt-12 p-4 rounded-2xl bg-white shadow-xl border border-matrix-green/20"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-matrix-green flex items-center justify-center mb-3 shadow-lg shadow-matrix-green/30">
                                        <Zap size={16} className="text-white" />
                                    </div>
                                    <div className="h-2 w-full bg-matrix-green/20 rounded mb-2" />
                                    <div className="h-2 w-2/3 bg-matrix-green/10 rounded" />
                                </motion.div>

                                <div className="col-span-1 p-4 rounded-2xl bg-white/50 border border-slate-100 shadow-sm">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mb-3">
                                        <Cpu size={16} className="text-slate-400" />
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded mb-2" />
                                    <div className="h-2 w-2/3 bg-slate-100 rounded" />
                                </div>
                            </div>

                            <div className="mt-12 p-4 rounded-3xl bg-slate-50/50 border border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 space-y-2">
                                        <div className="h-2 w-full bg-slate-200 rounded animate-pulse" />
                                        <div className="h-2 w-3/4 bg-slate-200 rounded animate-pulse" />
                                    </div>
                                    <div className="px-4 py-2 bg-[#050505] text-white text-[10px] font-black rounded-lg">CALIBRATING</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Layer 2: Floating Mobile Success Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ y: -10, rotate: -2 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="absolute -bottom-10 -right-4 z-20 w-64 p-6 glass-card rounded-[2rem] shadow-deep border border-matrix-green/30"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-matrix-green flex items-center justify-center shadow-lg shadow-matrix-green/30">
                                <CheckCircle2 size={24} className="text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-matrix-green uppercase tracking-widest">Automation Success</p>
                                <p className="text-lg font-black text-[#050505] leading-none">New Lead Ready</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-matrix-green/5 border border-matrix-green/10">
                            <p className="text-xs font-bold text-slate-600 mb-1">Status:</p>
                            <p className="text-xs font-black text-[#050505] uppercase">Qualified & CRM Synced</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400">TODAY AT 2:45 PM</span>
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white" />
                                <div className="w-6 h-6 rounded-full bg-matrix-green border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">AI</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Add necessary icon for the node builder
import { Mail } from "lucide-react";
