'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = 'left', light, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
          {eyebrow}
        </span>
      )}
      <h2 className={cn('text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl', light ? 'text-white' : 'text-ink-900')}>
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-base sm:text-lg', light ? 'text-white/70' : 'text-ink-900/70')}>{description}</p>
      )}
    </motion.div>
  );
}
