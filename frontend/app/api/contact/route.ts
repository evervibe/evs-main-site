import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/schema";
import { sendContactEmail } from "@/lib/mailer";
import { createRateLimiter } from "@/lib/rateLimit";

const rateLimiter = createRateLimiter();

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "anonymous";

    // Apply rate limiting
    const { success, reset } = await rateLimiter.limit(ip);
    if (!success) {
      return NextResponse.json(
        {
          error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
          resetAt: reset,
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Check honeypot field
    if (validatedData._topic && validatedData._topic.trim() !== "") {
      // Silent fail for bots
      return NextResponse.json({ success: true });
    }

    // Send email
    await sendContactEmail({
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
    });

    return NextResponse.json({
      success: true,
      message: "Ihre Nachricht wurde erfolgreich versendet.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Ungültige Formulardaten", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." },
      { status: 500 }
    );
  }
}
