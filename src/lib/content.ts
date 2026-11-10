/**
 * Single source of truth for customer-facing copy that ALSO powers structured
 * data (JSON-LD). Keeping the visible text and the schema in one place is what
 * makes the FAQ/Offer rich results valid — Google requires the markup to match
 * what the visitor actually sees, and AI answer engines quote this same text.
 */

export const SITE_URL = "https://planet-v.vercel.app";

export const BUSINESS = {
  name: "Dynasty Labz",
  /* One-sentence definition — this is what AI answer engines quote back. */
  summary:
    "Dynasty Labz builds done-for-you lead systems for Twin Cities home-service contractors — websites, automated lead capture, and AI follow-up that turn missed calls into booked jobs.",
  city: "Minneapolis",
  region: "MN",
  regionName: "Minnesota",
  areaServed: ["Minneapolis", "St. Paul", "Twin Cities", "Minnesota"],
  priceRange: "$$",
  telephone: "", // add when ready
  calendly: "https://calendly.com/vcrypto1991/drop24-meeting",
};

export type Service = {
  icon: "code" | "sparkles" | "megaphone";
  title: string;
  desc: string;
  points: string[];
  href: string;
};

export const SERVICES: Service[] = [
  {
    icon: "code",
    title: "Websites that book jobs",
    desc: "A fast, mobile-perfect site built for contractors — it turns visitors into quote requests and phone calls, not a brochure that just sits there. Loads in under a second and looks flawless on every phone.",
    points: ["Built to book jobs, not just look good", "Loads in under a second", "Flawless on every phone"],
    href: "/drop-24",
  },
  {
    icon: "sparkles",
    title: "AI that answers every lead",
    desc: "Never lose a job to a missed call again. AI replies to new leads instantly, follows up automatically, books the estimate, and chases no-shows — 24/7, even while you're on the roof.",
    points: ["Instant reply to every lead", "Automatic follow-up & booking", "Works 24/7 while you're on the job"],
    href: "/efficiency-engine",
  },
  {
    icon: "megaphone",
    title: "A lead system that never drops a job",
    desc: "Every call, form, and quote request captured in one place, routed to you the second it comes in, and followed up automatically — plus automatic review requests after every job. The exact system we built for a local contractor.",
    points: ["Every lead captured & organized", "Instant alerts + auto follow-up", "Automatic Google review requests"],
    href: "/start",
  },
];

export type Offer = {
  n: string;
  name: string;
  price: string;
  priceFrom: number; // starting price, for schema
  timeline: string; // plain-English delivery time
  blurb: string;
  bestFor: string; // one line: who should pick this rung
  deliverables: string[]; // itemized — exactly what lands
  guarantee: string; // the risk reversal that applies to THIS rung
  best: boolean;
  href: string;
  cta: string;
};

export const OFFERS: Offer[] = [
  {
    n: "01",
    name: "Get Online Fast",
    price: "$350",
    priceFrom: 350,
    timeline: "Live in 24 hours",
    blurb: "A one-page contractor website with a lead form wired straight to your phone — so you look legit and start catching jobs by the weekend.",
    deliverables: [
      "1-page, mobile-perfect website",
      "Your branding, colors & photos",
      "Click-to-call + lead form to your inbox",
      "Live on your domain — or a free subdomain",
      "7 days of free content tweaks after launch",
    ],
    bestFor: "You have no site, or one that embarrasses you.",
    guarantee: "Love it or you don't pay.",
    best: false,
    href: "/drop-24",
    cta: "See Drop 24",
  },
  {
    n: "02",
    name: "Never Miss a Lead",
    price: "$1,497",
    priceFrom: 1497,
    timeline: "Ready in about 1 week",
    blurb: "Your site plus automatic instant replies and follow-up, so no lead ever goes cold — even when you're on a roof.",
    deliverables: [
      "Everything in Get Online Fast",
      "Instant auto-reply to every new lead",
      "3-step automated follow-up",
      "Online booking link",
      "Simple Google Sheet CRM",
    ],
    bestFor: "You get leads, but some never hear back.",
    guarantee: "Replies to every new lead in under 60 seconds — or we keep working free until it does.",
    best: false,
    href: "/efficiency-engine",
    cta: "See what's included",
  },
  {
    n: "03",
    name: "The “Never Miss a Job” System",
    price: "from $3,500",
    priceFrom: 3500,
    timeline: "Built in 2–3 weeks",
    blurb: "The complete done-for-you lead pipeline — every call and quote captured, followed up, booked, and turned into 5-star reviews, on autopilot. A system that runs itself, not another thing for you to manage.",
    deliverables: [
      "Multi-page website",
      "All-channel lead capture",
      "Automated follow-up sequences",
      "Online booking",
      "Automatic review requests after each job",
      "CRM + simple reporting dashboard",
    ],
    bestFor: "You're busy enough that jobs slip through the cracks.",
    guarantee: "Fixed scope and price in writing before we start.",
    best: true,
    href: "/start?offer=growth-system",
    cta: "Book a Call",
  },
  {
    n: "04",
    name: "Digital Employee + Custom Build",
    price: "from $8,000",
    priceFrom: 8000,
    timeline: "Scoped over 4–8 weeks",
    blurb: "A custom AI teammate that actually talks to your customers — answering, qualifying, and booking in real conversation — plus any custom software built from scratch for how your business runs.",
    deliverables: [
      "Everything in the System",
      "Conversational AI agent (calls, texts & chat)",
      "Trained on exactly how you work",
      "Optional custom app or portal (scheduling, dispatch, customer portal)",
      "Scoped and quoted to your business",
    ],
    bestFor: "You want the phone answered and the back office automated.",
    guarantee: "Fixed scope and price in writing before we start.",
    best: false,
    href: "/start?offer=digital-employee",
    cta: "Book a Call",
  },
];

