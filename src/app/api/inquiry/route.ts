import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, company, problem } = body;

  if (!name || !company || !problem) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  console.log("Inquiry received:", { name, company, problem });
  return NextResponse.json({ success: true });
}
