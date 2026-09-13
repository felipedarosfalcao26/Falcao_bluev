import { Hero } from '@/components/home/Hero';
import { AboutSection } from '@/components/home/AboutSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { VehiclesPreviewSection } from '@/components/home/VehiclesPreviewSection';
import { MapPreviewSection } from '@/components/home/MapPreviewSection';
import { BlogPreviewSection } from '@/components/home/BlogPreviewSection';
import { InstallCTASection } from '@/components/home/InstallCTASection';

// Pulls live data from Supabase (chargers, vehicles, blog posts) — never attempt to
// prerender this at build time, always render fresh per request.
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <VehiclesPreviewSection />
      <MapPreviewSection />
      <BlogPreviewSection />
      <InstallCTASection />
    </>
  );
}
