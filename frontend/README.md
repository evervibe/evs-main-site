# 🌐 EverVibe Studios – Main Site Frontend

**Version:** v1.6.5  
**Framework:** Next.js 15 (App Router) + TypeScript + TailwindCSS  
**Deployment:** Vercel  
**CMS:** Strapi  
**Status:** Production Ready

---

## 🏗️ Overview

Dies ist das Frontend der Hauptwebseite von **EverVibe Studios**, die als zentrales Brand-Hub und Schaufenster für alle EVS-Produkte dient.  
Sie enthält Marketing-Pages, Template-Katalog, Kontaktformular, SEO-Struktur und DSGVO-konforme Rechtsseiten.

**Neu in v1.6.5:**
- 🚀 **Vercel Build Pipeline** – Added rootDirectory configuration for proper workspace detection
- 📦 **Dependency Optimization** – Moved build-critical packages to production dependencies
- ✅ **Deployment Reliability** – Updated installCommand for Vercel compatibility
- 🔧 **Build Stabilization** – Ensured all build tools available in production environment

---

## 🧠 Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (Animationen)
- **Lucide Icons**
- **Strapi CMS** (Headless CMS)
- **Zod** (Schema-Validierung & Env Validation)
- **Nodemailer** (SMTP via OVH)
- **Vercel Analytics**
- Optional: **Upstash Redis** (Rate Limiting)

---

## 📦 Struktur

```
frontend/
├─ app/
│  ├─ blog/             # Blog (CMS-driven)
│  │  ├─ page.tsx       # Blog Listing
│  │  └─ [slug]/        # Blog Post Detail
│  ├─ templates/        # Templates
│  │  ├─ page.tsx       # Templates Listing
│  │  └─ [slug]/        # Template Detail (CMS-driven)
│  ├─ team/             # Team Page (CMS-driven)
│  ├─ api/              # API Routes
│  │  ├─ contact/       # Contact Form Handler
│  │  ├─ health/        # Health Check
│  │  ├─ preview/       # Preview Mode Activation
│  │  └─ disable-preview/ # Preview Mode Deactivation
│  ├─ kontakt/          # Contact Page
│  ├─ ueber-uns/        # About Us
│  ├─ recht/            # Legal Pages (Impressum, Datenschutz, Cookies)
│  ├─ robots.ts         # Dynamic robots.txt
│  ├─ sitemap.ts        # Dynamic sitemap
│  ├─ layout.tsx        # Root Layout mit SEO
│  └─ globals.css       # Global Styles
├─ components/
│  ├─ PreviewBanner.tsx # Preview Mode Banner
│  ├─ ConsentManager.tsx # Cookie Consent Manager
│  ├─ Navbar.tsx        # Navigation
│  ├─ Footer.tsx        # Footer
│  └─ ...               # Other Components
├─ lib/
│  ├─ cms.ts            # CMS Integration (Strapi)
│  ├─ env.ts            # Environment Validation (Zod)
│  ├─ seo.ts            # SEO Utilities
│  ├─ mailer.ts         # Email Handler
│  ├─ rateLimit.ts      # Rate Limiting
│  └─ schema.ts         # Form Schemas
├─ config/              # Site & Templates Configuration
├─ types/               # TypeScript Types
├─ public/              # Static Assets
├─ .env.example         # Environment Variables Template
├─ package.json
├─ CHANGELOG.md
└─ README.md
```

---

## ⚙️ Development

### Installation

```bash
pnpm install
```

### Development Server

```bash
pnpm dev
```

Server läuft dann standardmäßig unter:  
👉 **http://localhost:3000**

### Build

```bash
pnpm build
```

### Linting & Type Checking

```bash
pnpm lint
pnpm typecheck
```

---

## 🔐 Environment Variables

Kopiere `.env.example` zu `.env.local` und fülle die Werte aus:

```bash
cp .env.example .env.local
```

**Erforderliche Variablen:**
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` – für E-Mail Versand
- `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_SITE_URL` – für Branding
- `RATE_LIMIT_WINDOW`, `RATE_LIMIT_MAX` – für Rate Limiting
- `CMS_BASE_URL` – Strapi CMS Base URL
- `CMS_API_TOKEN` – Strapi API Token für authentifizierte Requests
- `CMS_PREVIEW_SECRET` – Secret für Preview Mode

**Optional:**
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` – für Redis-basiertes Rate Limiting
- `CORE_HEALTH_URL` – URL für Core Health Monitoring
- `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET` – für PayPal Integration
- `LICENSE_SALT` – Salt für Lizenzschlüssel-Generierung

---

## 🚀 Deployment (Vercel)

1. Repo auf GitHub pushen (`evervibe/evs-main-site`)
2. Mit Vercel verbinden
3. `.env` Werte aus `.env.example` in Vercel setzen
4. Build Command: automatisch (`next build`)
5. Domain: **evervibestudios.com** → auf dieses Projekt mappen

---

## 📄 Features

### Marketing Pages
- **Home**: Hero, Features, CTA
- **Templates**: Katalog mit Template-Cards (statisch + CMS)
- **Über uns**: Mission, Team, Tech Stack
- **Kontakt**: Formular mit Validierung und Spam-Schutz

### CMS-Driven Content (v1.1.0+)
- **Blog**: `/blog` – Listing aller Blog-Posts
- **Blog Posts**: `/blog/[slug]` – Einzelne Blog-Artikel
- **Template Details**: `/templates/[slug]` – Detailseiten für Templates
- **Team**: `/team` – Team-Mitglieder aus CMS

### API Routes
- **POST /api/contact**: Kontaktformular → SMTP E-Mail
- **GET /api/health**: Health Check
- **GET /api/preview**: Preview Mode aktivieren (mit Token)
- **POST /api/disable-preview**: Preview Mode deaktivieren
- **GET /robots.txt**: Dynamic Robots
- **GET /sitemap.xml**: Dynamic Sitemap

### Preview Mode (v1.1.0+)
- Draft-Content-Vorschau für Content-Autoren
- Token-basierte Authentifizierung
- Visual Preview Banner mit Exit-Button
- Integration mit Strapi CMS

### SEO & Analytics
- Open Graph & Twitter Cards (dynamisch aus CMS)
- JSON-LD für Organization
- Canonical URLs (aus CMS)
- Per-Page SEO Customization
- Vercel Analytics (anonymisiert)

### Security (v1.1.0+)
- CSP (Content Security Policy) Headers
- X-Frame-Options, X-Content-Type-Options
- Referrer-Policy, Permissions-Policy
- Environment Validation mit Zod
- Rate Limiting auf Contact Form

### DSGVO
- Impressum
- Datenschutzerklärung
- Cookie-Richtlinie
- Consent Manager (Stub)

---

## 📈 Roadmap

| Version | Fokus                                |
|---------|--------------------------------------|
| 1.0.0   | Launch & Grundstruktur               |
| 1.1.0   | CMS Blog-Integration                 |
| 1.2.0   | SEO, Analytics, Mehrsprachigkeit     |

---

## 📝 License

© EverVibe Studios – 2025. Alle Rechte vorbehalten.

---

## 🤝 Contributing

Dieses Projekt ist intern. Für Fragen oder Änderungsvorschläge kontaktiere das Development Team.

---

**Made with ❤️ by EverVibe Studios**
