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
                    <div className="w-10 h-10 bg-matrix-green rounded-xl flex items-center justify-center text-white font-black text-2xl italic group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-matrix-green/20 transition-all duration-300">D</div>
                    <span className="text-2xl font-black tracking-tighter text-[#050505] uppercase group-hover:text-matrix-green transition-colors">
                        Dynasty <span className="text-matrix-green">Labz</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-10 items-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-xs font-black text-slate-500 hover:text-matrix-green transition-colors uppercase tracking-[0.2em]"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="https://calendly.com/vcrypto1991/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-full border-2 border-matrix-green text-matrix-green font-black text-xs hover:bg-matrix-green hover:text-white transition-all duration-300 shadow-sm hover:shadow-matrix-green/30"
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
                                href="https://calendly.com/vcrypto1991/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full py-4 rounded-md bg-matrix-green text-white font-black text-center"
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
