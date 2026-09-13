import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BlogExplorer } from '@/components/blog/BlogExplorer';
import { listBlogPosts, listBlogCategories } from '@/services/blog.service';

export const metadata: Metadata = {
  title: 'BlueV Insights - Blog de eletromobilidade',
  description: 'Notícias, guias e análises sobre carros elétricos, infraestrutura de recarga, baterias e o mercado de eletromobilidade.',
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([listBlogPosts(), listBlogCategories()]);

  return (
    <div className="min-h-screen bg-ink-950 pb-24 pt-28">
      <Container className="mb-10">
        <SectionHeading eyebrow="BlueV Insights" title="O futuro da mobilidade, hoje" light />
      </Container>
      <Container>
        <BlogExplorer posts={posts} categories={categories} />
      </Container>
    </div>
  );
}
