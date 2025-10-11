import { site } from "./site.config";

export const defaultSEO = {
  title: site.name,
  description:
    "Digitale Templates & Branding Solutions – Premium Next.js Templates für moderne Webprojekte. DSGVO-ready, schnell und professionell.",
  keywords: [
    "Next.js Templates",
    "React Templates",
    "TypeScript",
    "Tailwind CSS",
    "DSGVO",
    "Web Development",
    "EverVibe Studios",
  ],
  openGraph: {
    type: "website" as const,
    locale: "de_DE",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description:
      "Premium Next.js Templates und individuelle Webentwicklung – DSGVO-ready, modern, schnell.",
    images: [
      {
        url: `${site.url}/og.png`,
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    site: "@evervibestudios",
    creator: "@evervibestudios",
    title: site.name,
    description:
      "Premium Next.js Templates und individuelle Webentwicklung – DSGVO-ready, modern, schnell.",
    images: [`${site.url}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
} as const;
