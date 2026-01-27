"use client";

import { motion } from "framer-motion";
import { ArrowRight, Target, Zap } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 px-4 overflow-hidden bg-white">
            {/* Subtle Background Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-matrix-green/5 -skew-x-12 translate-x-1/4 pointer-events-none" />

            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-matrix-green/10 text-matrix-green text-xs font-bold tracking-wider mb-8 border border-matrix-green/20">
                        <Target size={14} />
                        <span className="uppercase">Strategic AI Workflows</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-[#050505] leading-[1.1] mb-8">
                        Scale Smarter. <br />
                        <span className="text-matrix-green">Automate with Purpose.</span>
                    </h1>

                    <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                        Stop losing 20+ hours a week to manual grunt work. We help growth-focused businesses making $7k–$21k/mo plug custom AI directly into their core operations.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <button className="px-10 py-5 bg-[#050505] text-white font-bold rounded-lg hover:bg-matrix-green transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3">
                            BOOK A DISCOVERY CALL
                            <ArrowRight size={20} />
                        </button>
                        <button className="px-10 py-5 bg-white text-[#050505] font-bold rounded-lg border border-slate-200 hover:border-matrix-green transition-all flex items-center justify-center gap-3">
                            OUR PROCESS
                        </button>
                    </div>

                    <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-10 border-t border-slate-100">
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl font-black text-[#050505]">15h+</span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Time Reclaimed / Wk</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl font-black text-[#050505]">Zero</span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tech Headache</span>
                        </div>
                        <div className="flex flex-col gap-1 sm:col-span-1 col-span-2">
                            <span className="text-2xl font-black text-[#050505]">Expert</span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Human Supervision</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    {/* Abstract Expert Visualization */}
                    <div className="relative p-4">
                        <div className="absolute inset-0 bg-matrix-green/10 rounded-3xl -rotate-3" />
                        <div className="relative bg-white border border-slate-100 rounded-3xl shadow-2xl p-10 overflow-hidden">
                            <div className="flex items-center justify-between mb-12">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                                </div>
                                <div className="px-3 py-1 rounded bg-matrix-green/10 text-matrix-green text-[10px] font-bold">SYSTEM ACTIVE</div>
                            </div>

                            <div className="space-y-8 mb-12">
                                <div className="space-y-3">
                                    <div className="h-2 w-3/4 bg-slate-100 rounded" />
                                    <div className="h-2 w-full bg-slate-100 rounded" />
                                </div>
                                <div className="p-6 rounded-xl border border-matrix-green/20 bg-matrix-green/5 relative overflow-hidden group">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0.1, 0.4, 0.1] }}
                                        transition={{ repeat: Infinity, duration: 4 }}
                                        className="absolute inset-0 bg-matrix-green/5"
                                    />
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="p-3 rounded-lg bg-matrix-green text-white">
                                            <Zap size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-matrix-green uppercase">Optimization</p>
                                            <p className="text-lg font-bold text-[#050505] tracking-tight">Efficiency Boost +84%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-2 w-1/2 bg-slate-100 rounded" />
                                    <div className="h-2 w-2/3 bg-slate-100 rounded" />
                                </div>
                            </div>

                            <div className="flex justify-center flex-col items-center gap-2">
                                <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Digital Intelligence Architecture</div>
                                <div className="h-1 w-24 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                        className="h-full w-1/2 bg-matrix-green"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
