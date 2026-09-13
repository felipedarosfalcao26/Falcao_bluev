'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BatteryCharging, Car, FileText, LayoutDashboard, LogOut, Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from '@/lib/supabase/actions';

const LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/carregadores', label: 'Carregadores', icon: BatteryCharging },
  { href: '/admin/veiculos', label: 'Veículos', icon: Car },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/leads', label: 'Leads', icon: Users },
];

export function AdminSidebar({ email }: { email: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-ink-900/60 p-5">
      <Link href="/admin" className="mb-8 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white">
          <Zap size={18} strokeWidth={2.5} />
        </span>
        <span className="text-lg font-semibold text-white">BlueV Admin</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {LINKS.map((link) => {
          const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active ? 'bg-blue-500/15 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
              )}
            >
              <link.icon size={17} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 pt-4">
        {email && <p className="mb-3 truncate text-xs text-white/40">{email}</p>}
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut size={17} />
            Sair
          </button>
        </form>
      </div>
    </aside>
  );
}
