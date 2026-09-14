'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { EyeOff, Eye, Loader2 } from 'lucide-react';
import { Vehicle, VehicleStatus } from '@/lib/types';
import { VehicleInput } from '@/services/vehicles.service';
import { setVehicleStatusAction, setVehicleHiddenAction } from '@/app/admin/(dashboard)/veiculos/actions';

function toInput(vehicle: Vehicle): VehicleInput {
  return {
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    mileageKm: vehicle.mileageKm,
    price: vehicle.price,
    city: vehicle.city,
    state: vehicle.state,
    type: vehicle.type,
    autonomyKm: vehicle.autonomyKm,
    batteryKwh: vehicle.batteryKwh,
    powerHp: vehicle.powerHp,
    chargeTimeHours: vehicle.chargeTimeHours,
    connector: vehicle.connector,
    description: vehicle.description,
    features: vehicle.features,
    sellerName: vehicle.sellerName,
    sellerType: vehicle.sellerType,
    featured: vehicle.featured,
    hidden: vehicle.hidden,
    status: vehicle.status,
  };
}

export function VehicleStatusActions({ vehicle }: { vehicle: Vehicle }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function setStatus(status: VehicleStatus) {
    startTransition(async () => {
      await setVehicleStatusAction(vehicle.id, status, toInput(vehicle));
      router.refresh();
    });
  }

  function toggleHidden() {
    startTransition(async () => {
      await setVehicleHiddenAction(vehicle.id, !vehicle.hidden, toInput(vehicle));
      router.refresh();
    });
  }

  if (pending) return <Loader2 size={14} className="animate-spin text-white/50" />;

  return (
    <div className="flex items-center gap-3">
      {vehicle.status === 'Pendente moderacao' && (
        <button onClick={() => setStatus('Disponivel')} className="text-xs font-medium text-emerald-400 hover:text-emerald-300">
          Aprovar
        </button>
      )}

      {vehicle.status === 'Disponivel' && (
        <button onClick={() => setStatus('Reservado')} className="text-xs font-medium text-amber-400 hover:text-amber-300">
          Pausar
        </button>
      )}

      {vehicle.status === 'Reservado' && (
        <button onClick={() => setStatus('Disponivel')} className="text-xs font-medium text-emerald-400 hover:text-emerald-300">
          Republicar
        </button>
      )}

      <button
        onClick={toggleHidden}
        title={vehicle.hidden ? 'Reexibir anúncio' : 'Ocultar anúncio'}
        className={`flex items-center gap-1 text-xs font-medium ${
          vehicle.hidden ? 'text-blue-400 hover:text-blue-300' : 'text-white/50 hover:text-white'
        }`}
      >
        {vehicle.hidden ? <Eye size={13} /> : <EyeOff size={13} />}
        {vehicle.hidden ? 'Reexibir' : 'Ocultar'}
      </button>
    </div>
  );
}
