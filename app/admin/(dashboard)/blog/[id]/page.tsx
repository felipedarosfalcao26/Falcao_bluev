import { notFound } from 'next/navigation';
import { BlogPostForm } from '@/components/admin/BlogPostForm';
import { getBlogPostById } from '@/services/blog.service';

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogPostById(params.id);
  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-white">Editar artigo</h1>
      <BlogPostForm post={post} />
    </div>
  );
}
