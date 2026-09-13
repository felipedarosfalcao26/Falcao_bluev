import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { MapPreviewVisual } from '@/components/home/MapPreviewVisual';
import { listChargers } from '@/services/chargers.service';

export async function MapPreviewSection() {
  const chargers = await listChargers();
  const preview = chargers.slice(0, 6);

  return (
    <section className="bg-ink-950 py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <SectionHeading eyebrow="Mapa de recarga" title="Nunca fique sem carga." light />

        <MapPreviewVisual chargers={preview} />

        <div className="lg:col-span-2">
          <p className="max-w-xl text-white/60">
            Encontre carregadores próximos, veja potência, conectores e disponibilidade em tempo real, e trace a rota
            direto para o Google Maps ou Waze.
          </p>
          <Button href="/mapa-de-recarga" size="lg" className="mt-8">
            Explorar mapa de carregadores <ArrowRight size={18} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
