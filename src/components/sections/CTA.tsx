"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle, ArrowRight } from "lucide-react";

export default function CTA() {
    return (
        <section className="py-32 px-6 bg-[#050505]" id="contact">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-16 rounded-3xl border border-white/5 bg-white/5 relative overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-matrix-green/10 blur-3xl rounded-full -ml-32 -mt-32" />

                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                        Ready to Begin Your <br /><span className="text-matrix-green">Next Chapter?</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto font-medium">
                        If you&apos;re generating $7k–$21k/mo and looking to scale with efficiency, let&apos;s architect a system that works for you.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left max-w-xl mx-auto">
                        <div className="flex gap-4 items-start">
                            <CheckCircle className="text-matrix-green mt-1 flex-shrink-0" size={20} />
                            <div>
                                <h4 className="text-white font-black text-xs uppercase tracking-widest mb-1">Workflow Audit</h4>
                                <p className="text-slate-500 text-xs font-medium">Comprehensive review of current bottlenecks.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <CheckCircle className="text-matrix-green mt-1 flex-shrink-0" size={20} />
                            <div>
                                <h4 className="text-white font-black text-xs uppercase tracking-widest mb-1">Custom Roadmap</h4>
                                <p className="text-slate-500 text-xs font-medium">Strategic scaling blueprint tailored to you.</p>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <a
                            href="https://calendly.com/vcrypto1991/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-12 py-6 bg-matrix-green text-white font-black text-lg rounded-xl shadow-2xl shadow-matrix-green/20 hover:bg-white hover:text-[#050505] transition-all"
                        >
                            BOOK YOUR DISCOVERY CALL
                            <ArrowRight size={24} />
                        </a>
                    </motion.div>

                    <p className="mt-10 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
                        Strictly limited client intake for Q1
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
