import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

const siteUrl = "https://planet-v.vercel.app";
const siteTitle = "Dynasty Labz | AI Automation for Minneapolis Businesses";
const siteDescription =
  "Dynasty Labz builds custom AI automation systems for Minneapolis businesses doing $7K–$21K/month. Reclaim 20+ hours a week. Book a free discovery call.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "AI Automation",
    "Workflow Scaling",
    "Minneapolis AI Automation",
    "Minneapolis Business Automation",
    "Next.js Web Development",
    "AI Integration",
    "Business Automation Minneapolis",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Dynasty Labz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#business`,
      name: "Dynasty Labz",
      url: siteUrl,
      description: siteDescription,
      areaServed: [
        {
          "@type": "City",
          name: "Minneapolis",
          containedInPlace: {
            "@type": "State",
            name: "Minnesota",
          },
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Minneapolis",
        addressRegion: "MN",
        addressCountry: "US",
      },
      sameAs: [siteUrl],
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service`,
      name: "AI Automation & Workflow Scaling",
      provider: {
        "@id": `${siteUrl}/#business`,
      },
      serviceType: ["AI Automation", "Workflow Scaling", "Web Development"],
      areaServed: {
        "@type": "City",
        name: "Minneapolis",
      },
      url: siteUrl,
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased selection:bg-matrix-green selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
