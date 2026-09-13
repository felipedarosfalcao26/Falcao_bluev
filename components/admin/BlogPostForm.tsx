'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ImageUpload } from '@/components/forms/ImageUpload';
import { BlogCategory, BlogPost } from '@/lib/types';
import { BlogPostInput } from '@/services/blog.service';
import { createBlogPostAction, updateBlogPostAction } from '@/app/admin/(dashboard)/blog/actions';

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-ink-950 px-4 py-3 text-white outline-none focus:border-blue-500';

const CATEGORIES: BlogCategory[] = [
  'Carros eletricos',
  'Infraestrutura',
  'Carregadores',
  'Baterias',
  'Tecnologia',
  'Mercado',
  'Legislacao',
  'Sustentabilidade',
  'Energia',
  'Novidades',
];

function toDatetimeLocal(iso?: string | null) {
  if (!iso) return '';
  const d = new Date(iso);
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 16);
}

export function BlogPostForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? '');
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '');
  const [contentText, setContentText] = useState(post?.content.join('\n\n') ?? '');
  const [category, setCategory] = useState<BlogCategory>(post?.category ?? 'Novidades');
  const [author, setAuthor] = useState(post?.author ?? 'Equipe BlueV');
  const [status, setStatus] = useState<BlogPostInput['status']>(post?.status ?? 'draft');
  const [publishedAt, setPublishedAt] = useState(toDatetimeLocal(post?.publishedAt));
  const [readMinutes, setReadMinutes] = useState(post?.readMinutes ?? 5);
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle ?? '');
  const [seoDescription, setSeoDescription] = useState(post?.seoDescription ?? '');
  const [tagsText, setTagsText] = useState(post?.tags.join(', ') ?? '');
  const [images, setImages] = useState<string[]>(post?.image?.startsWith('http') ? [post.image] : []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const input: BlogPostInput = {
      title,
      excerpt,
      content: contentText.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
      image: images[0] ?? null,
      category,
      author,
      status,
      publishedAt: publishedAt ? new Date(publishedAt).toISOString() : status === 'published' ? new Date().toISOString() : null,
      readMinutes,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      tags: tagsText.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (post) {
        await updateBlogPostAction(post.id, input);
      } else {
        await createBlogPostAction(input);
      }
      router.push('/admin/blog');
      router.refresh();
    } catch {
      setError('Não foi possível salvar. Confira os dados e tente novamente.');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div>
        <label className="mb-2 block text-sm text-white/70">Título</label>
        <input className={inputClasses} value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Resumo (excerpt)</label>
        <textarea rows={2} className={inputClasses} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Conteúdo (separe parágrafos com uma linha em branco)</label>
        <textarea rows={8} className={inputClasses} value={contentText} onChange={(e) => setContentText(e.target.value)} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm text-white/70">Categoria</label>
          <select className={inputClasses} value={category} onChange={(e) => setCategory(e.target.value as BlogCategory)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Autor</label>
          <input className={inputClasses} value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Tempo de leitura (min)</label>
          <input
            type="number"
            className={inputClasses}
            value={readMinutes}
            onChange={(e) => setReadMinutes(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white/70">Status</label>
          <select className={inputClasses} value={status} onChange={(e) => setStatus(e.target.value as BlogPostInput['status'])}>
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
            <option value="scheduled">Agendado</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Data de publicação</label>
          <input
            type="datetime-local"
            className={inputClasses}
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Imagem de capa</label>
        <ImageUpload folder="blog" value={images} onChange={(v) => setImages(v.slice(-1))} maxFiles={1} />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Tags (separadas por vírgula)</label>
        <input className={inputClasses} value={tagsText} onChange={(e) => setTagsText(e.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white/70">SEO title</label>
          <input className={inputClasses} value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder={title} />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Meta description</label>
          <input
            className={inputClasses}
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            placeholder={excerpt}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 size={18} className="animate-spin" /> : post ? 'Salvar alterações' : 'Criar artigo'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/blog')}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
