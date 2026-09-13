import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder';
import { BlogCard } from '@/components/blog/BlogCard';
import { ShareButton } from '@/components/blog/ShareButton';
import { formatDatePtBR, isRealImageUrl } from '@/lib/utils';
import { SITE_URL } from '@/lib/constants';
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/services/blog.service';

// Content is created/edited after deploy via the admin panel, so these pages must always
// be rendered per-request rather than statically prerendered at build time.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    openGraph: { title: post.seoTitle, description: post.seoDescription, type: 'article' },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const related = await getRelatedBlogPosts(post);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: post.author },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen bg-ink-950 pb-24 pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Container className="max-w-3xl">
        <nav className="mb-6 text-sm text-white/40">
          <Link href="/blog" className="hover:text-white">
            BlueV Insights
          </Link>{' '}
          / <span className="text-white/70">{post.category}</span>
        </nav>

        <Badge>{post.category}</Badge>
        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-white/50">
          {post.author} · {formatDatePtBR(post.publishedAt)} · {post.readMinutes} min de leitura
        </p>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
          {isRealImageUrl(post.image) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          ) : (
            <MediaPlaceholder seed={post.id} kind={post.image} className="h-full w-full" iconClassName="h-16 w-16" />
          )}
        </div>

        <div className="prose prose-invert mt-10 max-w-none space-y-5 text-white/80">
          {post.content.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>#{tag}</Badge>
            ))}
          </div>
          <ShareButton title={post.title} />
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="mt-16">
          <h2 className="text-xl font-semibold text-white">Artigos relacionados</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, index) => (
              <BlogCard key={p.id} post={p} index={index} />
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}
