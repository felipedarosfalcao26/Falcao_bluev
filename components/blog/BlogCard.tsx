'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/types';
import { formatDatePtBR, isRealImageUrl } from '@/lib/utils';
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder';
import { Badge } from '@/components/ui/Badge';

export function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white/[0.05]"
      >
        <div className="relative aspect-[16/10]">
          {isRealImageUrl(post.image) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          ) : (
            <MediaPlaceholder seed={post.id} kind={post.image} className="h-full w-full" iconClassName="h-12 w-12" />
          )}
          <Badge className="absolute left-3 top-3">{post.category}</Badge>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs text-white/50">
            {formatDatePtBR(post.publishedAt)} · {post.readMinutes} min de leitura
          </p>
          <h3 className="mt-2 text-lg font-semibold leading-snug text-white">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/60">{post.excerpt}</p>
          <span className="mt-auto pt-4 text-sm font-medium text-blue-400 transition-colors group-hover:text-blue-300">
            Ler artigo
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
