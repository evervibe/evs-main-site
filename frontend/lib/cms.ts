import { z } from "zod";

// ========== Environment Configuration ==========
const cmsConfig = {
  baseUrl: process.env.CMS_BASE_URL || "https://cms.evervibestudios.com",
  apiToken: process.env.CMS_API_TOKEN || "",
  previewSecret: process.env.CMS_PREVIEW_SECRET || "",
  timeout: 10000, // 10 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
};

// ========== Zod Schemas ==========

// SEO Schema
const seoSchema = z.object({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaImage: z
    .object({
      url: z.string(),
      alternativeText: z.string().optional(),
    })
    .optional(),
  keywords: z.string().optional(),
  canonicalURL: z.string().optional(),
});

// Localized Content Schema for Translations
const localizedContentSchema = z.object({
  locale: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  description: z.string().optional(),
});

// Post Schema (Blog)
const postSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().optional(),
  publishedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  locale: z.string().optional(), // Content locale (de, en)
  localizations: z.array(localizedContentSchema).optional(), // Translations
  seo: seoSchema.optional(),
  author: z
    .object({
      name: z.string(),
      avatar: z
        .object({
          url: z.string(),
        })
        .optional(),
    })
    .optional(),
  coverImage: z
    .object({
      url: z.string(),
      alternativeText: z.string().optional(),
    })
    .optional(),
});

// Product/Template Schema
const productSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  content: z.string().optional(),
  price: z.number().optional(),
  features: z.array(z.string()).optional(),
  demoUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  publishedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  locale: z.string().optional(), // Content locale (de, en)
  localizations: z.array(localizedContentSchema).optional(), // Translations
  seo: seoSchema.optional(),
  thumbnail: z
    .object({
      url: z.string(),
      alternativeText: z.string().optional(),
    })
    .optional(),
  tags: z.array(z.string()).optional(),
});

// Team Member Schema
const teamMemberSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string().optional(),
  email: z.string().email().optional(),
  avatar: z
    .object({
      url: z.string(),
      alternativeText: z.string().optional(),
    })
    .optional(),
  social: z
    .object({
      github: z.string().optional(),
      x: z.string().optional(),
      linkedin: z.string().optional(),
    })
    .optional(),
  publishedAt: z.string(),
});

// Settings Schema (Legal, Global Config)
const settingsSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  siteName: z.string().optional(),
  siteDescription: z.string().optional(),
  contactEmail: z.string().email().optional(),
  logo: z
    .object({
      url: z.string(),
    })
    .optional(),
  footer: z
    .object({
      text: z.string().optional(),
      links: z.array(
        z.object({
          label: z.string(),
          url: z.string(),
        })
      ).optional(),
    })
    .optional(),
  legal: z
    .object({
      impressum: z.string().optional(),
      datenschutz: z.string().optional(),
      cookies: z.string().optional(),
    })
    .optional(),
  seo: seoSchema.optional(),
});

// Export Types
export type Post = z.infer<typeof postSchema>;
export type Product = z.infer<typeof productSchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type Settings = z.infer<typeof settingsSchema>;
export type SEO = z.infer<typeof seoSchema>;

// ========== Utility Functions ==========

/**
 * Sleep utility for retry logic
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch with timeout and retry logic
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  attempt = 1
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), cmsConfig.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(cmsConfig.apiToken && {
          Authorization: `Bearer ${cmsConfig.apiToken}`,
        }),
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`CMS API Error: ${response.status} ${response.statusText}`);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    if (attempt < cmsConfig.retryAttempts) {
      console.warn(
        `CMS fetch attempt ${attempt} failed, retrying...`,
        error
      );
      await sleep(cmsConfig.retryDelay * attempt);
      return fetchWithRetry(url, options, attempt + 1);
    }

    throw error;
  }
}

/**
 * Generic CMS fetcher with error handling
 */
