import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { VehicleListingForm } from '@/components/forms/VehicleListingForm';

export const metadata: Metadata = {
  title: 'Anuncie seu carro elétrico',
  description: 'Venda seu carro elétrico ou híbrido plug-in na BlueV. Preencha o formulário e nossa equipe entra em contato para publicar seu anúncio.',
};

export default function AnnounceVehiclePage() {
  return (
    <div className="min-h-screen bg-ink-950 pb-24 pt-28">
      <Container className="mb-10">
        <SectionHeading eyebrow="Anunciar veículo" title="Venda seu carro elétrico" light />
      </Container>
      <Container className="max-w-3xl">
        <VehicleListingForm />
      </Container>
    </div>
  );
}
