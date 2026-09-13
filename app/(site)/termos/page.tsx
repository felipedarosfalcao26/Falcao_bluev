import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Termos de uso',
  description: 'Termos de uso da plataforma BlueV.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ink-950 pb-24 pt-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Legal" title="Termos de uso" light />
        <div className="prose prose-invert mt-10 max-w-none space-y-5 text-white/70">
          <p>
            Estes Termos de Uso regulam o acesso e a utilização da plataforma BlueV, incluindo o site institucional,
            o mapa de carregadores, o marketplace de veículos elétricos e o blog BlueV Insights.
          </p>
          <h2 className="text-xl font-semibold text-white">1. Uso da plataforma</h2>
          <p>
            Ao utilizar a BlueV, você concorda em fornecer informações verdadeiras nos formulários de contato,
            solicitação de orçamento e anúncio de veículos.
          </p>
          <h2 className="text-xl font-semibold text-white">2. Anúncios de veículos</h2>
          <p>
            Todo anúncio publicado no marketplace passa por moderação da BlueV antes de ficar visível publicamente.
            A BlueV pode recusar, editar ou remover anúncios que violem estes termos.
          </p>
          <h2 className="text-xl font-semibold text-white">3. Informações sobre carregadores</h2>
          <p>
            As informações de disponibilidade, preço e status dos carregadores são fornecidas pelos operadores e
            podem sofrer alterações sem aviso prévio.
          </p>
          <h2 className="text-xl font-semibold text-white">4. Limitação de responsabilidade</h2>
          <p>
            A BlueV atua como intermediadora entre compradores e vendedores de veículos e não se responsabiliza pela
            veracidade das informações prestadas por terceiros.
          </p>
        </div>
      </Container>
    </div>
  );
}
