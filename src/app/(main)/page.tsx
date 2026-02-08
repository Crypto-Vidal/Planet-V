import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import SocialProof from "@/components/sections/SocialProof";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Services />
      <Portfolio />
      <SocialProof />
      <CTA />
    </main>
  );
}
