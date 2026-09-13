import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { formatDatePtBR } from '@/lib/utils';
import { listBlogPosts } from '@/services/blog.service';
import { deleteBlogPostAction } from './actions';

export default async function AdminBlogPage() {
  const posts = await listBlogPosts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Blog</h1>
        <Button href="/admin/blog/novo" size="md">
          <Plus size={16} /> Novo artigo
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.03] text-left text-xs uppercase text-white/40">
            <tr>
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Publicação</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-white/5">
                <td className="px-4 py-3 text-white">{post.title}</td>
                <td className="px-4 py-3 text-white/60">
                  <Badge>{post.category}</Badge>
                </td>
                <td className="px-4 py-3 text-white/60">{post.status ?? 'draft'}</td>
                <td className="px-4 py-3 text-white/60">{formatDatePtBR(post.publishedAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/blog/${post.id}`} className="text-xs font-medium text-blue-400 hover:text-blue-300">
                      Editar
                    </Link>
                    <DeleteButton confirmMessage="Excluir artigo" action={deleteBlogPostAction.bind(null, post.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-white/40">
                  Nenhum artigo cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
