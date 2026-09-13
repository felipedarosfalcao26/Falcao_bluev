import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InstallChargerForm } from '@/components/forms/InstallChargerForm';
import { ServicesSection } from '@/components/home/ServicesSection';

export const metadata: Metadata = {
  title: 'Carregadores para veículos elétricos',
  description:
    'Instalação de carregadores residenciais, comerciais, corporativos e para condomínios. Solicite um orçamento sob medida com a BlueV.',
};

export default function ChargersPage() {
  return (
    <div className="pt-28">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Carregadores"
          title="Infraestrutura de recarga sob medida para o seu perfil"
          description="Da vaga da garagem à frota corporativa: projetamos, instalamos e damos manutenção na infraestrutura elétrica do seu carregador."
          light
        />
      </Container>

      <ServicesSection />

      <Container className="py-16 sm:py-24">
        <SectionHeading eyebrow="Orçamento" title="Quero instalar um carregador" light className="mb-10" />
        <InstallChargerForm />
      </Container>
    </div>
  );
}
