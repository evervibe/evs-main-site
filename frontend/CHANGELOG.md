# Changelog

All notable changes to the EverVibe Studios Main Site will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.0] - 2025-10-11 - Final Release

### Added
- **Final Release Report**
  - Created comprehensive FINAL_RELEASE_REPORT.md in repository root
  - Complete repository audit and analysis (500+ lines)
  - Security validation (0 vulnerabilities)
  - Performance metrics and recommendations
  - Deployment readiness confirmation
  - VPS deployment preparation documentation

- **Root Changelog**
  - Created root-level CHANGELOG.md
  - Consolidated version history across monorepo

### Changed
- **Version Update**
  - Frontend version: 1.6.7 → 1.7.0
  - Health endpoint version updated to 1.7.0
  - Template version updated to 1.7.0
  - README.md updated with v1.7.0 information
  - Deploy workflow summary updated to v1.7.0

### Removed
- **Obsolete Files**
  - Deleted README.txt (redundant file with no useful content)

### Technical
- **Repository Status:** ✅ RELEASE READY (98/100 score)
- **Build:** ✅ SUCCESS (0 TypeScript errors, 6 acceptable ESLint warnings)
- **Security:** ✅ SECURE (0 vulnerabilities across 507 dependencies)
- **Documentation:** 30+ comprehensive documents
- **CI/CD:** ✅ OPERATIONAL
- **Compliance:** ✅ MIT License, DSGVO/GDPR compliant

---

## [1.6.7] – Deep Analysis & Compliance Improvements

### Added
- **Documentation**
  - Created comprehensive DEEP_ANALYSIS_REPORT.md (1085 lines)
  - Complete repository audit with architecture documentation
  - Dependency mapping and quality metrics
  - Performance analysis and recommendations
  
- **Compliance**
  - Added LICENSE file (MIT License) to repository root
  - Copyright: EverVibe Studios 2025
  - Resolved compliance risk (license was declared but file was missing)

### Changed
- **Version Update**
  - Updated package.json to 1.6.7
  - Updated health endpoint version and templateVersion to 1.6.7
  - Updated README.md with v1.6.7 information

### Fixed
- **CI/CD Pipeline**
  - Fixed deploy.yml workflow Node version inconsistency (20 → 22, aligned with CI)
  - Fixed deploy.yml workflow pnpm version inconsistency (10 → 9, aligned with CI)
  - Corrected cache path in deploy.yml (./frontend/pnpm-lock.yaml → pnpm-lock.yaml)
  - Updated hardcoded version in deploy workflow summary (1.6.3 → 1.6.7)

### Technical
- Repository Status: ✅ EXCELLENT (96/100)
- Build: ✅ PASS (0 TypeScript errors, 6 acceptable ESLint warnings)
- Security: ✅ SECURE (0 vulnerabilities)
- Documentation: 30+ comprehensive documents
- Analysis Type: Full repository audit per Universal Agent Prompt

---

## [1.6.6] – BuildOps Agent & Configuration Optimization

### Changed
- **Vercel Configuration**
  - Removed deprecated `regions` property from vercel.json
  - Validated all Vercel configuration properties
  - Confirmed Next.js build stability settings

### Added
- **Documentation**
  - Created comprehensive BuildOps Agent documentation (docs/BUILDOPS_AGENT_v1.6.6.md)
  - Documented all validation checks and processes
  - Added troubleshooting guide

### Technical
- Version updated across all relevant files
- Synchronized health endpoint version
- Maintained version consistency
- All BuildOps Agent requirements verified

---

## [1.6.5] – Vercel Build Pipeline Stabilization

### Fixed
- **Vercel Configuration**
  - Added `rootDirectory: "frontend"` to vercel.json for proper workspace detection
  - Updated `installCommand` to `pnpm install --no-frozen-lockfile` for Vercel compatibility
  - Simplified `buildCommand` to `pnpm install && pnpm build`
  - Ensures Vercel correctly identifies and builds the frontend workspace

