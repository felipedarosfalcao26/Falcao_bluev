'use server';

import { revalidatePath } from 'next/cache';
import { ChargerInput, createCharger, deleteCharger, updateCharger } from '@/services/chargers.service';

function revalidateChargerPaths() {
  revalidatePath('/admin/carregadores');
  revalidatePath('/mapa-de-recarga');
  revalidatePath('/');
}

export async function createChargerAction(input: ChargerInput) {
  const charger = await createCharger(input);
  revalidateChargerPaths();
  return charger;
}

export async function updateChargerAction(id: string, input: ChargerInput) {
  const charger = await updateCharger(id, input);
  revalidateChargerPaths();
  return charger;
}

export async function deleteChargerAction(id: string) {
  await deleteCharger(id);
  revalidateChargerPaths();
}
