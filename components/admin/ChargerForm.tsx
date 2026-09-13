'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Charger, ChargerLocationType, ConnectorType } from '@/lib/types';
import { ChargerInput, createChargerAction, updateChargerAction } from '@/app/admin/(dashboard)/carregadores/actions';

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-ink-950 px-4 py-3 text-white outline-none focus:border-blue-500';

const CONNECTORS: ConnectorType[] = ['Tipo 2', 'CCS2', 'CHAdeMO', 'Outros'];
const LOCATION_TYPES: ChargerLocationType[] = [
  'Shopping',
  'Posto',
  'Hotel',
  'Restaurante',
  'Supermercado',
  'Condominio',
  'Empresa',
  'Rodovia',
  'Publico',
];

function toInput(charger?: Charger): ChargerInput {
  return {
    name: charger?.name ?? '',
    latitude: charger?.latitude ?? -23.5505,
    longitude: charger?.longitude ?? -46.6333,
    address: charger?.address ?? '',
    city: charger?.city ?? '',
    state: charger?.state ?? '',
    power: charger?.power ?? 22,
    current: charger?.current ?? 'AC',
    speed: charger?.speed ?? 'Rapido',
    connectors: charger?.connectors ?? ['Tipo 2'],
    points: charger?.points ?? 1,
    status: charger?.status ?? 'Disponivel',
    operator: charger?.operator ?? 'BlueV',
    locationType: charger?.locationType ?? 'Publico',
    price: charger?.price ?? '',
    hours: charger?.hours ?? '24 horas',
    image: charger?.image ?? 'publico',
  };
}

export function ChargerForm({ charger }: { charger?: Charger }) {
  const router = useRouter();
  const [form, setForm] = useState<ChargerInput>(toInput(charger));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ChargerInput>(key: K, value: ChargerInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleConnector(connector: ConnectorType) {
    update(
      'connectors',
      form.connectors.includes(connector)
        ? form.connectors.filter((c) => c !== connector)
        : [...form.connectors, connector]
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (charger) {
        await updateChargerAction(charger.id, form);
      } else {
        await createChargerAction(form);
      }
      router.push('/admin/carregadores');
      router.refresh();
    } catch {
      setError('Não foi possível salvar. Confira os dados e tente novamente.');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white/70">Nome</label>
          <input className={inputClasses} value={form.name} onChange={(e) => update('name', e.target.value)} required />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Operador</label>
          <input className={inputClasses} value={form.operator} onChange={(e) => update('operator', e.target.value)} required />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Endereço</label>
        <input className={inputClasses} value={form.address} onChange={(e) => update('address', e.target.value)} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm text-white/70">Cidade</label>
          <input className={inputClasses} value={form.city} onChange={(e) => update('city', e.target.value)} required />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Estado</label>
          <input className={inputClasses} value={form.state} onChange={(e) => update('state', e.target.value)} required />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Latitude</label>
          <input
            type="number"
            step="any"
            className={inputClasses}
            value={form.latitude}
            onChange={(e) => update('latitude', Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Longitude</label>
          <input
            type="number"
            step="any"
            className={inputClasses}
            value={form.longitude}
            onChange={(e) => update('longitude', Number(e.target.value))}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm text-white/70">Potência (kW)</label>
          <input
            type="number"
            className={inputClasses}
            value={form.power}
            onChange={(e) => update('power', Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Corrente</label>
          <select className={inputClasses} value={form.current} onChange={(e) => update('current', e.target.value as ChargerInput['current'])}>
            <option value="AC">AC</option>
            <option value="DC">DC</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Velocidade</label>
          <select className={inputClasses} value={form.speed} onChange={(e) => update('speed', e.target.value as ChargerInput['speed'])}>
            <option value="Padrao">Padrão</option>
            <option value="Rapido">Rápido</option>
            <option value="Ultrarrapido">Ultrarrápido</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Pontos</label>
          <input
            type="number"
            className={inputClasses}
            value={form.points}
            onChange={(e) => update('points', Number(e.target.value))}
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Conectores</label>
        <div className="flex flex-wrap gap-2">
          {CONNECTORS.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => toggleConnector(c)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                form.connectors.includes(c) ? 'border-blue-500 bg-blue-500/15 text-white' : 'border-white/10 text-white/60'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm text-white/70">Tipo de local</label>
          <select
            className={inputClasses}
            value={form.locationType}
            onChange={(e) => update('locationType', e.target.value as ChargerLocationType)}
          >
            {LOCATION_TYPES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Status</label>
          <select className={inputClasses} value={form.status} onChange={(e) => update('status', e.target.value as ChargerInput['status'])}>
            <option value="Disponivel">Disponível</option>
            <option value="Ocupado">Ocupado</option>
            <option value="Manutencao">Manutenção</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Horário</label>
          <input className={inputClasses} value={form.hours} onChange={(e) => update('hours', e.target.value)} required />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/70">Preço (texto livre, ex: "R$ 2,49/kWh")</label>
        <input className={inputClasses} value={form.price ?? ''} onChange={(e) => update('price', e.target.value)} />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 size={18} className="animate-spin" /> : charger ? 'Salvar alterações' : 'Criar carregador'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/carregadores')}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
