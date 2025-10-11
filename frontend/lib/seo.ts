import { Metadata } from "next";
import { site } from "@/config/site.config";

export function createMetadata(overrides?: Metadata): Metadata {
  return {
    title: {
      default: site.name,
      template: `%s | ${site.name}`,
    },
    description:
      "Premium Next.js Templates und individuelle Webentwicklung von EverVibe Studios – DSGVO-ready, modern, schnell.",
    keywords: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Web Templates",
      "DSGVO",
      "EverVibe Studios",
    ],
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    metadataBase: new URL(site.url),
    openGraph: {
      type: "website",
      locale: "de_DE",
      url: site.url,
      siteName: site.name,
      title: site.name,
      description:
        "Premium Next.js Templates und individuelle Webentwicklung – DSGVO-ready, modern, schnell.",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@evervibestudios",
      creator: "@evervibestudios",
      title: site.name,
      description:
        "Premium Next.js Templates und individuelle Webentwicklung – DSGVO-ready, modern, schnell.",
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    ...overrides,
  };
}

export function createJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legal.company,
    url: site.url,
    logo: `${site.url}/brand/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      email: site.legal.email,
      telephone: site.phone,
      contactType: "customer service",
      availableLanguage: ["de", "en"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Stresemannstraße 131",
      addressLocality: "Hamburg",
      postalCode: "22769",
      addressCountry: "DE",
    },
    sameAs: [site.social.x, site.social.github],
  };
}

/**
 * Create Article JSON-LD for blog posts
 */
export function createArticleJsonLd(article: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  imageUrl?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.imageUrl,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author || site.legal.company,
    },
    publisher: {
      "@type": "Organization",
      name: site.legal.company,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/brand/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

/**
 * Create Product JSON-LD for templates
 */
export function createProductJsonLd(product: {
  title: string;
  description: string;
  price?: number;
  imageUrl?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.imageUrl,
    offers: product.price
      ? {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        }
      : undefined,
    brand: {
      "@type": "Brand",
      name: site.legal.company,
    },
    url: product.url,
  };
}
