'use client';

import { BatteryCharging, MapPin, Star } from 'lucide-react';
import { Charger } from '@/lib/types';
import { cn } from '@/lib/utils';

export function ChargerListItem({
  charger,
  selected,
  distanceKm,
  onSelect,
}: {
  charger: Charger;
  selected: boolean;
  distanceKm?: number;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full rounded-xl border p-4 text-left transition-colors',
        selected ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-white/[0.02] hover:bg-white/5'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-white">{charger.name}</h4>
        <span
          className={cn(
            'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium',
            charger.status === 'Disponivel' && 'bg-emerald-500/15 text-emerald-400',
            charger.status === 'Ocupado' && 'bg-amber-500/15 text-amber-400',
            (charger.status === 'Manutencao' || charger.status === 'Offline') && 'bg-red-500/15 text-red-400'
          )}
        >
          {charger.status}
        </span>
      </div>
      <p className="mt-1 flex items-center gap-1 text-xs text-white/50">
        <MapPin size={12} /> {charger.address}, {charger.city} - {charger.state}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/60">
        <span className="inline-flex items-center gap-1">
          <BatteryCharging size={12} /> {charger.power} kW · {charger.current}
        </span>
        <span className="inline-flex items-center gap-1">
          <Star size={12} className="text-amber-400" /> {charger.rating.toFixed(1)}
        </span>
        {distanceKm !== undefined && <span>{distanceKm.toFixed(1)} km</span>}
      </div>
    </button>
  );
}
