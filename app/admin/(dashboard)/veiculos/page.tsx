import Link from 'next/link';
import { Plus } from 'lucide-react';
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

export default async function AdminVehiclesPage({ searchParams }: { searchParams: { status?: string } }) {
  const activeStatus = (searchParams.status as VehicleStatus | undefined) ?? undefined;
  const vehicles = await listVehicles(activeStatus ? { status: [activeStatus] } : {});

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Veículos</h1>
        <Button href="/admin/veiculos/novo" size="md">
          <Plus size={16} /> Novo veículo
        </Button>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {STATUS_TABS.map((tab) => {
          const href = tab.value === 'Todos' ? '/admin/veiculos' : `/admin/veiculos?status=${tab.value}`;
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
                <td colSpan={5} className="px-4 py-8 text-center text-white/40">
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
