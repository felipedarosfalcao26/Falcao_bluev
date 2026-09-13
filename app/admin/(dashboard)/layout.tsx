import { createClient } from '@/lib/supabase/server';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

// The admin dashboard is always per-request (auth-gated, live data) — never prerender it statically.
export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex">
      <AdminSidebar email={user?.email ?? null} />
      <main className="min-h-screen flex-1 overflow-x-hidden p-8">{children}</main>
    </div>
  );
}
