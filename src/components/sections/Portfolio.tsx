"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Monitor, X, ChevronLeft, ChevronRight, Expand } from "lucide-react";

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
        image: "/social-creative-collage.jpg",
        desc: "A collection of high-impact social media assets, flyers, and digital marketing materials.",
        live: "",
        github: "",
        expandable: true,
        gallery: [
            "/social-creative-collage.jpg",
            "/flyers/flyer-1.jpg",
            "/flyers/flyer-2.jpg",
            "/flyers/flyer-3.jpg",
            "/flyers/flyer-4.jpg",
            "/flyers/flyer-5.jpg",
        ],
    }
];

export default function Portfolio() {
    const [expandedProject, setExpandedProject] = useState<number | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const expandedData = expandedProject !== null ? projects[expandedProject] : null;
    const gallery = expandedData?.gallery || [];

    const nextImage = () => {
        setActiveImageIndex((prev) => (prev + 1) % gallery.length);
    };

    const prevImage = () => {
        setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    };

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
                            className={`group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full ${project.expandable ? "cursor-pointer" : ""}`}
                            onClick={() => {
                                if (project.expandable) {
                                    setActiveImageIndex(0);
                                    setExpandedProject(idx);
                                }
                            }}
                        >
                            <div className="aspect-video overflow-hidden relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                />
                                {project.expandable && (
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/90 rounded-full p-3">
                                            <Expand size={20} className="text-[#050505]" />
                                        </div>
                                    </div>
                                )}
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
                                            onClick={(e) => e.stopPropagation()}
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
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex items-center gap-2 text-[10px] font-black text-[#050505] hover:text-matrix-green transition-colors uppercase tracking-widest"
                                        >
                                            Code <Github size={12} />
                                        </a>
                                    )}
                                    {project.expandable && (
                                        <span className="flex items-center gap-2 text-[10px] font-black text-matrix-green uppercase tracking-widest">
                                            Click to Explore <Expand size={12} />
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Expandable Gallery Modal */}
                <AnimatePresence>
                    {expandedProject !== null && expandedData && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                            onClick={() => setExpandedProject(null)}
                        >
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="relative bg-white rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setExpandedProject(null)}
                                    className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                                >
                                    <X size={20} className="text-[#050505]" />
                                </button>

                                {/* Gallery Image Viewer */}
                                <div className="relative aspect-video md:aspect-[16/9] bg-slate-100 overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={activeImageIndex}
                                            src={gallery[activeImageIndex]}
                                            alt={`${expandedData.title} - ${activeImageIndex + 1}`}
                                            className="w-full h-full object-contain"
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </AnimatePresence>

                                    {/* Navigation Arrows */}
                                    {gallery.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                                            >
                                                <ChevronLeft size={20} className="text-[#050505]" />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                                            >
                                                <ChevronRight size={20} className="text-[#050505]" />
                                            </button>
                                        </>
                                    )}

                                    {/* Image Counter */}
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {activeImageIndex + 1} / {gallery.length}
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="p-6 md:p-8">
                                    <div className="text-[10px] font-black text-matrix-green uppercase tracking-widest mb-2">{expandedData.category}</div>
                                    <h3 className="text-2xl font-black text-[#050505] tracking-tight mb-3">{expandedData.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6">{expandedData.desc}</p>

                                    {/* Thumbnail Strip */}
                                    {gallery.length > 1 && (
                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            {gallery.map((img, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setActiveImageIndex(i)}
                                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                                        i === activeImageIndex
                                                            ? "border-matrix-green shadow-md"
                                                            : "border-transparent opacity-60 hover:opacity-100"
                                                    }`}
                                                >
                                                    <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

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
