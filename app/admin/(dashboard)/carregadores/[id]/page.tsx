import { notFound } from 'next/navigation';
import { ChargerForm } from '@/components/admin/ChargerForm';
import { getChargerById } from '@/services/chargers.service';

export default async function EditChargerPage({ params }: { params: { id: string } }) {
  const charger = await getChargerById(params.id);
  if (!charger) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-white">Editar carregador</h1>
      <ChargerForm charger={charger} />
    </div>
  );
}
