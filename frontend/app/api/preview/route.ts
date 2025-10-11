import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

/**
 * Preview Mode API Route
 * Enables draft mode for previewing unpublished content from Strapi v5
 *
 * Usage: /api/preview?secret=<secret>&slug=<slug>&type=<post|product>
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type") || "post";

  // Log preview request attempt
  logger.info("Preview request received", {
    slug,
    type,
    hasSecret: !!secret,
  });

  // Validate preview secret
  const previewSecret = process.env.CMS_PREVIEW_SECRET;

  if (!previewSecret) {
    logger.error("Preview mode not configured - CMS_PREVIEW_SECRET missing");
    return NextResponse.json(
      { error: "Preview mode not configured" },
      { status: 503 }
    );
  }

  if (!secret || secret !== previewSecret) {
    logger.warn("Preview authentication failed", {
      slug,
      type,
      reason: !secret ? "missing_secret" : "invalid_secret",
    });
    return NextResponse.json(
      { error: "Invalid or missing preview token" },
      { status: 401 }
    );
  }

  if (!slug) {
    logger.warn("Preview request missing slug parameter", { type });
    return NextResponse.json(
      { error: "Missing slug parameter" },
      { status: 400 }
    );
  }

  // Enable Draft Mode
  try {
    const draft = await draftMode();
    draft.enable();

    // Redirect to the path based on type
    let redirectPath = "/";

    switch (type) {
      case "post":
        redirectPath = `/blog/${slug}`;
        break;
      case "product":
        redirectPath = `/templates/${slug}`;
        break;
      default:
        redirectPath = `/blog/${slug}`;
    }

    logger.info("Preview mode enabled, redirecting", {
      slug,
      type,
      redirectPath,
    });

    // Redirect to the preview page
    redirect(redirectPath);
  } catch (error) {
    logger.error("Failed to enable preview mode", error as Error, {
      slug,
      type,
    });
    return NextResponse.json(
      { error: "Failed to enable preview mode" },
      { status: 500 }
    );
  }
}
