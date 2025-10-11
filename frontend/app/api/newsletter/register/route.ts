import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rateLimit";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
});

/**
 * Newsletter Registration Endpoint
 * Implements double-opt-in flow
 * 
 * TODO: Integrate with core-api when available
 * For now, this is a stub that validates and logs
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rateLimitResult = await checkRateLimit(ip);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: rateLimitResult.reset,
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validated = newsletterSchema.parse(body);

    // TODO: Send to core-api endpoint
    // For now, just log and return success
    console.log("[Newsletter] Registration request:", {
      email: validated.email,
      name: validated.name || "Anonymous",
      timestamp: new Date().toISOString(),
    });

    // In production, this would:
    // 1. Store email in database with pending status
    // 2. Generate confirmation token
    // 3. Send confirmation email via SMTP
    // 4. Return success message

    // Simulate successful registration
    return NextResponse.json(
      {
        success: true,
        message: "Confirmation email sent. Please check your inbox.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Newsletter] Registration error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