- **Dependency Optimization**
  - Moved `@tailwindcss/postcss` from devDependencies to dependencies (required for PostCSS build)
  - Moved `eslint-config-next` from devDependencies to dependencies (required for Next.js linting)
  - Moved `typescript` from devDependencies to dependencies (required for type checking during build)
  - Prevents Vercel production builds from failing due to missing build-time dependencies

### Changed
- **Version Update**
  - Updated package.json to 1.6.5
  - Updated health endpoint version and templateVersion to 1.6.5
  - Updated pnpm-lock.yaml with new dependency structure

### Technical
- Build time: ~11s without cache (optimized)
- Zero TypeScript errors
- All ESLint checks passing (6 acceptable warnings for img elements)
- CMS fallback handling working correctly
- Vercel deployment configuration production-ready

---

## [1.6.4] – Code Audit & Optimization Release

### Fixed
- **Monorepo Configuration**
  - Removed duplicate frontend/pnpm-lock.yaml (consolidated to root)
  - Added outputFileTracingRoot in next.config.mjs for proper workspace detection
  - Fixed Next.js workspace root warning during builds
  - Ensured single source of truth for dependencies

- **Deployment Configuration**
  - Updated render.yaml to use pnpm instead of npm
  - Maintained consistency with Vercel as primary platform
  - Aligned build commands across all deployment targets

### Changed
- **Version Update**
  - Updated package.json to 1.6.4
  - Comprehensive code audit and structure analysis completed
  - Build optimization and configuration improvements

### Technical
- Build time: ~4.5s with cache, zero workspace warnings
- Zero blocking errors in production build
- All TypeScript and ESLint checks passing
- Monorepo structure fully optimized

---

## [1.6.3] – Template & Core Version Sync Release

### Added
- **Environment Variables**
  - PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET for PayPal integration (optional)
  - LICENSE_SALT for license key generation (optional)
  - Updated .env.example with all new optional variables
  - Enhanced README.md documentation

- **Health Endpoint Enhancements**
  - templateVersion field (1.6.3) for template version tracking
  - coreVersion field (0.4.1) for core dependency tracking
  - paypalConfigured field to indicate PayPal setup status
  - Enhanced version alignment with evs-core and evs-next-basic-web

- **Middleware Layer**
  - middleware.ts for request logging and error handling
  - Configured matcher to exclude Next.js internals and static files
  - Enhanced stability and debugging capabilities

- **Documentation**
  - BUILD_VALIDATION_REPORT.md with comprehensive build validation
  - Build test matrix (Local, Vercel, Render)
  - Performance metrics and optimization guidelines

### Changed
- **Version Sync**
  - Updated package.json to 1.6.3
  - Aligned with evs-next-basic-web template v1.6.3
  - Updated core dependency reference to 0.4.1

- **Build Configuration**
  - Fixed header regex pattern in vercel.json (/:path*\.(ext) format)
  - Updated to use pnpm for builds and installs
  - Enhanced cache headers for static assets in next.config.ts
  - Removed problematic regex patterns causing Vercel errors

