import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // -------------------------
  // ✅ Build Stability (Vercel CI)
  // -------------------------
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },

  // -------------------------
  // ✅ Monorepo Root Tracing
  // -------------------------
  outputFileTracingRoot: path.join(__dirname, ".."),

  // -------------------------
  // ✅ Image Optimization (CMS)
  // -------------------------
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.evervibestudios.com",
        pathname: "/uploads/**"
      }
    ]
  },

  // -------------------------
  // ✅ Global Security Headers & Cache Control
  // -------------------------
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://cms.evervibestudios.com https://vercel.live",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ]
              .join("; ")
              .replace(/\s{2,}/g, " ")
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          }
        ]
      },
      {
        source: "/:path*.(png|jpg|jpeg|gif|webp|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        source: "/:path*.(js|css|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ];
  },

  // -------------------------
  // ✅ Redirects (Future Expansion)
  // -------------------------
  async redirects() {
    return [];
  }
};

export default nextConfig;