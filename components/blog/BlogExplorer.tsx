'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { BlogCategory, BlogPost } from '@/lib/types';
import { useDebounce } from '@/hooks/useDebounce';
import { BlogCard } from '@/components/blog/BlogCard';
import { cn } from '@/lib/utils';

export function BlogExplorer({ posts, categories }: { posts: BlogPost[]; categories: BlogCategory[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<BlogCategory | 'Todas'>('Todas');
  const debouncedQuery = useDebounce(query, 250);

  const filtered = useMemo(() => {
    let result = posts;
    if (category !== 'Todas') result = result.filter((p) => p.category === category);
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    return result;
  }, [posts, category, debouncedQuery]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5">
        <div className="relative max-w-md">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artigos"
            className="w-full rounded-xl border border-white/10 bg-ink-950 py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(['Todas', ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                category === c ? 'border-blue-500 bg-blue-500/15 text-white' : 'border-white/10 text-white/60 hover:bg-white/5'
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {filtered.length === 0 && <p className="py-20 text-center text-sm text-white/50">Nenhum artigo encontrado.</p>}
    </div>
  );
}
