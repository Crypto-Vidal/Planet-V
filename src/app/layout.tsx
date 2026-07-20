import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { SITE_URL, BUSINESS, SERVICES, OFFERS, PLANS, FAQS } from "@/lib/content";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

const siteTitle = "Dynasty Labz | Minneapolis Web Design & AI Automation for Local Business";
const siteDescription =
  "Dynasty Labz builds high-converting websites and AI automation for Minneapolis & Twin Cities businesses. Websites from $350 in 24 hours. Get more customers and win back your time — book a free discovery call.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteTitle,
    template: "%s | Dynasty Labz",
  },
  description: siteDescription,
  applicationName: "Dynasty Labz",
  authors: [{ name: "Dynasty Labz" }],
  creator: "Dynasty Labz",
  publisher: "Dynasty Labz",
  category: "Web Design & AI Automation",
  keywords: [
    "web design Minneapolis",
    "AI automation Minneapolis",
    "small business website Minneapolis",
    "local business web design Twin Cities",
    "AI automation for small business",
    "website in 24 hours",
    "Minneapolis website designer",
    "AI for small business",
    "lead automation",
    "online booking website",
    "Dynasty Labz",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: SITE_URL,
    siteName: "Dynasty Labz",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dynasty Labz | Minneapolis Web Design & AI Automation",
    description: siteDescription,
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   Structured data (JSON-LD).
   One graph: the business, the website, this page, the priced offers, and the
   FAQ. The FAQ + Offer text is pulled from the SAME content module the page
   renders, so the markup always matches what visitors and AI engines see.
   ────────────────────────────────────────────────────────────────────────── */
const oneTimeOffers = OFFERS.map((o) => ({
  "@type": "Offer",
  name: o.name,
  description: o.blurb,
  category: "Web Design & AI Automation",
  priceSpecification: {
    "@type": "PriceSpecification",
    priceCurrency: "USD",
    minPrice: o.priceFrom,
  },
  availability: "https://schema.org/InStock",
  url: `${SITE_URL}/#offers`,
}));

const monthlyOffers = PLANS.map((p) => ({
  "@type": "Offer",
  name: p.name,
  description: p.blurb,
  category: "AI Automation — Monthly Plan",
  priceSpecification: {
    "@type": "UnitPriceSpecification",
    priceCurrency: "USD",
    price: p.priceFrom,
    unitText: "per month",
    billingDuration: "P1M",
  },
  availability: "https://schema.org/InStock",
  url: `${SITE_URL}/#pricing`,
}));

const serviceNodes = SERVICES.map((s, i) => ({
  "@type": "Service",
  "@id": `${SITE_URL}/#service-${i + 1}`,
  name: s.title,
  description: s.desc,
  serviceType: s.title,
  provider: { "@id": `${SITE_URL}/#business` },
  areaServed: BUSINESS.areaServed.map((a) => ({ "@type": "City", name: a })),
}));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: BUSINESS.name,
      alternateName: "Dynasty Labz Web Design & AI Automation",
      url: SITE_URL,
      description: BUSINESS.summary,
      slogan: "Win more customers without working more hours.",
      image: `${SITE_URL}/opengraph-image`,
      logo: `${SITE_URL}/opengraph-image`,
      priceRange: BUSINESS.priceRange,
      knowsAbout: [
        "Web Design",
        "Web Development",
        "AI Automation",
        "Small Business Marketing",
        "Lead Generation",
        "Online Booking Systems",
        "Social Media Management",
      ],
      areaServed: BUSINESS.areaServed.map((a) => ({ "@type": "City", name: a })),
      address: {
        "@type": "PostalAddress",
        addressLocality: BUSINESS.city,
        addressRegion: BUSINESS.region,
        addressCountry: "US",
      },
      makesOffer: [...oneTimeOffers, ...monthlyOffers],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Design & AI Automation Packages",
        itemListElement: oneTimeOffers,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BUSINESS.name,
      description: siteDescription,
      publisher: { "@id": `${SITE_URL}/#business` },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: siteTitle,
      description: siteDescription,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      inLanguage: "en-US",
    },
    ...serviceNodes,
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
