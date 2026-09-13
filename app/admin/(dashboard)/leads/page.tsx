import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { ExportLeadsButton } from '@/components/admin/ExportLeadsButton';
import { formatDatePtBR } from '@/lib/utils';
import { LeadType } from '@/lib/types';
import { listLeads } from '@/services/leads.service';
import { deleteLeadAction } from './actions';

const TYPE_TABS: { label: string; value: LeadType | 'Todos' }[] = [
  { label: 'Todos', value: 'Todos' },
  { label: 'Instalação', value: 'instalacao' },
  { label: 'Contato', value: 'contato' },
  { label: 'Interesse em veículo', value: 'veiculo-interesse' },
  { label: 'Anúncio de veículo', value: 'anuncio-veiculo' },
];

export default async function AdminLeadsPage({ searchParams }: { searchParams: { type?: string } }) {
  const activeType = (searchParams.type as LeadType | undefined) ?? undefined;
  const leads = await listLeads(activeType ? { type: activeType } : {});

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Leads</h1>
        <ExportLeadsButton leads={leads} />
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {TYPE_TABS.map((tab) => {
          const href = tab.value === 'Todos' ? '/admin/leads' : `/admin/leads?type=${tab.value}`;
          const active = tab.value === 'Todos' ? !activeType : activeType === tab.value;
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
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Contato</th>
              <th className="px-4 py-3">Mensagem</th>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-white/5 align-top">
                <td className="px-4 py-3">
                  <Badge>{lead.type}</Badge>
                </td>
                <td className="px-4 py-3 text-white">{lead.name}</td>
                <td className="px-4 py-3 text-white/60">
                  <div>{lead.email}</div>
                  <div>{lead.phone}</div>
                </td>
                <td className="px-4 py-3 max-w-xs truncate text-white/60">{lead.message ?? '—'}</td>
                <td className="px-4 py-3 text-white/60">{formatDatePtBR(lead.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <DeleteButton confirmMessage="Excluir lead" action={deleteLeadAction.bind(null, lead.id)} />
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-white/40">
                  Nenhum lead encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
