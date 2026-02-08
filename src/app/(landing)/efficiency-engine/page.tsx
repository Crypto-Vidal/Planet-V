import type { Metadata } from "next";
import ServiceLandingPage from "@/components/templates/ServiceLandingPage";

export const metadata: Metadata = {
  title: "The Efficiency Engine | DYNASTY LABZ",
  description:
    "Automate the majority of your repetitive tasks in under 14 days — or you don't pay. A purpose-built automation system installed inside your existing operations.",
  openGraph: {
    title: "The Efficiency Engine | DYNASTY LABZ",
    description:
      "Stop babysitting your business. Let your systems handle the busywork.",
    type: "website",
  },
};

export default function EfficiencyEnginePage() {
  return (
    <ServiceLandingPage
      /* ── Hero ── */
      headline={
        <>
          Stop Babysitting Your Business.{" "}
          <span className="text-gradient-green">
            Let Your Systems Handle the Busywork.
          </span>
        </>
      }
      subheadline="Automate the majority of your repetitive tasks in under 14 days — or you don't pay."
      ctaLabel="Secure Your Efficiency Audit"
      ctaUrl="https://calendly.com/vcrypto1991/30min"
      ctaDisclaimer="This is a focused build-out, not a long-term contract."
      /* ── Agitation ── */
      agitationTitle="Why This Exists"
      agitationBody={
        <>
          <p>
            Most business owners become accidental &ldquo;human routers.&rdquo;
            You spend your day moving information between apps, chasing
            follow-ups, and fixing manual mistakes.
          </p>
          <p>You didn&apos;t start a business to do copy-paste work.</p>
          <p>
            Every hour spent on low-value tasks quietly steals time from
            strategy, growth, and real decision-making.
          </p>
          <p>
            This isn&apos;t AI for hype or experimentation. This is practical
            infrastructure designed to reduce friction, prevent errors, and let
            your business run without constant supervision.
          </p>
        </>
      }
      /* ── Solution ── */
      solutionTitle="The Solution"
      solutionBody={
        <>
          <p>
            We install a purpose-built{" "}
            <strong className="text-[#050505]">Efficiency Engine</strong> inside
            your existing operations.
          </p>
          <p>
            First, we map how your business actually runs — not how it&apos;s
            supposed to run. Then we identify exactly where time is leaking and
            install smart automations that remove repetitive manual work.
          </p>
          <p>No new tools to babysit. No shiny objects.</p>
          <p className="text-[#050505] font-black">
            Just systems that quietly do their job.
          </p>
        </>
      }
      /* ── Value Stack ── */
      valueStackTitle="What You Get"
      valueItems={[
        {
          title: "Workflow Friction Audit",
          description:
            "A deep review of your current processes to uncover hidden inefficiencies and manual choke points.",
          value: "$3,000",
        },
        {
          title: "Custom Automation Build-Out",
          description:
            "We design and install automations that work with the tools you already use (CRM, email, internal systems).",
          value: "$4,500",
        },
        {
          title: "AI Precision Layer",
          description:
            "Custom AI added only where it clearly saves time or reduces effort — never for show.",
          value: "$2,000",
        },
        {
          title: "Ownership & Handoff Training",
          description:
            "Your team is trained so you're never dependent on us to keep things running.",
          value: "$1,500",
        },
      ]}
      bonusItem={{
        title: "30-Day System Monitoring",
        description:
          "We actively monitor your systems post-launch to ensure stability and zero downtime.",
        value: "$500",
      }}
      totalValue="$11,500"
      investmentPrice="$2,500"
      /* ── Qualification ── */
      qualificationTitle="Who This Is For"
      goodFit={[
        "You run an established business with steady work",
        "You already have processes in place",
        "You're tired of manual follow-ups and repetitive tasks",
      ]}
      notFit={[
        "You're just getting started with no workflows yet",
        "You're looking to experiment with AI tools",
        "You want novelty instead of reliability",
      ]}
      /* ── Guarantee ── */
      guaranteeTitle="The 20-Hour Rule"
      guaranteeBody={
        <>
          <p>
            If this system doesn&apos;t save your team at least 20 hours of
            manual work per month, we&apos;ll continue working at no cost until
            it does — or refund your investment.
          </p>
          <p className="text-[#050505] font-black">
            The risk is on us, not you.
          </p>
        </>
      }
    />
  );
}
