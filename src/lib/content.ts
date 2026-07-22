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
  deliverables: string[]; // itemized — exactly what lands
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
      "Live on your own domain",
    ],
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
    best: false,
    href: "/start?offer=efficiency-engine",
    cta: "Book a Call",
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
    points: ["Hosting, uptime & security updates", "Up to 30 minutes of edits / month", "2-business-day response"],
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
    tag: "Most chosen",
  },
  {
    slug: "ai-director",
    name: "Fractional AI Director",
    price: "$1,500 – $2,500+",
    priceFrom: 1500,
    cadence: "/mo",
    blurb: "Your outsourced AI department — multiple live systems, a roadmap, and ongoing custom builds. Pairs with the Digital Employee.",
    points: ["Manage multiple live systems", "Quarterly roadmap & priority queue", "Ongoing custom builds in scope"],
    best: false,
  },
];

export type Faq = { q: string; a: string };

/* Natural-language questions real owners (and AI search engines) actually ask. */
export const FAQS: Faq[] = [
  {
    q: "How much does a website cost in Minneapolis?",
    a: "At Dynasty Labz, a professional contractor website starts at $350 and is delivered in 24 hours through our Drop 24 service. Larger lead systems with AI automation, online booking, and automatic follow-up range from about $1,497 to $8,000+ depending on what your business needs.",
  },
  {
    q: "What is AI automation for a small business?",
    a: "AI automation means using software to handle repetitive tasks for you — instantly replying to new leads, following up with customers, booking appointments, and sending reminders. For a local contractor it's like adding a tireless employee who works 24/7 and never forgets to follow up. Our lead automation setups start at $1,497.",
  },
  {
    q: "How long does it take to build my website?",
    a: "Our Drop 24 websites go live in 24 hours. Larger projects that include AI automation and online booking typically take a few days to a couple of weeks, and we keep you updated the entire way.",
  },
  {
    q: "Do you work with businesses outside Minneapolis?",
    a: "Yes. We're based in Minneapolis and the Twin Cities and love working with local businesses, but we build websites and AI systems for clients anywhere in the United States.",
  },
  {
    q: "What if I'm not happy with my website?",
    a: "On our Drop 24 builds, if you don't love it after revisions, you don't pay — zero risk. For larger projects we scope everything up front and check in along the way, so there are never any surprise invoices.",
  },
  {
    q: "Can you help my business get more customers?",
    a: "Yes — that's the whole point. We build websites designed to turn visitors into booked appointments and phone calls, and we set up AI that replies to and follows up with every lead so none of them slip through the cracks.",
  },
  {
    q: "How much does it cost to have you manage everything monthly?",
    a: "Monthly partnership plans start at $99/mo for Site Care to keep your site running, $299/mo for Lead Care to keep your automations running and improving, and $999/mo for We Run It — where we fully manage your lead system for you. Most businesses choose the $999/mo We Run It plan.",
  },
];
