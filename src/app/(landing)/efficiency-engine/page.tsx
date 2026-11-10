import type { Metadata } from "next";
import ServiceLandingPage from "@/components/templates/ServiceLandingPage";
import { OFFERS } from "@/lib/content";

/* Price + timeline come from the same content module as the homepage, so this
   page can never drift from the offer ladder again. */
const OFFER = OFFERS[1]; // 02 — Never Miss a Lead

export const metadata: Metadata = {
  title: "Never Miss a Lead — AI Lead Follow-Up for Contractors",
  description: `Every new lead answered in under 60 seconds and followed up automatically. ${OFFER.price} flat, ready in about a week — for Twin Cities home-service contractors.`,
  openGraph: {
    title: "Never Miss a Lead | Dynasty Labz",
    description:
      "Stop losing jobs to slow replies. Every lead answered in under 60 seconds, followed up, and booked — automatically.",
    type: "website",
  },
};

export default function NeverMissALeadPage() {
  return (
    <ServiceLandingPage
      /* ── Hero ── */
      headline={
        <>
          The first contractor to reply wins the job.{" "}
          <span className="text-gradient-aurora">Make that you — every time.</span>
        </>
      }
      subheadline={`Every new lead answered in under 60 seconds and followed up automatically. ${OFFER.price} flat. ${OFFER.timeline}.`}
      ctaLabel="Book a Call"
      ctaUrl="/start?offer=never-miss-a-lead"
      ctaDisclaimer="One flat price. No monthly contract required."
      /* ── Agitation ── */
      agitationTitle="Why This Exists"
      agitationBody={
        <>
          <p>
            A homeowner with a leak doesn&apos;t wait. They fill out your form,
            then fill out two more. Whoever answers first usually gets the
            estimate.
          </p>
          <p>
            You&apos;re on a roof, under a sink, or driving between jobs. By the
            time you call back that night, they&apos;ve already booked someone
            else.
          </p>
          <p>
            That isn&apos;t a marketing problem. You already paid to get that
            lead. It&apos;s a speed problem — and speed is something a system
            does better than a person with their hands full.
          </p>
        </>
      }
      /* ── Solution ── */
      solutionTitle="The Solution"
      solutionBody={
        <>
          <p>
            We build your site and wire it to a follow-up system that replies
            to every new lead the moment it comes in — by text and email, in
            your business&apos;s name.
          </p>
          <p>
            If they don&apos;t answer, it follows up three more times on its
            own. When they&apos;re ready, they pick a time from your booking
            link. Every lead lands in one simple sheet you can check from your
            truck.
          </p>
          <p className="text-white font-black">
            You do the work. The system chases the work.
          </p>
        </>
      }
      /* ── Value Stack ── */
      valueStackTitle="What You Get"
      valueItems={[
        {
          title: "Your Contractor Website",
          description:
            "Everything in Get Online Fast: a 1-page, mobile-perfect site with click-to-call and a lead form, on your domain.",
          value: "$350",
        },
        {
          title: "Instant Auto-Reply",
          description:
            "Every new lead gets a reply in under 60 seconds, 24/7 — so you're first, even from the job site.",
          value: "$600",
        },
        {
          title: "3-Step Automated Follow-Up",
          description:
            "Leads that go quiet get three more nudges automatically. No sticky notes, no forgetting.",
          value: "$500",
        },
        {
          title: "Online Booking Link",
          description:
            "Ready-to-buy leads book their own estimate on your calendar instead of playing phone tag.",
          value: "$250",
        },
        {
          title: "Simple Google Sheet CRM",
          description:
            "Every lead, its status, and its source in one sheet — nothing new to learn.",
          value: "$300",
        },
      ]}
      bonusItem={{
        title: "30 Days of Lead Care",
        description:
          "We monitor and tune your automations for the first month after launch — the same service as our $299/mo Lead Care plan.",
        value: "$299",
      }}
      totalValue="$2,299"
      investmentPrice={OFFER.price}
      /* ── Qualification ── */
      qualificationTitle="Who This Is For"
      goodFit={[
        "You run a home-service business with leads already coming in",
        "You lose jobs because you can't reply fast enough",
        "You want it done for you, not another app to learn",
      ]}
      notFit={[
        "You have no leads coming in yet — start with Get Online Fast",
        "You need calls answered by a live AI voice — that's the Digital Employee",
        "You want to build and manage the automations yourself",
      ]}
      /* ── Guarantee ── */
      guaranteeTitle="The 60-Second Rule"
      guaranteeBody={
        <>
          <p>
            If your system isn&apos;t replying to every new lead in under 60
            seconds, we keep working at no cost until it does — or refund your
            investment.
          </p>
          <p className="text-white font-black">
            The risk is on us, not you.
          </p>
        </>
      }
    />
  );
}
