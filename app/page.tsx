import { Hero } from '@/components/home/Hero';
import { AboutSection } from '@/components/home/AboutSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { VehiclesPreviewSection } from '@/components/home/VehiclesPreviewSection';
import { MapPreviewSection } from '@/components/home/MapPreviewSection';
import { BlogPreviewSection } from '@/components/home/BlogPreviewSection';
import { InstallCTASection } from '@/components/home/InstallCTASection';

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
