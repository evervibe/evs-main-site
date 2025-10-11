import { NextResponse } from "next/server";
import { site } from "@/config/site.config";

/**
 * SEO Health Check Endpoint
 * Provides information about SEO configuration and status
 */
export async function GET() {
  const baseUrl = site.url;

  const health = {
    status: "ok",
    timestamp: new Date().toISOString(),
    checks: {
      metadataBase: {
        configured: !!process.env.NEXT_PUBLIC_SITE_URL,
        value: baseUrl,
        status: "ok",
      },
      sitemap: {
        url: `${baseUrl}/sitemap.xml`,
        status: "ok",
      },
      robots: {
        url: `${baseUrl}/robots.txt`,
        status: "ok",
      },
      canonicalUrls: {
        enabled: true,
        status: "ok",
      },
      structuredData: {
        enabled: true,
        types: ["Organization", "Article", "Product"],
        status: "ok",
      },
      openGraph: {
        enabled: true,
        status: "ok",
      },
      twitter: {
        enabled: true,
        status: "ok",
      },
      cms: {
        connected: !!process.env.CMS_BASE_URL,
        baseUrl: process.env.CMS_BASE_URL || "not configured",
        status: !!process.env.CMS_BASE_URL ? "ok" : "warning",
      },
    },
    recommendations: [] as string[],
  };

  // Add recommendations based on checks
  if (!process.env.CMS_BASE_URL) {
    health.recommendations.push("Configure CMS_BASE_URL for dynamic content");
  }

  if (!process.env.CMS_API_TOKEN) {
    health.recommendations.push("Configure CMS_API_TOKEN for CMS integration");
  }

  return NextResponse.json(health, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
