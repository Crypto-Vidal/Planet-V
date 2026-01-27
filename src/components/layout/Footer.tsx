import { Bot, Mail, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-12 border-t border-white/5 bg-dark-bg relative">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-matrix-green rounded flex items-center justify-center text-white font-black text-xl italic">D</div>
                        <span className="text-xl font-black text-[#050505] uppercase tracking-tighter">
                            Dynasty <span className="text-matrix-green">Labz</span>
                        </span>
                    </div>
                    <p className="text-slate-500 max-w-sm mb-6">
                        Weaponizing AI automation for businesses making $7k–$21k+ a month. Reclaim your time and scale your empire without the technical headache.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 rounded bg-slate-900 border border-white/5 text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all"><Twitter size={20} /></a>
                        <a href="#" className="p-2 rounded bg-slate-900 border border-white/5 text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all"><Linkedin size={20} /></a>
                        <a href="#" className="p-2 rounded bg-slate-900 border border-white/5 text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all"><Github size={20} /></a>
                        <a href="#" className="p-2 rounded bg-slate-900 border border-white/5 text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all"><Mail size={20} /></a>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Services</h4>
                    <ul className="space-y-4 text-slate-500 text-sm">
                        <li><a href="#services" className="hover:text-neon-cyan transition-colors">AI Workflow Scaling</a></li>
                        <li><a href="#services" className="hover:text-neon-cyan transition-colors">Premium Web Build</a></li>
                        <li><a href="#services" className="hover:text-neon-cyan transition-colors">Legacy Revamp</a></li>
                        <li><a href="#services" className="hover:text-neon-cyan transition-colors">Full Stack Maintenance</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Legal</h4>
                    <ul className="space-y-4 text-slate-500 text-sm">
                        <li><a href="#" className="hover:text-neon-cyan transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-neon-cyan transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-neon-cyan transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-slate-600 text-[10px] font-mono uppercase tracking-[0.2em]">
                © {new Date().getFullYear()} DYNASTY LABZ. HANDCRAFTED FOR GROWTH.
            </div>
        </footer>
    );
}
