import { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getPostBySlug, getPosts, generateMetaFromSEO, getImageUrl } from "@/lib/cms";
import Container from "@/components/Container";
import PreviewBanner from "@/components/PreviewBanner";
import { createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate Static Params for all blog posts
 * This enables Static Generation at build time
 */
export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for blog:", error);
    return [];
  }
}

/**
 * Generate Metadata for SEO
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return createMetadata({
      title: "Post Not Found",
    });
  }

  const cmsMeta = generateMetaFromSEO(post.seo);

  return createMetadata({
    title: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    ...cmsMeta,
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
      images: post.coverImage
        ? [
            {
              url: getImageUrl(post.coverImage),
              alt: post.coverImage.alternativeText || post.title,
            },
          ]
        : undefined,
      ...cmsMeta.openGraph,
    },
  });
}

/**
 * Blog Post Page
 */
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const draft = await draftMode();
  const isPreview = draft.isEnabled;

  const post = await getPostBySlug(slug, { preview: isPreview });

  if (!post) {
    notFound();
  }

  return (
    <>
      {isPreview && <PreviewBanner />}
      <Container>
        <article className={`py-16 ${isPreview ? "mt-16" : ""}`}>
          {/* Header */}
          <header className="mb-8">
            {post.coverImage && (
              <div className="mb-6 rounded-xl overflow-hidden">
                <img
                  src={getImageUrl(post.coverImage)}
                  alt={post.coverImage.alternativeText || post.title}
                  className="w-full h-auto"
                />
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            {post.excerpt && (
              <p className="text-xl text-foreground/70 mb-4">{post.excerpt}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-foreground/60">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.avatar && (
                    <img
                      src={getImageUrl(post.author.avatar)}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span>{post.author.name}</span>
                </div>
              )}
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </header>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </Container>
    </>
  );
}

// Enable ISR with revalidation every 300 seconds (5 minutes)
export const revalidate = 300;
