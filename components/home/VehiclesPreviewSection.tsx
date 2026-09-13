import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { getFeaturedVehicles } from '@/services/vehicles.service';

export async function VehiclesPreviewSection() {
  const vehicles = await getFeaturedVehicles(6);

  return (
    <section className="bg-ink-900/40 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Marketplace" title="Seu próximo carro pode ser elétrico." light />
          <Button href="/veiculos" variant="secondary" size="md" className="shrink-0">
            Ver todos os veículos <ArrowRight size={16} />
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
