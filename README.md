# 🌐 EverVibe Studios – Main Site

**Version:** v1.7.0  
**Framework:** Next.js 15 (App Router) + TypeScript + TailwindCSS  
**Deployment:** Vercel  
**CMS:** Strapi  
**Package Manager:** pnpm (monorepo/workspace ready)  
**Status:** ✅ Release Ready

---

## 🏗️ Overview

Main website for **EverVibe Studios** - central brand hub and showcase for all EVS products.  
Features marketing pages, template catalog, contact forms, SEO structure, and GDPR-compliant legal pages.

**Latest (v1.7.0):** Final release with comprehensive FINAL_RELEASE_REPORT.md - complete repository audit, security validation (0 vulnerabilities), performance metrics, deployment readiness confirmation, and VPS deployment preparation.

---

## 📦 Repository Structure

```
.
├── frontend/              # Main Next.js application
│   ├── app/              # App Router (routes & API)
│   ├── components/       # React components
│   ├── lib/              # Utilities (CMS, env, mailer)
│   ├── config/           # Site configuration
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   ├── next.config.mjs   # Next.js config
│   ├── tsconfig.json     # TypeScript config
│   ├── tailwind.config.ts # Tailwind config
│   └── .env.example      # Environment variables template
├── docs/                 # Documentation
│   ├── index.md          # Documentation index
│   ├── audits/           # Audit reports
│   └── deploy/           # Deployment guides
├── .github/
│   └── workflows/
│       └── ci.yml        # CI/CD pipeline
├── pnpm-workspace.yaml   # Workspace configuration
├── package.json          # Root workspace governance
└── README.md             # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 22+
- pnpm 9+

### Installation
```bash
# Install pnpm globally (if not already installed)
npm install -g pnpm

# Install dependencies
pnpm install

# Start development server
cd frontend
pnpm dev
```

Server runs at 👉 http://localhost:3000

### Build & Test
```bash
# Lint all workspaces
pnpm -r lint

# Type check all workspaces
pnpm -r typecheck

# Build all workspaces
pnpm -r build
```

---

## 🧠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** TailwindCSS v4
- **Animation:** Framer Motion
- **CMS:** Strapi (headless)
- **Validation:** Zod
- **Email:** Nodemailer (SMTP via OVH)
- **Analytics:** Vercel Analytics
- **Rate Limiting:** Upstash Redis (optional)

---

## 🔄 Workflows

### Development Workflow
1. Create feature branch from `main`
2. Make changes in `frontend/` directory
3. Run lint, typecheck, and build locally
4. Create pull request
5. CI runs automatically (lint, typecheck, build)
6. Preview deployment created automatically
7. Merge to `main` for production deployment

### CI/CD Pipeline
- **Triggers:** Push to `main`, pull requests
- **Steps:** Install → Lint → Typecheck → Build
- **Platform:** GitHub Actions
- **Deployment:** Automatic via Vercel

---

## 🚀 Deployment

### Vercel (Production)
- **URL:** https://evervibestudios.com
- **Branch:** `main` (auto-deploy)
- **Configuration:** See [docs/deploy/vercel.md](./docs/deploy/vercel.md)

### Environment Variables
See `frontend/.env.example` for required variables.  
Configure in Vercel dashboard or via CLI.

---

## 📚 Documentation

- **[Documentation Index](./docs/index.md)** - Complete documentation overview
- **[Deployment Guide](./docs/deploy/vercel.md)** - Vercel deployment instructions
- **[Frontend README](./frontend/README.md)** - Frontend technical details
- **[Frontend Changelog](./frontend/CHANGELOG.md)** - Version history
- **[Audit Report](./docs/audits/md_truth_audit.md)** - Markdown reference audit

---

## 🔍 API Endpoints

- `/api/health` - Detailed health check (CMS, Core)
- `/api/healthz` - Simple health check (returns `{ok: true}`)
- `/api/contact` - Contact form submission
- `/api/preview` - Enable CMS preview mode
- `/api/disable-preview` - Disable CMS preview mode

---

## 📞 Support

**Repository:** https://github.com/evervibe/evs-main-site  
**Issues:** https://github.com/evervibe/evs-main-site/issues  
**Email:** info@evervibestudios.com

---

© EverVibe Studios – 2025
