import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Your Project",
  robots: { index: false, follow: false },
  alternates: { canonical: "/start" },
};

export default function StartLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
