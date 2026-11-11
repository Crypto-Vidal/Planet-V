/**
 * Single source of truth for customer-facing copy that ALSO powers structured
 * data (JSON-LD). Keeping the visible text and the schema in one place is what
 * makes the FAQ/Offer rich results valid — Google requires the markup to match
 * what the visitor actually sees, and AI answer engines quote this same text.
 *
 * The site sells ONE offer (OFFER). Never hardcode its price, timeline or
 * guarantee anywhere else — read them from here.
 */

export const SITE_URL = "https://planet-v.vercel.app";

export const BUSINESS = {
  name: "Dynasty Labz",
  /* One-sentence definition — this is what AI answer engines quote back. */
  summary:
    "Dynasty Labz helps small businesses put AI to work: we automate your most time-consuming task in 7 days for one flat price — or you don't pay.",
  city: "Minneapolis",
  region: "MN",
  regionName: "Minnesota",
  areaServed: ["Minneapolis", "St. Paul", "Twin Cities", "Minnesota", "United States"],
  priceRange: "$$",
  telephone: "", // add when ready
  calendly: "https://calendly.com/vcrypto1991/drop24-meeting",
};

/* The front door: every primary CTA on the site points at the survey funnel. */
export const START = {
  href: "/start",
  label: "Find My Task",
  terms: "5 quick questions · 2 minutes · then pick a call time",
};

/* ──────────────────────────────────────────────────────────────────────────
   The menu — tasks we automate. It answers "where do I even start with AI?"
   ────────────────────────────────────────────────────────────────────────── */
export type Service = {
  icon: "inbox" | "calendar" | "receipt" | "star" | "chat" | "table";
  title: string;
  desc: string;
};

