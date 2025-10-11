import { Metadata } from "next";

/**
 * SEO Sync Metadata Helper
 * Centralizes SEO metadata generation from CMS content with fallbacks
 */

export interface CMSSeoData {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalURL?: string;
  metaImage?: {
    url: string;
    alternativeText?: string;
  };
}

export interface SyncMetaOptions {
  title?: string;
  description?: string;
  seo?: CMSSeoData;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

/**
 * Synchronize and generate metadata from CMS SEO data with proper fallbacks
 * Ensures all pages have proper OG tags, canonical URLs, and JSON-LD
 * Note: For products, use type="website" and add product JSON-LD separately
 */
export function syncMeta(options: SyncMetaOptions): Metadata {
  const {
    title,
    description,
    seo,
    path = "/",
    type = "website",
    publishedTime,
    modifiedTime,
    author,
  } = options;

  // Base site configuration
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://evervibestudios.com";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "EverVibe Studios";

  // Priority: SEO metaTitle > provided title > siteName
  const metaTitle = seo?.metaTitle || title || siteName;

  // Priority: SEO metaDescription > provided description > default
  const metaDescription =
    seo?.metaDescription ||
    description ||
    "Premium Next.js Templates und individuelle Webentwicklung – DSGVO-ready, modern, schnell.";

  // Parse keywords from comma-separated string
  const keywords = seo?.keywords
    ? seo.keywords.split(",").map((k) => k.trim())
    : undefined;

  // Build canonical URL
  const canonicalUrl = seo?.canonicalURL || `${siteUrl}${path}`;

  // Build Open Graph image
  const ogImage = seo?.metaImage
    ? {
        url: seo.metaImage.url.startsWith("http")
          ? seo.metaImage.url
          : `${siteUrl}${seo.metaImage.url}`,
        alt: seo.metaImage.alternativeText || metaTitle,
      }
    : {
        url: `${siteUrl}/og.png`,
        alt: siteName,
      };

  // Build metadata object
  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName,
      locale: "de_DE",
      type,
      images: [
        {
          url: ogImage.url,
          width: 1200,
          height: 630,
          alt: ogImage.alt,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && type === "article" && { authors: [author] }),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImage.url],
      site: "@evervibestudios",
      creator: "@evervibestudios",
    },
  };

  return metadata;
}

/**
 * Generate metadata from CMS post/product data
 * Simplified wrapper for common use cases
 */
export function generateMetaFromSEO(
  seo?: CMSSeoData,
  fallbackTitle?: string,
  fallbackDescription?: string
): Metadata {
  if (!seo && !fallbackTitle) {
    return {};
  }

  return syncMeta({
    title: fallbackTitle,
    description: fallbackDescription,
    seo,
  });
}

/**
 * Validate SEO metadata completeness
 * Returns array of missing required fields
 */
export function validateSeoMetadata(seo?: CMSSeoData): string[] {
  const missing: string[] = [];

  if (!seo) {
    return ["SEO object missing"];
  }

  if (!seo.metaTitle) missing.push("metaTitle");
  if (!seo.metaDescription) missing.push("metaDescription");
  if (!seo.metaImage) missing.push("metaImage");

  return missing;
}

/**
 * Check if SEO metadata is complete
 */
export function isSeoComplete(seo?: CMSSeoData): boolean {
  return validateSeoMetadata(seo).length === 0;
}
