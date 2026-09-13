import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { listVehicles } from '@/services/vehicles.service';
import { listBlogPosts } from '@/services/blog.service';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/carregadores',
    '/mapa-de-recarga',
    '/veiculos',
    '/veiculos/anunciar',
    '/blog',
    '/sobre',
    '/contato',
    '/termos',
    '/privacidade',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const [vehicles, blogPosts] = await Promise.all([listVehicles(), listBlogPosts()]);

  const vehicleRoutes = vehicles.map((v) => ({
    url: `${SITE_URL}/veiculos/${v.slug}`,
    lastModified: v.createdAt,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.publishedAt,
  }));

  return [...staticRoutes, ...vehicleRoutes, ...blogRoutes];
}
