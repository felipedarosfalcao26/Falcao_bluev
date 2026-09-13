'use client';

import dynamic from 'next/dynamic';
import { Charger } from '@/lib/types';

const ChargersMap = dynamic(() => import('@/components/map/ChargersMap').then((mod) => mod.ChargersMap), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-3xl border border-white/10 bg-ink-900" />,
});

export function MapPreviewVisual({ chargers }: { chargers: Charger[] }) {
  return (
    <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
      <ChargersMap chargers={chargers} selectedId={null} onSelect={() => undefined} />
    </div>
  );
}
