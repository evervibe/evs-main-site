import { Metadata } from "next";
import Link from "next/link";
import { getPosts, getImageUrl } from "@/lib/cms";
import Container from "@/components/Container";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description: "Neueste Artikel, Tutorials und Updates von EverVibe Studios.",
});

/**
 * Blog Listing Page
 */
export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <Container>
      <div className="py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Neueste Artikel, Tutorials und Updates von EverVibe Studios
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/60">
              Noch keine Beiträge verfügbar. Schau bald wieder vorbei!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block bg-foreground/5 rounded-xl overflow-hidden hover:bg-foreground/10 transition-colors"
              >
                {post.coverImage && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={getImageUrl(post.coverImage)}
                      alt={post.coverImage.alternativeText || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-foreground/70 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-foreground/60">
                    {post.author && <span>{post.author.name}</span>}
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("de-DE", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

// Enable ISR with revalidation every 300 seconds (5 minutes)
export const revalidate = 300;
