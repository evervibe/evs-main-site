# 🌐 EverVibe Studios – System Overview

**Last Updated:** 2025-01-08  
**Version:** v1.6.0  
**Status:** Production Ready

---

## 📋 Executive Summary

EverVibe Studios Main Site is the central brand hub and showcase for all EVS products. The website serves as a marketing platform, blog, template showcase, and contact point for customers.

**Current State:**
- ✅ v1.6.0 Released with Monitoring & Enhanced Compliance
- ✅ Production-ready deployment with health monitoring
- ✅ Full DSGVO compliance with consent management
- ✅ Enhanced SEO with structured data
- ✅ Structured logging and error tracking
- ✅ CMS Integration (v0.4.x compatible)

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    EverVibe Studios Ecosystem                │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐   ┌──────────────────┐   ┌──────────────┐
│  Main Site    │   │  Strapi CMS      │   │  Core API    │
│  (Next.js)    │◄──┤  (Headless)      │   │  (Future)    │
│               │   │                  │   │              │
│  Frontend     │   │  Content         │   │  Auth        │
│  Marketing    │   │  Management      │   │  Analytics   │
│  Blog         │   │  Preview         │   │  Monitoring  │
│  Templates    │   │  Settings        │   │              │
└───────────────┘   └──────────────────┘   └──────────────┘
        │                     │                     │
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────────────────────────────────────────────────┐
│                     Vercel Edge Network                    │
│                   (CDN + Deployment)                       │
└───────────────────────────────────────────────────────────┘
```

---

## 🧩 Components

### 1. Main Site (Frontend)

**Technology:** Next.js 15, React 19, TypeScript, Tailwind CSS v4

**Location:** `/frontend`

**Features:**
- Marketing pages (Home, About, Contact)
- Blog (CMS-driven)
- Template showcase (Static + CMS)
- Team page (CMS-driven)
- Legal pages (Impressum, Datenschutz, Cookies)
- Contact form with SMTP
- Preview mode for drafts
- ISR with 5-minute revalidation

**Routes:**
- `/` – Home
- `/blog` – Blog listing
- `/blog/[slug]` – Blog post detail
- `/templates` – Template showcase
- `/templates/[slug]` – Template detail
- `/team` – Team page
- `/kontakt` – Contact form
- `/ueber-uns` – About us
- `/recht/*` – Legal pages

**API Endpoints:**
- `/api/contact` – Contact form handler
- `/api/health` – Health check
- `/api/preview` – Preview mode activation
- `/api/disable-preview` – Preview mode deactivation

### 2. Strapi CMS (Backend)

**Technology:** Strapi v5 (Headless CMS)

**Location:** `https://cms.evervibestudios.com`

**Content Types:**
- **Posts** – Blog articles with SEO, author, images
- **Products** – Template showcase with pricing, features
- **Team Members** – Team profiles with social links
- **Settings** – Global site configuration, legal content

**Integration:**
- REST API with Bearer token authentication
- Zod validation on frontend
- Retry logic with exponential backoff
- Preview mode with secure tokens

### 3. Deployment (Vercel)

**Platform:** Vercel

**Domains:**
- Production: `evervibestudios.com`
- Preview: Auto-generated per PR

**Features:**
- Automatic HTTPS
- Edge caching
- Environment variables
- Analytics
- CI/CD integration

---

## 🔄 Data Flow

### Content Publishing Flow

```
1. Content Author creates/edits in Strapi
2. Author clicks "Publish"
3. Content becomes available via CMS API
4. Next.js ISR revalidates after 5 minutes
5. Updated content visible on main site
```

### Preview Flow

```
1. Author creates draft in Strapi
2. Author clicks "Preview"
3. Strapi redirects to /api/preview?secret=...&slug=...
4. Main site validates secret, enables draft mode
5. Draft content fetched from CMS
6. Preview banner displays
7. Author reviews content
8. Author clicks "Exit Preview"
```

### Contact Form Flow

```
1. User fills contact form
2. Client-side validation (Zod)
3. POST to /api/contact
4. Rate limiting check
5. Honeypot validation
6. SMTP email sent via Nodemailer
7. Response to user
```

---

## 🔐 Security

### Authentication & Authorization

- **CMS API:** Bearer token (`CMS_API_TOKEN`)
- **Preview Mode:** Secure secret (`CMS_PREVIEW_SECRET`)
- **No user authentication** on main site (public content)

### Security Headers

- **CSP:** Content Security Policy restricts script/style sources
- **X-Frame-Options:** Prevents clickjacking
- **X-Content-Type-Options:** Prevents MIME sniffing
- **Referrer-Policy:** Controls referrer information
- **Permissions-Policy:** Restricts browser features

### Rate Limiting

- **Contact Form:** 5 requests per 5 minutes per IP
- **Backend:** In-memory (or Upstash Redis if configured)

### Data Protection

- **DSGVO Compliance:** Cookie consent, privacy policy
- **No tracking cookies:** Only essential functionality
- **SMTP:** Secure connection (SSL/TLS)

---

## 📊 Performance

### Optimization Strategies

1. **Static Generation + ISR**
   - Most pages pre-rendered at build time
   - 5-minute revalidation for CMS content
   - Fast TTFB (Time to First Byte)

2. **Edge Caching**
   - Vercel Edge Network
   - Global CDN distribution
   - Automatic cache invalidation

3. **Code Splitting**
   - Next.js automatic code splitting
   - Minimal JS bundle per page
   - Dynamic imports where needed

4. **Image Optimization** (Future)
   - Next.js Image component (to be implemented)
   - WebP format
   - Lazy loading

### Target Metrics

- **Lighthouse Score:** 90+
- **TTFB:** < 200ms
- **FCP:** < 1.5s
- **LCP:** < 2.5s
- **CLS:** < 0.1

---

## 🔧 Environment Variables

### Production Environment

```bash
# Public Branding
NEXT_PUBLIC_SITE_NAME=EverVibe Studios
NEXT_PUBLIC_SITE_URL=https://evervibestudios.com
NEXT_PUBLIC_CONTACT_EMAIL=info@evervibestudios.com

# SMTP (Contact Form)
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@evervibestudios.com
SMTP_PASS=<secure>

# Rate Limiting
CONTACT_MIN_MESSAGE_LENGTH=5
RATE_LIMIT_WINDOW=5m
RATE_LIMIT_MAX=5

# CMS Integration
CMS_BASE_URL=https://cms.evervibestudios.com
CMS_API_TOKEN=<secure>
CMS_PREVIEW_SECRET=<secure>

# Optional: Upstash Redis
UPSTASH_REDIS_REST_URL=<optional>
UPSTASH_REDIS_REST_TOKEN=<optional>
```

---

## 🚀 Deployment Process

### CI/CD Pipeline

**GitHub Actions:** `.github/workflows/ci.yml`

**Triggers:**
- Push to `main` → Production deployment
- Pull request → Preview deployment

**Steps:**
1. Checkout code
2. Install dependencies (pnpm)
3. Run ESLint
4. Run TypeScript type check
5. Build application
6. Deploy to Vercel (automatic)

### Manual Deployment

```bash
# From frontend directory
pnpm install
pnpm build
pnpm start

# Or push to GitHub
git push origin main
```

---

## 📈 Roadmap

### v1.1.0 (Current) ✅
- ✅ CMS Integration (Strapi)
- ✅ Preview Mode
- ✅ Enhanced Security (CSP Headers)
- ✅ Environment Validation
- ✅ Consent Manager Stub
- ✅ ISR with 5min revalidation

### v1.2.0 (Planned) 🚧
- Webhook revalidation endpoint
- On-demand ISR from CMS
- Image optimization with Next.js Image
- Advanced analytics integration
- Error monitoring (Sentry)
- Pagination for blog/templates

### v2.0.0 (Future) 💭
- Multi-language support (i18n)
- Advanced search functionality
- User authentication (optional)
- Content recommendation engine
- Performance dashboard

---

## 🐛 Known Issues & Limitations

### Current Limitations

1. **No On-Demand Revalidation**
   - Content updates require 5-minute wait or manual rebuild
   - Solution: Implement `/api/revalidate` webhook endpoint

2. **No Error Monitoring**
   - CMS errors logged but not tracked
   - Solution: Integrate Sentry or similar service

3. **Basic Image Handling**
   - Using `<img>` tags instead of Next.js Image
   - Solution: Migrate to Next.js Image component

4. **No Content Pagination**
   - All posts/products fetched at once
   - Solution: Add pagination to CMS fetchers

---

## 📞 Support & Contact

### Resources

- **GitHub Repository:** https://github.com/evervibe/evs-main-site
- **Documentation:** See README files in each directory
- **Issues:** GitHub Issues

### Contact

- **Email:** info@evervibestudios.com
- **Website:** https://evervibestudios.com

---

## 📝 Change Log

### v1.1.0 (Current)
- CMS Integration with Strapi
- Preview Mode for draft content
- Enhanced security headers
- Environment validation
- ISR with 5-minute revalidation
- Consent Manager stub

### v1.0.0
- Initial release
- Marketing pages
- Contact form with SMTP
- Static template showcase
- Legal pages
- SEO optimization

---

## ✅ Health Check

**Status Endpoint:** `https://evervibestudios.com/api/health`

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "service": "evs-main-site"
}
```

---

© EverVibe Studios – 2025
