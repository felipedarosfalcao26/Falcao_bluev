import { createClient } from '@/lib/supabase/server';
import { mapVehicle } from '@/lib/supabase/mappers';
import { Vehicle, VehicleStatus, VehicleType } from '@/lib/types';
import { slugify } from '@/lib/utils';

const VEHICLE_SELECT = '*, vehicle_images(*)';

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
  status?: VehicleStatus[];
  sort?: 'recent' | 'price-asc' | 'price-desc' | 'mileage-asc';
  includeHidden?: boolean;
}

export interface VehicleInput {
  brand: string;
  model: string;
  year: number;
  mileageKm: number;
  price: number;
  city: string;
  state: string;
  type: VehicleType;
  autonomyKm: number;
  batteryKwh: number;
  powerHp: number;
  chargeTimeHours: number;
  connector: Vehicle['connector'];
  description: string;
  features: string[];
  sellerName: string;
  sellerType: Vehicle['sellerType'];
  featured: boolean;
  hidden: boolean;
  status: VehicleStatus;
}

export async function listVehicles(filters: VehicleFilters = {}): Promise<Vehicle[]> {
  const supabase = createClient();
  let query = supabase.from('vehicles').select(VEHICLE_SELECT);

  if (!filters.includeHidden) query = query.eq('hidden', false);
  if (filters.query) query = query.or(`brand.ilike.%${filters.query}%,model.ilike.%${filters.query}%,code.ilike.%${filters.query}%`);
  if (filters.brands?.length) query = query.in('brand', filters.brands);
  if (filters.minPrice) query = query.gte('price', filters.minPrice);
  if (filters.maxPrice) query = query.lte('price', filters.maxPrice);
  if (filters.minYear) query = query.gte('year', filters.minYear);
  if (filters.maxYear) query = query.lte('year', filters.maxYear);
  if (filters.maxMileage) query = query.lte('mileage_km', filters.maxMileage);
  if (filters.minAutonomy) query = query.gte('autonomy_km', filters.minAutonomy);
  if (filters.types?.length) query = query.in('type', filters.types);
  if (filters.state) query = query.eq('state', filters.state);
  if (filters.status?.length) query = query.in('status', filters.status);

  switch (filters.sort) {
    case 'price-asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price-desc':
      query = query.order('price', { ascending: false });
      break;
    case 'mileage-asc':
      query = query.order('mileage_km', { ascending: true });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data ?? []).map(mapVehicle);
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vehicles')
    .select(VEHICLE_SELECT)
    .eq('slug', slug)
    .eq('hidden', false)
    .maybeSingle();
  if (error) throw error;
  return data ? mapVehicle(data) : undefined;
}

export async function getVehicleById(id: string): Promise<Vehicle | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase.from('vehicles').select(VEHICLE_SELECT).eq('id', id).maybeSingle();
  if (error) throw error;
  return data ? mapVehicle(data) : undefined;
}

export async function getFeaturedVehicles(limit = 6): Promise<Vehicle[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vehicles')
    .select(VEHICLE_SELECT)
    .eq('featured', true)
    .eq('hidden', false)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(mapVehicle);
}

export async function getRecentVehicles(limit = 6): Promise<Vehicle[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vehicles')
    .select(VEHICLE_SELECT)
    .eq('hidden', false)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(mapVehicle);
}

export async function getRelatedVehicles(vehicle: Vehicle, limit = 4): Promise<Vehicle[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vehicles')
    .select(VEHICLE_SELECT)
    .neq('id', vehicle.id)
    .eq('hidden', false)
    .or(`brand.eq.${vehicle.brand},type.eq.${vehicle.type}`)
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(mapVehicle);
}

function uniqueSlug(brand: string, model: string, year: number) {
  return `${slugify(`${brand}-${model}`)}-${year}-${Date.now().toString(36)}`;
}

export async function createVehicle(input: VehicleInput, imageUrls: string[] = []): Promise<Vehicle> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vehicles')
    .insert({
      slug: uniqueSlug(input.brand, input.model, input.year),
      brand: input.brand,
      model: input.model,
      year: input.year,
      mileage_km: input.mileageKm,
      price: input.price,
      city: input.city,
      state: input.state,
      type: input.type,
      autonomy_km: input.autonomyKm,
      battery_kwh: input.batteryKwh,
      power_hp: input.powerHp,
      charge_time_hours: input.chargeTimeHours,
      connector: input.connector,
      description: input.description,
      features: input.features,
      seller_name: input.sellerName,
      seller_type: input.sellerType,
      featured: input.featured,
      hidden: input.hidden,
      status: input.status,
    })
    .select(VEHICLE_SELECT)
    .single();
  if (error) throw error;

  if (imageUrls.length) {
    await supabase
      .from('vehicle_images')
      .insert(imageUrls.map((url, index) => ({ vehicle_id: data.id, url, sort_order: index })));
  }

  return mapVehicle(data);
}

export async function updateVehicle(id: string, input: VehicleInput): Promise<Vehicle> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vehicles')
    .update({
      brand: input.brand,
      model: input.model,
      year: input.year,
      mileage_km: input.mileageKm,
      price: input.price,
      city: input.city,
      state: input.state,
      type: input.type,
      autonomy_km: input.autonomyKm,
      battery_kwh: input.batteryKwh,
      power_hp: input.powerHp,
      charge_time_hours: input.chargeTimeHours,
      connector: input.connector,
      description: input.description,
      features: input.features,
      seller_name: input.sellerName,
      seller_type: input.sellerType,
      featured: input.featured,
      hidden: input.hidden,
      status: input.status,
    })
    .eq('id', id)
    .select(VEHICLE_SELECT)
    .single();
  if (error) throw error;
  return mapVehicle(data);
}

export async function deleteVehicle(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('vehicles').delete().eq('id', id);
  if (error) throw error;
}

export async function addVehicleImages(vehicleId: string, urls: string[]): Promise<void> {
  if (!urls.length) return;
  const supabase = createClient();
  const { error } = await supabase
    .from('vehicle_images')
    .insert(urls.map((url, index) => ({ vehicle_id: vehicleId, url, sort_order: index })));
  if (error) throw error;
}

export async function deleteVehicleImage(imageId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('vehicle_images').delete().eq('id', imageId);
  if (error) throw error;
}
