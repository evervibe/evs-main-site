"use client";

import { useState, useEffect } from "react";

/**
 * License status types
 */
export type LicenseStatus = "active" | "expired" | "pending" | "none";

/**
 * Template product interface
 */
export interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  language: string;
  type: string;
  imageUrl?: string;
  demoUrl?: string;
  downloads: number;
  licenseStatus: LicenseStatus;
  featured: boolean;
}

/**
 * Filter options
 */
interface FilterOptions {
  category: string;
  priceRange: [number, number];
  language: string;
  type: string;
  sortBy: "price" | "downloads" | "newest";
  sortOrder: "asc" | "desc";
}

/**
 * Template Store Component
 * Displays and filters available templates
 * Integrates with core-api for purchase flow
 */
export default function TemplateStore() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    category: "all",
    priceRange: [0, 1000],
    language: "all",
    type: "all",
    sortBy: "downloads",
    sortOrder: "desc",
  });

  // Fetch templates (would come from core-api in production)
  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);

      // TODO: Fetch from core-api
      // For now, using mock data
      const mockTemplates: Template[] = [
        {
          id: "1",
          title: "Premium Blog Template",
          description: "Modern blog with CMS integration",
          price: 49,
          category: "blog",
          language: "TypeScript",
          type: "NextJS",
          downloads: 245,
          licenseStatus: "none",
          featured: true,
        },
        {
          id: "2",
          title: "E-Commerce Starter",
          description: "Full-featured online store",
          price: 99,
          category: "ecommerce",
          language: "TypeScript",
          type: "NextJS",
          downloads: 189,
          licenseStatus: "none",
          featured: true,
        },
        {
          id: "3",
          title: "Portfolio Template",
          description: "Showcase your work beautifully",
          price: 29,
          category: "portfolio",
          language: "TypeScript",
          type: "NextJS",
          downloads: 312,
          licenseStatus: "none",
          featured: false,
        },
      ];

      setTemplates(mockTemplates);
      setFilteredTemplates(mockTemplates);
      setLoading(false);
    };

    fetchTemplates();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...templates];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== "all") {
      result = result.filter((t) => t.category === filters.category);
    }

    // Language filter
    if (filters.language !== "all") {
      result = result.filter((t) => t.language === filters.language);
    }

    // Type filter
    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }

    // Price range filter
    result = result.filter(
      (t) => t.price >= filters.priceRange[0] && t.price <= filters.priceRange[1]
    );

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case "price":
          comparison = a.price - b.price;
          break;
        case "downloads":
          comparison = a.downloads - b.downloads;
          break;
        case "newest":
          comparison = 0; // Would use createdAt in production
          break;
      }
      return filters.sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredTemplates(result);
  }, [templates, searchQuery, filters]);

  const handlePurchase = async (templateId: string) => {
    // TODO: Integrate with core-api for payment
    // 1. Create payment session with PayPal/Stripe
    // 2. Redirect to payment gateway
    // 3. Handle callback and generate license key
    // 4. Update license status

    console.log("Purchase initiated for template:", templateId);
    alert(
      "Purchase flow requires core-api integration with PayPal/Stripe. Feature stub implemented."
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-background border border-foreground/10 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label htmlFor="search" className="block text-sm mb-1">
              Suchen
            </label>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Template suchen..."
              className="w-full px-4 py-2 border border-foreground/20 rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm mb-1">
              Kategorie
            </label>
            <select
              id="category"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-foreground/20 rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Alle</option>
              <option value="blog">Blog</option>
              <option value="ecommerce">E-Commerce</option>
              <option value="portfolio">Portfolio</option>
              <option value="landing">Landing Page</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sort" className="block text-sm mb-1">
              Sortieren
            </label>
            <select
              id="sort"
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split("-");
                setFilters({
                  ...filters,
                  sortBy: sortBy as FilterOptions["sortBy"],
                  sortOrder: sortOrder as FilterOptions["sortOrder"],
                });
              }}
              className="w-full px-4 py-2 border border-foreground/20 rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="downloads-desc">Beliebteste</option>
              <option value="price-asc">Preis: Niedrig → Hoch</option>
              <option value="price-desc">Preis: Hoch → Niedrig</option>
              <option value="newest-desc">Neueste</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <p className="text-sm text-foreground/70 mb-4">
          {filteredTemplates.length} Template{filteredTemplates.length !== 1 ? "s" : ""}{" "}
          gefunden
        </p>

        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/70">
              Keine Templates gefunden. Versuche andere Filterkriterien.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-background border border-foreground/10 rounded-lg overflow-hidden hover:border-primary transition-colors"
              >
                {/* Template Image */}
                <div className="aspect-video bg-foreground/5 flex items-center justify-center">
                  {template.imageUrl ? (
                    <img
                      src={template.imageUrl}
                      alt={template.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl">📄</span>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-4">
                  {template.featured && (
                    <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded mb-2">
                      ⭐ Featured
                    </span>
                  )}
                  <h3 className="font-semibold mb-2">{template.title}</h3>
                  <p className="text-sm text-foreground/70 mb-4">
                    {template.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold">
                      €{template.price}
                    </span>
                    <span className="text-sm text-foreground/70">
                      {template.downloads} Downloads
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {template.demoUrl && (
                      <a
                        href={template.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 text-sm text-center border border-foreground/20 rounded hover:bg-foreground/5 transition-colors"
                      >
                        Demo
                      </a>
                    )}
                    <button
                      onClick={() => handlePurchase(template.id)}
                      className="flex-1 px-4 py-2 text-sm bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
                    >
                      Kaufen
                    </button>
                  </div>

                  {/* License Status */}
                  {template.licenseStatus !== "none" && (
                    <div className="mt-3 pt-3 border-t border-foreground/10">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          template.licenseStatus === "active"
                            ? "bg-green-500/10 text-green-500"
                            : template.licenseStatus === "expired"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        License: {template.licenseStatus}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
