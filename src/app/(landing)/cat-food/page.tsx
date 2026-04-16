"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const BLUE = "#3b82f6";

export default function CatFoodPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-6 px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3b82f6] flex items-center justify-center text-white font-black text-xl italic shadow-lg shadow-blue-500/20">
            P
          </div>
          <span className="text-xl font-black tracking-tighter text-[#050505] uppercase">
            Purr<span style={{ color: BLUE }}>fect</span>
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border bg-blue-50 border-blue-200 text-blue-600">
            🐱 Made for cats who know the difference
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black text-[#050505] leading-[1.05] tracking-tighter mb-6"
          >
            Finally, food worth{" "}
            <span style={{ color: BLUE }}>lapping up.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-slate-500 font-medium max-w-xl mx-auto mb-10"
          >
            Real ingredients. Zero filler. The kind of food your cat would pick
            if they could read the label.
          </motion.p>

          <motion.a
            href="#order"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-black text-lg text-white shadow-xl"
            style={{ backgroundColor: BLUE }}
          >
            Get Started <ArrowRight size={20} />
          </motion.a>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <hr className="border-slate-100" />
      </div>

      {/* The Problem */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[#050505] tracking-tight mb-8">
            Most cat food is garbage in disguise.
          </h2>
          <div className="space-y-4 text-slate-600 font-medium text-lg leading-relaxed">
            <p>
              Read the back of the bag. "Meat by-products." Corn. Wheat gluten.
              Ingredients you wouldn't feed yourself.
            </p>
            <p>
              Cats are obligate carnivores. They need real meat — not filler
              that keeps them full but keeps them unhealthy.
            </p>
            <p>Your cat deserves better. So does your vet bill.</p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <hr className="border-slate-100" />
      </div>

      {/* The Offer */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border bg-blue-50 border-blue-200 text-blue-600">
            The Fix
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#050505] tracking-tight mb-10">
            Purrfect. Real food. Real results.
          </h2>

          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <span className="text-3xl">🐱</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-[#050505] mb-2">
                  100% Real Chicken as #1 Ingredient
                </h3>
                <p className="text-slate-500 font-medium">
                  No by-products. No corn. No wheat. Just actual meat your cat
                  evolved to eat.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 mb-8">
              <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <span className="text-3xl">⚡</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-[#050505] mb-2">
                  Energy They Can Actually Feel
                </h3>
                <p className="text-slate-500 font-medium">
                  Owners report shinier coats, steadier weight, and cats that
                  actually act like cats again.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <span className="text-3xl">💩</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-[#050505] mb-2">
                  Smaller. Firmer. Less of It.
                </h3>
                <p className="text-slate-500 font-medium">
                  Real protein = better digestion = less waste. Your litter box
                  will thank you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <hr className="border-slate-100" />
      </div>

      {/* What's Included */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[#050505] tracking-tight mb-10">
            What's in the box.
          </h2>

          <div className="space-y-4">
            {[
              "4 × 3lb bags of Purrfect Chicken Formula",
              "Feeding guide sized for your cat's weight",
              "Scoop with measurements printed on it",
              "Satisfaction guarantee — money back if they turn their nose up",
            ].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Check size={14} className="text-green-600" />
                </div>
                <span className="text-lg font-medium text-[#050505]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="order" className="py-24 px-6 bg-[#050505]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Your cat will thank you.
          </h2>
          <p className="text-slate-400 font-medium text-lg mb-10">
            Or at least they'll stop staring at you like you owe them something.
          </p>
          <div className="inline-block bg-white rounded-2xl p-8">
            <div className="text-4xl font-black text-[#050505] mb-1">$47</div>
            <div className="text-slate-500 font-medium mb-6">Free shipping.</div>
            <a
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-black text-lg text-white shadow-xl"
              style={{ backgroundColor: BLUE }}
            >
              Add to Cart <ArrowRight size={20} />
            </a>
            <p className="text-xs text-slate-400 mt-4">
              30-day money back guarantee. No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center text-slate-400 text-sm font-medium">
          © 2026 Purrfect. Made with love for cats everywhere.
        </div>
      </footer>
    </main>
  );
}