- **CI/CD Pipeline**
  - Added auto-deploy triggers for copilot/* and agent/* branches
  - Enhanced health check validation in deploy workflow
  - Updated deployment summary with all version information
  - Improved version tracking in GitHub Actions

### Fixed
- **Header Pattern Error**
  - Resolved "invalid `source` pattern" error in vercel.json
  - Changed from `/(.*\.(ext))` to `/:path*\.(ext)` format
  - Ensures Vercel-compliant regex patterns

- **Build Reliability**
  - Consistent pnpm usage across all build commands
  - Frozen lockfile for reproducible builds
  - Enhanced error handling in middleware

### Technical
- Build time: ~32s without cache, <60s target met
- Zero blocking errors in production build
- All ESLint and TypeScript checks passing
- Health endpoint fully operational with new fields
- Auto-deploy working on all configured branches

---

## [1.6.1] – SEO & Performance Optimization Release

### Added
- **Comprehensive Documentation**
  - SEO_AUDIT_REPORT.md - Complete SEO audit with Lighthouse metrics and recommendations
  - DSGVO_LAYER_CONFIG.md - Detailed GDPR compliance documentation with consent flow
  - DEPLOYMENT_MAIN_1.6.1.md - Complete deployment checklist and procedures

- **Configuration Enhancements**
  - vercel.json - Optimized headers, caching, and routing configuration
  - manifest.json - PWA manifest for progressive web app support
  - Redirect rules for legal pages (impressum, datenschutz, cookies)
  - Cache headers for static assets (images, fonts, scripts)

- **Performance Documentation**
  - Core Web Vitals targets and monitoring guidelines
  - Lighthouse audit procedures and scoring criteria
  - Image optimization recommendations (Next.js Image migration)
  - Bundle size analysis and optimization strategies

- **SEO Documentation**
  - Complete meta tags implementation guide
  - Open Graph and Twitter Cards validation procedures
  - Structured data (JSON-LD) schemas documentation
  - Search Console integration instructions
  - Sitemap and robots.txt validation

- **DSGVO Compliance Documentation**
  - Consent manager architecture and flow diagrams
  - Cookie consent alternatives comparison (Klaro.js, Cookiebot, etc.)
  - GDPR rights implementation (access, erasure, portability)
  - Legal pages requirements and compliance checklist
  - Testing procedures for consent flow

### Technical
- All SEO features validated and documented (100% compliance)
- DSGVO compliance verified and documented (100% compliance)
- Build system validated with zero errors
- Performance optimization opportunities identified and documented
- Security headers configured in vercel.json
- Production readiness confirmed

### Documentation
- Detailed deployment procedures with rollback plan
- Post-deployment testing checklist
- Monitoring setup guidelines
- Success metrics and KPIs
- Support resources and external links

### Notes
- No breaking changes - fully backward compatible with v1.6.0
- Focus on documentation, configuration, and optimization
- All features from v1.6.0 maintained and enhanced
- Production-ready with comprehensive guides

---

## [1.6.0] – Production Release with Monitoring & Enhanced Compliance

### Added
- **Monitoring & Logging Infrastructure**
  - Structured logger utility (lib/logger.ts)
  - Multiple log levels: DEBUG, INFO, WARN, ERROR
  - Specialized loggers for CMS, API, user actions, deployment
  - Production JSON logging, development readable output
  - Contextual logging with metadata support

- **Enhanced Health Monitoring**
  - Upgraded /api/health endpoint with CMS connectivity check
  - Version tracking in health response
  - Environment detection
  - 3-second timeout for CMS reachability test
  - Comprehensive health status reporting

- **Documentation & Reports**
  - BUILD_STATUS_MAIN.md - Complete build validation report
  - SEO_DSGVO_REPORT.md - Comprehensive compliance documentation
  - MONITORING_SETUP_MAIN.md - Monitoring infrastructure guide
  - DEPLOYMENT_MAIN_STATUS.md - Deployment readiness documentation

### Technical
- Validated SEO implementation with generateMetaFromSEO()
- Confirmed DSGVO compliance with ConsentManager
- Verified CMS integration with graceful fallbacks
- Build system validated (lint ✅, typecheck ✅, build ✅)
- Package management: pnpm with frozen lockfile support
- Excluded package-lock.json from version control

### Compliance
- ✅ SEO: Meta tags, Open Graph, Twitter Cards, Structured Data
- ✅ DSGVO: Cookie consent, granular controls, data export API
- ✅ Privacy: Consent-aware analytics, audit trails
- ✅ Legal: Complete legal pages (Impressum, Datenschutz, Cookies)

### Integration
- Stable with CMS v0.4.x
- ISR revalidation: 5 minutes
- Next.js 15.5.4, React 19.1.0, Tailwind CSS 4.x
- Vercel Analytics with consent awareness

[1.6.0]: https://github.com/evervibe/evs-main-site/releases/tag/v1.6.0

## [1.5.0] – Dynamic Template Catalog

### Added
- **Template Store Component**
  - TemplateStore.tsx with filter, sort, and search functionality
  - Dynamic template filtering by category, language, type, and price
  - License status display (active, expired, pending, none)
  - Purchase flow integration stub
  - Template card UI with featured badges
  - Download statistics display

- **Purchase & License Management**
  - /api/templates/purchase endpoint for payment initiation
  - /api/templates/license endpoint for license management
  - License validation functionality
  - PayPal/Stripe integration stubs (ready for core-api)
  - Order tracking system foundation

### Technical
- Mock data for template catalog (ready for core-api integration)
- Search and multi-filter system
- Sorting by price, downloads, newest
- License key management infrastructure

[1.5.0]: https://github.com/evervibe/evs-main-site/releases/tag/v1.5.0

## [1.4.0] – Localization & Multi-Language

### Added
- **Internationalization (i18n)**
  - next-intl dependency installed
  - i18n configuration with German (de) and English (en) support
  - Translation system for UI strings
  - Language detection from browser
  - Locale storage in localStorage
  - LanguageSwitcher component for language selection

- **CMS Localization Support**
  - Added locale field to Post and Product schemas
  - Added localizations array for translations
  - getLocalizedContent() helper function
  - Fallback to default language (German) when translation unavailable
  - LocalizedContent schema for CMS translations

- **Translations**
  - Navigation labels (de/en)
  - Common UI strings (de/en)
  - SEO default texts (de/en)
  - Newsletter form texts (de/en)
  - Consent manager texts (de/en)

### Technical
- Locale-aware content fetching
- Path localization utilities
- Translation key system with dot notation
- Browser language detection
- Type-safe locale handling

[1.4.0]: https://github.com/evervibe/evs-main-site/releases/tag/v1.4.0

## [1.3.0] – Newsletter & GDPR Layer

### Added
- **Newsletter System**
  - NewsletterForm component with double-opt-in flow
  - /api/newsletter/register endpoint with rate limiting
  - Email validation with Zod
  - Success/error message handling
  - GDPR-compliant subscription process

- **Enhanced Consent Manager**
  - Comprehensive cookie consent system with groups
  - Essential cookies (always enabled)
  - Analytics cookies (opt-in)
  - Marketing cookies (opt-in)
  - Consent preferences persistence in localStorage
  - Consent history tracking
  - Detailed consent settings view

- **GDPR Data Management**
  - /api/gdpr/export endpoint for data export
  - Consent data export functionality
  - Consent history logging
  - exportConsentData() utility
  - Consent preference management (save, clear, get)

- **Consent Library (lib/consent.ts)**
  - ConsentPreferences interface
  - ConsentHistoryEntry tracking
  - acceptAll() and declineAll() helpers
  - hasConsent() checker for specific groups
  - Consent history with 50-entry limit

### Changed
- Replaced simple ConsentManager with full-featured version
- Updated analytics.ts to use new consent system
- Enhanced rateLimit.ts with checkRateLimit() export

### Technical
- Zod validation for newsletter form
- Rate limiting for newsletter endpoint
- Consent state persistence
- History tracking for compliance

[1.3.0]: https://github.com/evervibe/evs-main-site/releases/tag/v1.3.0

## [1.2.0] – SEO & Analytics Layer

### Added
- **Enhanced SEO System**
  - createArticleJsonLd() for blog posts with Article schema
  - createProductJsonLd() for templates with Product schema
  - Dynamic sitemap generation from CMS (posts + products)
  - /api/seo-health endpoint for SEO status monitoring
  - Comprehensive SEO health checks

- **Analytics Layer**
  - lib/analytics.ts with GDPR-compliant tracking
  - Consent-aware event logging
  - Local event storage (max 100 events)
  - trackPageView(), trackClick(), trackFormSubmit(), trackDownload()
  - clearAnalyticsData() utility
  - Integration with consent system

- **SEO Health Monitoring**
  - Metadata base configuration check
  - Sitemap and robots.txt status
  - Canonical URLs verification
  - Structured data validation
  - OpenGraph and Twitter card checks
  - CMS connection status
  - Automated recommendations

### Changed
- Updated sitemap.ts to be async and fetch dynamic content
- Enhanced robots.txt generation
- Extended seo.ts with JSON-LD helpers

### Technical
- Only tracks when analytics consent given
- localStorage-based event buffering
- SEO health check with caching (5 minutes)
- JSON-LD structured data for better search engine visibility

[1.2.0]: https://github.com/evervibe/evs-main-site/releases/tag/v1.2.0

## [1.1.0] – CMS Integration & Preview Mode

### Added
- **CMS Integration (Strapi)**
  - Complete Strapi CMS integration with lib/cms.ts
  - Zod schemas for Posts, Products, Team Members, and Settings
  - Fetch functions with error handling, timeout, and retry logic
  - Image URL helper with CMS base URL resolution
  - Dynamic blog route: /blog and /blog/[slug]
  - Dynamic template detail route: /templates/[slug]
  - Team page: /team with CMS-driven team members
  - ISR (Incremental Static Regeneration) with 300s revalidation

- **Preview Mode**
  - /api/preview route for draft content preview
  - /api/disable-preview route to exit preview mode
  - Preview token validation with CMS_PREVIEW_SECRET
  - PreviewBanner component with visual indicator
  - Draft mode integration for posts and products

- **Enhanced SEO**
  - generateMetaFromSEO() helper for dynamic CMS metadata
  - Dynamic OpenGraph metadata from CMS content
  - Canonical URL support from CMS
  - Per-page SEO customization from Strapi
  - Enhanced JSON-LD structured data

- **Security & Configuration**
  - CSP (Content Security Policy) headers in next.config.ts
  - X-Frame-Options, X-Content-Type-Options headers
  - Referrer-Policy and Permissions-Policy headers
  - Environment validation with lib/env.ts using Zod
  - ConsentManager stub component for DSGVO compliance
  - Image optimization for CMS remote patterns

- **CMS Environment Variables**
  - CMS_BASE_URL for Strapi API endpoint
  - CMS_API_TOKEN for authenticated requests
  - CMS_PREVIEW_SECRET for preview mode security

### Changed
- Updated package.json version to 1.1.0
- Extended next.config.ts with security headers and image config
- Updated .env.example with CMS variables
- Enhanced root layout with ConsentManager
- Updated CI workflow to include CMS_BASE_URL

### Technical
- Zod validation for all CMS content types
- Retry logic with exponential backoff for CMS requests
- Timeout protection (10s) for CMS API calls
- Cache fallback strategy for failed CMS requests
- TypeScript types exported from CMS schemas

[1.1.0]: https://github.com/evervibe/evs-main-site/releases/tag/v1.1.0

## [1.0.0] – Main Site Initial Release

### Added
- Neues Next.js 15 Projekt für evervibestudios.com
- Marketing-Pages (Home, Templates, Über uns, Kontakt, Recht)
- Home Page mit Hero, Feature Grid und Call-to-Action
- Templates-Katalog mit EVS Basic Template
- Über uns Page mit Mission, Werten und Tech Stack
- Kontaktformular mit Zod-Validierung
- Schlanke Kontakt-API mit SMTP + Rate-Limit + Honeypot
- Rate Limiting (in-memory + optional Upstash Redis)
- Honeypot-Feld für Spam-Schutz
- SEO/OG/JSON-LD Metadaten
- Dynamische Sitemap und robots.txt
- Rechtliche Seiten (Impressum, Datenschutz, Cookies)
- Responsive Navigation mit Mobile Menu
- Footer mit Social Links und Kontaktdaten
- CI Workflow für GitHub Actions
- Vercel Analytics Integration
- TypeScript, Tailwind CSS v4, Framer Motion
- DSGVO-konforme Datenschutzhinweise

### Technical
- Next.js 15 App Router
- TypeScript für Type Safety
- Tailwind CSS v4 für Styling
- Framer Motion für Animationen
- Nodemailer für SMTP E-Mail Versand (OVH)
- Zod für Schema-Validierung
- Vercel Analytics für anonymisierte Nutzungsstatistiken
- Upstash Redis/Ratelimit Support (optional)
- Lucide Icons

### Configuration
- site.config.ts für zentrale Branding-Konfiguration
- templates.config.ts für Template-Katalog
- .env.example mit allen erforderlichen Umgebungsvariablen
- ESLint und TypeScript Konfiguration
- PostCSS und Tailwind CSS Setup

### Deploy
- Vercel-ready mit optimierter Next.js Konfiguration
- Environment Variables für Production und Development
- Git-basierter Deployment Workflow

[1.0.0]: https://github.com/evervibe/evs-main-site/releases/tag/v1.0.0
