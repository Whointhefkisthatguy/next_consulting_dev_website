import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

type Inquiry = {
  name: string;
  email: string;
  phone?: string;
  company: string;
  projectDescription: string;
  service:
    | "websites"
    | "graphic-design"
    | "automation"
    | "diagnostic"
    | "general";
  receivedAt: string;
};

const VALID_SERVICES: Inquiry["service"][] = [
  "websites",
  "graphic-design",
  "automation",
  "diagnostic",
  "general",
];

// Outbox path used only when the NLE forward fails (HTTP non-2xx, network
// error, timeout). Vercel serverless disk is ephemeral, so this is a
// best-effort durable-within-the-deploy log — the goal is not zero data loss
// but to leave a forensic trail when NLE is briefly unreachable. The marketing
// site still returns 200 to the user so the funnel does not break.
const OUTBOX_FILE = path.join(process.cwd(), "data", "inbound-outbox.jsonl");

const NLE_TIMEOUT_MS = Number(process.env.NLE_INBOUND_TIMEOUT_MS || 3000);

interface OutboxEntry {
  inquiry: Inquiry;
  reason: "non_2xx" | "timeout" | "network_error" | "missing_config";
  status?: number;
  error?: string;
  attemptedAt: string;
}

async function appendOutbox(entry: OutboxEntry): Promise<void> {
  try {
    await fs.mkdir(path.dirname(OUTBOX_FILE), { recursive: true });
    await fs.appendFile(OUTBOX_FILE, JSON.stringify(entry) + "\n", "utf8");
  } catch (err) {
    console.error("[inquiry] outbox append failed:", err);
  }
}

interface ForwardResult {
  ok: boolean;
  status?: number;
  reason?: OutboxEntry["reason"];
  error?: string;
}

async function forwardToNle(inquiry: Inquiry, sourceUrl: string | null, userAgent: string | null): Promise<ForwardResult> {
  const url = process.env.NLE_INBOUND_URL;
  const bearer = process.env.INBOUND_FORM_SECRET;
  const hmacSecret = process.env.INBOUND_FORM_HMAC_SECRET;
  if (!url || !bearer || !hmacSecret) {
    return { ok: false, reason: "missing_config", error: "NLE_INBOUND_URL / INBOUND_FORM_SECRET / INBOUND_FORM_HMAC_SECRET not set" };
  }

  const payload = JSON.stringify({
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone ?? null,
    company: inquiry.company,
    project_description: inquiry.projectDescription,
    service: inquiry.service,
    source_url: sourceUrl,
    user_agent: userAgent,
    submitted_at: inquiry.receivedAt,
  });

  const signature = crypto.createHmac("sha256", hmacSecret).update(payload).digest("hex");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), NLE_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer}`,
        "X-Inbound-Signature": `sha256=${signature}`,
      },
      body: payload,
      signal: controller.signal,
    });
    if (!res.ok) {
      return { ok: false, reason: "non_2xx", status: res.status };
    }
    return { ok: true, status: res.status };
  } catch (err) {
    if ((err as { name?: string }).name === "AbortError") {
      return { ok: false, reason: "timeout", error: "NLE_INBOUND_TIMEOUT" };
    }
    return { ok: false, reason: "network_error", error: (err as Error).message };
  } finally {
    clearTimeout(timer);
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const phoneRaw = typeof raw.phone === "string" ? raw.phone.trim() : "";
  const company = typeof raw.company === "string" ? raw.company.trim() : "";
  const projectDescription =
    typeof raw.projectDescription === "string" ? raw.projectDescription.trim() : "";
  const serviceRaw = typeof raw.service === "string" ? raw.service : "general";
  const service = VALID_SERVICES.includes(serviceRaw as Inquiry["service"])
    ? (serviceRaw as Inquiry["service"])
    : "general";

  if (!name || name.length > 200) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email || !isValidEmail(email) || email.length > 200) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (phoneRaw.length > 40) {
    return NextResponse.json({ error: "Phone number is too long." }, { status: 400 });
  }
  if (!company || company.length > 200) {
    return NextResponse.json({ error: "Company is required." }, { status: 400 });
  }
  if (!projectDescription || projectDescription.length > 2000) {
    return NextResponse.json(
      { error: "Tell us a bit about your project." },
      { status: 400 },
    );
  }

  const inquiry: Inquiry = {
    name,
    email,
    phone: phoneRaw || undefined,
    company,
    projectDescription,
    service,
    receivedAt: new Date().toISOString(),
  };

  const sourceUrl = request.headers.get("referer") || null;
  const userAgent = request.headers.get("user-agent") || null;

  const forward = await forwardToNle(inquiry, sourceUrl, userAgent);
  if (!forward.ok) {
    await appendOutbox({
      inquiry,
      reason: forward.reason ?? "network_error",
      status: forward.status,
      error: forward.error,
      attemptedAt: new Date().toISOString(),
    });
    console.error(
      "[inquiry] NLE forward failed",
      JSON.stringify({ reason: forward.reason, status: forward.status, service: inquiry.service }),
    );
  }

  // Always return 200 to the user so the funnel never breaks on operator-side
  // outages. NLE has the lead (or the outbox does) — operator notification
  // and confirmation email both fire from inside NLE.
  return NextResponse.json({ success: true });
}
