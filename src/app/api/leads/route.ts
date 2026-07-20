import { NextResponse } from "next/server";
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
  const recipient = process.env.LEAD_NOTIFICATION_EMAIL || "cryptov1991@gmail.com";
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Dynasty Labz Leads <onboarding@resend.dev>",
    to: recipient,
    replyTo: email,
    subject: `${offer} lead — ${businessName}`,
    html: `
      <h2>New Dynasty Labz lead</h2>
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
    return NextResponse.json({ ok: false, error: "We could not deliver your request. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
