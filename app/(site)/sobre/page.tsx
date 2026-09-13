import type { Metadata } from 'next';
import Image from 'next/image';
import { Compass, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { companyStats, clientLogos } from '@/data/stats';

export const metadata: Metadata = {
  title: 'Sobre a BlueV',
  description: 'Conheça a história, missão, visão e valores da BlueV, plataforma de infraestrutura e mobilidade elétrica no Brasil.',
};

const VALUES = [
  { icon: Sparkles, title: 'Inovação', description: 'Buscamos constantemente a tecnologia mais avançada em recarga elétrica.' },
  { icon: ShieldCheck, title: 'Segurança', description: 'Todo projeto segue rigorosamente as normas técnicas e elétricas vigentes.' },
  { icon: HeartHandshake, title: 'Confiança', description: 'Relacionamentos de longo prazo com clientes, parceiros e operadores.' },
  { icon: Compass, title: 'Propósito', description: 'Acelerar a transição energética do Brasil rumo à mobilidade elétrica.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ink-950 pb-24 pt-28">
      <Container className="mb-16">
        <SectionHeading
          eyebrow="Sobre a BlueV"
          title="Construindo o ecossistema de eletromobilidade do Brasil"
          description="Nascemos para resolver um problema simples: o Brasil precisa de infraestrutura de recarga confiável para acelerar a adoção de veículos elétricos. Hoje conectamos carregadores, motoristas, veículos e empresas em uma única plataforma."
          light
        />
      </Container>

      <Container className="mb-20">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl border border-white/10">
          <Image
            src="/images/sobre-banner.jpg"
            alt="Técnico instalando um carregador BlueV"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 1200px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
        </div>
      </Container>

      <Container className="mb-20 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {companyStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <p className="text-3xl font-semibold text-white sm:text-4xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-xs text-white/60">{stat.label}</p>
          </div>
        ))}
      </Container>

      <Container className="mb-20 grid gap-8 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
          <h3 className="text-lg font-semibold text-white">Missão</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Democratizar o acesso à infraestrutura de recarga elétrica, tornando a transição para a mobilidade
            elétrica simples, segura e acessível para pessoas e empresas em todo o Brasil.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
          <h3 className="text-lg font-semibold text-white">Visão</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Ser a plataforma de referência em eletromobilidade na América Latina, conectando toda a jornada do
            motorista elétrico — do carregador ao próximo veículo.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
          <h3 className="text-lg font-semibold text-white">Atuação</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Presente em 14 estados brasileiros, atendendo residências, condomínios, empresas, hotéis, postos e redes
            de varejo com projetos sob medida.
          </p>
        </div>
      </Container>

      <Container className="mb-20">
        <h2 className="mb-8 text-2xl font-semibold text-white">Nossos valores</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <div key={value.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                <value.icon size={20} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{value.title}</h3>
              <p className="mt-2 text-sm text-white/60">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <h2 className="mb-8 text-2xl font-semibold text-white">Clientes e parceiros</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {clientLogos.map((client) => (
            <div key={client.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-center">
              <p className="text-sm font-medium text-white">{client.name}</p>
              <p className="mt-1 text-xs text-white/40">{client.segment}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