async function fetchFromCMS<T>(
  endpoint: string,
  schema: z.ZodSchema<T>,
  options: {
    populate?: string;
    filters?: Record<string, unknown>;
    sort?: string;
    publicationState?: "live" | "preview";
  } = {}
): Promise<T | null> {
  try {
    const params = new URLSearchParams();

    if (options.populate) {
      params.append("populate", options.populate);
    }

    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        params.append(`filters[${key}]`, String(value));
      });
    }

    if (options.sort) {
      params.append("sort", options.sort);
    }

    if (options.publicationState) {
      params.append("publicationState", options.publicationState);
    }

    const url = `${cmsConfig.baseUrl}/api/${endpoint}?${params.toString()}`;
    const response = await fetchWithRetry(url);
    const data = await response.json();

    // Strapi v5 returns data directly or in a data wrapper
    const contentData = data.data || data;

    // Validate with Zod
    const validated = schema.safeParse(contentData);

    if (!validated.success) {
      console.error("CMS Schema validation failed:", validated.error);
      return null;
    }

    return validated.data;
  } catch (error) {
    console.error(`CMS Fetch Error (${endpoint}):`, error);
    return null;
  }
}

// ========== CMS API Functions ==========

/**
 * Fetch all blog posts
 */
export async function getPosts(
  options: { preview?: boolean } = {}
): Promise<Post[]> {
  try {
    const result = await fetchFromCMS(
      "posts",
      z.array(postSchema),
      {
        populate: "deep",
        sort: "publishedAt:desc",
        publicationState: options.preview ? "preview" : "live",
      }
    );

    return result || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function getPostBySlug(
  slug: string,
  options: { preview?: boolean } = {}
): Promise<Post | null> {
  try {
    const result = await fetchFromCMS(
      "posts",
      z.array(postSchema),
      {
        populate: "deep",
        filters: { slug: { $eq: slug } },
        publicationState: options.preview ? "preview" : "live",
      }
    );

    return result && result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch all products/templates
 */
export async function getProducts(
  options: { preview?: boolean } = {}
): Promise<Product[]> {
  try {
    const result = await fetchFromCMS(
      "products",
      z.array(productSchema),
      {
        populate: "deep",
        sort: "publishedAt:desc",
        publicationState: options.preview ? "preview" : "live",
      }
    );

    return result || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Fetch a single product/template by slug
 */
export async function getProductBySlug(
  slug: string,
  options: { preview?: boolean } = {}
): Promise<Product | null> {
  try {
    const result = await fetchFromCMS(
      "products",
      z.array(productSchema),
      {
        populate: "deep",
        filters: { slug: { $eq: slug } },
        publicationState: options.preview ? "preview" : "live",
      }
    );

    return result && result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch team members
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const result = await fetchFromCMS(
      "team-members",
      z.array(teamMemberSchema),
      {
        populate: "deep",
        sort: "createdAt:asc",
      }
    );

    return result || [];
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

/**
 * Fetch global settings
 */
export async function getSettings(): Promise<Settings | null> {
  try {
    const result = await fetchFromCMS(
      "setting",
      settingsSchema,
      {
        populate: "deep",
      }
    );

    return result;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

// ========== Helper Functions ==========

/**
 * Get image URL with fallback
 */
export function getImageUrl(
  image: { url: string } | undefined,
  fallback = "/placeholder.png"
): string {
  if (!image?.url) return fallback;

  // If URL is relative, prepend CMS base URL
  if (image.url.startsWith("/")) {
    return `${cmsConfig.baseUrl}${image.url}`;
  }

  return image.url;
}

/**
 * Generate SEO metadata from CMS SEO object
 */
export function generateMetaFromSEO(seo: SEO | undefined) {
  if (!seo) return {};

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords?.split(",").map((k) => k.trim()),
    openGraph: seo.metaImage
      ? {
          images: [
            {
              url: getImageUrl(seo.metaImage),
              alt: seo.metaImage.alternativeText || seo.metaTitle || "",
            },
          ],
        }
      : undefined,
    alternates: seo.canonicalURL
      ? {
          canonical: seo.canonicalURL,
        }
      : undefined,
  };
}

/**
 * Get localized content from post/product
 * Falls back to default content if locale not found
 */
export function getLocalizedContent<
  T extends { locale?: string; localizations?: Array<{ locale: string }> }
>(content: T, targetLocale: string = "de"): T {
  // If content locale matches target, return as-is
  if (content.locale === targetLocale) {
    return content;
  }

  // Try to find localization
  if (content.localizations) {
    const localized = content.localizations.find(
      (loc) => loc.locale === targetLocale
    );
    if (localized) {
      return { ...content, ...localized };
    }
  }

  // Fallback to original content (German by default)
  return content;
}
