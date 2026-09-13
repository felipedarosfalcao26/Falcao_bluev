'use client';

import { Search } from 'lucide-react';
import { ChargerCurrent, ChargerLocationType, ConnectorType } from '@/lib/types';
import { cn } from '@/lib/utils';

export interface MapFilterState {
  query: string;
  currents: ChargerCurrent[];
  minPower: number | null;
  connectors: ConnectorType[];
  locationTypes: ChargerLocationType[];
}

const CURRENTS: { label: string; value: ChargerCurrent }[] = [
  { label: 'AC', value: 'AC' },
  { label: 'DC (rápido/ultrarrápido)', value: 'DC' },
];

const POWER_OPTIONS = [
  { label: 'Até 7,4 kW', value: 7.4 },
  { label: '11 kW', value: 11 },
  { label: '22 kW', value: 22 },
  { label: '50 kW', value: 50 },
  { label: '100 kW+', value: 100 },
  { label: '150 kW+', value: 150 },
  { label: '300 kW+', value: 300 },
];

const CONNECTORS: ConnectorType[] = ['Tipo 2', 'CCS2', 'CHAdeMO', 'Outros'];

const LOCATION_TYPES: ChargerLocationType[] = [
  'Shopping',
  'Posto',
  'Hotel',
  'Restaurante',
  'Supermercado',
  'Condominio',
  'Empresa',
  'Rodovia',
  'Publico',
  'Particular',
];

function Chip({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
        active ? 'border-blue-500 bg-blue-500/15 text-white' : 'border-white/10 text-white/60 hover:bg-white/5'
      )}
    >
      {label}
    </button>
  );
}

export function MapFilters({ value, onChange }: { value: MapFilterState; onChange: (next: MapFilterState) => void }) {
  function toggle<T>(list: T[], item: T): T[] {
    return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          value={value.query}
          onChange={(e) => onChange({ ...value, query: e.target.value })}
          placeholder="Buscar por cidade ou endereço"
          className="w-full rounded-xl border border-white/10 bg-ink-950 py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">Tipo de carregador</p>
        <div className="flex flex-wrap gap-2">
          {CURRENTS.map((c) => (
            <Chip
              key={c.value}
              label={c.label}
              active={value.currents.includes(c.value)}
              onClick={() => onChange({ ...value, currents: toggle(value.currents, c.value) })}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">Potência mínima</p>
        <div className="flex flex-wrap gap-2">
          {POWER_OPTIONS.map((p) => (
            <Chip
              key={p.value}
              label={p.label}
              active={value.minPower === p.value}
              onClick={() => onChange({ ...value, minPower: value.minPower === p.value ? null : p.value })}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">Conector</p>
        <div className="flex flex-wrap gap-2">
          {CONNECTORS.map((c) => (
            <Chip
              key={c}
              label={c}
              active={value.connectors.includes(c)}
              onClick={() => onChange({ ...value, connectors: toggle(value.connectors, c) })}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">Local</p>
        <div className="flex flex-wrap gap-2">
          {LOCATION_TYPES.map((l) => (
            <Chip
              key={l}
              label={l}
              active={value.locationTypes.includes(l)}
              onClick={() => onChange({ ...value, locationTypes: toggle(value.locationTypes, l) })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
