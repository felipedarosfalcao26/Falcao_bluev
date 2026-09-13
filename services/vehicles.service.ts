import { vehicles } from '@/data/vehicles';
import { Vehicle, VehicleType } from '@/lib/types';

export interface VehicleFilters {
  query?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  maxMileage?: number;
  minAutonomy?: number;
  types?: VehicleType[];
  state?: string;
  sort?: 'recent' | 'price-asc' | 'price-desc' | 'mileage-asc';
}

/**
 * Abstraction over the vehicle marketplace data source. Swap the body for a
 * DB/API call without changing any calling page or component.
 */
export async function listVehicles(filters: VehicleFilters = {}): Promise<Vehicle[]> {
  let result = vehicles.filter((v) => v.status === 'Disponivel');

  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter((v) => `${v.brand} ${v.model}`.toLowerCase().includes(q));
  }
  if (filters.brands?.length) {
    result = result.filter((v) => filters.brands!.includes(v.brand));
  }
  if (filters.minPrice) result = result.filter((v) => v.price >= filters.minPrice!);
  if (filters.maxPrice) result = result.filter((v) => v.price <= filters.maxPrice!);
  if (filters.minYear) result = result.filter((v) => v.year >= filters.minYear!);
  if (filters.maxYear) result = result.filter((v) => v.year <= filters.maxYear!);
  if (filters.maxMileage) result = result.filter((v) => v.mileageKm <= filters.maxMileage!);
  if (filters.minAutonomy) result = result.filter((v) => v.autonomyKm >= filters.minAutonomy!);
  if (filters.types?.length) result = result.filter((v) => filters.types!.includes(v.type));
  if (filters.state) result = result.filter((v) => v.state === filters.state);

  switch (filters.sort) {
    case 'price-asc':
      result = result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result = result.sort((a, b) => b.price - a.price);
      break;
    case 'mileage-asc':
      result = result.sort((a, b) => a.mileageKm - b.mileageKm);
      break;
    default:
      result = result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return result;
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | undefined> {
  return vehicles.find((v) => v.slug === slug);
}

export async function getFeaturedVehicles(limit = 6): Promise<Vehicle[]> {
  return vehicles.filter((v) => v.featured && v.status === 'Disponivel').slice(0, limit);
}

export async function getRecentVehicles(limit = 6): Promise<Vehicle[]> {
  return [...vehicles]
    .filter((v) => v.status === 'Disponivel')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export async function getRelatedVehicles(vehicle: Vehicle, limit = 4): Promise<Vehicle[]> {
  return vehicles
    .filter((v) => v.id !== vehicle.id && v.status === 'Disponivel' && (v.brand === vehicle.brand || v.type === vehicle.type))
    .slice(0, limit);
}
