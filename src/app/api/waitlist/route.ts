import { Resend } from "resend";

// Resend's SDK needs the Node.js runtime (not edge).
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistBody = {
  email?: string;
  marketingOptIn?: boolean;
  terms?: boolean;
};

export async function POST(request: Request) {
  let body: WaitlistBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const marketingOptIn = Boolean(body.marketingOptIn);
  const terms = Boolean(body.terms);

  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!terms) {
    return Response.json(
      { error: "You must accept the Terms & Conditions." },
      { status: 400 }
    );
  }

  const timestamp = malaysiaTimestamp();

  // 1) Save to Google Sheets via the Apps Script webhook. This is the
  //    business-critical step, so a failure here fails the whole request.
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("GOOGLE_SHEETS_WEBHOOK_URL is not set.");
    return Response.json({ error: "Server is not configured." }, { status: 500 });
  }

  try {
    const sheetRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET ?? "",
        email,
        timestamp,
        terms,
        marketing: marketingOptIn,
      }),
    });
    if (!sheetRes.ok) {
      throw new Error(`Sheets webhook responded ${sheetRes.status}`);
    }
  } catch (err) {
    console.error("Failed to save to Google Sheets:", err);
    return Response.json(
      { error: "Could not save your signup. Please try again." },
      { status: 502 }
    );
  }

  // 2) Send the confirmation email (best-effort: the signup is already saved).
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "Vital AI <onboarding@resend.dev>";
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to: email,
        subject: "You're on the Vital AI waitlist",
        html: confirmationHtml(),
      });
    } catch (err) {
      console.error("Failed to send confirmation email:", err);
    }
  } else {
    console.warn("RESEND_API_KEY is not set; skipping confirmation email.");
  }

  return Response.json({ ok: true });
}

// Timestamp in Malaysia time (UTC+8), formatted as "YYYY-MM-DD HH:mm:ss".
function malaysiaTimestamp() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get(
    "minute"
  )}:${get("second")}`;
}

function confirmationHtml() {
  return `
  <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #0a0a0a;">
    <h1 style="font-size: 22px; color: #000e51; margin: 0 0 12px;">You're on the list.</h1>
    <p style="font-size: 15px; line-height: 1.6; color: rgba(0,0,0,0.7); margin: 0 0 16px;">
      Thanks for joining the Vital AI waitlist. We'll email you the moment early
      access opens so you can turn a blood report into a clear, personalized plan.
    </p>
    <p style="font-size: 13px; line-height: 1.6; color: #737373; margin: 24px 0 0;">
      You're receiving this because you signed up at Vital AI. If this wasn't you,
      you can ignore this email.
    </p>
  </div>`;
}
