'use client';

import { useMemo } from 'react';
import Map, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Zap } from 'lucide-react';
import { Charger } from '@/lib/types';
import { cn } from '@/lib/utils';
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface ChargersMapProps {
  chargers: Charger[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  userLocation?: { latitude: number; longitude: number } | null;
}

function statusColor(status: Charger['status']) {
  if (status === 'Disponivel') return 'bg-emerald-500';
  if (status === 'Ocupado') return 'bg-amber-500';
  return 'bg-red-500';
}

export function ChargersMap({ chargers, selectedId, onSelect, userLocation }: ChargersMapProps) {
  const center = useMemo(() => {
    if (userLocation) return { latitude: userLocation.latitude, longitude: userLocation.longitude };
    if (chargers.length === 0) return { latitude: -23.5505, longitude: -46.6333 };
    return { latitude: chargers[0].latitude, longitude: chargers[0].longitude };
  }, [chargers, userLocation]);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
        <MediaPlaceholder seed="map-fallback" kind="charger" className="h-full w-full opacity-40" />
        <div className="absolute inset-0 grid place-items-center p-8 text-center">
          <div className="max-w-sm rounded-xl border border-white/10 bg-ink-950/90 p-6 backdrop-blur">
            <p className="text-sm font-semibold text-white">Mapa interativo indisponível</p>
            <p className="mt-2 text-xs text-white/60">
              Configure a variável <code className="text-blue-400">NEXT_PUBLIC_MAPBOX_TOKEN</code> no arquivo{' '}
              <code className="text-blue-400">.env.local</code> para ativar o mapa. Enquanto isso, use a lista de
              carregadores ao lado.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden rounded-2xl border border-white/10">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ longitude: center.longitude, latitude: center.latitude, zoom: 11 }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" />
        <GeolocateControl position="top-right" />

        {chargers.map((charger) => (
          <Marker
            key={charger.id}
            latitude={charger.latitude}
            longitude={charger.longitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              onSelect(charger.id);
            }}
          >
            <button
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-white shadow-lg transition-transform hover:scale-110',
                statusColor(charger.status),
                selectedId === charger.id && 'scale-125 ring-4 ring-blue-400/50'
              )}
              aria-label={charger.name}
            >
              <Zap size={14} fill="white" />
            </button>
          </Marker>
        ))}

        {userLocation && (
          <Marker latitude={userLocation.latitude} longitude={userLocation.longitude}>
            <div className="h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-[0_0_0_6px_rgba(11,127,255,0.3)]" />
          </Marker>
        )}
      </Map>
    </div>
  );
}
