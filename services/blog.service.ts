import { blogPosts } from '@/data/blog-posts';
import { BlogCategory, BlogPost } from '@/lib/types';

/**
 * Abstraction over blog content. Ready to be replaced by a headless CMS
 * (Sanity, Strapi, WordPress headless) by swapping the function bodies below.
 */
export async function listBlogPosts(params: { category?: BlogCategory; query?: string } = {}): Promise<BlogPost[]> {
  let result = [...blogPosts];
  if (params.category) result = result.filter((p) => p.category === params.category);
  if (params.query) {
    const q = params.query.toLowerCase();
    result = result.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
  }
  return result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return blogPosts.find((p) => p.slug === slug);
}

export async function getRecentBlogPosts(limit = 3): Promise<BlogPost[]> {
  return (await listBlogPosts()).slice(0, limit);
}

export async function getRelatedBlogPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  return blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, limit);
}

export async function listBlogCategories(): Promise<BlogCategory[]> {
  return Array.from(new Set(blogPosts.map((p) => p.category)));
}
