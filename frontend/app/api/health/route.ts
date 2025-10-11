import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

// Simple in-memory cache for Core health check
let coreHealthCache: {
  data: unknown;
  timestamp: number;
} | null = null;

const CACHE_TTL = 15000; // 15 seconds

export async function GET() {
  const timestamp = new Date().toISOString();
  const cmsBaseUrl = process.env.CMS_BASE_URL || "https://cms.evervibestudios.com";
  const coreHealthUrl = process.env.CORE_HEALTH_URL;
  
  // Basic health status
  const health: {
    status: string;
    timestamp: string;
    service: string;
    version: string;
    templateVersion: string;
    coreVersion: string;
    environment: string;
    paypalConfigured: boolean;
    cms: {
      configured: boolean;
      baseUrl: string;
      reachable: boolean;
    };
    core?: {
      configured: boolean;
      reachable: boolean;
      url?: string;
      data?: unknown;
    };
  } = {
    status: "ok",
    timestamp,
    service: "evs-main-site",
    version: "1.6.7",
    templateVersion: "1.6.7",
    coreVersion: "0.4.1",
    environment: process.env.NODE_ENV || "development",
    paypalConfigured: !!(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET),
    cms: {
      configured: !!process.env.CMS_API_TOKEN,
      baseUrl: cmsBaseUrl,
      reachable: false,
    },
  };

  // Try to ping CMS (with timeout)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

    const cmsResponse = await fetch(`${cmsBaseUrl}/api`, {
      method: "HEAD",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${process.env.CMS_API_TOKEN || ""}`,
      },
    });

    clearTimeout(timeoutId);
    health.cms.reachable = cmsResponse.ok || cmsResponse.status < 500;
  } catch (error) {
    // CMS not reachable (expected in some environments)
    health.cms.reachable = false;
    logger.warn("CMS health check failed", { error: (error as Error).message });
  }

  // Optional: Check Core health endpoint (if configured)
  if (coreHealthUrl) {
    health.core = {
      configured: true,
      reachable: false,
      url: coreHealthUrl,
    };

    // Check cache first
    const now = Date.now();
    if (coreHealthCache && now - coreHealthCache.timestamp < CACHE_TTL) {
      health.core.reachable = true;
      health.core.data = coreHealthCache.data;
      logger.debug("Core health check served from cache");
    } else {
      // Fetch from Core with timeout
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const coreResponse = await fetch(coreHealthUrl, {
          method: "GET",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        });

        clearTimeout(timeoutId);

        if (coreResponse.ok) {
          const coreData = await coreResponse.json();
          health.core.reachable = true;
          health.core.data = coreData;

          // Update cache
          coreHealthCache = {
            data: coreData,
            timestamp: now,
          };

          logger.info("Core health check successful");
        } else {
          health.core.reachable = false;
          logger.warn("Core health check returned non-OK status", {
            status: coreResponse.status,
          });
        }
      } catch (error) {
        // Core not reachable (non-blocking)
        health.core.reachable = false;
        logger.warn("Core health check failed", {
          error: (error as Error).message,
        });
      }
    }
  }

  // Log health check
  logger.info("Health check", { 
    cmsReachable: health.cms.reachable,
    cmsConfigured: health.cms.configured,
    coreConfigured: !!coreHealthUrl,
    coreReachable: health.core?.reachable,
  });

  return NextResponse.json(health);
}
