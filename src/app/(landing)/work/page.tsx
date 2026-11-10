"use client";

import {
  motion, useScroll, useTransform, useSpring, useReducedMotion, useInView, MotionValue,
} from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import { useRef, ReactNode } from "react";
import { WORK, LABZ, type WorkItem } from "@/lib/content";

/* ── /work identity: yellow on black, Bebas Neue + DM Mono ───────────────── */
const Y = "#f5e642";
const K = "#080807";
const DIM = "#a3a08c";
const display = { fontFamily: "var(--font-bebas), Impact, sans-serif" };
const mono = { fontFamily: "var(--font-dm-mono), ui-monospace, monospace" };
const outline = { WebkitTextStroke: `1.5px ${Y}`, color: "transparent" };

const TOTAL = WORK.length + LABZ.length;
const pad = (n: number) => String(n).padStart(2, "0");

/* ════════════════════════════════════════════════════════════════════════
   HERO — three lines that slide apart as you scroll
   ════════════════════════════════════════════════════════════════════════ */
function HeroLine({ children, x, delay, style }: { children: string; x: MotionValue<string> | undefined; delay: number; style?: React.CSSProperties }) {
  return (
    <motion.div style={{ x }} className="overflow-hidden">
      <motion.div
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        style={style}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const left = useTransform(scrollYProgress, [0, 1], ["0%", "-11%"]);
  const right = useTransform(scrollYProgress, [0, 1], ["0%", "11%"]);
  const fade = useTransform(scrollYProgress, [0.35, 0.85], [1, 0]);
  const glow = useTransform(scrollYProgress, [0, 1], [1, 1.8]);

  return (
    <section ref={ref} className="relative h-[170svh]">
      <div className="sticky top-0 h-[100svh] flex flex-col justify-center overflow-hidden px-5 md:px-10">
        {/* grid + glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${Y}0d 1px, transparent 1px), linear-gradient(90deg, ${Y}0d 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 75% 65% at 50% 45%, black 20%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 45%, black 20%, transparent 78%)",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 w-[70vw] h-[70vw] max-w-[820px] max-h-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${Y}26 0%, transparent 65%)`, scale: reduce ? 1 : glow }}
        />

        <motion.h1
          style={{ ...display, opacity: reduce ? 1 : fade }}
          className="relative text-[25vw] md:text-[17vw] leading-[0.82] uppercase text-center select-none"
          aria-label="Things I've shipped."
        >
          <HeroLine x={reduce ? undefined : left} delay={0.1}>Things</HeroLine>
          <HeroLine x={reduce ? undefined : right} delay={0.22} style={{ color: Y }}>I&apos;ve</HeroLine>
          <HeroLine x={reduce ? undefined : left} delay={0.34} style={outline}>Shipped.</HeroLine>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          style={mono}
          className="absolute bottom-16 left-5 right-5 md:left-10 md:right-10 flex items-end justify-between gap-4 text-[10px] md:text-xs uppercase tracking-[0.2em]"
        >
          <span style={{ color: DIM }}>
            {pad(TOTAL)} projects · all live<br />Minneapolis, MN
          </span>
          <span className="flex items-center gap-2" style={{ color: Y }}>
            Scroll
            <motion.span animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowDown size={14} />
            </motion.span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   MANIFESTO — words light up as they pass through the viewport
   ════════════════════════════════════════════════════════════════════════ */
const MANIFESTO =
  "I don't make mockups. I ship working things — a site that books the job, a system that answers the lead, software people actually use. Here's the proof.";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = MANIFESTO.split(" ");
  return (
    <section className="px-5 md:px-10 py-28 md:py-44">
      <p ref={ref} style={display} className="max-w-6xl mx-auto text-[11vw] md:text-7xl lg:text-8xl leading-[0.95] uppercase">
        {reduce
          ? MANIFESTO
          : words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </Word>
            ))}
      </p>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   GROUP TITLE — a headline band that runs on its own, like a sports ticker
   ════════════════════════════════════════════════════════════════════════ */
function GroupTitle({ label, count, note }: { label: string; count: number; note: string }) {
  const run = (
    <>
      {[0, 1, 2, 3].map((k) => (
        <span key={k} className="flex items-center">
          <span style={k % 2 ? outline : undefined} className="px-[4vw]">{label}</span>
          <span style={{ color: Y }} className="text-[0.45em]">★</span>
        </span>
      ))}
    </>
  );
  return (
    <section className="py-16 md:py-24 overflow-x-clip" style={{ borderTop: `1px solid ${Y}26` }}>
      <div style={mono} className="px-5 md:px-10 mb-5 flex items-baseline justify-between gap-6 text-[10px] md:text-xs uppercase tracking-[0.2em]">
        <span style={{ color: Y }}>{pad(count)} projects</span>
        <span className="text-right" style={{ color: DIM }}>{note}</span>
      </div>
      <h2 style={display} className="text-[17vw] md:text-[12vw] leading-[0.9] uppercase whitespace-nowrap" aria-label={label}>
        <span className="marquee-track" style={{ animationDuration: "22s" }} aria-hidden>
          {run}
          {run}
        </span>
      </h2>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   BOTTOM TICKER — always-on headline crawl pinned to the bottom of the screen
   ════════════════════════════════════════════════════════════════════════ */
function Ticker({ label }: { label: string }) {
  const item = (text: string, strong = false) => (
    <span className="flex items-center gap-5 pr-5">
      <span style={strong ? { color: Y } : undefined}>{text}</span>
      <span style={{ color: Y }} className="text-[0.6em]">◆</span>
    </span>
  );
  const run = (
    <>
      {item("Client work", true)}
      {WORK.map((w) => <span key={w.name}>{item(w.name)}</span>)}
      {item("Built in the Labz", true)}
      {LABZ.map((w) => <span key={w.name}>{item(w.name)}</span>)}
      {item(`${pad(TOTAL)} projects — all live`, true)}
    </>
  );
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-stretch h-10 md:h-11"
      style={{ backgroundColor: "#000", borderTop: `2px solid ${Y}` }}
      aria-hidden
    >
      <div style={{ ...display, backgroundColor: Y, color: K }} className="shrink-0 flex items-center px-3 md:px-5 text-lg md:text-xl tracking-wider uppercase">
        {label}
      </div>
      <div style={display} className="flex-1 overflow-hidden flex items-center text-lg md:text-xl tracking-wider uppercase whitespace-nowrap">
        <span className="marquee-track pl-5" style={{ animationDuration: "30s" }}>
          {run}
          {run}
        </span>
      </div>
    </div>
  );
}

/* Wraps a group so the page knows which one is on screen (drives the ticker label). */
function Group({ children, onRef }: { children: ReactNode; onRef: React.RefObject<HTMLDivElement | null> }) {
  return <div ref={onRef}>{children}</div>;
}

/* ════════════════════════════════════════════════════════════════════════
   PROJECT STACK — full-screen panels; each one pins, and the next slides
   over it while the pinned one sinks back.
   ════════════════════════════════════════════════════════════════════════ */
function Panel({
  item, n, i, count, pre, progress,
}: {
  item: WorkItem; n: number; i: number; count: number; pre: MotionValue<number>; progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const seg = count > 1 ? 1 / (count - 1) : 1;

  // 0 → 1 while this panel slides into place
  const stepIn = useTransform(progress, [(i - 1) * seg, i * seg], [0, 1]);
  const enter = i === 0 ? pre : stepIn;
  // 0 → 1 while the next panel covers this one
  const cover = useTransform(progress, [i * seg, (i + 1) * seg], [0, 1]);

  const rotateX = useTransform(enter, [0, 1], [32, 0]);
  const rotateY = useTransform(enter, [0, 1], [i % 2 ? 22 : -22, 0]);
  const frameScale = useTransform(enter, [0, 1], [0.72, 1]);
  const textY = useTransform(enter, [0, 1], [90, 0]);
  const textOpacity = useTransform(enter, [0.35, 1], [0, 1]);
  const sink = useTransform(cover, [0, 1], [1, 0.9]);
  const shade = useTransform(cover, [0, 1], [0, 0.72]);
  const last = i === count - 1;
  const flip = i % 2 === 1;

  return (
    <div className="sticky top-0 h-[100svh]">
      <motion.article
        style={{ scale: reduce || last ? 1 : sink, backgroundColor: K, borderTop: `1px solid ${Y}33` }}
        className="relative h-full origin-top overflow-hidden rounded-t-[28px] px-5 md:px-10 pt-14 pb-12 md:pt-24 md:pb-20 flex items-center"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-16">
          {/* screenshot in a browser frame */}
          <div className={flip ? "lg:order-2" : ""} style={{ perspective: 1400 }}>
            <motion.a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${item.name} live`}
              style={reduce ? { boxShadow: `8px 8px 0 ${Y}` } : { rotateX, rotateY, scale: frameScale, boxShadow: `8px 8px 0 ${Y}` }}
              className="group block rounded-xl overflow-hidden mr-2 lg:mr-0"
            >
              <div className="flex items-center gap-1.5 px-3 h-7" style={{ backgroundColor: "#16150f", borderBottom: `1px solid ${Y}26` }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: Y }} />
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `${Y}66` }} />
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `${Y}33` }} />
                <span style={{ ...mono, color: DIM }} className="ml-2 text-[9px] uppercase tracking-widest truncate">
                  {item.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </span>
              </div>
              <div className="relative aspect-[3/2] max-h-[27svh] lg:max-h-none w-full overflow-hidden">
                <div
                  role="img"
                  aria-label={`${item.name} website preview`}
                  className="absolute inset-0 bg-cover bg-top transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              </div>
            </motion.a>
          </div>

          {/* copy */}
          <motion.div style={reduce ? undefined : { y: textY, opacity: textOpacity }} className={flip ? "lg:order-1" : ""}>
            <div className="flex items-baseline gap-3 mb-1 md:mb-4">
              <span style={{ ...display, ...outline }} className="text-4xl md:text-8xl leading-none">{pad(n)}</span>
              <span style={{ ...mono, color: DIM }} className="text-xs tracking-[0.2em]">/ {pad(TOTAL)}</span>
            </div>
            <div style={{ ...mono, color: Y }} className="text-[10px] md:text-xs uppercase tracking-[0.25em] mb-1.5 md:mb-3">{item.tag}</div>
            <h3 style={display} className="text-[13vw] sm:text-6xl md:text-7xl xl:text-8xl leading-[0.88] uppercase mb-2 md:mb-5">{item.name}</h3>
            <p style={{ ...mono, color: DIM }} className="text-xs md:text-sm leading-relaxed max-w-md mb-3 md:mb-6 line-clamp-3 md:line-clamp-none [@media(max-height:640px)]:hidden">{item.desc}</p>
            <ul className="flex flex-wrap gap-2 mb-4 md:mb-8 [@media(max-height:780px)]:hidden">
              {item.highlights.map((h) => (
                <li key={h} style={{ ...mono, border: `1px solid ${Y}40`, color: "#e9e6d3" }} className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest">
                  {h}
                </li>
              ))}
            </ul>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...display, backgroundColor: Y, color: K }}
              className="group inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full text-lg md:text-xl tracking-wider uppercase transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              Visit live <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* darkens as the next panel covers this one */}
        {!last && !reduce && (
          <motion.div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundColor: "#000", opacity: shade }} />
        )}
      </motion.article>
    </div>
  );
}

function Stack({ items, startAt }: { items: WorkItem[]; startAt: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pre } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="relative">
      {items.map((item, i) => (
        <Panel key={item.url} item={item} n={startAt + i} i={i} count={items.length} pre={pre} progress={progress} />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   OUTRO
   ════════════════════════════════════════════════════════════════════════ */
function Outro() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.55, 1]);
  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-5 pt-28 pb-24 overflow-hidden" style={{ backgroundColor: Y, color: K }}>
      <motion.h2 style={{ ...display, scale: reduce ? 1 : scale }} className="text-[30vw] md:text-[20vw] leading-[0.8] uppercase">
        Your<br />turn.
      </motion.h2>
      <p style={mono} className="mt-8 max-w-md text-sm leading-relaxed">
        Got a site, a lead system, or a piece of software that needs to exist? Tell me what it is.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <Link href="/start" style={{ ...display, backgroundColor: K, color: Y }} className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-2xl tracking-wider uppercase transition-transform duration-300 hover:scale-105 active:scale-95">
          Start a project <ArrowUpRight size={20} />
        </Link>
        <Link href="/" style={{ ...mono, borderBottom: `1px solid ${K}` }} className="text-xs uppercase tracking-[0.2em] pb-0.5">
          Dynasty Labz home
        </Link>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════════════ */
export default function WorkPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // which group is crossing the middle of the screen → ticker label
  const clientRef = useRef<HTMLDivElement>(null);
  const labzRef = useRef<HTMLDivElement>(null);
  const inClient = useInView(clientRef, { margin: "-50% 0px -50% 0px" });
  const inLabz = useInView(labzRef, { margin: "-50% 0px -50% 0px" });
  const tickerLabel = inLabz ? "The Labz" : inClient ? "Clients" : "Work";

  return (
    <main style={{ backgroundColor: K, color: "#f4f1de" }} className="min-h-screen overflow-x-clip">
      <motion.div aria-hidden className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left" style={{ scaleX, backgroundColor: Y }} />

      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-3.5"
        style={{ backgroundColor: "rgba(8,8,7,0.88)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${Y}1f` }}
      >
        <Link href="/" style={display} className="text-xl sm:text-2xl tracking-wider uppercase text-white whitespace-nowrap">
          Dynasty Labz <span style={{ color: Y }}>/ Work</span>
        </Link>
        <Link href="/start" style={mono} className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white whitespace-nowrap">
          <span className="hidden min-[380px]:inline">Start a project</span><span className="min-[380px]:hidden">Start</span> →
        </Link>
      </header>

      <Hero />
      <Manifesto />

      <Group onRef={clientRef}>
        <GroupTitle label="Client work" count={WORK.length} note="Built for real businesses" />
        <Stack items={WORK} startAt={1} />
      </Group>

      <Group onRef={labzRef}>
        <GroupTitle label="Built in the Labz" count={LABZ.length} note="My own products" />
        <Stack items={LABZ} startAt={WORK.length + 1} />
      </Group>

      <Outro />
      <Ticker label={tickerLabel} />

      <footer style={{ ...mono, backgroundColor: K, color: DIM }} className="px-5 md:px-10 pt-6 pb-16 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] uppercase tracking-[0.2em]">
        <span>&copy; {new Date().getFullYear()} Dynasty Labz · Minneapolis, MN</span>
        <span>Every project above is live</span>
      </footer>
    </main>
  );
}
