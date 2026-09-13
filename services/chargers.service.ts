import { chargers } from '@/data/chargers';
import { Charger, ChargerCurrent, ChargerLocationType, ConnectorType } from '@/lib/types';

export interface ChargerFilters {
  query?: string;
  current?: ChargerCurrent[];
  minPower?: number;
  connectors?: ConnectorType[];
  locationTypes?: ChargerLocationType[];
}

/**
 * Abstraction over the charger data source. Today it reads from the local
 * mock dataset; swap the body for a DB/API call (Prisma, Supabase, REST)
 * without touching any component that calls these functions.
 */
export async function listChargers(filters: ChargerFilters = {}): Promise<Charger[]> {
  let result = [...chargers];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (c) => c.city.toLowerCase().includes(q) || c.address.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
  }
  if (filters.current?.length) {
    result = result.filter((c) => filters.current!.includes(c.current));
  }
  if (filters.minPower) {
    result = result.filter((c) => c.power >= filters.minPower!);
  }
  if (filters.connectors?.length) {
    result = result.filter((c) => c.connectors.some((conn) => filters.connectors!.includes(conn)));
  }
  if (filters.locationTypes?.length) {
    result = result.filter((c) => filters.locationTypes!.includes(c.locationType));
  }

  return result;
}

export async function getChargerById(id: string): Promise<Charger | undefined> {
  return chargers.find((c) => c.id === id);
}
