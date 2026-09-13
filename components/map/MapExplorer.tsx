'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { LocateFixed, SlidersHorizontal, X } from 'lucide-react';
import { Charger } from '@/lib/types';
import { haversineDistanceKm } from '@/lib/utils';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useDebounce } from '@/hooks/useDebounce';
import { MapFilters, MapFilterState } from '@/components/map/MapFilters';
import { ChargerListItem } from '@/components/map/ChargerListItem';
import { ChargerDetailsPanel } from '@/components/map/ChargerDetailsPanel';
import { Button } from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';

const ChargersMap = dynamic(() => import('@/components/map/ChargersMap').then((mod) => mod.ChargersMap), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-2xl border border-white/10 bg-ink-900" />,
});

const EMPTY_FILTERS: MapFilterState = {
  query: '',
  currents: [],
  minPower: null,
  connectors: [],
  locationTypes: [],
};

export function MapExplorer({ chargers }: { chargers: Charger[] }) {
  const [filters, setFilters] = useState<MapFilterState>(EMPTY_FILTERS);
  const debouncedQuery = useDebounce(filters.query, 250);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const geo = useGeolocation();

  const filtered = useMemo(() => {
    let result = chargers;
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter(
        (c) => c.city.toLowerCase().includes(q) || c.address.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
      );
    }
    if (filters.currents.length) result = result.filter((c) => filters.currents.includes(c.current));
    if (filters.minPower) result = result.filter((c) => c.power >= filters.minPower!);
    if (filters.connectors.length) result = result.filter((c) => c.connectors.some((conn) => filters.connectors.includes(conn)));
    if (filters.locationTypes.length) result = result.filter((c) => filters.locationTypes.includes(c.locationType));

    if (geo.latitude && geo.longitude) {
      result = [...result].sort(
        (a, b) =>
          haversineDistanceKm({ lat: geo.latitude!, lng: geo.longitude! }, { lat: a.latitude, lng: a.longitude }) -
          haversineDistanceKm({ lat: geo.latitude!, lng: geo.longitude! }, { lat: b.latitude, lng: b.longitude })
      );
    }

    return result;
  }, [chargers, debouncedQuery, filters, geo.latitude, geo.longitude]);

  useEffect(() => {
    trackEvent('charger_search', { query: debouncedQuery, resultCount: filtered.length });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const selected = filtered.find((c) => c.id === selectedId) ?? null;

  useEffect(() => {
    if (selected) trackEvent('charger_view', { chargerId: selected.id });
  }, [selected]);

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <div className="order-2 lg:order-1">
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <p className="text-sm text-white/60">{filtered.length} carregadores encontrados</p>
          <button
            onClick={() => setShowFiltersMobile((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white"
          >
            <SlidersHorizontal size={14} /> Filtros
          </button>
        </div>

        <div className={showFiltersMobile ? 'block' : 'hidden lg:block'}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <MapFilters value={filters} onChange={setFilters} />
          </div>

          <Button variant="secondary" size="md" className="mt-4 w-full" onClick={geo.request}>
            <LocateFixed size={16} /> {geo.loading ? 'Localizando...' : 'Usar minha localização'}
          </Button>
          {geo.error && <p className="mt-2 text-xs text-red-400">{geo.error}</p>}
        </div>

        <div className="mt-5 hidden max-h-[420px] space-y-3 overflow-y-auto scrollbar-thin pr-1 lg:block">
          {filtered.map((charger) => (
            <ChargerListItem
              key={charger.id}
              charger={charger}
              selected={charger.id === selectedId}
              distanceKm={
                geo.latitude && geo.longitude
                  ? haversineDistanceKm({ lat: geo.latitude, lng: geo.longitude }, { lat: charger.latitude, lng: charger.longitude })
                  : undefined
              }
              onSelect={() => setSelectedId(charger.id)}
            />
          ))}
          {filtered.length === 0 && <p className="py-8 text-center text-sm text-white/50">Nenhum carregador encontrado com esses filtros.</p>}
        </div>
      </div>

      <div className="order-1 grid gap-4 lg:order-2 lg:grid-cols-[1fr_320px]">
        <div className="h-[420px] lg:h-[640px]">
          <ChargersMap
            chargers={filtered}
            selectedId={selectedId}
            onSelect={setSelectedId}
            userLocation={geo.latitude && geo.longitude ? { latitude: geo.latitude, longitude: geo.longitude } : null}
          />
        </div>

        <div className="hidden lg:block lg:h-[640px]">
          {selected ? (
            <ChargerDetailsPanel charger={selected} onClose={() => setSelectedId(null)} />
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/15 p-6 text-center text-sm text-white/40">
              Selecione um carregador no mapa ou na lista para ver os detalhes.
            </div>
          )}
        </div>

        {selected && (
          <div className="lg:hidden">
            <div className="relative">
              <button
                onClick={() => setSelectedId(null)}
                className="absolute -top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white"
              >
                <X size={16} />
              </button>
              <ChargerDetailsPanel charger={selected} onClose={() => setSelectedId(null)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
