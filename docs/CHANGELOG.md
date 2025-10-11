# Changelog

All notable changes to the EverVibe Studios Main Site will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.2] - 2025-01-08

### 🎯 Sync & Stabilization Release

This release focuses on synchronizing the main site with the updated Core system (v0.4.1), stabilizing CMS preview functionality, enhancing SEO metadata generation, and improving health monitoring.

### Added

- **CMS Preview Enhancements**
  - Enhanced error handling in `/api/preview` route with structured logging
  - Added graceful 404 fallback for invalid preview tokens
  - Improved `/api/disable-preview` route with GET method support
  - Added detailed logging for all preview mode operations

- **SEO & Metadata**
  - Created `lib/seo/syncMeta.ts` - centralized SEO metadata helper
  - Added `syncMeta()` function for unified metadata generation from CMS
  - Added `generateMetaFromSEO()` wrapper for common use cases
  - Added `validateSeoMetadata()` and `isSeoComplete()` helpers
  - Enhanced fallback behavior for missing SEO data

- **Health Monitoring**
  - Added optional Core health endpoint integration to `/api/health`
  - Implemented 15-second response cache for Core health checks
  - Added `CORE_HEALTH_URL` environment variable support
  - Enhanced health response with Core connectivity status

- **CI/CD & Deployment**
  - Created `.github/workflows/deploy.yml` deployment workflow
  - Added automated health check verification post-deployment
  - Added Core connectivity validation in deployment pipeline
  - Enhanced build process with environment validation

- **Environment Configuration**
  - Added `CORE_HEALTH_URL` to `.env.example`
  - Updated Zod schema validation to include `CORE_HEALTH_URL`
  - Documented all environment variables with descriptions

### Changed

- Updated version from 1.6.1 → 1.6.2 in `package.json`
- Updated health endpoint version to 1.6.2
- Enhanced preview route responses with JSON format
- Improved error messages for preview authentication failures

### Fixed

- Fixed preview mode error handling to prevent unhandled exceptions
- Fixed health check to properly handle Core endpoint timeout
- Ensured graceful degradation when Core health endpoint unavailable

### Documentation

- Created comprehensive CHANGELOG.md with version history
- Added CMS_SYNC_REPORT.md analyzing CMS connection status
- Added SEO_REVALIDATION_LOG.md documenting SEO integrity
- Added RENDER_DEPLOY_CHECKLIST.md for deployment procedures
- Updated .env.example with new configuration options

---

## [1.6.1] - 2025-01-07

### Added

- Enhanced CMS integration stability
- Improved error handling for CMS fetch operations
- Additional monitoring and logging capabilities

### Changed

- Updated dependencies to latest stable versions
- Refined health check endpoints

### Fixed

- CMS timeout handling improvements
- Preview mode edge case fixes

---

## [1.6.0] - 2025-01-06

### 🚀 Major Release

### Added

- **Structured Logging System**
  - Implemented `lib/logger.ts` with leveled logging (DEBUG, INFO, WARN, ERROR)
  - JSON-structured logs in production
  - Readable console output in development
  - Context-aware logging with service identification

- **Enhanced Health Monitoring**
  - Comprehensive `/api/health` endpoint
  - CMS connectivity checks with 3-second timeout
  - Service status, version, and environment reporting
  - Non-blocking health checks

- **SEO Health Endpoint**
  - Added `/api/seo-health` for SEO validation
  - Checks for meta tags, OG tags, sitemap, robots.txt
  - Returns comprehensive SEO status

- **Documentation**
  - DEPLOYMENT_MAIN_STATUS.md - deployment status and checklist
  - BUILD_STATUS_MAIN.md - build validation report
  - SEO_DSGVO_REPORT.md - SEO and GDPR compliance report
  - MONITORING_SETUP_MAIN.md - monitoring configuration guide

### Changed

- Updated Vercel Analytics integration
- Enhanced DSGVO consent layer
- Improved CMS error handling with retry logic

### Fixed

- Build warnings and linting issues
- CMS connection timeout handling
- Environment variable validation

---

## [1.5.0] - 2025-01-05

### 🎯 CMS Integration Release

### Added

- **Strapi CMS Integration**
  - Complete Strapi v5 integration via `lib/cms.ts`
  - Content types: Posts, Products, Team Members, Settings
  - Zod schema validation for all CMS data
  - Retry logic with exponential backoff (3 attempts)
  - 10-second timeout per request

- **Preview Mode**
  - `/api/preview` route for draft content preview
  - `/api/disable-preview` route to exit preview mode
  - Token-based authentication with `CMS_PREVIEW_SECRET`
  - Preview banner component

- **Dynamic Routes**
  - `/blog` - Blog listing page
  - `/blog/[slug]` - Individual blog posts
  - `/templates` - Template listing page
  - `/templates/[slug]` - Individual template details
  - `/team` - Team members page

- **ISR (Incremental Static Regeneration)**
  - 5-minute revalidation for blog and product pages
  - Build-time static generation for all CMS content
  - Fallback handling for unavailable content

- **SEO & Analytics**
  - Dynamic metadata generation from CMS
  - OpenGraph and Twitter Card support
  - JSON-LD structured data for articles and products
  - Canonical URLs from CMS SEO configuration
  - Consent-aware Vercel Analytics integration

- **Security**
  - Content Security Policy (CSP) headers in `next.config.ts`
  - Environment variable validation with Zod schema
  - Rate limiting on `/contact` endpoint (5 requests per 5 minutes)
  - HTTPS enforcement via Vercel

### Changed

- Updated Next.js to 15.5.4
- Updated React to 19.1.0
- Updated Tailwind CSS to 4.x
- Restructured project with frontend directory

### Documentation

- DEPLOYMENT_MAIN.md - comprehensive deployment guide
- CMS_CONNECTION_REPORT.md - CMS integration documentation
- EVS_OVERVIEW.md - system architecture overview
- IMPLEMENTATION_SUMMARY.md - implementation details

---

## [1.1.0] - 2025-01-03

### Added

- Initial project structure with Next.js 15
- Basic routing and page components
- Tailwind CSS configuration
- TypeScript setup
- ESLint and Prettier configuration

### Changed

- Project restructured for scalability
- Updated build configuration

---

## [1.0.0] - 2025-01-01

### Added

- Initial release
- Basic landing page
- Contact form
- Legal pages (Impressum, Datenschutz, Cookies)
- Responsive design
- DSGVO compliance foundation

---

## Release Tags

- `main-site@v1.6.2-sync` - Current Release (Sync & Stabilization)
- `main-site@v1.6.1` - Enhanced CMS Integration
- `main-site@v1.6.0` - Monitoring & Logging
- `main-site@v1.5.0` - CMS Integration
- `main-site@v1.1.0` - Project Restructure
- `main-site@v1.0.0` - Initial Release

---

© EverVibe Studios – 2025
