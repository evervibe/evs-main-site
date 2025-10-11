import { z } from "zod";

/**
 * Environment Variables Schema
 * Validates required environment variables at runtime
 */
const envSchema = z.object({
  // Public variables
  NEXT_PUBLIC_SITE_NAME: z.string().default("EverVibe Studios"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://evervibestudios.com"),
  NEXT_PUBLIC_CONTACT_EMAIL: z.string().email().default("info@evervibestudios.com"),

  // SMTP Configuration
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_SECURE: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),

  // Rate Limiting
  CONTACT_MIN_MESSAGE_LENGTH: z.string().default("5"),
  RATE_LIMIT_WINDOW: z.string().default("5m"),
  RATE_LIMIT_MAX: z.string().default("5"),

  // Optional: Upstash Redis
  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // CMS (Strapi)
  CMS_BASE_URL: z.string().url().default("https://cms.evervibestudios.com"),
  CMS_API_TOKEN: z.string().optional(),
  CMS_PREVIEW_SECRET: z.string().optional(),

  // Core Health (Optional)
  CORE_HEALTH_URL: z.string().url().optional(),

  // Node Environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validate environment variables
 * Throws error if validation fails in production
 */
export function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);

    // Only throw in production, warn in development
    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid environment variables");
    }
  }

  return parsed.data || (process.env as unknown as Env);
}

/**
 * Get validated environment variables
 */
export const env = validateEnv();
