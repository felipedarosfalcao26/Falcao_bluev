import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { VehicleExplorer } from '@/components/vehicles/VehicleExplorer';
import { listVehicles } from '@/services/vehicles.service';

export const metadata: Metadata = {
  title: 'Veículos elétricos à venda',
  description: 'Compre e venda carros elétricos e híbridos plug-in com a BlueV: busca por marca, preço, ano, autonomia e muito mais.',
};

export default async function VehiclesPage() {
  const vehicles = await listVehicles();

  return (
    <div className="min-h-screen bg-ink-950 pb-24 pt-28">
      <Container className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="Marketplace" title="Encontre seu próximo carro elétrico" light />
        <Button href="/veiculos/anunciar" size="md" className="shrink-0">
          Venda seu carro elétrico
        </Button>
      </Container>
      <Container>
        <VehicleExplorer vehicles={vehicles} />
      </Container>
    </div>
  );
}
