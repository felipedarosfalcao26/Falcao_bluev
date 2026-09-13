'use client';

import { useMemo, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Vehicle } from '@/lib/types';
import { useDebounce } from '@/hooks/useDebounce';
import { EMPTY_VEHICLE_FILTERS, VehicleFilters, VehicleFilterState } from '@/components/vehicles/VehicleFilters';
import { VehicleCard } from '@/components/vehicles/VehicleCard';

export function VehicleExplorer({ vehicles }: { vehicles: Vehicle[] }) {
  const [filters, setFilters] = useState<VehicleFilterState>(EMPTY_VEHICLE_FILTERS);
  const debouncedQuery = useDebounce(filters.query, 250);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const filtered = useMemo(() => {
    let result = vehicles;

    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter((v) => `${v.brand} ${v.model}`.toLowerCase().includes(q));
    }
    if (filters.brands.length) result = result.filter((v) => filters.brands.includes(v.brand));
    if (filters.types.length) result = result.filter((v) => filters.types.includes(v.type));
    if (filters.minPrice) result = result.filter((v) => v.price >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter((v) => v.price <= Number(filters.maxPrice));
    if (filters.minYear) result = result.filter((v) => v.year >= Number(filters.minYear));
    if (filters.maxYear) result = result.filter((v) => v.year <= Number(filters.maxYear));
    if (filters.maxMileage) result = result.filter((v) => v.mileageKm <= Number(filters.maxMileage));
    if (filters.minAutonomy) result = result.filter((v) => v.autonomyKm >= Number(filters.minAutonomy));

    switch (filters.sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'mileage-asc':
        result = [...result].sort((a, b) => a.mileageKm - b.mileageKm);
        break;
      default:
        result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [vehicles, debouncedQuery, filters]);

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <div>
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <p className="text-sm text-white/60">{filtered.length} veículos encontrados</p>
          <button
            onClick={() => setShowFiltersMobile((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white"
          >
            <SlidersHorizontal size={14} /> Filtros
          </button>
        </div>
        <div className={showFiltersMobile ? 'block' : 'hidden lg:block'}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <VehicleFilters value={filters} onChange={setFilters} />
          </div>
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between">
          <p className="hidden text-sm text-white/60 lg:block">{filtered.length} veículos encontrados</p>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value as VehicleFilterState['sort'] })}
            className="rounded-lg border border-white/10 bg-ink-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
          >
            <option value="recent">Mais recentes</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="mileage-asc">Menor quilometragem</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-sm text-white/50">Nenhum veículo encontrado com esses filtros.</p>
        )}
      </div>
    </div>
  );
}
