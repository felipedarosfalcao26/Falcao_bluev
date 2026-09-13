import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { BlogCard } from '@/components/blog/BlogCard';
import { getRecentBlogPosts } from '@/services/blog.service';

export async function BlogPreviewSection() {
  const posts = await getRecentBlogPosts(3);

  return (
    <section className="bg-ink-950 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="BlueV Insights" title="O futuro da mobilidade, hoje." light />
          <Button href="/blog" variant="secondary" size="md" className="shrink-0">
            Acessar BlueV Insights <ArrowRight size={16} />
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
