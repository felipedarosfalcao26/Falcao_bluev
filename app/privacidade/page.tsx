import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description: 'Política de privacidade e tratamento de dados pessoais da BlueV, em conformidade com a LGPD.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ink-950 pb-24 pt-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Legal" title="Política de privacidade" light />
        <div className="prose prose-invert mt-10 max-w-none space-y-5 text-white/70">
          <p>
            Esta Política descreve como a BlueV coleta, usa, armazena e protege os dados pessoais dos usuários da
            plataforma, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
          </p>
          <h2 className="text-xl font-semibold text-white">1. Dados coletados</h2>
          <p>
            Coletamos dados fornecidos voluntariamente em formulários (nome, e-mail, telefone/WhatsApp, cidade) e
            dados de navegação por meio de cookies e ferramentas de analytics.
          </p>
          <h2 className="text-xl font-semibold text-white">2. Finalidade do tratamento</h2>
          <p>
            Os dados são utilizados para responder solicitações de orçamento, processar anúncios de veículos, enviar
            comunicações comerciais e melhorar a experiência na plataforma.
          </p>
          <h2 id="lgpd" className="text-xl font-semibold text-white scroll-mt-28">
            3. Direitos do titular (LGPD)
          </h2>
          <p>
            Você pode solicitar a qualquer momento a confirmação, correção, portabilidade ou exclusão dos seus dados
            pessoais, entrando em contato pelo e-mail privacidade@bluev.com.br.
          </p>
          <h2 className="text-xl font-semibold text-white">4. Cookies</h2>
          <p>
            Utilizamos cookies essenciais e de análise (Google Analytics, Google Tag Manager e Meta Pixel) para
            entender o uso da plataforma. Você pode gerenciar suas preferências no banner de cookies.
          </p>
          <h2 className="text-xl font-semibold text-white">5. Compartilhamento de dados</h2>
          <p>
            Dados de leads comerciais podem ser compartilhados com parceiros operadores de carregadores ou
            concessionárias exclusivamente para fins de atendimento à solicitação do usuário.
          </p>
        </div>
      </Container>
    </div>
  );
}
