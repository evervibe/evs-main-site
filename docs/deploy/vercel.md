# 🚀 Vercel Deployment Guide – EVS Main Site

**Project:** evervibe/evs-main-site  
**Platform:** Vercel  
**Framework:** Next.js 15  
**Status:** Production Ready

---

## 📋 Overview

This guide covers deploying the EverVibe Studios main site to Vercel with proper configuration for the monorepo structure.

---

## 🏗️ Project Structure

```
.
├── frontend/           # Main Next.js application
│   ├── app/           # App Router
│   ├── package.json   # Frontend dependencies
│   └── ...
├── docs/              # Documentation
├── pnpm-workspace.yaml
└── package.json       # Root workspace config
```

---

## ⚙️ Vercel Configuration

### Project Settings

1. **Framework Preset:** Next.js
2. **Root Directory:** `frontend`
3. **Build Command:** `pnpm build`
4. **Output Directory:** `.next` (default)
5. **Install Command:** `pnpm install`
6. **Node Version:** 22.x

### Environment Variables

Configure in Vercel Dashboard → Project Settings → Environment Variables:

#### Public Variables
```env
NEXT_PUBLIC_SITE_NAME=EverVibe Studios
NEXT_PUBLIC_SITE_URL=https://evervibestudios.com
NEXT_PUBLIC_CONTACT_EMAIL=info@evervibestudios.com
```

#### Private Variables (Secrets)
```env
CMS_BASE_URL=https://cms.evervibestudios.com
CMS_API_TOKEN=<your-strapi-api-token>
CMS_PREVIEW_SECRET=<random-secure-string>

SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@evervibestudios.com
SMTP_PASS=<your-smtp-password>

# Optional: Rate Limiting
UPSTASH_REDIS_REST_URL=<your-upstash-url>
UPSTASH_REDIS_REST_TOKEN=<your-upstash-token>

# Optional: Core Health Monitoring
CORE_HEALTH_URL=https://core.evervibestudios.com/api/health/aggregate

# Optional: PayPal
PAYPAL_CLIENT_ID=<your-paypal-client-id>
PAYPAL_CLIENT_SECRET=<your-paypal-client-secret>

# Optional: License Generation
LICENSE_SALT=<random-secure-string>
```

---

## 🔗 Domain Configuration

### Production Domain
- **Domain:** evervibestudios.com
- **DNS:** Configure A/CNAME records pointing to Vercel
- **SSL:** Automatic via Vercel

### Custom Domain Setup
1. Add domain in Vercel Dashboard
2. Configure DNS records as shown
3. Wait for SSL certificate provisioning (automatic)

---

## 🔄 Deployment Workflow

### Automatic Deployments

- **Production:** Push to `main` branch → evervibestudios.com
- **Preview:** Pull requests → Unique preview URLs
- **Development:** Push to `develop` → Preview deployment

### Manual Deployment

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 🔍 Health Checks

After deployment, verify:

1. **Health Endpoint:** `https://evervibestudios.com/api/health`
   - Should return: `{ status: "ok", cms: {...}, core: {...} }`

2. **Healthz Endpoint:** `https://evervibestudios.com/api/healthz`
   - Should return: `{ ok: true }`

3. **Homepage:** `https://evervibestudios.com`
   - Verify full page load and content

4. **CMS Integration:** Check blog/templates pages
   - Ensure CMS content loads correctly

---

## 🚨 Troubleshooting

### Build Failures

**Issue:** Module not found errors
```bash
# Clear Vercel cache in dashboard or via CLI
vercel env rm VERCEL_FORCE_REVALIDATE
```

**Issue:** TypeScript errors
- Check `frontend/tsconfig.json` configuration
- Run `pnpm typecheck` locally

### Runtime Issues

**Issue:** CMS connection failed
- Verify `CMS_BASE_URL` and `CMS_API_TOKEN` in Vercel env vars
- Check CMS is accessible from Vercel's network

**Issue:** Environment variables not loaded
- Verify variables are set for correct environment (Production/Preview)
- Redeploy after adding new variables

### Performance Issues

**Issue:** Slow page loads
- Check ISR configuration (5min revalidation)
- Verify image optimization is enabled
- Check CMS response times

---

## 📊 Monitoring

### Vercel Analytics
- Enabled via `@vercel/analytics` package
- View in Vercel Dashboard → Analytics

### Custom Monitoring
- Health endpoint: `/api/health`
- Uptime monitoring recommended
- Set up alerts for failed deployments

---

## 🔒 Security

### Headers
Security headers configured in `next.config.mjs`:
- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy

### Environment Variables
- Never commit secrets to repository
- Use Vercel's encrypted environment variables
- Rotate secrets regularly

---

## 📈 Performance

### Optimizations
- ISR with 5-minute revalidation
- Image optimization via Next.js Image component
- Static asset caching (1 year)
- CDN distribution via Vercel Edge Network

### Expected Performance
- Lighthouse Score: 90+
- TTFB: <200ms (Edge locations)
- LCP: <2.5s
- CLS: <0.1

---

## 📞 Support

**Issues:** https://github.com/evervibe/evs-main-site/issues  
**Vercel Docs:** https://vercel.com/docs  
**Email:** info@evervibestudios.com

---

© EverVibe Studios – 2025
