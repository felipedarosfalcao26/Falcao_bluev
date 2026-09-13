import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MapExplorer } from '@/components/map/MapExplorer';
import { listChargers } from '@/services/chargers.service';

export const metadata: Metadata = {
  title: 'Mapa de carregadores',
  description: 'Encontre seu próximo carregador de veículo elétrico: busque por cidade, filtre por potência e conector, e trace a rota.',
};

export const dynamic = 'force-dynamic';

export default async function ChargersMapPage() {
  const chargers = await listChargers();

  return (
    <div className="min-h-screen bg-ink-950 pb-24 pt-28">
      <Container className="mb-8">
        <SectionHeading eyebrow="Mapa de recarga" title="Encontre seu próximo carregador" light />
      </Container>
      <Container>
        <MapExplorer chargers={chargers} />
      </Container>
    </div>
  );
}
