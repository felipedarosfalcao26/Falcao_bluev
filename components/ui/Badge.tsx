import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur',
        className
      )}
    >
      {children}
    </span>
  );
}
