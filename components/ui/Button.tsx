import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-blue-500 text-white hover:bg-blue-400 shadow-[0_0_0_1px_rgba(11,127,255,0.4),0_8px_30px_-8px_rgba(11,127,255,0.6)]',
  secondary: 'bg-white/10 text-white border border-white/15 hover:bg-white/15 backdrop-blur',
  ghost: 'text-white/80 hover:text-white',
};

const sizeStyles: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-7 text-base',
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...props
}: BaseProps & { href?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        className={classes}
        onClick={props.onClick as unknown as () => void}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
