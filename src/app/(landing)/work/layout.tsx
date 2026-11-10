import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono } from "next/font/google";

/* /work has its own identity (yellow on black, Bebas Neue + DM Mono) — the
   fonts are loaded here so the rest of the site never pays for them. */
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const dmMono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-dm-mono" });

export const metadata: Metadata = {
  title: "Work — Things I've Shipped",
  description:
    "Client websites, lead systems, and original software from Dynasty Labz in Minneapolis — every project live and linked.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work — Things I've Shipped | Dynasty Labz",
    description: "Client websites, lead systems, and original software. Every project live and linked.",
    type: "website",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${bebas.variable} ${dmMono.variable}`}>{children}</div>;
}
