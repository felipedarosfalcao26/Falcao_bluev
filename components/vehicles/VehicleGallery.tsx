'use client';

import { useState } from 'react';
import { Vehicle } from '@/lib/types';
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder';
import { cn } from '@/lib/utils';

export function VehicleGallery({ vehicle }: { vehicle: Vehicle }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
        <MediaPlaceholder seed={vehicle.images[active]?.id ?? vehicle.id} kind="vehicle" className="h-full w-full" iconClassName="h-24 w-24" />
      </div>
      <div className="mt-3 flex gap-3">
        {vehicle.images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setActive(index)}
            className={cn(
              'h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition-opacity',
              active === index ? 'border-blue-500 opacity-100' : 'border-white/10 opacity-60 hover:opacity-90'
            )}
          >
            <MediaPlaceholder seed={image.id} kind="vehicle" className="h-full w-full" iconClassName="h-6 w-6" />
          </button>
        ))}
      </div>
    </div>
  );
}
