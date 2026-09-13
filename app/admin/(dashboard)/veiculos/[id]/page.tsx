import { notFound } from 'next/navigation';
import { VehicleForm } from '@/components/admin/VehicleForm';
import { getVehicleById } from '@/services/vehicles.service';

export default async function EditVehiclePage({ params }: { params: { id: string } }) {
  const vehicle = await getVehicleById(params.id);
  if (!vehicle) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-white">Editar veículo</h1>
      <VehicleForm vehicle={vehicle} />
    </div>
  );
}
