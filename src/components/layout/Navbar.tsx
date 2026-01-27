"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bot } from "lucide-react";

const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#portfolio" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "py-4 bg-dark-bg/80 backdrop-blur-lg border-b border-white/10" : "py-6 bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <a href="#" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-matrix-green rounded flex items-center justify-center text-white font-black text-xl italic group-hover:rotate-12 transition-transform">D</div>
                    <span className="text-xl font-black tracking-tighter text-[#050505] uppercase group-hover:text-matrix-green transition-colors">
                        Dynasty <span className="text-matrix-green">Labz</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-mono text-slate-400 hover:text-neon-cyan transition-colors uppercase tracking-widest"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className="px-5 py-2 rounded-md bg-neon-cyan text-black font-bold text-xs hover:bg-white transition-all border-glow"
                    >
                        GET STARTED
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900 border-b border-white/10"
                    >
                        <div className="flex flex-col p-6 gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-lg font-bold text-slate-300 hover:text-neon-cyan transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full py-4 rounded-md bg-neon-cyan text-black font-bold text-center"
                            >
                                BOOK CALL
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
