import type { Metadata } from 'next';
import { BatteryCharging, Car, FileText, Users } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { chargers } from '@/data/chargers';
import { vehicles } from '@/data/vehicles';
import { blogPosts } from '@/data/blog-posts';

export const metadata: Metadata = {
  title: 'Painel administrativo',
  robots: { index: false, follow: false },
};

const PANELS = [
  {
    icon: BatteryCharging,
    title: 'Carregadores',
    description: 'Criar, editar, excluir, alterar status e localização dos pontos de recarga.',
    count: chargers.length,
  },
  {
    icon: Car,
    title: 'Veículos',
    description: 'Aprovar, editar, remover, destacar ou pausar anúncios do marketplace.',
    count: vehicles.length,
  },
  {
    icon: FileText,
    title: 'Blog',
    description: 'Criar, editar, agendar e publicar artigos do BlueV Insights.',
    count: blogPosts.length,
  },
  {
    icon: Users,
    title: 'Leads',
    description: 'Visualizar, filtrar e exportar leads comerciais gerados pela plataforma.',
    count: 0,
  },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-ink-950 pb-24 pt-28">
      <Container className="mb-10">
        <SectionHeading
          eyebrow="Painel administrativo"
          title="Fundação do futuro painel BlueV"
          description="Esta área é um placeholder de arquitetura: mostra a estrutura de dados que já existe (services/, lib/types.ts) e que alimentará um painel autenticado real, com CRUD completo, quando um banco de dados e autenticação forem conectados."
          light
        />
      </Container>

      <Container className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PANELS.map((panel) => (
          <div key={panel.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                <panel.icon size={20} />
              </span>
              <span className="text-2xl font-semibold text-white">{panel.count}</span>
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">{panel.title}</h3>
            <p className="mt-2 text-sm text-white/60">{panel.description}</p>
          </div>
        ))}
      </Container>

      <Container className="mt-12 max-w-2xl rounded-2xl border border-dashed border-white/15 p-6 text-sm text-white/60">
        Próximos passos recomendados: autenticação (NextAuth/Clerk), banco de dados relacional (Postgres via Prisma
        ou Supabase) seguindo os tipos em <code className="text-blue-400">lib/types.ts</code>, e endpoints de CRUD que
        substituam as implementações mockadas em <code className="text-blue-400">services/</code>.
      </Container>
    </div>
  );
}