export type Plan = {
  slug: string;
  name: string;
  price: string;
  priceFrom: number;
  cadence: string;
  blurb: string;
  points: string[];
  best: boolean;
  tag?: string;
};

export const PLANS: Plan[] = [
  {
    slug: "site-care",
    name: "Site Care",
    price: "$99",
    priceFrom: 99,
    cadence: "/mo",
    blurb: "Keeps your site fast, secure, and current — the natural next step after Get Online Fast.",
    points: ["Managed hosting, uptime & security updates", "Up to 30 minutes of edits / month", "2-business-day response"],
    best: false,
  },
  {
    slug: "lead-care",
    name: "Lead Care",
    price: "$299",
    priceFrom: 299,
    cadence: "/mo",
    blurb: "Keeps your automations running and improving — pairs with Never Miss a Lead or the Job System.",
    points: ["Everything in Site Care", "Automations kept running + monthly tune-ups", "Monthly performance report"],
    best: false,
  },
  {
    slug: "we-run-it",
    name: "We Run It",
    price: "$999",
    priceFrom: 999,
    cadence: "/mo",
    blurb: "We fully manage your lead machine — monitor, fix, and optimize — the natural partner to the Job System.",
    points: ["Manage your full lead system", "Monitoring, fixes & optimization", "Monthly strategy call"],
    best: true,
    tag: "Hands-off",
  },
  {
    slug: "ai-director",
    name: "Fractional AI Director",
    price: "from $1,500",
    priceFrom: 1500,
    cadence: "/mo",
    blurb: "Your outsourced AI department — multiple live systems, a roadmap, and ongoing custom builds. Pairs with the Digital Employee.",
    points: ["Manage multiple live systems", "Quarterly roadmap & priority queue", "Ongoing custom builds in scope"],
    best: false,
  },
];

export type Faq = { q: string; a: string };

/* The free front door — every CTA that isn't a specific offer points here. */
export const AUDIT = {
  name: "Free Lead Leak Audit",
  href: "/start?offer=audit",
  blurb:
    "Answer a few questions and we map exactly where jobs are slipping — missed calls, slow replies, dropped follow-ups — and what it's costing you each month.",
  terms: "Free · 2 minutes · no call required · back in your inbox within 24 hours",
};

/* Natural-language questions real owners (and AI search engines) actually ask. */
export const FAQS: Faq[] = [
  {
    q: "How much does a website cost in Minneapolis?",
    a: "At Dynasty Labz, a professional contractor website starts at $350 and is delivered in 24 hours through our Drop 24 service. Lead systems are fixed-price too: Never Miss a Lead is $1,497, the full “Never Miss a Job” System starts at $3,500, and a custom Digital Employee build starts at $8,000.",
  },
  {
    q: "What is AI automation for a small business?",
    a: "AI automation means using software to handle repetitive tasks for you — instantly replying to new leads, following up with customers, booking appointments, and sending reminders. For a local contractor it's like adding a tireless employee who works 24/7 and never forgets to follow up. Our lead automation setup, Never Miss a Lead, is $1,497.",
  },
  {
    q: "How long does it take to build my website?",
    a: "A Drop 24 website is live within 24 hours of your intake form. Never Miss a Lead is ready in about a week, the full “Never Miss a Job” System takes 2–3 weeks, and custom Digital Employee builds are scoped over 4–8 weeks. We keep you updated the entire way.",
  },
  {
    q: "Do you work with businesses outside Minneapolis?",
    a: "Yes. We're based in Minneapolis and the Twin Cities and love working with local businesses, but we build websites and AI systems for clients anywhere in the United States.",
  },
  {
    q: "What if I'm not happy with my website?",
    a: "On Drop 24 builds you see the live site before you pay — if you don't love it after revisions, you don't pay. Never Miss a Lead comes with the 60-Second Rule: if your system isn't replying to every new lead in under 60 seconds, we keep working at no cost until it does. Larger projects are scoped and priced in writing before we start, so there are never any surprise invoices.",
  },
  {
    q: "Can you help my business get more customers?",
    a: "Yes — that's the whole point. We build websites designed to turn visitors into booked appointments and phone calls, and we set up AI that replies to and follows up with every lead so none of them slip through the cracks.",
  },
  {
    q: "How much does it cost to have you manage everything monthly?",
    a: "Monthly partnership plans start at $99/mo for Site Care to keep your site running, $299/mo for Lead Care to keep your automations running and improving, and $999/mo for We Run It — where we fully manage your lead system for you. Plans are optional and month-to-month.",
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
