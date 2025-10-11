import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// In-memory rate limiter for development/fallback
class InMemoryRateLimiter {
  private requests: Map<string, number[]> = new Map();
  private window: number;
  private max: number;

  constructor(window: number, max: number) {
    this.window = window;
    this.max = max;
  }

  async limit(identifier: string) {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];

    // Filter out old requests outside the window
    const recentRequests = requests.filter((time) => now - time < this.window);

    if (recentRequests.length >= this.max) {
      const oldestRequest = recentRequests[0];
      const resetTime = oldestRequest + this.window;
      return {
        success: false,
        limit: this.max,
        remaining: 0,
        reset: resetTime,
      };
    }

    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);

    return {
      success: true,
      limit: this.max,
      remaining: this.max - recentRequests.length,
      reset: now + this.window,
    };
  }
}

// Parse rate limit window (e.g., "5m", "1h")
function parseWindow(window: string): number {
  const match = window.match(/^(\d+)([smh])$/);
  if (!match) return 5 * 60 * 1000; // default 5 minutes

  const [, value, unit] = match;
  const num = parseInt(value, 10);

  switch (unit) {
    case "s":
      return num * 1000;
    case "m":
      return num * 60 * 1000;
    case "h":
      return num * 60 * 60 * 1000;
    default:
      return 5 * 60 * 1000;
  }
}

// Create rate limiter instance
export function createRateLimiter() {
  const window = parseWindow(process.env.RATE_LIMIT_WINDOW || "5m");
  const max = parseInt(process.env.RATE_LIMIT_MAX || "5", 10);

  // Use Upstash if credentials are provided
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    return new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(max, `${window}ms`),
      analytics: true,
    });
  }

  // Fallback to in-memory limiter
  return new InMemoryRateLimiter(window, max);
}

// Global rate limiter instance
const rateLimiter = createRateLimiter();

/**
 * Check rate limit for a given identifier
 */
export async function checkRateLimit(identifier: string) {
  return await rateLimiter.limit(identifier);
}
