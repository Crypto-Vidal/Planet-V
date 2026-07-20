import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { Resend } from "resend";

export const runtime = "nodejs";

type LeadBody = {
  mode?: string;
  offer?: string;
  answers?: Record<string, string | string[]>;
  contact?: {
    name?: string;
    businessName?: string;
    email?: string;
    phone?: string;
    source?: string;
    links?: string;
  };
  summary?: string;
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value.replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char] ?? char);
}

function answerValue(answers: Record<string, string | string[]> | undefined, key: string) {
  const value = answers?.[key];
  return Array.isArray(value) ? value.join("; ") : value ?? "";
}

async function saveLeadToGoogleSheet(body: LeadBody, leadId: string, submittedAt: string) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!webhookUrl || !secret) {
    throw new Error("Google Sheets lead storage is not configured");
  }

  const contact = body.contact ?? {};
  const answers = body.answers;
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      submittedAt,
      leadId,
      status: "New",
      nextAction: "Review and contact",
      bookingStatus: "Questionnaire complete",
      offer: body.offer || body.mode || "Website inquiry",
      path: body.mode || "website",
      name: contact.name || "",
      businessName: contact.businessName || "",
      email: contact.email || "",
      phone: contact.phone || "",
      source: contact.source || "",
      links: contact.links || "",
      businessType: answerValue(answers, "businessType"),
      mainGoal: answerValue(answers, "goal"),
      vibe: answerValue(answers, "vibe"),
      sells: answerValue(answers, "sell"),
      serves: answerValue(answers, "serve"),
      edge: answerValue(answers, "edge"),
      alreadyHas: answerValue(answers, "haves"),
      wantsBuilt: answerValue(answers, "build"),
      painNow: answerValue(answers, "painNow"),
      sixMonthWorry: answerValue(answers, "painLater"),
      timeline: answerValue(answers, "timeline"),
      monthlyRevenue: answerValue(answers, "revenue"),
      summary: (body.summary ?? "No summary provided").slice(0, 20_000),
    }),
    cache: "no-store",
  });

  const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;
  if (!response.ok || !result?.ok) {
    throw new Error(`Google Sheets lead storage failed with status ${response.status}`);
  }
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 415 });
  }

  const raw = await request.text();
  if (raw.length > 50_000) {
    return NextResponse.json({ ok: false, error: "Request is too large." }, { status: 413 });
  }

  let body: LeadBody;
  try {
    body = JSON.parse(raw) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true });

  const contact = body.contact ?? {};
  const name = contact.name?.trim() ?? "";
  const businessName = contact.businessName?.trim() ?? "";
  const email = contact.email?.trim() ?? "";
  const phone = contact.phone?.trim() ?? "";
  if (!name || !businessName || !EMAIL_RE.test(email) || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ ok: false, error: "Name, business, a valid email, and a complete phone number are required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json({ ok: false, error: "Lead delivery is temporarily unavailable." }, { status: 503 });
  }

  const summary = (body.summary ?? "No summary provided").slice(0, 20_000);
  const offer = (body.offer || body.mode || "Website inquiry").slice(0, 120);
  const leadId = randomUUID();
  const submittedAt = new Date().toISOString();
  const recipient = process.env.LEAD_NOTIFICATION_EMAIL || "cryptov1991@gmail.com";
  const resend = new Resend(apiKey);

  try {
    await saveLeadToGoogleSheet(body, leadId, submittedAt);
  } catch (error) {
    console.error("Google Sheets lead storage failed", error);
    return NextResponse.json({ ok: false, error: "We could not save your request. Please try again." }, { status: 502 });
  }

  const { error } = await resend.emails.send({
    from: "Dynasty Labz Leads <onboarding@resend.dev>",
    to: recipient,
    replyTo: email,
    subject: `${offer} lead — ${businessName}`,
    html: `
      <h2>New Dynasty Labz lead</h2>
      <p><strong>Lead ID:</strong> ${escapeHtml(leadId)}</p>
      <p><strong>Offer:</strong> ${escapeHtml(offer)}</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Business:</strong> ${escapeHtml(businessName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${contact.phone ? `<p><strong>Phone:</strong> ${escapeHtml(contact.phone)}</p>` : ""}
      ${contact.links ? `<p><strong>Links:</strong> ${escapeHtml(contact.links)}</p>` : ""}
      ${contact.source ? `<p><strong>Source:</strong> ${escapeHtml(contact.source)}</p>` : ""}
      <hr />
      <pre style="white-space:pre-wrap;font:14px/1.5 ui-monospace,monospace">${escapeHtml(summary)}</pre>
    `,
  });

  if (error) {
    console.error("Resend lead delivery failed", error);
    return NextResponse.json({ ok: true, leadId, warning: "Lead saved, but the email alert could not be sent." });
  }

  return NextResponse.json({ ok: true, leadId });
}
