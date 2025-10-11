import { NextResponse } from "next/server";

/**
 * Simple health check endpoint
 * Returns HTTP 200 with { ok: true }
 */
export async function GET() {
  return NextResponse.json({ ok: true });
}
