'use server';

import { revalidatePath } from 'next/cache';
import {
  addVehicleImages,
  createVehicle,
  deleteVehicle,
  deleteVehicleImage,
  updateVehicle,
  VehicleInput,
} from '@/services/vehicles.service';
import { VehicleStatus } from '@/lib/types';

function revalidateVehiclePaths() {
  revalidatePath('/admin/veiculos');
  revalidatePath('/veiculos');
  revalidatePath('/');
}

export async function createVehicleAction(input: VehicleInput, images: string[]) {
  const vehicle = await createVehicle(input, images);
  revalidateVehiclePaths();
  return vehicle;
}

export async function updateVehicleAction(id: string, input: VehicleInput, newImages: string[]) {
  const vehicle = await updateVehicle(id, input);
  if (newImages.length) await addVehicleImages(id, newImages);
  revalidateVehiclePaths();
  return vehicle;
}

export async function deleteVehicleAction(id: string) {
  await deleteVehicle(id);
  revalidateVehiclePaths();
}

export async function setVehicleStatusAction(id: string, status: VehicleStatus, current: VehicleInput) {
  await updateVehicle(id, { ...current, status });
  revalidateVehiclePaths();
}

export async function setVehicleHiddenAction(id: string, hidden: boolean, current: VehicleInput) {
  await updateVehicle(id, { ...current, hidden });
  revalidateVehiclePaths();
}

export async function deleteVehicleImageAction(imageId: string) {
  await deleteVehicleImage(imageId);
  revalidateVehiclePaths();
}
