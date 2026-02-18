import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://dynasty-labz.vercel.app"),
  title: "DYNASTY LABZ | Premium AI Automation & Workflow Scaling",
  description: "Weaponizing AI automation for businesses making $7k–$21k+ a month. Reclaim your time and scale your empire without the technical headache.",
  keywords: ["AI Automation", "Workflow Scaling", "Next.js Web Development", "AI Integration", "Business Automation"],
  openGraph: {
    title: "DYNASTY LABZ | Plug AI Into Your Workflow",
    description: "Stop losing time to manual grunt work. We help business owners automate and scale using custom AI solutions.",
    type: "website",
    images: [
      {
        url: "/ballistics-focus.jpg",
        width: 1200,
        height: 630,
        alt: "DYNASTY LABZ – AI Automation & Workflow Scaling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DYNASTY LABZ | Plug AI Into Your Workflow",
    description: "Stop losing time to manual grunt work. We help business owners automate and scale using custom AI solutions.",
    images: ["/ballistics-focus.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased selection:bg-matrix-green selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
