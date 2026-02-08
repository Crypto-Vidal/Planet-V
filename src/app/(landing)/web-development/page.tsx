import type { Metadata } from "next";
import ServiceLandingPage from "@/components/templates/ServiceLandingPage";

export const metadata: Metadata = {
  title: "High-End Web Development | DYNASTY LABZ",
  description:
    "We build clean, modern websites designed to make your business look established, trustworthy, and professional. No bloated features. No confusing layouts.",
  openGraph: {
    title: "High-End Web Development | DYNASTY LABZ",
    description:
      "A website that actually represents your business — not one you apologize for.",
    type: "website",
  },
};

export default function WebDevelopmentPage() {
  return (
    <ServiceLandingPage
      /* ── Hero ── */
      headline={
        <>
          A Website That Actually Represents Your Business.{" "}
          <span className="text-gradient-green">
            Not One You Apologize For.
          </span>
        </>
      }
      subheadline="We build clean, modern websites designed to make your business look established, trustworthy, and professional."
      ctaLabel="Start Your Web Project"
      ctaUrl="https://calendly.com/vcrypto1991/30min"
      ctaDisclaimer="No bloated features. No confusing layouts. Just a site that works."
      /* ── Agitation ── */
      agitationTitle="Why This Exists"
      agitationBody={
        <>
          <p>
            Your website is the first thing people check before they decide to
            trust you. If it&apos;s slow, outdated, or looks like a template
            &mdash; you&apos;re losing credibility before anyone picks up the
            phone.
          </p>
          <p>
            Most business owners know their site doesn&apos;t represent them
            well. But rebuilding it always ends up at the bottom of the list
            because it feels expensive, complicated, and time-consuming.
          </p>
          <p>
            Meanwhile, competitors with cleaner sites are getting the calls you
            should be getting.
          </p>
          <p className="text-[#050505] font-black">
            You don&apos;t need a flashy site. You need one that makes people
            trust you instantly.
          </p>
        </>
      }
      /* ── Solution ── */
      solutionTitle="The Solution"
      solutionBody={
        <>
          <p>
            We replace your current site with something{" "}
            <strong className="text-[#050505]">
              simple, fast, and easy for customers to navigate
            </strong>{" "}
            &mdash; on any device.
          </p>
          <p>
            Every page is designed with one goal: make your business look
            established, professional, and trustworthy. We handle the design,
            the structure, and the technical details so you don&apos;t have to.
          </p>
          <p>No bloated features. No confusing layouts.</p>
          <p className="text-[#050505] font-black">
            Just a site that works and makes you look legit.
          </p>
        </>
      }
      /* ── Value Stack ── */
      valueStackTitle="What's Included"
      valueItems={[
        {
          title: "Custom-Designed Website",
          description:
            "Tailored to your business — not a recycled template. Every page reflects who you are and what you do.",
          value: "$4,000",
        },
        {
          title: "Mobile-First, Fast-Loading Pages",
          description:
            "Built to load fast and look sharp on every device. No lag, no pinch-to-zoom, no frustration.",
          value: "$2,500",
        },
        {
          title: "Clear Structure & Clean Layouts",
          description:
            "Visitors find what they need in seconds. Clean navigation, clear hierarchy, zero confusion.",
          value: "$1,500",
        },
        {
          title: "SEO-Ready Foundation",
          description:
            "Proper meta tags, fast load speeds, and clean code so search engines can actually find you.",
          value: "$1,500",
        },
      ]}
      bonusItem={{
        title: "Launch Support & Basic Training",
        description:
          "We walk you through everything after launch so you can make simple updates yourself — no developer needed.",
        value: "$500",
      }}
      totalValue="$10,000"
      investmentPrice="Starting at $3,000"
      /* ── Qualification ── */
      qualificationTitle="Who This Is For"
      goodFit={[
        "You already have customers and need a site that builds trust immediately",
        "You're tired of DIY or template-looking sites that don't represent you",
        "You want something clean, professional, and done right the first time",
      ]}
      notFit={[
        'You need a one-page "just getting started" project',
        "You want endless revisions with no clear direction",
        "You're looking for the cheapest option, not the best one",
      ]}
      /* ── Guarantee ── */
      guaranteeTitle="The Confidence Guarantee"
      guaranteeBody={
        <>
          <p>
            If your new site doesn&apos;t look and perform better than what you
            have now, we&apos;ll keep working until it does &mdash; at no
            additional cost.
          </p>
          <p className="text-[#050505] font-black">
            You don&apos;t pay for promises. You pay for results.
          </p>
        </>
      }
    />
  );
}
