'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ImageUpload } from '@/components/forms/ImageUpload';
import { Vehicle, VehicleType } from '@/lib/types';
import { VehicleInput } from '@/services/vehicles.service';
import { VEHICLE_BRANDS } from '@/lib/constants';
import { createVehicleAction, deleteVehicleImageAction, updateVehicleAction } from '@/app/admin/(dashboard)/veiculos/actions';

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-ink-950 px-4 py-3 text-white outline-none focus:border-blue-500';

function toInput(vehicle?: Vehicle): VehicleInput {
  return {
    brand: vehicle?.brand ?? VEHICLE_BRANDS[0],
    model: vehicle?.model ?? '',
    year: vehicle?.year ?? new Date().getFullYear(),
    mileageKm: vehicle?.mileageKm ?? 0,
    price: vehicle?.price ?? 0,
    city: vehicle?.city ?? '',
    state: vehicle?.state ?? '',
    type: vehicle?.type ?? '100% eletrico',
    autonomyKm: vehicle?.autonomyKm ?? 0,
    batteryKwh: vehicle?.batteryKwh ?? 0,
    powerHp: vehicle?.powerHp ?? 0,
    chargeTimeHours: vehicle?.chargeTimeHours ?? 0,
    connector: vehicle?.connector ?? 'Tipo 2',
    description: vehicle?.description ?? '',
    features: vehicle?.features ?? [],
    sellerName: vehicle?.sellerName ?? 'BlueV Seminovos',
    sellerType: vehicle?.sellerType ?? 'BlueV Certificado',
    featured: vehicle?.featured ?? false,
    hidden: vehicle?.hidden ?? false,
    status: vehicle?.status ?? 'Disponivel',
  };
}

export function VehicleForm({ vehicle }: { vehicle?: Vehicle }) {
  const router = useRouter();
  const [form, setForm] = useState<VehicleInput>(toInput(vehicle));
  const [featuresText, setFeaturesText] = useState(vehicle?.features.join(', ') ?? '');
  const [existingImages, setExistingImages] = useState(vehicle?.images ?? []);
  const [newImages, setNewImages] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof VehicleInput>(key: K, value: VehicleInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function removeExistingImage(imageId: string) {
    setExistingImages((imgs) => imgs.filter((i) => i.id !== imageId));
    await deleteVehicleImageAction(imageId);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const input: VehicleInput = {
      ...form,
      features: featuresText
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean),
    };

    try {
      if (vehicle) {
        await updateVehicleAction(vehicle.id, input, newImages);
      } else {
        await createVehicleAction(input, newImages);
      }
      router.push('/admin/veiculos');
      router.refresh();
    } catch {
      setError('Não foi possível salvar. Confira os dados e tente novamente.');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm text-white/70">Marca</label>
          <input className={inputClasses} value={form.brand} onChange={(e) => update('brand', e.target.value)} required />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Modelo</label>
          <input className={inputClasses} value={form.model} onChange={(e) => update('model', e.target.value)} required />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Ano</label>
          <input
            type="number"
            className={inputClasses}
            value={form.year}
            onChange={(e) => update('year', Number(e.target.value))}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm text-white/70">Quilometragem (km)</label>
          <input
            type="number"
            className={inputClasses}
            value={form.mileageKm}
            onChange={(e) => update('mileageKm', Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Preço (R$)</label>
          <input
            type="number"
            className={inputClasses}
            value={form.price}
            onChange={(e) => update('price', Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Tipo</label>
          <select className={inputClasses} value={form.type} onChange={(e) => update('type', e.target.value as VehicleType)}>
            <option value="100% eletrico">100% elétrico</option>
            <option value="Hibrido plug-in">Híbrido plug-in</option>
            <option value="Hibrido">Híbrido</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white/70">Cidade</label>
          <input className={inputClasses} value={form.city} onChange={(e) => update('city', e.target.value)} required />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Estado</label>
          <input className={inputClasses} value={form.state} onChange={(e) => update('state', e.target.value)} required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm text-white/70">Autonomia (km)</label>
          <input
            type="number"
            className={inputClasses}
            value={form.autonomyKm}
            onChange={(e) => update('autonomyKm', Number(e.target.value))}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Bateria (kWh)</label>
          <input
            type="number"
            className={inputClasses}
            value={form.batteryKwh}
            onChange={(e) => update('batteryKwh', Number(e.target.value))}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Potência (cv)</label>
          <input
            type="number"
            className={inputClasses}
            value={form.powerHp}
            onChange={(e) => update('powerHp', Number(e.target.value))}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Tempo de recarga (h)</label>
          <input
            type="number"
            step="0.1"
            className={inputClasses}
            value={form.chargeTimeHours}
            onChange={(e) => update('chargeTimeHours', Number(e.target.value))}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm text-white/70">Conector</label>
          <select className={inputClasses} value={form.connector} onChange={(e) => update('connector', e.target.value as VehicleInput['connector'])}>
            <option value="Tipo 2">Tipo 2</option>
            <option value="CCS2">CCS2</option>
            <option value="CHAdeMO">CHAdeMO</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Tipo de vendedor</label>
          <select
            className={inputClasses}
            value={form.sellerType}
            onChange={(e) => update('sellerType', e.target.value as VehicleInput['sellerType'])}
          >
            <option value="Particular">Particular</option>
            <option value="Concessionaria">Concessionária</option>
            <option value="BlueV Certificado">BlueV Certificado</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Status</label>
          <select className={inputClasses} value={form.status} onChange={(e) => update('status', e.target.value as VehicleInput['status'])}>
            <option value="Pendente moderacao">Pendente de moderação</option>
            <option value="Disponivel">Disponível (publicado)</option>
            <option value="Reservado">Reservado</option>
            <option value="Vendido">Vendido</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Nome do vendedor</label>
        <input className={inputClasses} value={form.sellerName} onChange={(e) => update('sellerName', e.target.value)} required />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Descrição</label>
        <textarea rows={4} className={inputClasses} value={form.description} onChange={(e) => update('description', e.target.value)} />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Equipamentos (separados por vírgula)</label>
        <input className={inputClasses} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} />
      </div>

      <label className="flex items-center gap-2 text-sm text-white/70">
        <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} />
        Destacar este veículo (aparece na Home e no topo do marketplace)
      </label>

      <label className="flex items-center gap-2 text-sm text-white/70">
        <input type="checkbox" checked={form.hidden} onChange={(e) => update('hidden', e.target.checked)} />
        Ocultar este veículo (não aparece mais à venda no site, mesmo com status Disponível)
      </label>

      <div>
        <label className="mb-2 block text-sm text-white/70">Fotos</label>
        {existingImages.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-3">
            {existingImages.map((img) => (
              <div key={img.id} className="relative h-20 w-28 overflow-hidden rounded-lg border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(img.id)}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <ImageUpload folder="vehicles" value={newImages} onChange={setNewImages} maxFiles={8} />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 size={18} className="animate-spin" /> : vehicle ? 'Salvar alterações' : 'Criar veículo'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/veiculos')}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
