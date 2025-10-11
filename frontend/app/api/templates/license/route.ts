import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const licenseQuerySchema = z.object({
  email: z.string().email(),
  templateId: z.string().optional(),
});

/**
 * License Management Endpoint
 * Check and manage template licenses
 * 
 * TODO: Integrate with core-api for actual license management
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");
    const templateId = searchParams.get("templateId");

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter required" },
        { status: 400 }
      );
    }

    const validated = licenseQuerySchema.parse({ email, templateId });

    // TODO: Fetch from core-api/database
    // For now, return mock data
    const mockLicenses = [
      {
        templateId: "1",
        templateName: "Premium Blog Template",
        licenseKey: "XXXX-XXXX-XXXX-XXXX",
        status: "active",
        purchaseDate: "2025-01-15T10:00:00Z",
        expiryDate: null, // Lifetime license
      },
    ];

    const licenses = validated.templateId
      ? mockLicenses.filter((l) => l.templateId === validated.templateId)
      : mockLicenses;

    return NextResponse.json(
      {
        success: true,
        licenses,
        note: "License data requires core-api integration",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[License Check] Error:", error);

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

/**
 * Validate a license key
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { licenseKey } = body;

    if (!licenseKey) {
      return NextResponse.json(
        { error: "License key required" },
        { status: 400 }
      );
    }

    // TODO: Validate against core-api/database
    // Check if key exists, is active, not expired, not revoked

    const mockValidation = {
      valid: true,
      templateId: "1",
      templateName: "Premium Blog Template",
      status: "active",
      expiryDate: null,
    };

    return NextResponse.json(
      {
        success: true,
        ...mockValidation,
        note: "License validation requires core-api integration",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[License Validation] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
