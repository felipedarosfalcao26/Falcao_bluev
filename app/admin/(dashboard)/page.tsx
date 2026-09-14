import { BatteryCharging, Car, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { listChargers } from '@/services/chargers.service';
import { listVehicles } from '@/services/vehicles.service';
import { listBlogPosts } from '@/services/blog.service';
import { listLeads } from '@/services/leads.service';

export default async function AdminDashboardPage() {
  const [chargers, vehicles, posts, leads] = await Promise.all([
    listChargers(),
    listVehicles({ includeHidden: true }),
    listBlogPosts(),
    listLeads(),
  ]);

  const pendingVehicles = vehicles.filter((v) => v.status === 'Pendente moderacao').length;

  const panels = [
    {
      icon: BatteryCharging,
      title: 'Carregadores',
      count: chargers.length,
      href: '/admin/carregadores',
    },
    {
      icon: Car,
      title: 'Veículos',
      count: vehicles.length,
      href: '/admin/veiculos',
      badge: pendingVehicles > 0 ? `${pendingVehicles} pendente(s)` : undefined,
    },
    {
      icon: FileText,
      title: 'Artigos do blog',
      count: posts.length,
      href: '/admin/blog',
    },
    {
      icon: Users,
      title: 'Leads recebidos',
      count: leads.length,
      href: '/admin/leads',
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-white">Dashboard</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {panels.map((panel) => (
          <a
            key={panel.title}
            href={panel.href}
            className="block rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-blue-500/30"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                <panel.icon size={20} />
              </span>
              <span className="text-2xl font-semibold text-white">{panel.count}</span>
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">{panel.title}</h3>
            {panel.badge && <p className="mt-1 text-xs text-amber-400">{panel.badge}</p>}
          </a>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/admin/carregadores/novo" variant="secondary" size="md">
          Novo carregador
        </Button>
        <Button href="/admin/veiculos/novo" variant="secondary" size="md">
          Novo veículo
        </Button>
        <Button href="/admin/blog/novo" variant="secondary" size="md">
          Novo artigo
        </Button>
      </div>
    </div>
  );
}
