'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Lead } from '@/lib/types';
import { formatDatePtBR } from '@/lib/utils';

function toCsvValue(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

export function ExportLeadsButton({ leads }: { leads: Lead[] }) {
  function handleExport() {
    const header = ['Tipo', 'Nome', 'E-mail', 'Telefone', 'Mensagem', 'Origem', 'Data'];
    const rows = leads.map((lead) => [
      lead.type,
      lead.name,
      lead.email,
      lead.phone,
      lead.message ?? '',
      lead.source,
      formatDatePtBR(lead.createdAt),
    ]);

    const csv = [header, ...rows].map((row) => row.map(toCsvValue).join(',')).join('\n');
    const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bluev-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button variant="secondary" size="md" onClick={handleExport}>
      <Download size={16} /> Exportar CSV
    </Button>
  );
}
