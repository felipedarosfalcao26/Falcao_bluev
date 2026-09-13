'use server';

import { revalidatePath } from 'next/cache';
import { BlogPostInput, createBlogPost, deleteBlogPost, updateBlogPost } from '@/services/blog.service';

function revalidateBlogPaths() {
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  revalidatePath('/');
}

export async function createBlogPostAction(input: BlogPostInput) {
  const post = await createBlogPost(input);
  revalidateBlogPaths();
  return post;
}

export async function updateBlogPostAction(id: string, input: BlogPostInput) {
  const post = await updateBlogPost(id, input);
  revalidateBlogPaths();
  return post;
}

export async function deleteBlogPostAction(id: string) {
  await deleteBlogPost(id);
  revalidateBlogPaths();
}
