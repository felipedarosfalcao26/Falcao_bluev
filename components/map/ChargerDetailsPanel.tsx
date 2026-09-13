'use client';

import { BatteryCharging, Clock, Navigation, Plug, Star, Tag, X } from 'lucide-react';
import { Charger } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder';
import { trackEvent } from '@/lib/analytics';

export function ChargerDetailsPanel({ charger, onClose }: { charger: Charger; onClose: () => void }) {
  const routeUrl = `https://www.google.com/maps/dir/?api=1&destination=${charger.latitude},${charger.longitude}`;

  return (
    <div className="flex h-full flex-col overflow-y-auto rounded-2xl border border-white/10 bg-ink-900">
      <div className="relative aspect-[16/9]">
        <MediaPlaceholder seed={charger.id} kind={charger.locationType.toLowerCase()} className="h-full w-full" iconClassName="h-14 w-14" />
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white"
          aria-label="Fechar"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-white">{charger.name}</h3>
        <p className="mt-1 text-sm text-white/60">
          {charger.address}, {charger.city} - {charger.state}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <BatteryCharging size={16} className="text-blue-400" /> {charger.power} kW · {charger.current}
          </div>
          <div className="flex items-center gap-2">
            <Plug size={16} className="text-blue-400" /> {charger.connectors.join(', ')}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-blue-400" /> {charger.hours}
          </div>
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-blue-400" /> {charger.price ?? 'Sob consulta'}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm">
          <span className="text-white/60">Operador</span>
          <span className="font-medium text-white">{charger.operator}</span>
        </div>
        <div className="mt-2 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm">
          <span className="text-white/60">Pontos disponíveis</span>
          <span className="font-medium text-white">{charger.points}</span>
        </div>
        <div className="mt-2 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm">
          <span className="flex items-center gap-1 text-white/60">
            <Star size={14} className="text-amber-400" /> Avaliação
          </span>
          <span className="font-medium text-white">{charger.rating.toFixed(1)} / 5</span>
        </div>

        <Button
          href={routeUrl}
          size="lg"
          className="mt-auto pt-0"
          onClick={() => trackEvent('charger_view', { chargerId: charger.id, action: 'route' })}
        >
          <Navigation size={16} /> Como chegar
        </Button>
      </div>
    </div>
  );
}
