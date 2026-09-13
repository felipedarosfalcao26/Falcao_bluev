import { createClient } from '@/lib/supabase/server';
import { mapCharger } from '@/lib/supabase/mappers';
import { Charger, ChargerCurrent, ChargerLocationType, ConnectorType } from '@/lib/types';

export interface ChargerFilters {
  query?: string;
  current?: ChargerCurrent[];
  minPower?: number;
  connectors?: ConnectorType[];
  locationTypes?: ChargerLocationType[];
}

export interface ChargerInput {
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  power: number;
  current: ChargerCurrent;
  speed: Charger['speed'];
  connectors: ConnectorType[];
  points: number;
  status: Charger['status'];
  operator: string;
  locationType: ChargerLocationType;
  price: string | null;
  hours: string;
  image: string;
}

export async function listChargers(filters: ChargerFilters = {}): Promise<Charger[]> {
  const supabase = createClient();
  let query = supabase.from('chargers').select('*').order('created_at', { ascending: false });

  if (filters.query) {
    const q = filters.query;
    query = query.or(`city.ilike.%${q}%,address.ilike.%${q}%,name.ilike.%${q}%`);
  }
  if (filters.current?.length) query = query.in('current', filters.current);
  if (filters.minPower) query = query.gte('power', filters.minPower);
  if (filters.locationTypes?.length) query = query.in('location_type', filters.locationTypes);

  const { data, error } = await query;
  if (error) throw error;

  let result = (data ?? []).map(mapCharger);
  if (filters.connectors?.length) {
    result = result.filter((c) => c.connectors.some((conn) => filters.connectors!.includes(conn)));
  }
  return result;
}

export async function getChargerById(id: string): Promise<Charger | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase.from('chargers').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data ? mapCharger(data) : undefined;
}

export async function createCharger(input: ChargerInput): Promise<Charger> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('chargers')
    .insert({
      name: input.name,
      latitude: input.latitude,
      longitude: input.longitude,
      address: input.address,
      city: input.city,
      state: input.state,
      power: input.power,
      current: input.current,
      speed: input.speed,
      connectors: input.connectors,
      points: input.points,
      status: input.status,
      operator: input.operator,
      location_type: input.locationType,
      price: input.price,
      hours: input.hours,
      image: input.image,
    })
    .select('*')
    .single();
  if (error) throw error;
  return mapCharger(data);
}

export async function updateCharger(id: string, input: ChargerInput): Promise<Charger> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('chargers')
    .update({
      name: input.name,
      latitude: input.latitude,
      longitude: input.longitude,
      address: input.address,
      city: input.city,
      state: input.state,
      power: input.power,
      current: input.current,
      speed: input.speed,
      connectors: input.connectors,
      points: input.points,
      status: input.status,
      operator: input.operator,
      location_type: input.locationType,
      price: input.price,
      hours: input.hours,
      image: input.image,
    })
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return mapCharger(data);
}

export async function deleteCharger(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('chargers').delete().eq('id', id);
  if (error) throw error;
}
