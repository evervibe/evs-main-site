# 🚀 EverVibe Studios Main Site – Deployment Guide

**Version:** v1.1.0  
**Status:** Production Ready  
**Last Updated:** 2025  

---

## 📋 Overview

This document describes the deployment process for the EverVibe Studios Main Site, including CMS integration, preview mode, security configuration, and CI/CD pipeline.

---

## 🏗️ Architecture

### Stack
- **Framework:** Next.js 15 (App Router)
- **Runtime:** Node.js 20+
- **Deployment:** Vercel
- **CMS:** Strapi (evs-strapi-cms)
- **Database:** None (static + ISR)
- **CDN:** Vercel Edge Network

### Key Features
- **ISR (Incremental Static Regeneration):** 5-minute revalidation
- **Preview Mode:** Draft content preview for CMS editors
- **CSP Headers:** Content Security Policy enabled
- **Rate Limiting:** Contact form protection
- **DSGVO:** Cookie consent manager

---

## 🔐 Environment Variables

### Required for Production

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
SMTP_PASS=<secure-password>

# Rate Limiting
CONTACT_MIN_MESSAGE_LENGTH=5
RATE_LIMIT_WINDOW=5m
RATE_LIMIT_MAX=5

# CMS (Strapi)
CMS_BASE_URL=https://cms.evervibestudios.com
CMS_API_TOKEN=<secure-token>
CMS_PREVIEW_SECRET=<secure-preview-secret>
```

### Optional

```bash
# Upstash Redis (Enhanced Rate Limiting)
UPSTASH_REDIS_REST_URL=<redis-url>
UPSTASH_REDIS_REST_TOKEN=<redis-token>
```

---

## 📦 Deployment Steps

### 1. Prerequisites

- GitHub repository: `evervibe/evs-main-site`
- Vercel account connected to GitHub
- Strapi CMS deployed at `cms.evervibestudios.com`
- Domain configured: `evervibestudios.com`

### 2. Initial Setup

```bash
# Clone repository
git clone https://github.com/evervibe/evs-main-site.git
cd evs-main-site/frontend

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with production values
```

### 3. Local Testing

```bash
# Run development server
pnpm dev

# Run type checking
pnpm typecheck

# Run linting
pnpm lint

# Build production bundle
pnpm build

# Start production server
pnpm start
```

### 4. Vercel Deployment

#### Via Vercel Dashboard

1. Import project from GitHub
2. Select `evs-main-site` repository
3. Framework Preset: **Next.js**
4. Root Directory: **frontend**
5. Build Command: `pnpm build` (auto-detected)
6. Output Directory: `.next` (auto-detected)
7. Install Command: `pnpm install` (auto-detected)

#### Environment Variables

Add all required environment variables in Vercel dashboard:
- Settings → Environment Variables
- Add variables for Production, Preview, and Development
- Use Vercel's built-in encryption for sensitive values

#### Domain Configuration

1. Add custom domain: `evervibestudios.com`
2. Configure DNS records (handled by Vercel)
3. Enable automatic HTTPS

### 5. Post-Deployment

#### Verify Health Endpoint

```bash
curl https://evervibestudios.com/api/health
# Expected: {"status":"ok","timestamp":"...","service":"evs-main-site"}
```

#### Test CMS Integration

1. Verify blog posts load: `/blog`
2. Check template details: `/templates/[slug]`
3. Confirm team page: `/team`

#### Test Preview Mode

```bash
# From Strapi, trigger preview with:
https://evervibestudios.com/api/preview?secret=<preview-secret>&slug=<slug>&type=post
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

**File:** `.github/workflows/ci.yml`

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

**Steps:**
1. Checkout code
2. Setup pnpm and Node.js 20
3. Install dependencies
4. Run ESLint
5. Run TypeScript type check
6. Build application

### Automatic Deployment

- **Production:** Pushes to `main` branch → `evervibestudios.com`
- **Preview:** Pull requests → Unique preview URLs
- **Development:** Pushes to `develop` → Preview deployment

---

## 🔗 CMS Integration

### Strapi Configuration

**Base URL:** `https://cms.evervibestudios.com`

### Content Types

1. **Posts** (`/api/posts`)
   - Blog articles with SEO metadata
   - Author, cover image, excerpt

2. **Products** (`/api/products`)
   - Template showcase with pricing
   - Features, demo URL, GitHub link

3. **Team Members** (`/api/team-members`)
   - Team profiles with avatar
   - Social media links

4. **Settings** (`/api/setting`)
   - Global site configuration
   - Legal content, footer settings

### Webhooks (Optional)

Configure Strapi webhooks to trigger revalidation on content updates:

**Webhook URL:** `https://evervibestudios.com/api/revalidate?secret=<revalidate-secret>`

**Events:**
- `entry.create`
- `entry.update`
- `entry.delete`

---

## 🔒 Security

### Content Security Policy

CSP headers configured in `next.config.ts`:
- Restricts script sources
- Blocks inline scripts (except 'unsafe-inline' for Next.js)
- Allows CMS images from `cms.evervibestudios.com`

### Rate Limiting

Contact form protected with rate limiting:
- **Window:** 5 minutes
- **Max Requests:** 5 per IP
- **Backend:** In-memory (or Upstash Redis)

### HTTPS

- Automatic HTTPS via Vercel
- HSTS headers enabled
- Certificate auto-renewal

---

## 📊 Monitoring

### Health Check

**Endpoint:** `/api/health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "service": "evs-main-site"
}
```

### Error Monitoring

- Client errors: Browser console
- Server errors: Vercel logs
- CMS errors: Fallback to empty arrays

### Analytics

- **Vercel Analytics:** Anonymized usage statistics
- **Consent Manager:** DSGVO-compliant tracking

---

## 🐛 Troubleshooting

### Build Failures

**Issue:** TypeScript errors
```bash
# Run type check locally
pnpm typecheck
```

**Issue:** Lint errors
```bash
# Run lint locally
pnpm lint
```

### CMS Connection Issues

**Issue:** CMS requests failing
- Verify `CMS_BASE_URL` is correct
- Check `CMS_API_TOKEN` is set
- Confirm Strapi is accessible from Vercel

**Issue:** Preview mode not working
- Verify `CMS_PREVIEW_SECRET` matches Strapi configuration
- Check URL format: `/api/preview?secret=<secret>&slug=<slug>&type=<type>`

### Performance Issues

**Issue:** Slow page loads
- Check ISR cache hit rate
- Verify CMS response times
- Review Vercel analytics

---

## 🔄 Revalidation Strategy

### ISR Configuration

- **Revalidation Period:** 300 seconds (5 minutes)
- **Applies To:**
  - `/blog` → Blog listing
  - `/blog/[slug]` → Individual posts
  - `/templates/[slug]` → Template details
  - `/team` → Team members page

### Manual Revalidation

To be implemented in future versions:
- Webhook endpoint: `/api/revalidate`
- On-demand revalidation from Strapi

---

## 📈 Performance

### Target Metrics

- **Lighthouse Score:** 90+
- **TTFB:** < 200ms
- **FCP:** < 1.5s
- **LCP:** < 2.5s
- **CLS:** < 0.1

### Optimization

- Static generation with ISR
- Image optimization via Next.js
- Edge caching via Vercel CDN
- Minimal JavaScript bundle size

---

## 🔖 Version History

- **v1.1.0** – CMS Integration, Preview Mode, Enhanced Security
- **v1.0.0** – Initial Release

---

## 📞 Support

**Issues:** https://github.com/evervibe/evs-main-site/issues  
**Email:** info@evervibestudios.com  

---

© EverVibe Studios – 2025
