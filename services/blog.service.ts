import { createClient } from '@/lib/supabase/server';
import { mapBlogPost } from '@/lib/supabase/mappers';
import { BlogCategory, BlogPost, BlogPostStatus } from '@/lib/types';
import { slugify } from '@/lib/utils';

export interface BlogPostInput {
  title: string;
  excerpt: string;
  content: string[];
  image: string | null;
  category: BlogCategory;
  author: string;
  status: BlogPostStatus;
  publishedAt: string | null;
  readMinutes: number;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
}

export async function listBlogPosts(params: { category?: BlogCategory; query?: string } = {}): Promise<BlogPost[]> {
  const supabase = createClient();
  let query = supabase.from('blog_posts').select('*').order('published_at', { ascending: false });

  if (params.category) query = query.eq('category', params.category);
  if (params.query) query = query.ilike('title', `%${params.query}%`);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(mapBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data ? mapBlogPost(data) : undefined;
}

export async function getBlogPostById(id: string): Promise<BlogPost | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data ? mapBlogPost(data) : undefined;
}

export async function getRecentBlogPosts(limit = 3): Promise<BlogPost[]> {
  return (await listBlogPosts()).slice(0, limit);
}

export async function getRelatedBlogPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('category', post.category)
    .neq('id', post.id)
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(mapBlogPost);
}

export async function listBlogCategories(): Promise<BlogCategory[]> {
  const posts = await listBlogPosts();
  return Array.from(new Set(posts.map((p) => p.category)));
}

export async function createBlogPost(input: BlogPostInput): Promise<BlogPost> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      slug: `${slugify(input.title)}-${Date.now().toString(36)}`,
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      image: input.image,
      category: input.category,
      author: input.author,
      status: input.status,
      published_at: input.publishedAt,
      read_minutes: input.readMinutes,
      seo_title: input.seoTitle,
      seo_description: input.seoDescription,
      tags: input.tags,
    })
    .select('*')
    .single();
  if (error) throw error;
  return mapBlogPost(data);
}

export async function updateBlogPost(id: string, input: BlogPostInput): Promise<BlogPost> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      image: input.image,
      category: input.category,
      author: input.author,
      status: input.status,
      published_at: input.publishedAt,
      read_minutes: input.readMinutes,
      seo_title: input.seoTitle,
      seo_description: input.seoDescription,
      tags: input.tags,
    })
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return mapBlogPost(data);
}

export async function deleteBlogPost(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
}
