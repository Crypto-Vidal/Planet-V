"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Monitor } from "lucide-react";

const projects = [
    {
        title: "Ballistics Test",
        category: "Mobile Application",
        image: "/ballistics-focus.jpg",
        desc: "Instant website analysis. Drop in your URL to get a comprehensive performance score and actionable optimization suggestions.",
        live: "",
        github: "",
    },
    {
        title: "Blast Off Reading Adventure",
        category: "Mobile Application",
        image: "/blast-off.jpg",
        desc: "Interactive educational platform designed to gamify the reading experience for young learners.",
        live: "https://example.com",
        github: "https://github.com"
    },
    {
        title: "Cake Jar Co.",
        category: "Web Development",
        image: "/cake-jar.png",
        desc: "Precision-crafted digital storefront for a premium custom cake shop.",
        live: "https://cakes-five-eta.vercel.app",
        cta: "Explore Jars",
        github: ""
    },
    {
        title: "The Jamaican Chef",
        category: "Web Development",
        image: "/jamaican-chef.png",
        desc: "High-performance platform for elite culinary professionals to manage bookings and menus.",
        live: "https://vcrypto1991.wixsite.com/jamaican",
        cta: "Explore Flavors",
        github: ""
    },
    {
        title: "High-Conversion Landing Page",
        category: "Conversion Design",
        image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=800",
        desc: "Strategically engineered landing page optimized for maximum lead generation efficiency.",
        live: "https://example.com",
        github: "https://github.com"
    },
    {
        title: "Social Creative & Flyer Design",
        category: "Content Production",
        image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800",
        desc: "A collection of high-impact social media assets, flyers, and digital marketing materials.",
        live: "https://example.com",
        github: "https://github.com"
    }
];

export default function Portfolio() {
    return (
        <section className="py-32 px-6 bg-slate-50/50" id="portfolio">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-xl">
                        <div className="text-matrix-green font-black text-xs mb-4 uppercase tracking-widest flex items-center gap-2">
                            <Monitor size={12} /> Selected Projects
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-[#050505]">Proving the <span className="text-matrix-green">Concept.</span></h2>
                    </div>
                    <p className="text-slate-500 max-w-sm text-sm font-medium">
                        A showcase of engineering excellence and strategic execution. From custom workflows to enterprise platforms.
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
                            className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                        >
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-8 flex flex-col flex-1">
                                <div className="text-[10px] font-black text-matrix-green uppercase tracking-widest mb-3">{project.category}</div>
                                <h3 className="text-xl font-black mb-3 text-[#050505] tracking-tight">{project.title}</h3>
                                <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
                                    {project.desc}
                                </p>

                                <div className="mt-auto flex items-center gap-6">
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-[10px] font-black text-[#050505] hover:text-matrix-green transition-colors uppercase tracking-widest"
                                        >
                                            {/* @ts-ignore - CTA property is optional */}
                                            {project.cta || "Live Demo"} <ExternalLink size={12} />
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-[10px] font-black text-[#050505] hover:text-matrix-green transition-colors uppercase tracking-widest"
                                        >
                                            Code <Github size={12} />
                                        </a>
                                    )}
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
