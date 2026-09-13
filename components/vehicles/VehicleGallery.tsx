'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Vehicle } from '@/lib/types';
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder';
import { cn, isRealImageUrl } from '@/lib/utils';

export function VehicleGallery({ vehicle }: { vehicle: Vehicle }) {
  const [active, setActive] = useState(0);
  const activeImage = vehicle.images[active];

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
        {isRealImageUrl(activeImage?.url) ? (
          <Image src={activeImage.url} alt={`${vehicle.brand} ${vehicle.model}`} fill className="object-cover" priority />
        ) : (
          <MediaPlaceholder seed={activeImage?.id ?? vehicle.id} kind="vehicle" className="h-full w-full" iconClassName="h-24 w-24" />
        )}
      </div>
      <div className="mt-3 flex gap-3">
        {vehicle.images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setActive(index)}
            className={cn(
              'relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition-opacity',
              active === index ? 'border-blue-500 opacity-100' : 'border-white/10 opacity-60 hover:opacity-90'
            )}
          >
            {isRealImageUrl(image.url) ? (
              <Image src={image.url} alt="" fill className="object-cover" />
            ) : (
              <MediaPlaceholder seed={image.id} kind="vehicle" className="h-full w-full" iconClassName="h-6 w-6" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
