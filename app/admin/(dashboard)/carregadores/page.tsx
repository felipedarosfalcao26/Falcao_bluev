import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { listChargers } from '@/services/chargers.service';
import { deleteChargerAction } from './actions';

export default async function AdminChargersPage() {
  const chargers = await listChargers();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Carregadores</h1>
        <Button href="/admin/carregadores/novo" size="md">
          <Plus size={16} /> Novo carregador
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.03] text-left text-xs uppercase text-white/40">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Cidade</th>
              <th className="px-4 py-3">Potência</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {chargers.map((charger) => (
              <tr key={charger.id} className="border-t border-white/5">
                <td className="px-4 py-3 text-white">{charger.name}</td>
                <td className="px-4 py-3 text-white/60">
                  {charger.city} - {charger.state}
                </td>
                <td className="px-4 py-3 text-white/60">
                  {charger.power} kW · {charger.current}
                </td>
                <td className="px-4 py-3 text-white/60">{charger.status}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/carregadores/${charger.id}`} className="text-xs font-medium text-blue-400 hover:text-blue-300">
                      Editar
                    </Link>
                    <DeleteButton
                      confirmMessage="Excluir carregador"
                      action={deleteChargerAction.bind(null, charger.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {chargers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-white/40">
                  Nenhum carregador cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
