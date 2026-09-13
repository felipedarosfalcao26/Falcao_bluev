'use client';

import { Search } from 'lucide-react';
import { VehicleType } from '@/lib/types';
import { VEHICLE_BRANDS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export interface VehicleFilterState {
  query: string;
  brands: string[];
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
  maxMileage: string;
  minAutonomy: string;
  types: VehicleType[];
  sort: 'recent' | 'price-asc' | 'price-desc' | 'mileage-asc';
}

export const EMPTY_VEHICLE_FILTERS: VehicleFilterState = {
  query: '',
  brands: [],
  minPrice: '',
  maxPrice: '',
  minYear: '',
  maxYear: '',
  maxMileage: '',
  minAutonomy: '',
  types: [],
  sort: 'recent',
};

const TYPES: VehicleType[] = ['100% eletrico', 'Hibrido plug-in', 'Hibrido'];

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

function NumberField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs text-white/50">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-ink-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
      />
    </div>
  );
}

export function VehicleFilters({ value, onChange }: { value: VehicleFilterState; onChange: (next: VehicleFilterState) => void }) {
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
          placeholder="O que você está procurando?"
          className="w-full rounded-xl border border-white/10 bg-ink-950 py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">Marca</p>
        <div className="flex flex-wrap gap-2">
          {VEHICLE_BRANDS.map((brand) => (
            <Chip key={brand} label={brand} active={value.brands.includes(brand)} onClick={() => onChange({ ...value, brands: toggle(value.brands, brand) })} />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">Tipo</p>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((type) => (
            <Chip key={type} label={type} active={value.types.includes(type)} onClick={() => onChange({ ...value, types: toggle(value.types, type) })} />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">Preço (R$)</p>
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="Mínimo" value={value.minPrice} onChange={(v) => onChange({ ...value, minPrice: v })} />
          <NumberField label="Máximo" value={value.maxPrice} onChange={(v) => onChange({ ...value, maxPrice: v })} />
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">Ano</p>
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="De" value={value.minYear} onChange={(v) => onChange({ ...value, minYear: v })} />
          <NumberField label="Até" value={value.maxYear} onChange={(v) => onChange({ ...value, maxYear: v })} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <NumberField label="Km máxima" value={value.maxMileage} onChange={(v) => onChange({ ...value, maxMileage: v })} />
        <NumberField label="Autonomia mínima (km)" value={value.minAutonomy} onChange={(v) => onChange({ ...value, minAutonomy: v })} />
      </div>
    </div>
  );
}
