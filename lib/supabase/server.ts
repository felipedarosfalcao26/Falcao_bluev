import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  // `cookies()` throws when called outside a request scope (e.g. generateStaticParams
  // at build time). In that case we fall back to a cookie-less (anonymous) client,
  // which is exactly right for build-time generation of public pages.
  let cookieStore: ReturnType<typeof cookies> | null = null;
  try {
    cookieStore = cookies();
  } catch {
    cookieStore = null;
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore?.getAll() ?? [];
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore?.set(name, value, options));
          } catch {
            // called from a Server Component with no write access; middleware refreshes the session instead
          }
        },
      },
    }
  );
}
