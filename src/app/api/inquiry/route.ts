import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, company, problem } = body as Record<string, unknown>;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof company !== "string" || !company.trim() ||
    typeof problem !== "string" || !problem.trim() ||
    name.length > 200 || company.length > 200 || problem.length > 2000
  ) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  console.log("Inquiry received:", { name, company, problem });
  return NextResponse.json({ success: true });
}
