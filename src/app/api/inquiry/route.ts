import { NextResponse } from "next/server";
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

const INQUIRIES_FILE = path.join(process.cwd(), "data", "inquiries.json");

async function appendInquiry(inquiry: Inquiry): Promise<void> {
  await fs.mkdir(path.dirname(INQUIRIES_FILE), { recursive: true });
  let existing: Inquiry[] = [];
  try {
    const raw = await fs.readFile(INQUIRIES_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) existing = parsed;
  } catch {
    // File doesn't exist yet — that's fine.
  }
  existing.push(inquiry);
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(existing, null, 2), "utf8");
}

// Notification seam. When Postmark is approved, swap this body for the
// Postmark client call. Everything else stays the same.
async function sendInquiryNotification(inquiry: Inquiry): Promise<void> {
  const token = process.env.POSTMARK_SERVER_TOKEN;
  if (!token) {
    console.log("[inquiry] notification pending (no POSTMARK_SERVER_TOKEN):", {
      ...inquiry,
      projectDescription: `${inquiry.projectDescription.slice(0, 80)}…`,
    });
    return;
  }

  const from = process.env.INQUIRY_FROM_EMAIL || "nextconsulting.ai@gmail.com";
  const to = process.env.INQUIRY_TO_EMAIL || "nextconsulting.ai@gmail.com";

  const subject = `New inquiry · ${inquiry.service} · ${inquiry.company}`;
  const textBody = [
    `Service: ${inquiry.service}`,
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone || "(not provided)"}`,
    `Company: ${inquiry.company}`,
    "",
    "Project:",
    inquiry.projectDescription,
    "",
    `Received: ${inquiry.receivedAt}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": token,
      },
      body: JSON.stringify({
        From: from,
        To: to,
        ReplyTo: inquiry.email,
        Subject: subject,
        TextBody: textBody,
        MessageStream: "outbound",
      }),
    });
    if (!res.ok) {
      console.error(
        "[inquiry] Postmark send failed:",
        res.status,
        await res.text().catch(() => ""),
      );
    }
  } catch (err) {
    console.error("[inquiry] Postmark send threw:", err);
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

  try {
    await appendInquiry(inquiry);
  } catch (err) {
    console.error("[inquiry] persistence failed:", err);
    return NextResponse.json(
      { error: "Could not record your inquiry. Please try again." },
      { status: 500 },
    );
  }

  await sendInquiryNotification(inquiry);

  return NextResponse.json({ success: true });
}