export const SERVICES: Service[] = [
  {
    icon: "inbox",
    title: "Answering new leads",
    desc: "Every form, message and email gets a reply in under a minute — then automatic follow-ups until they book or say no.",
  },
  {
    icon: "calendar",
    title: "Booking & reminders",
    desc: "Customers pick their own time, get confirmations and reminders, and no-shows get a nudge to rebook.",
  },
  {
    icon: "receipt",
    title: "Quote & invoice follow-up",
    desc: "Open quotes and unpaid invoices get chased politely and on schedule, so you stop doing it from memory.",
  },
  {
    icon: "star",
    title: "Review requests",
    desc: "Every finished job or visit triggers a review request automatically, with one reminder if they forget.",
  },
  {
    icon: "chat",
    title: "The same questions, over and over",
    desc: "Hours, pricing, availability, directions — answered instantly and accurately, with the tricky ones handed to you.",
  },
  {
    icon: "table",
    title: "Copy-paste & reports",
    desc: "Moving info between apps, updating a spreadsheet, building the weekly report — done for you, every time.",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   THE offer. One task, one price, one deadline, one guarantee.
   ────────────────────────────────────────────────────────────────────────── */
export type Offer = {
  n: string;
  name: string;
  price: string;
  priceFrom: number; // for schema
  days: number; // the guarantee window
  timeline: string; // plain-English delivery time
  blurb: string;
  deliverables: string[]; // itemized — exactly what lands
  guarantee: string;
  guaranteeDetail: string;
  scope: string; // what "one task" means — keeps the guarantee honest
  href: string;
  cta: string;
};

export const OFFER: Offer = {
  n: "01",
  name: "Your First AI Win",
  price: "$1,497",
  priceFrom: 1497,
  days: 7,
  timeline: "Live in 7 days",
  blurb:
    "Tell us the one task that eats your week. We automate it with AI — built, tested and running in 7 days for one flat price.",
  deliverables: [
    "A 20-minute call to pick the task and map how you do it today",
    "The automation, built and tested on your real work",
    "Built around the tools you already use — nothing new to learn",
    "A plain-English walkthrough of exactly what it does",
    "30 days of fixes and tune-ups after launch",
  ],
  guarantee: "Live in 7 days, or you don't pay.",
  guaranteeDetail:
    "If your task isn't automated and running within 7 days of the day you give us access to the tools it needs, you don't pay.",
  scope:
    "One task means one workflow. If it needs third-party software, that is billed at cost and you will know the amount before we start.",
  href: START.href,
  cta: "Find My Task",
};

/* Kept as an array because the JSON-LD offer catalog maps over it. */
export const OFFERS: Offer[] = [OFFER];

export type Plan = {
  slug: string;
  name: string;
  price: string;
  priceFrom: number;
  cadence: string;
  blurb: string;
  points: string[];
};

/* The only recurring plan — optional, offered after the first win is live. */
export const CARE: Plan = {
  slug: "care",
  name: "Care Plan",
  price: "$299",
  priceFrom: 299,
  cadence: "/mo",
  blurb: "Optional, after launch: we keep your automation running and improving. Month-to-month.",
  points: ["Monitoring and fixes", "Monthly tune-up", "Monthly performance report"],
};

export const PLANS: Plan[] = [CARE];

export type Faq = { q: string; a: string };

/* Natural-language questions real owners (and AI search engines) actually ask. */
export const FAQS: Faq[] = [
  {
    q: "I've heard of AI but don't know where to start. What do you actually do?",
    a: "We find the one task that eats the most of your week — replying to leads, booking, chasing quotes, answering the same questions — and automate it so it runs without you. You don't need to understand AI or change the software you already use.",
  },
  {
    q: "How much does AI automation cost for a small business?",
    a: "At Dynasty Labz your first automation is $1,497 flat. That covers the planning call, the build, testing, and 30 days of fixes and tune-ups after launch. If the task needs third-party software, that is billed at cost and you will know the amount before we start.",
  },
  {
    q: "What exactly is the guarantee?",
    a: "If your task isn't automated and running within 7 days of the day you give us access to the tools it needs, you don't pay.",
  },
  {
    q: "What kinds of tasks can you automate?",
    a: "The most common are answering and following up new leads, booking and appointment reminders, quote and invoice follow-up, review requests, answering repeat customer questions, and copy-paste work between apps. If yours isn't on that list, tell us — the planning call is where we find out if it's a fit.",
  },
  {
    q: "How long does it take?",
    a: "Seven days from the day you give us access to the tools the task runs on. The survey takes about 2 minutes and the planning call takes 20.",
  },
  {
    q: "What happens after the first automation?",
    a: "That's up to you. It's yours and it keeps running. If you want us to monitor and improve it, the optional Care Plan is $299/mo, month-to-month. Bigger systems are scoped and priced in writing before any work starts.",
  },
  {
    q: "Do you work with businesses outside Minneapolis?",
    a: "Yes. We're based in Minneapolis and work with small businesses anywhere in the United States — everything is done remotely.",
  },
  {
    q: "Do you still build websites?",
    a: "Yes. Drop 24 is our one-page website service: $350 flat, live in 24 hours, and if you don't love it you don't pay.",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   Portfolio — shared by the homepage Work section and the /work page.
   ────────────────────────────────────────────────────────────────────────── */
export type WorkItem = {
  name: string;
  url: string;
  desc: string;
  tag: string;
  image: string;
  highlights: string[]; // short facts shown as chips on /work
};

/* Client builds — the contractor one leads, because that's who this site sells to. */
export const WORK: WorkItem[] = [
  {
    name: "All Good Egress",
    url: "https://www.allgoodegress.com/",
    desc: "Egress window contractor — quote-request site wired to an automated lead intake pipeline",
    tag: "Home Services · Contractor",
    image: "/work/all-good-egress.webp",
    highlights: ["Quote-request funnel", "Automated lead intake", "Photo uploads"],
  },
  {
    name: "Masona Salon",
    url: "https://masona-salon.vercel.app/",
    desc: "Luxury beauty studio — real-time booking & admin dashboard",
    tag: "Beauty & Wellness",
    image: "/drop24-previews/masona-salon-site.webp",
    highlights: ["Real-time booking", "Admin dashboard"],
  },
  {
    name: "Cake Jar Co.",
    url: "https://cakes-five-eta.vercel.app/",
    desc: "Bakery & custom desserts — Minneapolis storefront",
    tag: "Food & Beverage",
    image: "/drop24-previews/cake-jar-site.webp",
    highlights: ["Storefront", "Custom desserts"],
  },
  {
    name: "The Jamaican Chef",
    url: "https://vcrypto1991.wixsite.com/jamaican",
    desc: "Caribbean restaurant & catering — bookings + menus",
    tag: "Restaurant",
    image: "/drop24-previews/jamaican-chef-site.webp",
    highlights: ["Bookings", "Menus", "Catering"],
  },
];

/* Our own products — proof we ship real software, not just brochure sites. */
export const LABZ: WorkItem[] = [
  {
    name: "Nok Nok",
    url: "https://noknok-blue.vercel.app/",
    desc: "AI door-knock simulator for roofing sales teams — reps practice the pitch out loud, get scored, and get greenlit before a real door",
    tag: "Sales Training · SaaS",
    image: "/work/noknok.webp",
    highlights: ["Voice AI roleplay", "Scored sessions", "Owner dashboard"],
  },
  {
    name: "Cosmic OS",
    url: "https://cosmic-os-alpha.vercel.app/",
    desc: "Astrology app on its own ephemeris engine — every placement computed to the exact degree, never guessed by AI",
    tag: "Consumer App",
    image: "/work/cosmic-os.webp",
    highlights: ["Custom ephemeris engine", "3D sky", "Accuracy test suite"],
  },
  {
    name: "Drop 24",
    url: "https://planet-v.vercel.app/drop-24",
    desc: "Our own 24-hour website product — intake form to live site in a day",
    tag: "AI & Web",
    image: "/drop24-previews/planet-v-site.webp",
    highlights: ["24-hour turnaround", "$350 flat", "Self-serve intake"],
  },
];
