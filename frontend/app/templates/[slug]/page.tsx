import { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getProductBySlug, getProducts, generateMetaFromSEO, getImageUrl } from "@/lib/cms";
import Container from "@/components/Container";
import PreviewBanner from "@/components/PreviewBanner";
import { createMetadata } from "@/lib/seo";
import { ExternalLink, Github } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate Static Params for all products
 */
export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for templates:", error);
    return [];
  }
}

/**
 * Generate Metadata for SEO
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return createMetadata({
      title: "Template Not Found",
    });
  }

  const cmsMeta = generateMetaFromSEO(product.seo);

  return createMetadata({
    title: product.title,
    description: product.description,
    ...cmsMeta,
    openGraph: {
      type: "website",
      images: product.thumbnail
        ? [
            {
              url: getImageUrl(product.thumbnail),
              alt: product.thumbnail.alternativeText || product.title,
            },
          ]
        : undefined,
      ...cmsMeta.openGraph,
    },
  });
}

/**
 * Template Detail Page
 */
export default async function TemplateDetailPage({ params }: Props) {
  const { slug } = await params;
  const draft = await draftMode();
  const isPreview = draft.isEnabled;

  const product = await getProductBySlug(slug, { preview: isPreview });

  if (!product) {
    notFound();
  }

  return (
    <>
      {isPreview && <PreviewBanner />}
      <Container>
        <div className={`py-16 ${isPreview ? "mt-16" : ""}`}>
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left: Image */}
            <div>
              {product.thumbnail && (
                <div className="rounded-xl overflow-hidden bg-foreground/5">
                  <img
                    src={getImageUrl(product.thumbnail)}
                    alt={product.thumbnail.alternativeText || product.title}
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {product.title}
              </h1>
              <p className="text-xl text-foreground/70 mb-6">
                {product.description}
              </p>

              {product.price && (
                <div className="text-3xl font-bold mb-6">
                  {product.price}€
                </div>
              )}

              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Features</h2>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                {product.demoUrl && (
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
                {product.githubUrl && (
                  <a
                    href={product.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-foreground/10 px-6 py-3 rounded-lg font-semibold hover:bg-foreground/20 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    View on GitHub
                  </a>
                )}
              </div>

              {product.tags && product.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-foreground/5 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          {product.content && (
            <div className="mt-12 border-t border-foreground/10 pt-12">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: product.content }}
              />
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

// Enable ISR with revalidation every 300 seconds (5 minutes)
export const revalidate = 300;
