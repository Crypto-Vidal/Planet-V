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
    blurb: "Your first automations, set up for you: instant replies to new leads, automatic follow-ups, and booking that runs itself while you're on a job.",
    best: false,
    href: "/start?offer=efficiency-engine",
    cta: "Book a Call",
  },
  {
    n: "03",
    name: "The “Never Miss a Job” System",
    price: "$2,500 – $5,000",
    priceFrom: 2500,
    blurb: "The complete lead system for your business: every call and quote request captured, routed to you instantly, followed up automatically, and turned into booked jobs and 5-star reviews — the work of another employee, without the payroll.",
    best: true,
    href: "/start?offer=growth-system",
    cta: "Book a Call",
  },
  {
    n: "04",
    name: "Hire a Digital Employee",
    price: "$7,500 – $15k+",
    priceFrom: 7500,
    blurb: "A custom-built AI employee trained on exactly how your business runs — answering customers, qualifying leads, and handling tasks around the clock. Built from scratch, the way we build full custom platforms.",
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
    slug: "keep-running",
    name: "Keep Everything Running",
    price: "$99",
    priceFrom: 99,
    cadence: "/mo",
    blurb: "Core hosting, monitoring, and a small monthly edit allowance — with clear limits and no surprise scope.",
    points: ["Hosting, uptime & security updates", "Up to 30 minutes of small edits / month", "2-business-day response"],
    best: false,
  },
  {
    slug: "keep-improving",
    name: "Keep Getting Better",
    price: "$299",
    priceFrom: 299,
    cadence: "/mo",
    blurb: "Ongoing site improvements plus one clearly scoped workflow update each month.",
    points: ["Everything in Keep Running", "Up to 2 hours of improvements / month", "One scoped workflow update / month"],
    best: false,
  },
  {
    slug: "managed-ai",
    name: "We Run Your AI For You",
    price: "$999",
    priceFrom: 999,
    cadence: "/mo",
    blurb: "We monitor and maintain your active automations, fix issues, and review performance with you monthly.",
    points: ["Manage up to 3 live automations", "Monitoring, fixes & monthly reporting", "Monthly strategy check-in"],
    best: true,
    tag: "Most chosen",
  },
  {
    slug: "ai-department",
    name: "Outsourced AI Department",
    price: "$1,500 – $2,500+",
    priceFrom: 1500,
    cadence: "/mo",
    blurb: "A managed automation program with a roadmap, priority support, and capacity for multiple live systems.",
    points: ["Manage up to 6 live systems", "Quarterly roadmap & priority queue", "New builds scoped separately"],
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
    a: "Monthly partnership plans start at $99/mo to keep your site running, $299/mo to keep improving it, and $999/mo for us to fully run your lead and AI follow-up systems for you. Most businesses choose the $999/mo managed plan.",
  },
];
