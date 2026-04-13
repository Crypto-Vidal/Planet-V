import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drop 24 | Your Website in 24 Hours — $350",
  description: "Local business landing pages built in 24 hours. $350. If you don't love it, you don't pay. Mobile-first, conversion-focused.",
  openGraph: {
    title: "Drop 24 — Your Website in 24 Hours",
    description: "Fast, converting landing pages for local businesses. $350 flat. 24-hour turnaround.",
    type: "website",
    images: [
      {
        url: "https://planet-v.vercel.app/og-drop-24.png",
        width: 1200,
        height: 630,
        alt: "Drop 24 — Your website in 24 hours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Drop 24 — Your Website in 24 Hours",
    description: "Fast, converting landing pages for local businesses. $350 flat. 24-hour turnaround.",
    images: ["https://planet-v.vercel.app/og-drop-24.png"],
  },
};
