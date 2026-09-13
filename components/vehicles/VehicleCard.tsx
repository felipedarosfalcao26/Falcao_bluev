'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BatteryCharging, Gauge, MapPin } from 'lucide-react';
import { Vehicle } from '@/lib/types';
import { formatCurrencyBRL, formatKm } from '@/lib/utils';
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder';
import { Badge } from '@/components/ui/Badge';

export function VehicleCard({ vehicle, index = 0 }: { vehicle: Vehicle; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        href={`/veiculos/${vehicle.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white/[0.05]"
      >
        <div className="relative aspect-[4/3]">
          <MediaPlaceholder seed={vehicle.id} kind="vehicle" className="h-full w-full" iconClassName="h-16 w-16" />
          {vehicle.featured && (
            <Badge className="absolute left-3 top-3 border-blue-400/40 bg-blue-500/20 text-blue-200">Destaque</Badge>
          )}
          <Badge className="absolute right-3 top-3">{vehicle.type}</Badge>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-base font-semibold text-white">
            {vehicle.brand} {vehicle.model}
          </h3>
          <p className="mt-1 text-sm text-white/50">
            {vehicle.year} · {formatKm(vehicle.mileageKm)}
          </p>

          <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/60">
            <span className="inline-flex items-center gap-1">
              <BatteryCharging size={13} /> {vehicle.autonomyKm} km
            </span>
            <span className="inline-flex items-center gap-1">
              <Gauge size={13} /> {vehicle.powerHp} cv
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} /> {vehicle.city} - {vehicle.state}
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between pt-5">
            <span className="text-lg font-semibold text-white">{formatCurrencyBRL(vehicle.price)}</span>
            <span className="text-sm font-medium text-blue-400 transition-colors group-hover:text-blue-300">
              Ver veículo
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
