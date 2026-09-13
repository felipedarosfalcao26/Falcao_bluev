import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { VehicleStatusActions } from '@/components/admin/VehicleStatusActions';
import { formatCurrencyBRL } from '@/lib/utils';
import { VehicleStatus } from '@/lib/types';
import { listVehicles } from '@/services/vehicles.service';
import { deleteVehicleAction } from './actions';

const STATUS_TABS: { label: string; value: VehicleStatus | 'Todos' }[] = [
  { label: 'Todos', value: 'Todos' },
  { label: 'Pendente moderação', value: 'Pendente moderacao' },
  { label: 'Disponível', value: 'Disponivel' },
  { label: 'Reservado', value: 'Reservado' },
  { label: 'Vendido', value: 'Vendido' },
];

export default async function AdminVehiclesPage({
  searchParams,
}: {
  searchParams: { status?: string; q?: string };
}) {
  const activeStatus = (searchParams.status as VehicleStatus | undefined) ?? undefined;
  const query = searchParams.q?.trim() || undefined;
  const vehicles = await listVehicles({
    ...(activeStatus ? { status: [activeStatus] } : {}),
    ...(query ? { query } : {}),
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-white">Veículos</h1>
        <Button href="/admin/veiculos/novo" size="md">
          <Plus size={16} /> Novo veículo
        </Button>
      </div>

      <form action="/admin/veiculos" method="get" className="mb-5 max-w-sm">
        {activeStatus && <input type="hidden" name="status" value={activeStatus} />}
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            name="q"
            defaultValue={query ?? ''}
            placeholder="Buscar por código, marca ou modelo"
            className="w-full rounded-xl border border-white/10 bg-ink-950 py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-blue-500"
          />
        </div>
      </form>

      <div className="mb-5 flex flex-wrap gap-2">
        {STATUS_TABS.map((tab) => {
          const params = new URLSearchParams();
          if (tab.value !== 'Todos') params.set('status', tab.value);
          if (query) params.set('q', query);
          const href = params.toString() ? `/admin/veiculos?${params.toString()}` : '/admin/veiculos';
          const active = tab.value === 'Todos' ? !activeStatus : activeStatus === tab.value;
          return (
            <Link
              key={tab.value}
              href={href}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                active ? 'border-blue-500 bg-blue-500/15 text-white' : 'border-white/10 text-white/60 hover:bg-white/5'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.03] text-left text-xs uppercase text-white/40">
            <tr>
              <th className="px-4 py-3">Código</th>
              <th className="px-4 py-3">Veículo</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Vendedor</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border-t border-white/5">
                <td className="px-4 py-3 font-mono text-xs text-white/50">{vehicle.code}</td>
                <td className="px-4 py-3 text-white">
                  {vehicle.brand} {vehicle.model} {vehicle.year}
                  {vehicle.featured && <Badge className="ml-2">Destaque</Badge>}
                </td>
                <td className="px-4 py-3 text-white/60">{formatCurrencyBRL(vehicle.price)}</td>
                <td className="px-4 py-3 text-white/60">{vehicle.sellerName}</td>
                <td className="px-4 py-3 text-white/60">{vehicle.status}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <VehicleStatusActions vehicle={vehicle} />
                    <Link href={`/admin/veiculos/${vehicle.id}`} className="text-xs font-medium text-blue-400 hover:text-blue-300">
                      Editar
                    </Link>
                    <DeleteButton confirmMessage="Excluir veículo" action={deleteVehicleAction.bind(null, vehicle.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {vehicles.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-white/40">
                  Nenhum veículo encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
