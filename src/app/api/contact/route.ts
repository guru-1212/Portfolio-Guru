import { profile } from "@/data/portfolio";

// POST /api/contact — validates the form and forwards it via Resend's REST API.
// Required env vars (see .env.example):
//   RESEND_API_KEY      API key from resend.com
// Optional:
//   CONTACT_TO_EMAIL    where messages are delivered (defaults to the profile email)
//   CONTACT_FROM_EMAIL  verified sender (defaults to Resend's shared onboarding sender)

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (field(body.website)) return Response.json({ ok: true });

  const name = field(body.name);
  const email = field(body.email);
  const message = field(body.message);

  if (!name || name.length > 100) {
    return Response.json({ error: "invalid_name" }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 200) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }
  if (message.length < 10 || message.length > 5000) {
    return Response.json({ error: "invalid_message" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return Response.json({ error: "not_configured" }, { status: 503 });

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? profile.email],
      reply_to: email,
      // Strip newlines so a crafted name cannot inject extra headers.
      subject: `Portfolio message from ${name.replace(/[\r\n]+/g, " ")}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!response.ok) {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
