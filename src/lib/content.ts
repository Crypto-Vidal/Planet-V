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
    "Dynasty Labz is a Minneapolis web design and AI automation company that helps local businesses get more customers and win back their time.",
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
};

export const SERVICES: Service[] = [
  {
    icon: "code",
    title: "Websites that book customers",
    desc: "A fast, modern site that turns visitors into booked appointments and phone calls — not a pretty page that just sits there. Loads in under a second and looks perfect on every phone.",
    points: ["Designed to convert, not just look good", "Loads in under a second", "Flawless on mobile"],
  },
  {
    icon: "sparkles",
    title: "AI that handles the busywork",
    desc: "Stop doing everything by hand. We set up AI to reply to new leads instantly, follow up automatically, book appointments, and chase no-shows — 24/7, even while you sleep.",
    points: ["Instant lead replies & follow-up", "Automatic booking & reminders", "Runs 24/7 without you"],
  },
  {
    icon: "megaphone",
    title: "Social media, handled",
    desc: "Stay visible without the stress. We keep your Instagram and Facebook posting consistently and on-brand, so customers see a business that's clearly open, active, and busy.",
    points: ["Consistent, on-brand posts", "Instagram & Facebook managed", "No more blank-page Mondays"],
  },
];

export type Offer = {
  n: string;
  name: string;
  price: string;
  priceFrom: number; // starting price, for schema
  blurb: string;
  best: boolean;
  href: string;
  cta: string;
};

export const OFFERS: Offer[] = [
  {
    n: "01",
    name: "Get Online Fast",
    price: "from $350",
    priceFrom: 350,
    blurb: "A professional, high-converting website — live in 24 hours. The fastest way to stop losing customers to a slow or outdated site.",
    best: false,
    href: "/drop-24",
    cta: "See Drop 24",
  },
  {
    n: "02",
    name: "Save Time With AI",
    price: "$997 – $1,500",
    priceFrom: 997,
    blurb: "Your first automations, set up for you: instant replies to new leads, automatic follow-ups, and booking that runs itself while you work.",
    best: false,
    href: "/start",
    cta: "Book a Call",
  },
  {
    n: "03",
    name: "Grow Without Hiring",
    price: "$2,500 – $5,000",
    priceFrom: 2500,
    blurb: "A complete AI system across your business that captures, follows up with, and books customers — the work of another employee, without the payroll.",
    best: true,
    href: "/start",
    cta: "Book a Call",
  },
  {
    n: "04",
    name: "Hire a Digital Employee",
    price: "$7,500 – $15k+",
    priceFrom: 7500,
    blurb: "A custom AI employee trained on how your business works — answering customers, qualifying leads, and handling tasks around the clock.",
    best: false,
    href: "/start",
    cta: "Book a Call",
  },
];

export type Plan = {
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
    name: "Keep Everything Running",
    price: "$99",
    priceFrom: 99,
    cadence: "/mo",
    blurb: "We host your site, watch it 24/7, and handle the small fixes — so your online presence never breaks or goes stale.",
    points: ["Hosting & uptime monitoring", "Monthly tune-ups", "Priority small edits"],
    best: false,
  },
  {
    name: "Keep Getting Better",
    price: "$299",
    priceFrom: 299,
    cadence: "/mo",
    blurb: "Everything above, plus we improve your site and add a new automation every month — so your business keeps pulling ahead.",
    points: ["Everything in Running", "Monthly improvements", "A new automation each month"],
    best: false,
  },
  {
    name: "We Run Your AI For You",
    price: "$999",
    priceFrom: 999,
    cadence: "/mo",
    blurb: "We run the whole system for you. You focus on the customer in front of you; we keep the leads, follow-ups, and bookings flowing.",
    points: ["Fully managed AI operations", "Completely hands-off for you", "Monthly strategy check-ins"],
    best: true,
    tag: "Most chosen",
  },
  {
    name: "Outsourced AI Department",
    price: "$1,500 – $2,500+",
    priceFrom: 1500,
    cadence: "/mo",
    blurb: "Your own AI team on call — we plan it, build it, and run it. The upside of an in-house tech department, none of the salaries.",
    points: ["Fractional AI director", "Quarterly growth roadmap", "We build it and run it"],
    best: false,
  },
];

export type Faq = { q: string; a: string };

/* Natural-language questions real owners (and AI search engines) actually ask. */
export const FAQS: Faq[] = [
  {
    q: "How much does a website cost in Minneapolis?",
    a: "At Dynasty Labz, a professional small-business website starts at $350 and is delivered in 24 hours through our Drop 24 service. Larger websites with AI automation, online booking, and lead follow-up range from about $997 to $5,000+ depending on what your business needs.",
  },
  {
    q: "What is AI automation for a small business?",
    a: "AI automation means using software to handle repetitive tasks for you — instantly replying to new leads, following up with customers, booking appointments, and sending reminders. For a local business it's like adding a tireless employee who works 24/7 and never forgets to follow up. Our AI setups start at $997.",
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
    a: "Monthly partnership plans start at $99/mo to keep your site running, $299/mo to keep improving it, and $999/mo for us to fully run your AI and marketing systems for you. Most businesses choose the $999/mo managed plan.",
  },
];
