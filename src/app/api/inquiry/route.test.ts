import { describe, expect, test, beforeEach, afterEach, vi } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import { POST } from "./route";

const OUTBOX_FILE = path.join(process.cwd(), "data", "inbound-outbox.jsonl");

const validBody = () => ({
  name: "Jane Owner",
  email: "jane+test@example.com",
  phone: "+15555550123",
  company: "Acme Plumbing",
  projectDescription:
    "Need a new website with online booking and lead capture, our current site is from 2014.",
  service: "websites",
});

function makeRequest(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request("http://localhost/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

async function readOutbox(): Promise<string[]> {
  try {
    const raw = await fs.readFile(OUTBOX_FILE, "utf8");
    return raw.split("\n").filter((line) => line.length > 0);
  } catch {
    return [];
  }
}

async function clearOutbox(): Promise<void> {
  try {
    await fs.unlink(OUTBOX_FILE);
  } catch {
    // file may not exist; that's fine
  }
}

beforeEach(async () => {
  await clearOutbox();
  process.env.NLE_INBOUND_URL = "https://nle.example.com/api/webhooks/inbound";
  process.env.INBOUND_FORM_SECRET = "test-bearer";
  process.env.INBOUND_FORM_HMAC_SECRET = "test-hmac";
  process.env.NLE_INBOUND_TIMEOUT_MS = "1500";
});

afterEach(async () => {
  vi.restoreAllMocks();
  await clearOutbox();
});

describe("POST /api/inquiry — NLE forwarding", () => {
  test("forwards to NLE with bearer + HMAC and returns 200 on 2xx", async () => {
    const fetchMock = vi.fn(async (_url: string, init: RequestInit) => {
      // Verify outbound headers + body shape
      const headers = init.headers as Record<string, string>;
      expect(headers.Authorization).toBe("Bearer test-bearer");
      expect(headers["X-Inbound-Signature"]).toMatch(/^sha256=[0-9a-f]{64}$/);
      const sent = JSON.parse(init.body as string) as Record<string, unknown>;
      expect(sent.email).toBe("jane+test@example.com");
      expect(sent.project_description).toContain("online booking");
      expect(sent.service).toBe("websites");
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);

    const res = await POST(makeRequest(validBody()));
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(await readOutbox()).toEqual([]);
  });

  test("returns 200 + writes outbox when NLE returns 5xx", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("boom", { status: 500 })));
    const res = await POST(makeRequest(validBody()));
    expect(res.status).toBe(200);
    const out = await readOutbox();
    expect(out.length).toBe(1);
    const row = JSON.parse(out[0]) as { reason: string; status: number };
    expect(row.reason).toBe("non_2xx");
    expect(row.status).toBe(500);
  });

  test("returns 200 + writes outbox on network error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      throw new Error("ECONNREFUSED");
    }));
    const res = await POST(makeRequest(validBody()));
    expect(res.status).toBe(200);
    const out = await readOutbox();
    expect(out.length).toBe(1);
    expect((JSON.parse(out[0]) as { reason: string }).reason).toBe("network_error");
  });

  test("returns 200 + writes outbox on missing config", async () => {
    delete process.env.NLE_INBOUND_URL;
    vi.stubGlobal("fetch", vi.fn());
    const res = await POST(makeRequest(validBody()));
    expect(res.status).toBe(200);
    const out = await readOutbox();
    expect(out.length).toBe(1);
    expect((JSON.parse(out[0]) as { reason: string }).reason).toBe("missing_config");
  });

  test("rejects validation errors before forwarding (no NLE call)", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const res = await POST(makeRequest({ ...validBody(), name: "" }));
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(await readOutbox()).toEqual([]);
  });
});
