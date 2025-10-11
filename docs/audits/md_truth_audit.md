# Markdown Truth Audit Report

**Generated:** Thu Oct  9 20:00:19 UTC 2025
**Repository:** evervibe/evs-main-site

---

## Summary

- Total Markdown files: 24
- Files with internal references: 4

---

## File Analysis

### `./DEPLOYMENT_MAIN_1.6.1.md`

**References found:**
```
  - [x] Homepage (/)
[SEO Audit Report](./SEO_AUDIT_REPORT.md
[DSGVO Configuration](./DSGVO_LAYER_CONFIG.md
[Build Status](./BUILD_STATUS_MAIN.md
[EVS Overview](./EVS_OVERVIEW.md
```

### `./IMPLEMENTATION_SUMMARY_v1.6.1.md`

**References found:**
```
[SEO Audit Report](./SEO_AUDIT_REPORT.md
[DSGVO Configuration](./DSGVO_LAYER_CONFIG.md
[Deployment Guide](./DEPLOYMENT_MAIN_1.6.1.md
[Release Notes](./RELEASE_NOTES_v1.6.1.md
[Changelog](./frontend/CHANGELOG.md
[DEPLOYMENT_MAIN_1.6.1.md](./DEPLOYMENT_MAIN_1.6.1.md
[SEO_AUDIT_REPORT.md](./SEO_AUDIT_REPORT.md
[DSGVO_LAYER_CONFIG.md](./DSGVO_LAYER_CONFIG.md
```

### `./README.md`

**References found:**
```
[DEPLOYMENT_MAIN.md](./DEPLOYMENT_MAIN.md
[CMS_CONNECTION_REPORT.md](./CMS_CONNECTION_REPORT.md
[frontend/CHANGELOG.md](./frontend/CHANGELOG.md
[frontend/README.md](./frontend/README.md
```

### `./RELEASE_NOTES_v1.6.1.md`

**References found:**
```
[DEPLOYMENT_MAIN_1.6.1.md](./DEPLOYMENT_MAIN_1.6.1.md
✓ Homepage (/)
[SEO Audit Report](./SEO_AUDIT_REPORT.md
[DSGVO Configuration](./DSGVO_LAYER_CONFIG.md
[Deployment Guide](./DEPLOYMENT_MAIN_1.6.1.md
[Changelog](./frontend/CHANGELOG.md
[DEPLOYMENT_MAIN_1.6.1.md](./DEPLOYMENT_MAIN_1.6.1.md
[SEO_AUDIT_REPORT.md](./SEO_AUDIT_REPORT.md
[DSGVO_LAYER_CONFIG.md](./DSGVO_LAYER_CONFIG.md
```

### `./docs/audits/md_truth_audit.md`

**References found:**
```
  - [x] Homepage (/)
[SEO Audit Report](./SEO_AUDIT_REPORT.md
[DSGVO Configuration](./DSGVO_LAYER_CONFIG.md
[Build Status](./BUILD_STATUS_MAIN.md
[EVS Overview](./EVS_OVERVIEW.md
[SEO Audit Report](./SEO_AUDIT_REPORT.md
[DSGVO Configuration](./DSGVO_LAYER_CONFIG.md
[Deployment Guide](./DEPLOYMENT_MAIN_1.6.1.md
[Release Notes](./RELEASE_NOTES_v1.6.1.md
[Changelog](./frontend/CHANGELOG.md
[DEPLOYMENT_MAIN_1.6.1.md](./DEPLOYMENT_MAIN_1.6.1.md
[SEO_AUDIT_REPORT.md](./SEO_AUDIT_REPORT.md
[DSGVO_LAYER_CONFIG.md](./DSGVO_LAYER_CONFIG.md
[DEPLOYMENT_MAIN.md](./DEPLOYMENT_MAIN.md
[CMS_CONNECTION_REPORT.md](./CMS_CONNECTION_REPORT.md
[frontend/CHANGELOG.md](./frontend/CHANGELOG.md
[frontend/README.md](./frontend/README.md
[DEPLOYMENT_MAIN_1.6.1.md](./DEPLOYMENT_MAIN_1.6.1.md
✓ Homepage (/)
[SEO Audit Report](./SEO_AUDIT_REPORT.md
```

---

## Recommendations

1. Move all root-level .md files (except README.md and LICENSE*) to docs/
2. Update internal references after moving files
3. Verify all cross-references point to valid locations
4. Consider using absolute paths from repository root for stability

---

**Status:** ✅ Audit Complete
