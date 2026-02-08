import type { Metadata } from "next";
import ServiceLandingPage from "@/components/templates/ServiceLandingPage";

export const metadata: Metadata = {
  title: "Content Maintenance | DYNASTY LABZ",
  description:
    "We manage your ongoing content so your business stays active, consistent, and professional — without you having to think about it.",
  openGraph: {
    title: "Content Maintenance | DYNASTY LABZ",
    description:
      "Stay visible without it becoming another job.",
    type: "website",
  },
};

export default function ContentMaintenancePage() {
  return (
    <ServiceLandingPage
      /* ── Hero ── */
      headline={
        <>
          Stay Visible Without It Becoming{" "}
          <span className="text-gradient-green">
            Another Job.
          </span>
        </>
      }
      subheadline="Recurring, low-friction content management — so your business stays active, consistent, and professional without you having to think about it."
      ctaLabel="Get Started"
      ctaUrl="https://calendly.com/vcrypto1991/30min"
      ctaDisclaimer="No chasing trends. No overposting. Just steady, reliable presence."
      /* ── Agitation ── */
      agitationTitle="Why This Exists"
      agitationBody={
        <>
          <p>
            You know you should be posting. You know consistency matters.
            But between running your business, handling clients, and putting
            out fires &mdash; content always falls to the bottom of the list.
          </p>
          <p>
            So your channels go quiet. Your profiles look abandoned. And
            potential customers scroll right past because there&apos;s nothing
            there to make them stop.
          </p>
          <p>
            It&apos;s not that you don&apos;t care. It&apos;s that content
            management became another full-time job you never signed up for.
          </p>
          <p className="text-[#050505] font-black">
            You focus on running the business. We make sure your channels
            don&apos;t go quiet.
          </p>
        </>
      }
      /* ── Solution ── */
      solutionTitle="The Offer"
      solutionBody={
        <>
          <p>
            We manage your ongoing content so your business stays{" "}
            <strong className="text-[#050505]">
              active, consistent, and professional
            </strong>{" "}
            &mdash; without you having to think about it.
          </p>
          <p>
            No chasing trends. No overposting. Just steady, reliable
            presence that keeps your brand looking alive and your audience
            engaged.
          </p>
          <p className="text-[#050505] font-black">
            Just steady, reliable presence.
          </p>
        </>
      }
      /* ── Value Stack ── */
      valueStackTitle="What's Included"
      valueItems={[
        {
          title: "Ongoing Social Content Management",
          description:
            "We handle your social media content end-to-end — planning, creating, and publishing so you never have to think about it.",
          value: "$800",
        },
        {
          title: "Regular Posting Schedule",
          description:
            "A consistent cadence of posts that keeps your brand active and visible without overwhelming your audience.",
          value: "$600",
        },
        {
          title: "Channel Upkeep & Consistency",
          description:
            "We keep your profiles looking sharp, bios updated, and branding aligned across every platform.",
          value: "$400",
        },
        {
          title: "Light Optimization Based on What's Working",
          description:
            "We monitor performance and make subtle adjustments over time — no drastic pivots, just smarter iterations.",
          value: "$400",
        },
      ]}
      totalValue="$2,200/mo"
      investmentPrice="$500–$900/mo"
      /* ── Qualification ── */
      qualificationTitle="Who This Is For"
      goodFit={[
        "Business owners who know consistency matters",
        "Teams with no time (or desire) to manage content",
        "Brands that want to look active and professional",
      ]}
      notFit={[
        "Influencers chasing viral growth",
        "Businesses expecting overnight results",
      ]}
      /* ── Guarantee ── */
      guaranteeTitle="The Consistency Guarantee"
      guaranteeBody={
        <>
          <p>
            If you&apos;re not satisfied with the quality or consistency of
            your content within the first 30 days, we&apos;ll make it right
            &mdash; or you walk away with no questions asked.
          </p>
          <p className="text-[#050505] font-black">
            Recurring, low-friction, easy yes.
          </p>
        </>
      }
    />
  );
}
