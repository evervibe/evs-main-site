import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

/**
 * Disable Preview Mode
 * Turns off draft mode and returns success
 *
 * Usage: POST /api/disable-preview
 */
export async function POST() {
  try {
    const draft = await draftMode();
    draft.disable();

    logger.info("Preview mode disabled");

    return NextResponse.json({ 
      success: true,
      disabled: true,
      message: "Preview mode disabled successfully"
    });
  } catch (error) {
    logger.error("Failed to disable preview mode", error as Error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to disable preview mode" 
      },
      { status: 500 }
    );
  }
}

/**
 * Also support GET for convenience (e.g., clicking a link)
 */
export async function GET() {
  return POST();
}
