'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Vehicle, VehicleStatus } from '@/lib/types';
import { VehicleInput } from '@/services/vehicles.service';
import { setVehicleStatusAction } from '@/app/admin/(dashboard)/veiculos/actions';

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

  if (pending) return <Loader2 size={14} className="animate-spin text-white/50" />;

  if (vehicle.status === 'Pendente moderacao') {
    return (
      <button onClick={() => setStatus('Disponivel')} className="text-xs font-medium text-emerald-400 hover:text-emerald-300">
        Aprovar
      </button>
    );
  }

  if (vehicle.status === 'Disponivel') {
    return (
      <button onClick={() => setStatus('Reservado')} className="text-xs font-medium text-amber-400 hover:text-amber-300">
        Pausar
      </button>
    );
  }

  if (vehicle.status === 'Reservado') {
    return (
      <button onClick={() => setStatus('Disponivel')} className="text-xs font-medium text-emerald-400 hover:text-emerald-300">
        Republicar
      </button>
    );
  }

  return null;
}
