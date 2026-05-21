import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://planet-v.vercel.app"),
  title: "Drop 24 | High-Converting Website in 24 Hours — Minneapolis",
  description: "Minneapolis-area businesses — get a high-converting landing page built in 24 hours. $350 flat. If you don't love it, you don't pay. Mobile-first, conversion-focused.",
  alternates: {
    canonical: "/drop-24",
  },
  openGraph: {
    title: "Drop 24 — High-Converting Website in 24 Hours | Minneapolis",
    description: "Twin Cities local business landing pages, built fast. $350 flat, 24-hour turnaround. Risk-free guarantee.",
    type: "website",
    images: [
      {
        url: "/og-drop-24.svg",
        width: 1200,
        height: 630,
        alt: "Drop 24 — Your website in 24 hours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Drop 24 — High-Converting Website in 24 Hours | Minneapolis",
    description: "Twin Cities local business landing pages, built fast. $350 flat, 24-hour turnaround. Risk-free guarantee.",
    images: ["/og-drop-24.svg"],
  },
};

export default function Drop24Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
